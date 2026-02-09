import IORedis from "ioredis";
import { Queue } from "bullmq";

export const connection = new IORedis({
 host: process.env.REDIS_HOST,
 port: 6379
});

export const integrationQueue =
 new Queue("integrationQueue", { connection });
