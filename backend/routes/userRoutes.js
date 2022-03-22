import express from "express";

const router = express.Router();
import {registration,
    autenticate, 
    confirmation,
    forgotPassword,
    confirmToken,
    newPassword,
    profile
} from "../controllers/UserController.js";


import checkAuth from '../middleware/checkAuth.js'

// users auth, register and confirmation
router.post('/',registration); // creates a new user
router.post('/login',autenticate); // autenticates user
router.get('/confirmation/:token', confirmation);
// forgot password
router.post('/forgot-password', forgotPassword); // create token for new pass
router.route('/forgot-password/:token').get(confirmToken).post(newPassword); 
router.get('/profile',checkAuth, profile)

export default router;