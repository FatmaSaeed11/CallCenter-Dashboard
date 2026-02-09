import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { createOdooOrder } from "../services/odoo.js";
import { sendToWifleet } from "../services/wifleet.js";
import Order from "../modules/order.js";

new Worker("integrationQueue", async job=>{

 const order = await Order.findById(job.data.orderId);

 if(job.name==="odoo")
   await createOdooOrder(order);

 if(job.name==="wifleet")
   await sendToWifleet(order);

},{
 connection,
 attempts:5,
 backoff:{type:"exponential",delay:5000}
});
