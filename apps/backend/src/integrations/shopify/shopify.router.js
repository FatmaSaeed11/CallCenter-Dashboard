import express from "express";
import { shopifyWebhookHandler } from "./shopify.webhook.js";

export const shopifyRouter = express.Router();

// PUBLIC — DO NOT ADD AUTH
shopifyRouter.post("/webhook", shopifyWebhookHandler);
