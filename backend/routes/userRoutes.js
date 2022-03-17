import express from "express";

const router = express.Router();
import {registration} from "../controllers/UserController.js"

// users auth, register and confirmation
router.post('/',registration); // creates a new user

export default router;