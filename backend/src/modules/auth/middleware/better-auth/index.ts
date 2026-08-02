import { auth, type User } from "@/modules/auth/lib/auth"
import Elysia from "elysia"
import type { AuthModel } from "../../model";

// user middleware (compute user and session and pass to routes)
export const authMiddleware = new Elysia({ name: 'better-auth' })
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await auth.api.getSession({
                    headers,
                });
                if (!session) {
                    return status(401, {
                        code: 401,
                        error: 'Unauthorized',
                        message: 'Tidak terdaftar'
                    } satisfies AuthModel['unauthorizedResponse'])
                };

                return {
                    user: session.user,
                    session: session.session,
                };
            },
        },
        role: (allowedRoles: string[]) => ({
            async resolve({ status, request: { headers } }) {

                const session = await auth.api.getSession({
                    headers,
                });

                const user = session?.user
                if (!user) {
                    return status(401, {
                        code: 401,
                        error: 'Unauthorized',
                        message: 'Tidak terdaftar'
                    } satisfies AuthModel['unauthorizedResponse'])
                }

                if (user.banned) {
                    return status(403, {
                        code: 403,
                        error: 'Forbidden',
                        message: 'Akun Anda telah diblokir'
                    } satisfies AuthModel['forbiddenResponse'])
                }

                const userRole = user.role ?? 'requester'

                if (!allowedRoles.includes(userRole)) {
                    return status(403, {
                        code: 403,
                        error: 'Forbidden',
                        message: `Akses ditolak. Role Anda: ${userRole}. Role yang diizinkan: ${allowedRoles.join(', ')}`
                    } satisfies AuthModel['forbiddenResponse'])
                }

                return { user }
            }
        })
    })