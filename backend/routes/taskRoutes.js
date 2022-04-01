import express from "express";

import {
    addTask,
    getTask,
    editTask,
    deleteTask,
    changeState
} from "../controllers/taskController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.post('/',checkAuth,addTask)
router.route('/:id')
    .get(checkAuth,getTask)
    .put(checkAuth,editTask)
    .delete(deleteTask);
router.post("/state/:id", checkAuth,changeState);

export default router;