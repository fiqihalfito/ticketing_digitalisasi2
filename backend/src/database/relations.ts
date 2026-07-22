import { defineRelations } from "drizzle-orm";
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
    usersTable: {
        sessions: r.many.sessionsTable(),
        accounts: r.many.accountsTable()
    },
    sessionsTable: {
        users: r.one.usersTable({
            from: r.sessionsTable.userId,
            to: r.usersTable.userId
        })
    },
    accountsTable: {
        users: r.one.usersTable({
            from: r.accountsTable.userId,
            to: r.usersTable.userId
        })
    }
}))