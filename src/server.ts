import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import {logger,errorlogger} from "./loder";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`Database is connected successfully`);

    app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });

  } catch (error) {
    errorlogger.error(`Failed to connection database`, error);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();
