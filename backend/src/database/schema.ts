import { sql } from "drizzle-orm";
import { char, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const subfieldsTable = pgTable("subfields", {
    subfield_id: uuid().primaryKey().default(sql`uuidv7()`),
    name: varchar({ length: 50 }).notNull(),
});