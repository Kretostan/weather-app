FROM node:22 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable
RUN yarn install --frozen-lockfile

FROM deps AS dev
WORKDIR /app
COPY . .
EXPOSE 5173
CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "5173"]

FROM deps AS build
WORKDIR /app
COPY . .
RUN yarn build

FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
