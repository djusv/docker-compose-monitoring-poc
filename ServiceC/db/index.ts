import mongoose from "npm:mongoose@7.3.4";
import { Logger } from "../utils/logger.ts";

export function connect(app: any) {
  const options = {
    useNewUrlParser: true,
    user: Deno.env.get("MONGODB_USER") || "admin",
    pass: Deno.env.get("MONGODB_PASS") || "pass",
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  const connectWithRetry = () => {
    Logger.info("MongoDB connection with retry");
    const uri = Deno.env.get("MONGODB_URI") ||
      "mongodb://localhost:27017/sample_db";
    mongoose
      // @ts-ignore
      .connect(uri, options)
      .then(() => {
        Logger.info(`MongoDB is connected to ${uri}`);
      })
      .catch((err: any) => {
        Logger.info("MongoDB connection unsuccessful, retry after 2 seconds.");
        setTimeout(connectWithRetry, 2000);
      });
  };
  connectWithRetry();
}
