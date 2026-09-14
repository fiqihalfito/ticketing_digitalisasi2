import { treaty } from "@elysia/eden"
import type { App } from "@ticketing/elysia"

export const api = treaty<App>("http://localhost:3001")