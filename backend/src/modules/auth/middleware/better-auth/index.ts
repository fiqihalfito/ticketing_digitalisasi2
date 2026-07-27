import { auth, type User } from "@/lib/auth"
import Elysia from "elysia"

// user middleware (compute user and session and pass to routes)
export const authMiddleware = new Elysia({ name: 'better-auth' })
    // .derive({ as: 'global' }, async ({ request, status }) => {
    //     const cookieHeader = request.headers.get('cookie')
    //     console.log('Cookie header received:', cookieHeader)
    //     const session = await auth.api.getSession({
    //         headers: request.headers
    //     })
    //     console.log('Session result:', session)
    //     if (!session) return status(401)
    //     return {
    //         user: session.user,
    //         session: session.session
    //     }
    // })

    // Macro definitions
    // .macro({
    //     // Macro 1: Require authenticated user
    //     auth: {
    //         async resolve({ user, status }) {
    //             if (!user) {
    //                 return status(401, {
    //                     error: 'Unauthorized',
    //                     message: 'Silakan login terlebih dahulu'
    //                 })
    //             }

    //             // Check if user is banned
    //             if (user.banned) {
    //                 return status(403, {
    //                     error: 'Forbidden',
    //                     message: 'Akun Anda telah diblokir',
    //                     reason: user.banReason
    //                 })
    //             }

    //             return { user }
    //         }
    //     },

    //     // Macro 2: Require specific role(s)
    //     role: (allowedRoles: string[]) => ({
    //         async resolve({ user, status }) {
    //             if (!user) {
    //                 return status(401, {
    //                     error: 'Unauthorized',
    //                     message: 'Silakan login terlebih dahulu'
    //                 })
    //             }

    //             if (user.banned) {
    //                 return status(403, {
    //                     error: 'Forbidden',
    //                     message: 'Akun Anda telah diblokir'
    //                 })
    //             }

    //             const userRole = user.role ?? 'kasir'

    //             if (!allowedRoles.includes(userRole)) {
    //                 return status(403, {
    //                     error: 'Forbidden',
    //                     message: `Akses ditolak. Role Anda: ${userRole}. Role yang diizinkan: ${allowedRoles.join(', ')}`
    //                 })
    //             }

    //             return { user }
    //         }
    //     })
    // })
    .macro({
        auth: {
            async resolve({ status, request: { headers } }) {
                const session = await auth.api.getSession({
                    headers,
                });
                if (!session) return status(401, "tidak terdaftar");
                return {
                    user: session.user,
                    session: session.session,
                };
            },
        },
    });