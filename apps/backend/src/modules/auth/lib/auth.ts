import { db } from "@/database/connect";
import { betterAuth } from "better-auth/minimal";
import { admin, openAPI, organization } from 'better-auth/plugins'
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import * as schema from "@/database/schema";

export const auth = betterAuth({
    basePath: '/api',
    trustedOrigins: ["http://localhost:3000"],
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema,
    }),
    // model config
    user: {
        modelName: "usersTable",
    },
    session: {
        modelName: "sessionsTable",
        expiresIn: 60 * 60 * 24 * 7,    // 7 hari
        updateAge: 60 * 60 * 24,         // Update setiap 24 jam
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5                  // Cache 5 menit
        }
    },
    account: {
        modelName: "accountsTable",
    },
    verification: {
        modelName: "verificationsTable",
    },

    // auth config
    experimental: {
        joins: true
    },
    emailAndPassword: {
        enabled: true
    },

    plugins: [
        openAPI(),
        admin({
            defaultRole: "requester",
            adminRoles: ["admin"]
        }),
        organization({
            teams: {
                enabled: true,
            },
            schema: {
                organization: {
                    modelName: "organizationsTable",
                },
                invitation: {
                    modelName: "invitationsTable"
                },
                member: {
                    modelName: "membersTable"
                },
                team: {
                    modelName: "teamsTable",
                },
                teamMember: {
                    modelName: "teamMembersTable"
                }
            }
        })
    ]
});

// Export type untuk TypeScript
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user