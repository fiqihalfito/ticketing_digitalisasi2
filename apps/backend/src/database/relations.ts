import { defineRelations } from "drizzle-orm";
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
    authUsersTable: {
        sessions: r.many.authSessionsTable({
            from: r.authUsersTable.id,
            to: r.authSessionsTable.authUserId
        }),
        accounts: r.many.authAccountsTable({
            from: r.authUsersTable.id,
            to: r.authAccountsTable.authUserId,
        }),
    },
    authSessionsTable: {
        users: r.one.authUsersTable({
            from: r.authSessionsTable.authUserId,
            to: r.authUsersTable.id
        })
    },
    authAccountsTable: {
        users: r.one.authUsersTable({
            from: r.authAccountsTable.authUserId,
            to: r.authUsersTable.id
        })
    }
}))