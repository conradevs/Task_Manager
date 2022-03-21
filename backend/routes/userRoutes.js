import express from "express";

const router = express.Router();
import {registration, autenticate} from "../controllers/UserController.js"

// users auth, register and confirmation
router.post('/',registration); // creates a new user
router.post('/login',autenticate); // autenticates user
export default router;