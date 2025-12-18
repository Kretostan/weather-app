FROM node:22 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps AS dev
COPY . .
EXPOSE 3001
CMD ["yarn", "dev"]

FROM deps AS build
WORKDIR /app
COPY . .
RUN yarn build

FROM node:22 AS prod
WORKDIR /app
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["yarn", "start"]
