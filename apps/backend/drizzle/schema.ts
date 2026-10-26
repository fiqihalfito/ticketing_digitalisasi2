import { pgEnum, pgTable, uuid, varchar, text, timestamp, jsonb, boolean, uniqueIndex, index, foreignKey, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const priority = pgEnum("priority", ["low", "medium", "high"])
export const roleMember = pgEnum("role_member", ["requester", "executioner"])
export const status = pgEnum("status", ["open", "in_progress", "closed"])


export const accounts = pgTable("accounts", {
	accountId: uuid("account_id").default(sql`uuidv7()`).primaryKey(),
	userId: uuid("user_id").notNull().references(() => users.userId, { onDelete: "cascade" } ),
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
	uniqueIndex("accountsTable_issuer_providerAccountId_uidx").using("btree", table.issuer.asc().nullsLast(), table.providerAccountId.asc().nullsLast()),
	index("accountsTable_userId_idx").using("btree", table.userId.asc().nullsLast()),
]);

export const applicationServices = pgTable("application_services", {
	applicationServiceId: uuid("application_service_id").default(sql`uuidv7()`).primaryKey(),
	subDepartmentId: uuid("sub_department_id").notNull().references(() => subDepartments.subDepartmentId),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const departements = pgTable("departements", {
	departementId: uuid("departement_id").default(sql`uuidv7()`).primaryKey(),
	organizationId: uuid("organization_id").notNull().references(() => organizations.organizationId),
	name: text().notNull(),
	userId: uuid("user_id").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const helpTopics = pgTable("help_topics", {
	helpTopicId: uuid("help_topic_id").default(sql`uuidv7()`).primaryKey(),
	applicationServiceId: uuid("application_service_id").notNull().references(() => applicationServices.applicationServiceId),
	title: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const organizations = pgTable("organizations", {
	organizationId: uuid("organization_id").default(sql`uuidv7()`).primaryKey(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const sessions = pgTable("sessions", {
	sessionId: uuid("session_id").default(sql`uuidv7()`).primaryKey(),
	userId: uuid("user_id").notNull().references(() => users.userId, { onDelete: "cascade" } ),
	token: varchar().notNull(),
	expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	impersonatedBy: text("impersonated_by"),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
	index("sessionsTable_userId_idx").using("btree", table.userId.asc().nullsLast()),
	unique("sessions_token_key").on(table.token),]);

export const subDepartments = pgTable("sub_departments", {
	subDepartmentId: uuid("sub_department_id").default(sql`uuidv7()`).primaryKey(),
	name: text().notNull(),
	departementId: uuid("departement_id").notNull().references(() => departements.departementId),
	userId: uuid("user_id").notNull().references(() => users.userId),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const subTeams = pgTable("sub_teams", {
	subTeamId: uuid("sub_team_id").default(sql`uuidv7()`).primaryKey(),
	teamId: uuid("team_id").notNull().references(() => teams.teamId),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const subfields = pgTable("subfields", {
	subfieldId: uuid("subfield_id").default(sql`uuidv7()`).notNull(),
	name: varchar({ length: 50 }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.subfieldId], name: "subfieldsxxx_pkey"}),
]);

export const teamLeaders = pgTable("team_leaders", {
	teamLeaderId: uuid("team_leader_id").default(sql`uuidv7()`).primaryKey(),
	userId: uuid("user_id").notNull().references(() => users.userId),
	teamId: uuid("team_id").notNull().references(() => teams.teamId),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const teamMembers = pgTable("team_members", {
	teamMemberId: uuid("team_member_id").default(sql`uuidv7()`).primaryKey(),
	userId: uuid("user_id").notNull().references(() => users.userId),
	teamId: uuid("team_id").notNull().references(() => teams.teamId),
	subTeamId: uuid("sub_team_id").references(() => subTeams.subTeamId),
	roleMember: roleMember(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const teams = pgTable("teams", {
	teamId: uuid("team_id").default(sql`uuidv7()`).primaryKey(),
	subDepartmentId: uuid("sub_department_id").notNull().references(() => subDepartments.subDepartmentId),
	name: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const ticketAssignments = pgTable("ticket_assignments", {
	ticketAssignmentId: uuid("ticket_assignment_id").default(sql`uuidv7()`).primaryKey(),
	ticketId: uuid("ticket_id").notNull().references(() => tickets.ticketId),
	assigneeMemberId: uuid("assignee_member_id").notNull().references(() => teamMembers.teamMemberId),
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
	teamMemberId: uuid("team_member_id").notNull().references(() => teamMembers.teamMemberId),
	bodyChat: jsonb("body_chat").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const tickets = pgTable("tickets", {
	ticketId: uuid("ticket_id").default(sql`uuidv7()`).primaryKey(),
	requesterMemberId: uuid("requester_member_id").notNull().references(() => teamMembers.teamMemberId),
	helpTopicId: uuid("help_topic_id").notNull().references(() => helpTopics.helpTopicId),
	status: status().default("open").notNull(),
	priority: priority().default("medium").notNull(),
	title: text().notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
});

export const users = pgTable("users", {
	userId: uuid("user_id").default(sql`uuidv7()`).primaryKey(),
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
	unique("users_email_key").on(table.email),]);

export const verifications = pgTable("verifications", {
	verificationId: uuid("verification_id").default(sql`uuidv7()`).primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }).default(sql`now()`).notNull(),
}, (table) => [
	index("verificationsTable_identifier_idx").using("btree", table.identifier.asc().nullsLast()),
]);
