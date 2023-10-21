import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

import { AppError } from '../utils/apiError.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/user.js';


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) return next(new AppError(StatusCodes.BAD_REQUEST, 'User already exists'));

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        return next(new AppError(StatusCodes.BAD_REQUEST, 'Invalid user data'));
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const signinUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'User not found'));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        return next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password'));
    }
});


export {
    registerUser, signinUser
}