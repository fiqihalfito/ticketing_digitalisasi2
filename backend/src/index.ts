import { Elysia, t } from "elysia";
import openapi from "@elysia/openapi";
import { subfield } from "./modules/subfield";

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
  .use(subfield)
  .use(openapi())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
