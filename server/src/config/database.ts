import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

mongoose.set("strictQuery", true);

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error({ err: error }, "MongoDB connection failed");
    throw error;
  }
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
}
