import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: "redis"
});

export const integrationQueue =
  new Queue("integrations", { connection });
