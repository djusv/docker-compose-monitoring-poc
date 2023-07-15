FROM node:18.16-alpine3.17 as node
WORKDIR /app
COPY ./ ./
RUN yarn install

FROM node:18.16-alpine3.17 AS web
WORKDIR /webapp
COPY --from=node /app/ ./

EXPOSE 3001
CMD [ "node",  "/webapp/index.js" ]
