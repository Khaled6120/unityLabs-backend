import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import dotenv from 'dotenv';

import { AppError } from '../utils/apiError.js';
import User from "../models/user.js";


dotenv.config();


/**
 * Middleware used to protect routes from unauthorized users
 */
const protect = asyncHandler(
    async (req, res, next) => {

        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(
                new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'You are not login, Please login to get access this route',
                )
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(
                new AppError(
                    StatusCodes.UNAUTHORIZED,
                    'The user that belong to this token does no longer exist'
                )
            );
        }

        req.user = currentUser;
        next();
    }
);


const allowedTo = (roles) => asyncHandler(
    async (req, res, next) => {
        const userRole = req.user?.role;
        if (!roles.includes(userRole)) {
            return next(
                new AppError(
                    StatusCodes.FORBIDDEN,
                    'You are not authorized to do this.'
                )
            );
        }
        next();
    }
);






export { protect, allowedTo };