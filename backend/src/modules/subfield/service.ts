import { db } from "@/database/connect";
import { subfieldsTable } from "@/database/schema";


export abstract class Subfield {
    static async getAll() {
        const allSubfields = await db.select().from(subfieldsTable)
        return allSubfields
    }

}