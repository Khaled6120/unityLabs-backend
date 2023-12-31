
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';

import { AppError } from './utils/apiError.js';
import { errorHandlerMiddleware } from './utils/globalErrorHandler.js';
import connectToDatabase from './db/connection.js';

import authRoutes from './routes/authRoutes.js';
import buyerRoutes from './routes/buyerRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());


// API Routes
app.use('/api/auth/', authRoutes);
app.use('/api/buyer/', buyerRoutes);
app.use('/api/seller/', sellerRoutes);

connectToDatabase();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Distribution API' }));

// generating error for undefined routes
app.all('*', (req, res, next) => {
    next(
        new AppError(
            StatusCodes.BAD_REQUEST,
            `This route: ${req.originalUrl} is not exist!`
        )
    );
});

// a global error middleware that catch errors and present them in a structured way.
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

process.on('unhandledRejection', (reason) => {
    console.error(`Unhandled Rejection: ${reason.message || reason}`);
});

export default app;