import { logger } from "../utils/logger.js";

type Job = () => Promise<void>;

const queue: Job[] = [];
let processing = false;

export function enqueueJob(job: Job) {
  queue.push(job);
  if (!processing) {
    void processQueue();
  }
}

async function processQueue() {
  processing = true;
  while (queue.length > 0) {
    const job = queue.shift();
    if (!job) {
      continue;
    }
    try {
      await job();
    } catch (error) {
      logger.error({ err: error }, "Background job failed");
    }
  }
  processing = false;
}
