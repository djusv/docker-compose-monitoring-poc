const mongoose = require("mongoose");
const logger = require("../utils/logger");

exports.connect = (app) => {
  const options = {
    useNewUrlParser: true,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  const connectWithRetry = () => {
    mongoose.Promise = global.Promise;
    logger.info("MongoDB connection with retry");
    const uri = process.env.MONGODB_URI;
    mongoose
      .connect(uri, options)
      .then(() => {
        logger.info(`MongoDB is connected to ${uri}`);
        app.emit("ready");
      })
      .catch((err) => {
        logger.info("MongoDB connection unsuccessful, retry after 2 seconds.", err);
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};
