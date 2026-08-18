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

export const organizationsTable = pgTable("organizations", {
    id: text("organization_id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    logo: text("logo"),
    createdAt: timestamp("created_at").notNull(),
    metadata: text("metadata"),
});

export const membersTable = pgTable(
    "members",
    {
        id: text("member_id").primaryKey(),
        organizationId: text("organization_id")
            .notNull()
            .references(() => organizationsTable.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        role: text("role").default("member").notNull(),
        createdAt: timestamp("created_at").notNull(),
    },
    (table) => [
        index("member_organizationId_idx").on(table.organizationId),
        index("member_userId_idx").on(table.userId),
    ],
);

export const teamsTable = pgTable(
    "teams",
    {
        id: text("team_id").primaryKey(),
        name: text("name").notNull(),
        memberCount: integer("member_count").default(0).notNull(),
        organizationId: text("organization_id")
            .notNull()
            .references(() => organizationsTable.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").notNull(),
        updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    },
    (table) => [index("teamsTable_organizationId_idx").on(table.organizationId)],
);

export const teamMembersTable = pgTable(
    "team_members",
    {
        id: text("team_member_id").primaryKey(),
        teamId: text("team_id")
            .notNull()
            .references(() => teamsTable.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        membershipKey: text("membership_key").unique(),
        createdAt: timestamp("created_at"),
    },
    (table) => [
        index("teamMembersTable_teamId_idx").on(table.teamId),
        index("teamMembersTable_userId_idx").on(table.userId),
    ],
);

export const invitationsTable = pgTable(
    "invitations",
    {
        id: text("invitation_id").primaryKey(),
        organizationId: text("organization_id")
            .notNull()
            .references(() => organizationsTable.id, { onDelete: "cascade" }),
        email: text("email").notNull(),
        role: text("role"),
        status: text("status").default("pending").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").notNull(),
        inviterId: text("inviter_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
    },
    (table) => [
        index("invitation_organizationId_idx").on(table.organizationId),
        index("invitation_email_idx").on(table.email),
    ],
);