import express from 'express';
import dotenv from 'dotenv';
import conectarDB from "./config/db.js"

import userRoutes from "./routes/userRoutes.js"

const app = express();
app.use(express.json())

dotenv.config();
conectarDB();

// Routing

app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})