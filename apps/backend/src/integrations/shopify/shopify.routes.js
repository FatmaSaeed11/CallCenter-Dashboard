import express from "express";
import { shopifyWebhookHandler } from "./shopify.webhook.js";

const router = express.Router();

// PUBLIC — DO NOT ADD AUTH
router.post("/webhook", shopifyWebhookHandler);

export default router;
