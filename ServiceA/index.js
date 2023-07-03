const client = require('prom-client');
const register = new client.Registry();
client.collectDefaultMetrics({register});

const actuator = require('express-actuator');
const api_express_exporter = require("api-express-exporter");
const express = require('express')
const app = express()
const port = 3001

app.use(api_express_exporter());

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
