import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import proyRoutes from "./routes/proyRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json())

dotenv.config();
conectDB();

// Config cors
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin,callback) {
        if(whitelist.includes(origin)) {
            // Can consult API
            callback(null, true);
        } else{
            // Not autorization
            callback(new Error("CORS Error"));
        }
    },
};


app.use(cors(corsOptions));
// Routing

app.use('/api/users', userRoutes);
app.use("/api/projects",proyRoutes)
app.use("/api/tasks",taskRoutes)

const PORT = process.env.PORT || 4000;


const server = app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io
import {Server} from 'socket.io'

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,

    }
});

io.on('connection', (socket) => {

    // Define socket io events
    socket.on('open project', (project) => {
        //console.log('From project',project);
        socket.join(project);
    });
    socket.on('new task', (task) => {
        const project = task.project;
        //console.log(project)
        socket.to(project).emit('added task', task)
    });
    socket.on('delete task', task => {
        //console.log(task)
        const project = task.project;
        //console.log(project)
        socket.to(project).emit('deleted task', task)
    });
    socket.on('update task', (task) => {
        const project = task.project._id;
        socket.to(project).emit('updated task', task);
    }); 
    socket.on('change state', (task) => {
        const project = task.project._id
        socket.to(project).emit('new state', task);
    })
});