

// @desc    This middleware handles errors by sending a JSON response with the error message, status code, and stack trace.
export const errorHandlerMiddleware = (
    error,
    req,
    res,
    next
) => {
    const statusCode = error.statusCode || 500;

    res?.status(statusCode).json({
        data: null,
        success: false,
        error: true,
        message: error.message || 'Internal Server Error',
        status: statusCode,
        stack: error.stack,
    });
};