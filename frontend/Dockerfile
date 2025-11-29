FROM node:22 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable
RUN yarn install

COPY vite.config.ts tsconfig*.json index.html tailwind*.ts ./
COPY src ./src
COPY public ./public

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN yarn build

FROM nginx:alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
