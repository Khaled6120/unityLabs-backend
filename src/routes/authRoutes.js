import express from 'express';
import { signinUser, registerUser } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', signinUser);


export default router