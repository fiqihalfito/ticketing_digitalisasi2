import { sql } from "drizzle-orm";
import { boolean, char, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../utils/column-helper";

export const authUsersTable = pgTable("auth_users", {
    id: uuid("auth_user_id").primaryKey().default(sql`uuidv7()`),
    name: text("name").notNull(),
    email: varchar("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    ...timestamps(),

    // admin plugin fields
    role: text("role"),
    banned: boolean("banned").default(false),
    banReason: text("ban_reason"),
    banExpires: timestamp("ban_expires", { precision: 6, withTimezone: true }),
});


export const authSessionsTable = pgTable("auth_sessions", {
    id: uuid("auth_session_id").primaryKey().default(sql`uuidv7()`),
    authUserId: uuid("auth_user_id").notNull().references(() => authUsersTable.id, { onDelete: "cascade" }),
    token: varchar("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    impersonatedBy: text("impersonated_by"),
    ...timestamps(),
},
    (table) => [index("authSessionsTable_authUserId_idx").on(table.authUserId)]
);

export const authAccountsTable = pgTable("auth_accounts", {
    id: uuid("auth_account_id").primaryKey().default(sql`uuidv7()`),
    authUserId: uuid("auth_user_id").notNull().references(() => authUsersTable.id, { onDelete: "cascade" }),
    issuer: text("issuer"),
    providerAccountId: text("provider_account_id"),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { precision: 6, withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { precision: 6, withTimezone: true }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    ...timestamps(),
},
    (table) => [
        uniqueIndex("authAccountsTable_issuer_providerAccountId_uidx").on(
            table.issuer,
            table.providerAccountId,
        ),
        index("authAccountsTable_authUserId_idx").on(table.authUserId),
    ],
);

export const authVerificationsTable = pgTable("auth_verifications", {
    id: uuid("auth_verification_id").primaryKey().default(sql`uuidv7()`),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    ...timestamps(),
},
    (table) => [
        index("authVerificationsTable_identifier_idx").on(table.identifier)
    ],
);