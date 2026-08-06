import { defineRelationsPart } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
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
    activeOrganizationId: text("active_organization_id"),
    activeTeamId: text("active_team_id"),
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

export const organizationsTable = pgTable(
  "organizations_table",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    logo: text("logo"),
    createdAt: timestamp("created_at").notNull(),
    metadata: text("metadata"),
  },
  (table) => [uniqueIndex("organizationsTable_slug_uidx").on(table.slug)],
);

export const teamsTable = pgTable(
  "teams_table",
  {
    id: text("id").primaryKey(),
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
  "team_members_table",
  {
    id: text("id").primaryKey(),
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

export const membersTable = pgTable(
  "members_table",
  {
    id: text("id").primaryKey(),
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
    index("membersTable_organizationId_idx").on(table.organizationId),
    index("membersTable_userId_idx").on(table.userId),
  ],
);

export const invitationsTable = pgTable(
  "invitations_table",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organizationsTable.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role"),
    teamId: text("team_id"),
    status: text("status").default("pending").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull(),
    inviterId: text("inviter_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("invitationsTable_organizationId_idx").on(table.organizationId),
    index("invitationsTable_email_idx").on(table.email),
  ],
);

export const authRelations = defineRelationsPart(
  {
    usersTable,
    sessionsTable,
    accountsTable,
    verificationsTable,
    organizationsTable,
    teamsTable,
    teamMembersTable,
    membersTable,
    invitationsTable,
  },
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
      teamMembersTables: r.many.teamMembersTable({
        from: r.usersTable.id,
        to: r.teamMembersTable.userId,
      }),
      membersTables: r.many.membersTable({
        from: r.usersTable.id,
        to: r.membersTable.userId,
      }),
      invitationsTables: r.many.invitationsTable({
        from: r.usersTable.id,
        to: r.invitationsTable.inviterId,
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
    organizationsTable: {
      teamsTables: r.many.teamsTable({
        from: r.organizationsTable.id,
        to: r.teamsTable.organizationId,
      }),
      membersTables: r.many.membersTable({
        from: r.organizationsTable.id,
        to: r.membersTable.organizationId,
      }),
      invitationsTables: r.many.invitationsTable({
        from: r.organizationsTable.id,
        to: r.invitationsTable.organizationId,
      }),
    },
    teamsTable: {
      organizationsTable: r.one.organizationsTable({
        from: r.teamsTable.organizationId,
        to: r.organizationsTable.id,
      }),
      teamMembersTables: r.many.teamMembersTable({
        from: r.teamsTable.id,
        to: r.teamMembersTable.teamId,
      }),
    },
    teamMembersTable: {
      teamsTable: r.one.teamsTable({
        from: r.teamMembersTable.teamId,
        to: r.teamsTable.id,
      }),
      usersTable: r.one.usersTable({
        from: r.teamMembersTable.userId,
        to: r.usersTable.id,
      }),
    },
    membersTable: {
      organizationsTable: r.one.organizationsTable({
        from: r.membersTable.organizationId,
        to: r.organizationsTable.id,
      }),
      usersTable: r.one.usersTable({
        from: r.membersTable.userId,
        to: r.usersTable.id,
      }),
    },
    invitationsTable: {
      organizationsTable: r.one.organizationsTable({
        from: r.invitationsTable.organizationId,
        to: r.organizationsTable.id,
      }),
      usersTable: r.one.usersTable({
        from: r.invitationsTable.inviterId,
        to: r.usersTable.id,
      }),
    },
  }),
);
