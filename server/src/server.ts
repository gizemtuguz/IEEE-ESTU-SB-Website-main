import http from "node:http";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { logger } from "./utils/logger.js";

const port = env.PORT;
let server: http.Server;

// Export for Vercel serverless
export default app;

async function bootstrap() {
  await connectDatabase();

  server = app.listen(port, () => {
    logger.info(`API server listening on port ${port}`);
  });
}

// Only start server if not in Vercel environment
if (process.env.VERCEL !== "1") {
  bootstrap().catch((error) => {
    logger.error({ err: error }, "Failed to start server");
    process.exit(1);
  });
}

async function gracefulShutdown(signal: string) {
  logger.info({ signal }, "Shutting down gracefully");
  if (server) {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  }
  await disconnectDatabase();
  process.exit(0);
}

process.on("SIGINT", () => void gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => void gracefulShutdown("SIGTERM"));
