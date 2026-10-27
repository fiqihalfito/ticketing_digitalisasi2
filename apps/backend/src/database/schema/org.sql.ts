import { sql } from "drizzle-orm";
import { boolean, char, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../utils/column-helper";
import { authUsersTable } from "./auth.sql";

export const orgOrganizationsTable = pgTable("org_organizations", {
    orgOrganizationId: uuid("org_organization_id").primaryKey().default(sql`uuidv7()`),
    name: text("name").notNull(),
    ...timestamps(),
});

export const orgDepartementsTable = pgTable('org_departements', {
    orgDepartementId: uuid("org_departement_id").primaryKey().default(sql`uuidv7()`),
    orgOrganizationId: uuid("org_organization_id").notNull().references(() => orgOrganizationsTable.orgOrganizationId),
    name: text("name").notNull(),
    authUserId: uuid('auth_user_id').notNull().references(() => authUsersTable.id),
    ...timestamps(),
})

export const orgSubDepartmentsTable = pgTable('org_sub_departments', {
    orgSubDepartmentId: uuid("org_sub_department_id").primaryKey().default(sql`uuidv7()`),
    name: text("name").notNull(),
    orgDepartementId: uuid('org_departement_id').notNull().references(() => orgDepartementsTable.orgDepartementId),
    authUserId: uuid('auth_user_id').notNull().references(() => authUsersTable.id),
    ...timestamps(),
})

export const orgTeamsTable = pgTable('org_teams', {
    orgTeamId: uuid('org_team_id').primaryKey().default(sql`uuidv7()`),
    orgSubDepartmentId: uuid('org_sub_department_id').notNull().references(() => orgSubDepartmentsTable.orgSubDepartmentId),
    name: text("name").notNull(),
    ...timestamps(),
})

export const orgSubTeamsTable = pgTable('org_sub_teams', {
    orgSubTeamId: uuid('org_sub_team_id').primaryKey().default(sql`uuidv7()`),
    orgTeamId: uuid('org_team_id').notNull().references(() => orgTeamsTable.orgTeamId),
    name: text("name").notNull(),
    ...timestamps(),
})

export const orgRoleMemberEnum = pgEnum('org_role_member', ['requester', 'executioner'])
export const orgTeamMembersTable = pgTable('org_team_members', {
    orgTeamMemberId: uuid('org_team_member_id').primaryKey().default(sql`uuidv7()`),
    authUserId: uuid('auth_user_id').notNull().references(() => authUsersTable.id),
    orgTeamId: uuid('org_team_id').notNull().references(() => orgTeamsTable.orgTeamId),
    orgSubTeamId: uuid('org_sub_team_id').references(() => orgSubTeamsTable.orgSubTeamId),
    roleMember: orgRoleMemberEnum(),
    ...timestamps(),
})

export const orgTeamLeadersTable = pgTable('org_team_leaders', {
    orgTeamLeaderId: uuid('org_team_leader_id').primaryKey().default(sql`uuidv7()`),
    authUserId: uuid('auth_user_id').notNull().references(() => authUsersTable.id),
    orgTeamId: uuid('org_team_id').notNull().references(() => orgTeamsTable.orgTeamId),
    ...timestamps(),
})