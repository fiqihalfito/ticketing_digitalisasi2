import { Elysia } from "elysia";
import openapi from "@elysia/openapi";
import { cors } from '@elysia/cors'
import { subfield } from "./modules/subfield";
import { auth } from "./lib/auth";
import { OpenAPI } from "./lib/openAPI-auth";
import { authMiddleware } from "./modules/auth/middleware/better-auth";

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:5173', 'http://localhost:3001'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
  .mount("/auth", auth.handler)
  .use(authMiddleware)

  .group('/api', app => app
    .use(subfield)
  )
  .get('/user', ({ user }) => user, {
    auth: true
  })
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
