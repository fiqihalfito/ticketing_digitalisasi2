import { defineRelationsPart } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const sessionsTable = pgTable(
  "sessions_table",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("sessionsTable_userId_idx").on(table.userId)],
);

export const accountsTable = pgTable(
  "accounts_table",
  {
    id: text("id").primaryKey(),
    issuer: text("issuer").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("accountsTable_issuer_providerAccountId_uidx").on(
      table.issuer,
      table.providerAccountId,
    ),
    index("accountsTable_userId_idx").on(table.userId),
  ],
);

export const verificationsTable = pgTable(
  "verifications_table",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verificationsTable_identifier_idx").on(table.identifier)],
);

export const authRelations = defineRelationsPart(
  { usersTable, sessionsTable, accountsTable, verificationsTable },
  (r) => ({
    usersTable: {
      sessionsTables: r.many.sessionsTable({
        from: r.usersTable.id,
        to: r.sessionsTable.userId,
      }),
      accountsTables: r.many.accountsTable({
        from: r.usersTable.id,
        to: r.accountsTable.userId,
      }),
    },
    sessionsTable: {
      usersTable: r.one.usersTable({
        from: r.sessionsTable.userId,
        to: r.usersTable.id,
      }),
    },
    accountsTable: {
      usersTable: r.one.usersTable({
        from: r.accountsTable.userId,
        to: r.usersTable.id,
      }),
    },
  }),
);
