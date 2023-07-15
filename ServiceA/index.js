const logger = require("./utils/logger");
const morganMiddleware = require("./middlewares/morgan.middleware");

const client = require('prom-client');
const register = new client.Registry();
client.collectDefaultMetrics({register});

const actuator = require('express-actuator');
const api_express_exporter = require("api-express-exporter");
const express = require('express');
const multer = require("multer");
const jwt = require("jsonwebtoken");

const app = express()
const port = 3001

app.use(morganMiddleware);

const upload = multer({ dest: "./uploads" });

app.use(api_express_exporter());
app.use(express.json());

app.use(actuator({
  basePath: '/actuator',
  customEndpoints: [
    {
      id: 'prometheus',
      controller: async (req, res) => {
        res.setHeader('Content-Type', register.contentType);
        res.send(await register.metrics());
      }
    }
  ]
}));

app.get('/metadata', (req, res) => {
  res.status(200).json({ name: "serviceA" });
})

app.use("/", express.static("./static", {etag: false}))

app.post("/upload", upload.any(), (req, res) => {
  res.sendStatus(201);
});

const jwtSecret = process.env.JWT_SECRET ?? "secret-key";

function getToken(authHdr) {
  if (authHdr && authHdr.startsWith("Bearer ")) {
    return authHdr.split(" ")[1];
  }
}

app.get('/jwt', (req, res) => {
  const rcvdJwt = getToken(req.header("Authorization"));
  jwt.verify(rcvdJwt, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401);
    }
    return res.status(200).json({name: decoded['name']});
  });
});

app.post('/jwt', (request, res) => {
  jwt.sign({ name: request.body.name }, jwtSecret, {
    expiresIn: "1d",
  }, (err, token) => {
    res.status(201).json({ token });
  });
});

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
})
