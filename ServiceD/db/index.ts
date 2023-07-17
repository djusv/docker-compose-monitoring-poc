import mongoose from "mongoose";
import { logger } from "../utils/logger.ts";

export function connect(app: any) {
  const options = {
    useNewUrlParser: true,
    user: Deno.env.get("MONGODB_USER") || "admin",
    pass: Deno.env.get("MONGODB_PASS") || "pass",
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  const connectWithRetry = () => {
    logger.info("MongoDB connection with retry");
    const uri = Deno.env.get("MONGODB_URI") || "mongodb://localhost:27017/sample_db";
    mongoose
      // @ts-ignore
      .connect(uri, options)
      .then(() => {
        logger.info(`MongoDB is connected to ${uri}`);
        app.emit("ready");
      })
      .catch((err: any) => {
        logger.info("MongoDB connection unsuccessful, retry after 2 seconds.", err);
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
};
