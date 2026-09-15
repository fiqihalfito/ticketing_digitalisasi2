import { api } from "@ticketing/lib"
import { authClient } from "./lib/auth-client"


export const authService = {
    async signIn(email: string, password: string) {
        const { data, error } = await authClient.signIn.email({
            email: email,
            password: password,
            callbackURL: "/dashboard"
        })
    },

    async getSession() {
        const session = await authClient.getSession()
        return session
    },

    async signOut() {
        await authClient.signOut()
    }
}