import express from "express";
import { shopifyWebhookHandler } from "./shopify.webhook.js";

export const router = express.Router();

// PUBLIC — DO NOT ADD AUTH
router.post("/webhook", shopifyWebhookHandler);
