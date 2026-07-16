import Elysia from "elysia";


export const subfield = new Elysia({ prefix: '/subfield' })
    .get('/', async () => {
        return "all subbidangs"
    })