import { Elysia, t } from "elysia";
import openapi from "@elysia/openapi";
import { cors } from '@elysia/cors'
import { subfield } from "./modules/subfield";
import { auth } from "./lib/auth";
import { OpenAPI } from "./lib/openAPI-auth";
import { betterAuth } from "./modules/auth/middleware/better-auth";

// const user = new Elysia()
//   .onError(({ code, status }) => {
//     if (code === "NOT_FOUND")
//       return 'uhe~ are you lost?'
//     return status(418, "My bad! But I'm cute so you'll forgive me, right?")
//   })
//   .use(openapi())
//   .get('/profile', ({ cookie: { visit, mortal } }) => {
//     visit.value ??= 0
//     visit.value++
//     // visit.remove()
//     return `You have visited ${visit.value} & ${mortal.value} times`
//   }, {
//     cookie: t.Cookie({
//       visit: t.Optional(t.Number()),
//       mortal: t.Optional(t.String())
//     })
//   })
//   .get('/settings', () => 'Settings')


const app = new Elysia()
  .use(betterAuth)
  .use(subfield)
  .use(openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    }
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
