import { treaty } from "@elysia/eden"
import type { App } from "@ticketing/backend"

export const api = treaty<App>("http://localhost:3001")