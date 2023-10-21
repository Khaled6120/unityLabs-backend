
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import connectToDatabase from './db/connection.js';
import { StatusCodes } from 'http-status-codes';

import { AppError } from './utils/apiError.js';
import { errorHandlerMiddleware } from './utils/globalErrorHandler.js';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

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