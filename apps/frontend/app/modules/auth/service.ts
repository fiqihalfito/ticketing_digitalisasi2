import { api } from "@ticketing/lib"

export const authService = {
    async signIn(email: string, password: string) {
        await api["test-auth-frontend"].post({
            email: email, password: password
        })
    }
}