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
        }),
        members: r.many.membersTable({
            from: r.usersTable.id,
            to: r.membersTable.userId,
        }),
        teamMembers: r.many.teamMembersTable({
            from: r.usersTable.id,
            to: r.teamMembersTable.userId,
        }),
        invitations: r.many.invitationsTable({
            from: r.usersTable.id,
            to: r.invitationsTable.inviterId,
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
    },
    organizationsTable: {
        members: r.many.membersTable({
            from: r.organizationsTable.id,
            to: r.membersTable.organizationId,
        }),
        invitations: r.many.invitationsTable({
            from: r.organizationsTable.id,
            to: r.invitationsTable.organizationId,
        }),
        teams: r.many.teamsTable({
            from: r.organizationsTable.id,
            to: r.teamsTable.organizationId,
        })
    },
    membersTable: {
        organization: r.one.organizationsTable({
            from: r.membersTable.organizationId,
            to: r.organizationsTable.id
        }),
        users: r.one.usersTable({
            from: r.membersTable.userId,
            to: r.usersTable.id
        })
    },
    invitationsTable: {
        organization: r.one.organizationsTable({
            from: r.invitationsTable.organizationId,
            to: r.organizationsTable.id
        }),
        users: r.one.usersTable({
            from: r.invitationsTable.inviterId,
            to: r.usersTable.id
        })
    }
}))