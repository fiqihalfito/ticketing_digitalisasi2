import { sql } from "drizzle-orm";
import { boolean, char, integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const subfieldsTable = pgTable("subfields", {
    subfieldId: uuid("subfield_id").primaryKey().default(sql`uuidv7()`),
    name: varchar("name", { length: 50 }).notNull(),
});

export const usersTable = pgTable("users", {
    userId: text("user_id").primaryKey(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const sessionsTable = pgTable("sessions", {
    sessionId: text("session_id").primaryKey(),
    userId: text("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
    token: varchar("token", { length: 255 }).notNull().unique(),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const accountsTable = pgTable("accounts", {
    accountId: text("account_id").primaryKey(),
    userId: text("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
    accountCredentialId: text("account_credential_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { precision: 6, withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { precision: 6, withTimezone: true }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const verificationsTable = pgTable("verifications", {
    verificationId: text("verification_id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});