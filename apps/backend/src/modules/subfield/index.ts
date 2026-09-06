import { Elysia, status, t } from "elysia";
import { SubfieldService } from "./service";
import { authMiddleware } from "../auth/middleware/better-auth";
import { SubfieldModel } from "./model";

export const subfield = new Elysia({ prefix: '/subfield' })
    .use(authMiddleware)
    .guard({
        detail: {
            tags: ['Subbidang']
        }
    })
    .get('/', {
        auth: true,
        detail: {
            summary: 'Get all subfields'
        }
    }, async () => {
        const allSubfields = await SubfieldService.getAll()
        return allSubfields
    })

    .get('/:id', {
        auth: true,
        params: t.Object({
            id: t.String()
        }),
        response: {
            200: SubfieldModel.SelectOneItemResponse,
            404: SubfieldModel.notFound
        },
        detail: {
            // summary: 'Get a subfield by ID'
        }
    }, async ({ params, status, user }) => {
        const subfield = await SubfieldService.getSubfieldById(params.id)
        return status(200, subfield)
    })

    .get('/dropdown', {
        auth: true,
    }, async () => {
        const dropdownData = await SubfieldService.getDropdown()
        return status(200, dropdownData)
    })