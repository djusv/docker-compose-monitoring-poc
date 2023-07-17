import { Contact } from "./models/contacts/contact.ts";
import { Restaurant } from "./models/restaurants/restaurant.ts";
import { connect } from "./db/index.ts";

import { logger } from "./utils/logger.ts";
import { morganMiddleware } from "./middlewares/morgan.middleware.ts";

import Client from "prom-client";
const registry = new Client.Registry();

import { collectDefaultMetrics, metricsList } from "./defaultMetrics.ts";

collectDefaultMetrics({ register: registry });

// @deno-types="npm:@types/express@4.17.15"
import express from "express";
// @deno-types="npm:@types/express-actuator@1.8.0"
import actuator from "express-actuator";
import api_express_exporter from "api-express-exporter";
import multer from "multer";
// @deno-types="npm:@types/jsonwebtoken@latest"
import jwt from "jsonwebtoken";

const app = express();
const port = 3004;
const upload = multer({ dest: "./uploads" });

connect(app);

app.use(morganMiddleware);
app.use(api_express_exporter());
app.use(express.json());

app.use(actuator({
  basePath: "/actuator",
  customEndpoints: [
    {
      id: "prometheus",
      controller: async (_req, res) => {
        res.setHeader("Content-Type", registry.contentType);
        res.send(await registry.metrics());
      },
    },
  ],
}));

app.get("/metadata", (_req, res) => {
  res.status(200).json({ name: "serviceD" });
});

app.use("/", express.static("./static", { etag: false }));

app.post("/upload", upload.any(), (_req, res) => {
  res.sendStatus(201);
});

const jwtSecret = Deno.env.get("JWT_SECRET") ?? "secret-key";

function getToken(header: string | undefined) {
  if (header && header.startsWith("Bearer ")) {
    return header.split(" ")[1];
  }
}

app.get("/jwt", (req, res) => {
  const rcvdJwt = getToken(req.header("authorization")) ?? "";
  jwt.verify(rcvdJwt, jwtSecret, (err, decoded: any) => {
    if (err) {
      return res.status(401);
    } else {
      res.status(200).json({ name: decoded["name"] });
    }
  });
});

app.post("/jwt", (request, res) => {
  jwt.sign({ name: request.body.name }, jwtSecret, {
    expiresIn: "1d",
  }, (err, token) => {
    res.status(201).json({ token });
  });
});

app.get("/restaurants", (req, res) => {
  logger.info("finding restaurants");
  Restaurant.find()
    .then((restaurants) => {
      logger.info("found");
      res.status(200).json(restaurants);
    })
    .catch((e) => {
      logger.info("error: " + e);
      res.status(500);
    });
});

app.get("/contacts", (req, res) => {
  logger.info("finding contacts");
  Contact.find()
    .then((contacts) => {
      logger.info("found");
      res.status(200).json(contacts);
    })
    .catch((e) => {
      logger.info("error: " + e);
      res.status(500);
    });
});

app.on("ready", () => {
  app.listen(port, () => {
    logger.info(`App listening on port ${port}`);
  });
});
