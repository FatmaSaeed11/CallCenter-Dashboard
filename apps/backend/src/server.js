import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {connectDB} from "./config/db.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(rateLimit({
 windowMs:15*60*1000,
 max:100
}));

app.get("/",(_,res)=>res.send("API Running"));

app.listen(5000,()=>console.log("Server running"));
