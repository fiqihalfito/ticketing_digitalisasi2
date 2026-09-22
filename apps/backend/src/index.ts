import { Elysia, t } from "elysia";
import { auth } from "./modules/auth/utils/auth";
import { openapi } from '@elysia/openapi'
import { OpenAPI } from './modules/auth/utils/auth'
import { cors } from "@elysia/cors"

const app = new Elysia()
  .use(
    cors({
      origin: [Bun.env.FRONTEND_URL!, Bun.env.FRONTEND_URL_PROD!],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .mount(auth.handler)
  .get("/", () => "Hello Elysia")
  .post("/test-auth-frontend", ({ body }) => {
    console.log("this is from frontend", body);
    console.log("elysia pass");

  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths()
      }
    })
  )
  .listen(3001);

export type App = typeof app

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
