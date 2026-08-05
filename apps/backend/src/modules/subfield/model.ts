import { dbModel } from "@/database/model";
import { table } from "@/database/tables";
import { spread } from "@/database/utils";
import { createSelectSchema } from "drizzle-typebox";
import { t, type UnwrapSchema } from "elysia";

const {
    subfieldModel: SubfieldSelect
} = dbModel.select

const {
    subfieldModel: SubfieldInsert
} = dbModel.insert



export const SubfieldModel = {
    notFound: t.Object({
        code: t.Number(),
        message: t.String()
    }),

    // select 
    // rule - sesuai nama endpoint
    // "endpoint" + Response => "endpointResponse"
    SelectOneItemResponse: t.Array(t.Object(spread(table.subfieldsTable, "select"))),
    dropdownResponse: t.Array(t.Object(SubfieldSelect))
} as const

// Optional, cast all model to TypeScript type
export type SubfieldModel = {
    [k in keyof typeof SubfieldModel]: UnwrapSchema<typeof SubfieldModel[k]>
}