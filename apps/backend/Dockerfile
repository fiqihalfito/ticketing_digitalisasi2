FROM oven/bun:1 AS build

WORKDIR /app

# Cache packages
COPY package.json package.json
COPY bun.lock bun.lock

COPY /apps/backend/package.json ./apps/backend/package.json
# COPY /packages/config/package.json ./packages/config/package.json

# RUN bun install
RUN bun install --frozen-lockfile

COPY /apps/backend ./apps/backend
# COPY /packages/config ./packages/config

ENV NODE_ENV=production

RUN bun --bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --outfile server \
    ./apps/backend/src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3001