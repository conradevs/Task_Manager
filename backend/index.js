import express from 'express';
import dotenv from 'dotenv';
import conectarDB from "./config/db.js"

const app = express();

dotenv.config();
conectarDB();

const PORT = process.env.PORT || 4000;

app.listen(4000,() => {
    console.log("Server running on port 4000");
})