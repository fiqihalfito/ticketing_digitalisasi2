import { table } from "@/database/tables";
import { spread } from "@/database/utils";
import { t, UnwrapSchema } from "elysia";


export const SubfieldModel = {
    SelectOneItemResponse: t.Array(t.Object(spread(table.subfieldsTable, "select"))),
    notFound: t.Object({
        code: t.Number(),
        message: t.String()
    })
} as const

// Optional, cast all model to TypeScript type
export type SubfieldModel = {
    [k in keyof typeof SubfieldModel]: UnwrapSchema<typeof SubfieldModel[k]>
}