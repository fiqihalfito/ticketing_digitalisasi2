import * as schema from "./schema"

export const table = {
    ...schema
} as const

export type Table = typeof table