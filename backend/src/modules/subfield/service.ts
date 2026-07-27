import { db } from "@/database/connect";
import { subfieldsTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { status } from "elysia";
import type { SubfieldModel } from "./model"


export abstract class SubfieldService {
    static async getAll() {
        const allSubfields = await db.select().from(subfieldsTable)
        return allSubfields
    }

    static async getSubfieldById(id: string) {
        const subfield = await db.select().from(subfieldsTable).where(eq(subfieldsTable.subfieldId, id))

        if (subfield.length == 0) {
            throw status(404, {
                code: 404,
                message: "Subfield tidak ditemukan"
            } satisfies SubfieldModel["notFound"])
        }


        return subfield
    }

}