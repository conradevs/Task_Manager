import express from 'express';
import dotenv from 'dotenv';
import conectarDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import proyRoutes from "./routes/proyRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = express();
app.use(express.json())

dotenv.config();
conectarDB();

// Routing

app.use('/api/users', userRoutes);
app.use("/api/projects",proyRoutes)
app.use("/api/tasks",taskRoutes)

const PORT = process.env.PORT || 4000;


app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})