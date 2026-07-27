import { Elysia, t } from "elysia";
import { SubfieldService } from "./service";
import { authMiddleware } from "../auth/middleware/better-auth";
import { SubfieldModel } from "./model";


export const subfield = new Elysia({ prefix: '/subfield' })
    .use(authMiddleware)
    .get('/', async () => {
        const allSubfields = await SubfieldService.getAll()
        return allSubfields
    }, {
        auth: true,
        detail: {
            tags: ['Subbidang'],
            summary: 'Get all subfields'
        }
    })

    .get('/:id', async ({ params, status, user }) => {
        console.log(user)
        const subfield = await SubfieldService.getSubfieldById(params.id)
        return status(200, subfield)
    }, {
        auth: true,
        params: t.Object({
            id: t.String()
        }),
        response: {
            200: SubfieldModel.SelectOneItemResponse,
            404: SubfieldModel.notFound
        },
        detail: {
            tags: ['Subbidang'],
            // summary: 'Get a subfield by ID'
        }
    })