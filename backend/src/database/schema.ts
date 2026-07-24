import { sql } from "drizzle-orm";
import { boolean, char, index, integer, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const subfieldsTable = pgTable("subfields", {
    subfieldId: uuid("subfield_id").primaryKey().default(sql`uuidv7()`),
    name: varchar("name", { length: 50 }).notNull(),
});

export const usersTable = pgTable("users", {
    id: text("user_id").primaryKey(),
    name: text("name").notNull(),
    email: varchar("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).$onUpdate(() => new Date()).notNull(),

    // admin plugin fields
    role: text("role"),
    banned: boolean("banned").default(false),
    banReason: text("ban_reason"),
    banExpires: timestamp("ban_expires", { precision: 6, withTimezone: true }),
});

export const sessionsTable = pgTable("sessions", {
    id: text("session_id").primaryKey(),
    userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    token: varchar("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    impersonatedBy: text("impersonated_by"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).$onUpdate(() => new Date()).notNull(),
},
    (table) => [index("sessionsTable_userId_idx").on(table.userId)]
);

export const accountsTable = pgTable("accounts", {
    id: text("account_id").primaryKey(),
    userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    issuer: text("issuer").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { precision: 6, withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { precision: 6, withTimezone: true }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).$onUpdate(() => new Date()).notNull(),
},
    (table) => [
        uniqueIndex("accountsTable_issuer_providerAccountId_uidx").on(
            table.issuer,
            table.providerAccountId,
        ),
        index("accountsTable_userId_idx").on(table.userId),
    ],
);

export const verificationsTable = pgTable("verifications", {
    id: text("verification_id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
},
    (table) => [
        index("verificationsTable_identifier_idx").on(table.identifier)
    ],
);