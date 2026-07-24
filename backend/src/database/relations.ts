import { defineRelations } from "drizzle-orm";
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
    usersTable: {
        sessions: r.many.sessionsTable({
            from: r.usersTable.id,
            to: r.sessionsTable.userId
        }),
        accounts: r.many.accountsTable({
            from: r.usersTable.id,
            to: r.accountsTable.userId,
        })
    },
    sessionsTable: {
        users: r.one.usersTable({
            from: r.sessionsTable.userId,
            to: r.usersTable.id
        })
    },
    accountsTable: {
        users: r.one.usersTable({
            from: r.accountsTable.userId,
            to: r.usersTable.id
        })
    }
}))