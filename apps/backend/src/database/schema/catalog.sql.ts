import { sql } from "drizzle-orm";
import { boolean, char, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../utils/column-helper";
import { orgSubDepartmentsTable } from "./org.sql";

export const catalogApplicationServicesTable = pgTable('catalog_application_services', {
    catalogApplicationServiceId: uuid('catalog_application_service_id').primaryKey().default(sql`uuidv7()`),
    orgSubDepartmentId: uuid('org_sub_department_id').notNull().references(() => orgSubDepartmentsTable.orgSubDepartmentId),
    name: text("name").notNull(),
    ...timestamps(),
})

export const catalogHelpTopicsTable = pgTable('catalog_help_topics', {
    catalogHelpTopicId: uuid('catalog_help_topic_id').primaryKey().default(sql`uuidv7()`),
    catalogApplicationServiceId: uuid('catalog_application_service_id').notNull().references(() => catalogApplicationServicesTable.catalogApplicationServiceId),
    title: text("title").notNull(),
    ...timestamps(),
})