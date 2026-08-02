import { t, type UnwrapSchema } from 'elysia'

export const AuthModel = {
    unauthorizedResponse: t.Object({
        code: t.Literal(401),
        error: t.Literal("Unauthorized"),
        message: t.Literal("Tidak terdaftar"),
    }),
    forbiddenResponse: t.Object({
        code: t.Literal(403),
        error: t.Literal("Forbidden"),
        message: t.String(),
    })
} as const

// Optional, cast all model to TypeScript type
export type AuthModel = {
    [k in keyof typeof AuthModel]: UnwrapSchema<typeof AuthModel[k]>
}