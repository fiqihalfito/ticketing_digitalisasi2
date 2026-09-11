import { betterAuth } from "better-auth";
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from '@better-auth/drizzle-adapter/relations-v2';
import { db } from "@/database/connect";
import * as schema from "@/database/schema";
import { Redis } from "ioredis";
import { redisStorage } from "@better-auth/redis-storage";

const redis = new Redis(Bun.env.REDIS_URL!);

export const auth = betterAuth({
    trustedOrigins: ["http://localhost:3001"],
    database: drizzleAdapter(db, {
        provider: 'pg', // or "pg" or "mysql"
        schema: {
            ...schema,
            user: schema.usersTable,
            account: schema.accountsTable,
            session: schema.sessionsTable,
            verification: schema.verificationsTable,
        },
    }),
    advanced: {
        database: {
            generateId: false,
            joins: true,
        }
    },
    secondaryStorage: redisStorage({
        client: redis,
        keyPrefix: "better-auth:", // optional, defaults to "better-auth:"
    }),
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
        },
    },
    account: {
        fields: {
            accountId: "providerAccountId"
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        openAPI(),
    ]
});

// for better auth x openapi
let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema())
export const OpenAPI = {
    getPaths: (prefix = '/api/auth') =>
        getSchema().then(({ paths }) => {
            const reference: typeof paths = Object.create(null)
            for (const path of Object.keys(paths)) {
                const key = prefix + path
                reference[key] = paths[path]
                for (const method of Object.keys(paths[path])) {
                    const operation = (reference[key] as any)[method]
                    operation.tags = ['Better Auth']
                }
            }
            return reference
        }) as Promise<any>,
    components: getSchema().then(({ components }) => components) as Promise<any>
} as const