import { db } from "@/database/connect";
import { betterAuth } from "better-auth/minimal";
import { admin, openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/database/schema";

export const auth = betterAuth({
    basePath: '/api',
    trustedOrigins: ["http://localhost:3000"],
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema,
        // usePlural: true,

        // schema: {
        //     ...schema,
        //     user: schema.usersTable,
        //     session: schema.sessionsTable,
        //     account: schema.accountsTable,
        //     verification: schema.verificationsTable
        // }
    }),
    user: {
        modelName: "usersTable",
    },
    session: {
        modelName: "sessionsTable",
    },
    account: {
        modelName: "accountsTable",
        // fields: {
        //     accountId: "accountCredentialId", // your renamed field
        // },
    },
    verification: {
        modelName: "verificationsTable",
    },
    experimental: {
        joins: true
    },
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        openAPI(),
        admin()
    ]
});

// Export type untuk TypeScript
export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user