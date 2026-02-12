import crypto from "crypto";
import Order from "../../modules/orders/order.model.js";

const verifyShopifyWebhook = (req) => {

   const hmac = req.get("X-Shopify-Hmac-Sha256");

   const hash = crypto
      .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET)
      .update(req.body, "utf8")
      .digest("base64");

   return hash === hmac;
};



export const shopifyWebhookHandler = async (req, res) => {

   // ✅ Verify origin
   if (!verifyShopifyWebhook(req)) {
      return res.status(401).send("Webhook verification failed");
   }

   const topic = req.get("X-Shopify-Topic");

   // body is RAW buffer → convert
   const payload = JSON.parse(req.body.toString());

   try {

      switch (topic) {

         // ⭐ ORDER CREATED
         case "orders/create":

            await Order.findOneAndUpdate(
               { "externalIds.shopify": payload.id },
               {
                  status: payload.cancelled_at ? "cancelled" : "completed",
                  syncStatus: "synced"
               },
               { upsert: false }
            );

            break;



         // ⭐ ORDER CANCELLED
         case "orders/cancelled":

            await Order.findOneAndUpdate(
               { "externalIds.shopify": payload.id },
               { status: "cancelled" }
            );

            break;



         // ⭐ ORDER UPDATED
         case "orders/updated":

            await Order.findOneAndUpdate(
               { "externalIds.shopify": payload.id },
               {
                  totalAmount: payload.total_price,
               }
            );

            break;
      }

      // ALWAYS respond fast
      res.status(200).send("Webhook processed");

   } catch (err) {

      console.error("Webhook error:", err);

      // still return 200 to avoid retries storm
      res.status(200).send("Error logged");
   }
};
