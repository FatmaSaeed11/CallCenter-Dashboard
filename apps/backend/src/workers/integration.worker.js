import Queue from "bull";
import wifleetService from "../integrations/wifleet/wifleet.service.js";

// Create queue
const integrationQueue = new Queue("integration", {
    redis: {
        host: "redis",
        port: 6379,
    },
});

// Add job
export const addIntegrationJob = async (order) => {
    await integrationQueue.add(
        "send-order",
        { order },
        {
            attempts: 5,
            backoff: 1000,
            timeout: 10000,
            removeOnComplete: true, // prevents memory leaks
            removeOnFail: false, // keep failed jobs for debugging
        }
    );
};

// Only register processor and logging if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    integrationQueue.process("send-order", 3, async (job) => {
        const { order } = job.data;
        await wifleetService.sendOrder(order);
        console.log(`✅ Order ${order._id} sent to WiFleet`);
    });

    integrationQueue.on("completed", (job) => {
        console.log(`✅ Job ${job.id} completed`);
    });

    integrationQueue.on("failed", (job, err) => {
        console.error(`❌ Job ${job.id} failed: ${err.message}`);
    });
}
