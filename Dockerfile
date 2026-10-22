FROM node:24.15.0-alpine AS build

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.12.3 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build /app/dist/nttdata/browser/ /usr/share/nginx/html/
