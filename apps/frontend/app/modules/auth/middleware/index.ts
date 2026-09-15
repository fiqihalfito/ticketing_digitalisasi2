import { redirect, type MiddlewareFunction } from "react-router"
import { authClient } from "../lib/auth-client"
import type { User } from "@/lib/types"
import { userContext } from "@/lib/context"

export const sessionCheck: MiddlewareFunction = async ({ request, context }, next) => {
    const session = await authClient.getSession()

    if (session.data === null) {
        throw redirect("/login")
    }

    const user: User = {
        email: session.data?.user.email || "tidak ada email",
        idUser: session.data?.user.id || "tidak ada id",
        name: session.data?.user.name || "tidak ada nama",
    }

    context.set(userContext, user)
    await next()
}

export const sessionOnLoginCheck: MiddlewareFunction = async ({ request, context }, next) => {
    const session = await authClient.getSession()


    if (session.data?.session.id) {
        console.log("ada session di logins");

        throw redirect("/dashboard")
    }

    await next()
}
