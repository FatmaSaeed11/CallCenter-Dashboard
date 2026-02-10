const Queue = require("bull");
const wifleetService = require("../integrations/wifleet/wifleet.service");
const { logger } = require("../../common/logger"); // Add structured logging later

// Create a Bull queue to handle integration jobs
const integrationQueue = new Queue("integration", {
    redis: {
        host: "redis",  // Ensure Redis host is configured properly
        port: 6379
    }
});

// Add job to the queue
exports.addIntegrationJob = async (order) => {
    await integrationQueue.add("send-order", { order }, {
        attempts: 5,           // Retry 5 times if fails
        backoff: 1000,         // Delay 1s between retries
        timeout: 10000         // Timeout after 10 seconds
    });
};

// Process the job
integrationQueue.process("send-order", async (job) => {
    const { order } = job.data;

    try {
        // Call external service to send order to WiFleet
        await wifleetService.sendOrder(order);

        logger.info(`Order ${order._id} sent to WiFleet successfully`);

    } catch (err) {
        // Log error if failed
        logger.error(`Failed to send order ${order._id} to WiFleet: ${err.message}`);
        throw err;  // Re-throw to allow retries
    }
});

// Optional: Log completed job info (to track successful jobs)
integrationQueue.on('completed', (job, result) => {
    logger.info(`Job ${job.id} completed with result: ${result}`);
});

// Optional: Log failed job info (for monitoring & alerts)
integrationQueue.on('failed', (job, err) => {
    logger.error(`Job ${job.id} failed with error: ${err.message}`);
});

// Optional: Limit concurrency to avoid overloading WiFleet (useful for rate-limited APIs)
integrationQueue.process("send-order", 3, async (job) => {
    // Limit concurrent jobs to 3
    const { order } = job.data;
    try {
        await wifleetService.sendOrder(order);
        console.log(`Order ${order._id} sent to WiFleet`);
    } catch (err) {
        console.error(`Failed to send order ${order._id} to WiFleet: ${err.message}`);
        throw err;
    }
});
