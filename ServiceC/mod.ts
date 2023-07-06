import { Application, Router, send } from "https://deno.land/x/oak@v12.5.0/mod.ts";

// @deno-types="npm:@types/jsonwebtoken@latest"
import jwt from "npm:jsonwebtoken@9.0.1";

import Client from "npm:prom-client@14.2.0";
const registry = new Client.Registry();

import { collectDefaultMetrics, metricsList } from "./defaultMetrics.ts";

collectDefaultMetrics({ register: registry });

const app = new Application();
const router = new Router();

router.get("/metadata", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = { name: "serviceC" };
});

router.get("/actuator/prometheus", async (ctx) => {
  ctx.response.headers.set("Content-Type", registry.contentType);
  ctx.response.body = await registry.metrics();
});

const baseDir = "./uploads";
router.post("/upload", async (ctx) => {
  const body = ctx.request.body();
  if (body.type === "form-data") {
    const value = body.value;
    await value.read({
      outPath: baseDir,
    });
  }
  ctx.response.status = 201;
});

const jwtSecret = Deno.env.get("JWT_SECRET") ?? "secret-key";

function getToken(header: string | undefined) {
  if (header && header.startsWith("Bearer ")) {
    return header.split(" ")[1];
  }
}

router.get('/jwt', (ctx) => {
  const rcvdJwt = getToken(ctx.request.headers.get("authorization") ?? "") ?? "";
  jwt.verify(rcvdJwt, jwtSecret, (err, decoded: any) => {
    if (err) {
      return ctx.response.status = 401;
    } else {
      ctx.response.status = 200;
      ctx.response.body = {name: decoded['name']};
    }
  });
})

router.post('/jwt', async (context) => {
  const body = await context.request.body().value
  await new Promise((resolve, reject) => {
    jwt.sign({ name: body.name }, jwtSecret, {
      expiresIn: "1d",
    }, (err, token) => {
      if (err) {
        context.response.status = 401;
        reject();
      } else {
        context.response.body = {token};
        context.response.status = 201;
        resolve(0);
      }
    })
  });
});


app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `./static`,
    index: "index.html",
  });
});

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen({ port: 3003 });
