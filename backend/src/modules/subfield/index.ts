import Elysia from "elysia";
import { Subfield } from "./service";


export const subfield = new Elysia({ prefix: '/subfield' })
    .get('/', async () => {
        const allSubfields = await Subfield.getAll()
        return allSubfields
    })