import { pgEnum, pgTable, uuid, text, varchar, timestamp, boolean, jsonb, index, uniqueIndex, foreignKey, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const orgRoleMember = pgEnum("org_role_member", ["requester", "executioner"])
export const ticketPriority = pgEnum("ticket_priority", ["low", "medium", "high"])
export const ticketStatus = pgEnum("ticket_status", ["open", "in_progress", "closed"])


export const authAccounts = pgTable("auth_accounts", {
	authAccountId: uuid("auth_account_id").default(sql`uuidv7()`).primaryKey(),
	authUserId: uuid("auth_user_id").notNull().references(() => authUsers.authUserId, { onDelete: "cascade" } ),
	issuer: text(),
	providerAccountId: text("provider_account_id"),
	providerId: text("provider_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { precision: 6, withTimezone: true }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { precision: 6, withTimezone: true }),
	scope: text(),
	idToken: text("id_token"),
	password: text(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
	index("authAccountsTable_authUserId_idx").using("btree", table.authUserId.asc().nullsLast()),
	uniqueIndex("authAccountsTable_issuer_providerAccountId_uidx").using("btree", table.issuer.asc().nullsLast(), table.providerAccountId.asc().nullsLast()),
]);

export const authSessions = pgTable("auth_sessions", {
	authSessionId: uuid("auth_session_id").default(sql`uuidv7()`).primaryKey(),
	authUserId: uuid("auth_user_id").notNull().references(() => authUsers.authUserId, { onDelete: "cascade" } ),
	token: varchar().notNull(),
	expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	impersonatedBy: text("impersonated_by"),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
	index("authSessionsTable_authUserId_idx").using("btree", table.authUserId.asc().nullsLast()),
	unique("auth_sessions_token_key").on(table.token),]);

export const authUsers = pgTable("auth_users", {
	authUserId: uuid("auth_user_id").default(sql`uuidv7()`).primaryKey(),
	name: text().notNull(),
	email: varchar().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	role: text(),
	banned: boolean().default(false),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires", { precision: 6, withTimezone: true }),
}, (table) => [
	unique("auth_users_email_key").on(table.email),]);

export const authVerifications = pgTable("auth_verifications", {
	authVerificationId: uuid("auth_verification_id").default(sql`uuidv7()`).primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
	index("authVerificationsTable_identifier_idx").using("btree", table.identifier.asc().nullsLast()),
]);

export const catalogApplicationServices = pgTable("catalog_application_services", {
	catalogApplicationServiceId: uuid("catalog_application_service_id").default(sql`uuidv7()`).primaryKey(),
	orgSubDepartmentId: uuid("org_sub_department_id").notNull().references(() => orgSubDepartments.orgSubDepartmentId),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const catalogHelpTopics = pgTable("catalog_help_topics", {
	catalogHelpTopicId: uuid("catalog_help_topic_id").default(sql`uuidv7()`).primaryKey(),
	catalogApplicationServiceId: uuid("catalog_application_service_id").notNull().references(() => catalogApplicationServices.catalogApplicationServiceId),
	title: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const orgDepartements = pgTable("org_departements", {
	orgDepartementId: uuid("org_departement_id").default(sql`uuidv7()`).primaryKey(),
	orgOrganizationId: uuid("org_organization_id").notNull().references(() => orgOrganizations.orgOrganizationId),
	name: text().notNull(),
	authUserId: uuid("auth_user_id").notNull().references(() => authUsers.authUserId),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const orgOrganizations = pgTable("org_organizations", {
	orgOrganizationId: uuid("org_organization_id").default(sql`uuidv7()`).primaryKey(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const orgSubDepartments = pgTable("org_sub_departments", {
	orgSubDepartmentId: uuid("org_sub_department_id").default(sql`uuidv7()`).primaryKey(),
	name: text().notNull(),
	orgDepartementId: uuid("org_departement_id").notNull().references(() => orgDepartements.orgDepartementId),
	authUserId: uuid("auth_user_id").notNull().references(() => authUsers.authUserId),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const orgSubTeams = pgTable("org_sub_teams", {
	orgSubTeamId: uuid("org_sub_team_id").default(sql`uuidv7()`).primaryKey(),
	orgTeamId: uuid("org_team_id").notNull().references(() => orgTeams.orgTeamId),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const orgTeamLeaders = pgTable("org_team_leaders", {
	orgTeamLeaderId: uuid("org_team_leader_id").default(sql`uuidv7()`).primaryKey(),
	authUserId: uuid("auth_user_id").notNull().references(() => authUsers.authUserId),
	orgTeamId: uuid("org_team_id").notNull().references(() => orgTeams.orgTeamId),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const orgTeamMembers = pgTable("org_team_members", {
	orgTeamMemberId: uuid("org_team_member_id").default(sql`uuidv7()`).primaryKey(),
	authUserId: uuid("auth_user_id").notNull().references(() => authUsers.authUserId),
	orgTeamId: uuid("org_team_id").notNull().references(() => orgTeams.orgTeamId),
	orgSubTeamId: uuid("org_sub_team_id").references(() => orgSubTeams.orgSubTeamId),
	roleMember: orgRoleMember(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const orgTeams = pgTable("org_teams", {
	orgTeamId: uuid("org_team_id").default(sql`uuidv7()`).primaryKey(),
	orgSubDepartmentId: uuid("org_sub_department_id").notNull().references(() => orgSubDepartments.orgSubDepartmentId),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const ticketAssignments = pgTable("ticket_assignments", {
	ticketAssignmentId: uuid("ticket_assignment_id").default(sql`uuidv7()`).primaryKey(),
	ticketId: uuid("ticket_id").notNull().references(() => tickets.ticketId),
	assigneeMemberId: uuid("assignee_member_id").notNull().references(() => orgTeamMembers.orgTeamMemberId),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const ticketChatAttachments = pgTable("ticket_chat_attachments", {
	ticketChatAttachmentId: uuid("ticket_chat_attachment_id").default(sql`uuidv7()`).primaryKey(),
	ticketChatId: uuid("ticket_chat_id").notNull().references(() => ticketChats.ticketChatId),
	title: text().notNull(),
	urlFile: text("url_file").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const ticketChats = pgTable("ticket_chats", {
	ticketChatId: uuid("ticket_chat_id").default(sql`uuidv7()`).primaryKey(),
	ticketId: uuid("ticket_id").notNull().references(() => tickets.ticketId),
	orgTeamMemberId: uuid("org_team_member_id").notNull().references(() => orgTeamMembers.orgTeamMemberId),
	bodyChat: jsonb("body_chat").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const tickets = pgTable("tickets", {
	ticketId: uuid("ticket_id").default(sql`uuidv7()`).primaryKey(),
	orgTeamMemberId: uuid("org_team_member_id").notNull().references(() => orgTeamMembers.orgTeamMemberId),
	catalogHelpTopicId: uuid("catalog_help_topic_id").notNull().references(() => catalogHelpTopics.catalogHelpTopicId),
	status: ticketStatus().default("open").notNull(),
	priority: ticketPriority().default("medium").notNull(),
	title: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});
