import { db } from "@/database/connect";
import { betterAuth } from "better-auth/minimal";
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../database/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema,
        usePlural: true,

        // schema: {
        //     ...schema,
        //     user: schema.usersTable,
        //     session: schema.sessionsTable,
        //     account: schema.accountsTable,
        //     verification: schema.verificationsTable
        // }
    }),
    user: {
        modelName: "users",
    },
    session: {
        modelName: "sessions",
    },
    account: {
        modelName: "accounts",
        fields: {
            accountId: "account_credential_id"
        }
    },
    verification: {
        modelName: "verifications"
    },
    experimental: {
        joins: true
    },
    emailAndPassword: {
        enabled: true
    },
    plugins: [openAPI()]
});