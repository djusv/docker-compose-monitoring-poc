FROM node:18.16-alpine3.17 as node
WORKDIR /app
COPY ./ ./
RUN yarn install

FROM nginx:1.24-alpine3.17 AS web

ENV LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8 TZ=UTC

RUN addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node
COPY --from=node:18-alpine /usr/local/bin/node /usr/local/bin/node
COPY --from=node:18-alpine /usr/local/include/node /usr/local/include/node
RUN ln -s /usr/local/bin/node /usr/local/bin/nodejs
COPY --from=node:18-alpine /usr/lib/libstdc++.so.6.0.30 /usr/lib/libstdc++.so.6.0.30
COPY --from=node:18-alpine /usr/lib/libgcc_s.so.1 /usr/lib/libgcc_s.so.1
RUN ln -s /usr/lib/libstdc++.so.6.0.30 /usr/lib/libstdc++.so.6

WORKDIR /webapp
COPY --from=node /app/ ./

EXPOSE 3001
CMD [ "node",  "/webapp/index.js" ]
