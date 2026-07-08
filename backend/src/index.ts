import { Elysia, t } from "elysia";
import openapi from "@elysia/openapi";

const user = new Elysia()
  .onError(({ code, status }) => {
    if (code === "NOT_FOUND")
      return 'uhe~ are you lost?'
    return status(418, "My bad! But I'm cute so you'll forgive me, right?")
  })
  .use(openapi())
  .get('/profile', ({ cookie: { visit, mortal } }) => {
    visit.value ??= 0
    visit.value++
    // visit.remove()
    return `You have visited ${visit.value} & ${mortal.value} times`
  }, {
    cookie: t.Cookie({
      visit: t.Optional(t.Number()),
      mortal: t.Optional(t.String())
    })
  })
  .get('/settings', () => 'Settings')


const app = new Elysia()
  .use(user)

  // .guard({
  //   beforeHandle: [
  //     ({ request, query: { name }, status }) => {
  //       if (!name) return status(401, "Unauthorized")
  //     },
  //     ({ query: { name } }) => {
  //       console.log(name)
  //     },
  //   ],
  //   afterResponse({ responseValue }) {
  //     console.log(responseValue)
  //   },
  //   query: t.Object({
  //     name: t.String()
  //   })
  // })
  .get('/', ({ status, set }) => {
    set.headers['x-powered-by'] = 'Elysia nih'
    return status(418)
  })
  .get("/subbidang", (context) => context.path)
  .get("/status", ({ status }) => status(409, "Conflict"))
  .get("/toElysia", ({ redirect }) => redirect("https://elysiajs.com"))
  .post("/user",
    ({ body: { name, age } }) => `Hello, my name is ${name} and I'm ${age} years old`,
    {
      body: t.Object({
        name: t.String(),
        age: t.Number()
      })
    })
  .get("/auth", ({ query: { name = 'anon' } }) => `Hello auth, my name is ${name}`)

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
