import express from "express";
import  "dotenv/config";
import cors from "cors";
import { connectToMongoDB } from "./connection.js";
import AuthRouter from "./routes/AuthRoutes.js";

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
connectToMongoDB(); 
app.use("/auth", AuthRouter)


app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
});
