import { Elysia } from "elysia";
import { auth } from "./modules/auth/utils/auth";
import { openapi } from '@elysia/openapi'
import { OpenAPI } from './modules/auth/utils/auth'

const app = new Elysia()
  .mount(auth.handler)
  .get("/", () => "Hello Elysia")
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths()
      }
    })
  )
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
