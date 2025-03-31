import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DEV_DATABASE_URL;
app.use(cors());
app.use(express.json());
app.listen(PORT, ()=>{
    console.log('app is listening at ${PORT}')
});
