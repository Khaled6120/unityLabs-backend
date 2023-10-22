import express from 'express';
import { signinUser, registerUser } from '../controllers/auth.js';
import { signupValidator, signinValidator } from '../utils/validators/authValidtor.js';

const router = express.Router();

router.post('/register', signupValidator, registerUser);

router.post('/login', signinValidator, signinUser);


export default router