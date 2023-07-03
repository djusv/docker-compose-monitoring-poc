import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

import Client from "npm:prom-client@14.2.0";
const registry = new Client.Registry();

import { collectDefaultMetrics, metricsList } from "./defaultMetrics.ts";

collectDefaultMetrics({ register: registry });

const app = new Application();
const router = new Router();

router.get("/metadata", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = "{ name: \"serviceC\" }";
});

router.get("/actuator/prometheus", async (ctx) => {
  ctx.response.headers.set("Content-Type", registry.contentType);
  ctx.response.body = await registry.metrics();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen({ port: 3003 });
