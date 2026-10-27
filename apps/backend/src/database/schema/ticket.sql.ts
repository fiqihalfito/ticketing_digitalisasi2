import { sql } from "drizzle-orm";
import { boolean, char, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../utils/column-helper";
import { orgTeamMembersTable } from "./org.sql";
import { catalogHelpTopicsTable } from "./catalog.sql";

export const ticketStatusEnum = pgEnum('ticket_status', ['open', 'in_progress', 'closed'])
export const ticketPriorityEnum = pgEnum('ticket_priority', ['low', 'medium', 'high'])
export const ticketsTable = pgTable('tickets', {
    ticketId: uuid('ticket_id').primaryKey().default(sql`uuidv7()`),
    orgTeamMemberId: uuid('org_team_member_id').notNull().references(() => orgTeamMembersTable.orgTeamMemberId),
    catalogHelpTopicId: uuid('catalog_help_topic_id').notNull().references(() => catalogHelpTopicsTable.catalogHelpTopicId),
    status: ticketStatusEnum('status').notNull().default('open'),
    priority: ticketPriorityEnum('priority').notNull().default('medium'),
    title: text("title").notNull(),
    ...timestamps(),
})

export const ticketAssignmentsTable = pgTable('ticket_assignments', {
    ticketAssignmentId: uuid('ticket_assignment_id').primaryKey().default(sql`uuidv7()`),
    ticketId: uuid('ticket_id').notNull().references(() => ticketsTable.ticketId),
    assigneeMemberId: uuid('assignee_member_id').notNull().references(() => orgTeamMembersTable.orgTeamMemberId),
    ...timestamps(),
})

export const ticketChatsTable = pgTable('ticket_chats', {
    ticketChatId: uuid('ticket_chat_id').primaryKey().default(sql`uuidv7()`),
    ticketId: uuid('ticket_id').notNull().references(() => ticketsTable.ticketId),
    orgTeamMemberId: uuid('org_team_member_id').notNull().references(() => orgTeamMembersTable.orgTeamMemberId),
    bodyChat: jsonb('body_chat').notNull(),
    ...timestamps(),
})

export const ticketChatAttachmentsTable = pgTable('ticket_chat_attachments', {
    ticketChatAttachmentId: uuid('ticket_chat_attachment_id').primaryKey().default(sql`uuidv7()`),
    ticketChatId: uuid('ticket_chat_id').notNull().references(() => ticketChatsTable.ticketChatId),
    title: text('title').notNull(),
    urlFile: text('url_file').notNull(),
    ...timestamps(),
})