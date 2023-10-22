import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/apiError.js';
import User from '../models/user.js';
import Catalog from '../models/catalog.js';
import Order from '../models/order.js';



// @desc    Create a catalog for a seller
// @route   POST /api/seller/create-catalog
// @access  ONLY SELLERS
const createCatalog = asyncHandler(async (req, res, next) => {

    const { name, price } = req.body;
    const loggedInUser = req.user;

    // Find existing catalog for the seller
    const existingCatalog = await Catalog.findOne({ seller: loggedInUser._id });

    // If catalog exists, add the new product to the existing products array
    if (existingCatalog) {
        existingCatalog.products.push({ name, price });
        await existingCatalog.save();
        res.status(StatusCodes.OK).json({ success: true, catalog: existingCatalog });
    } else {
        // If catalog does not exist, create a new catalog with the new product
        const products = [{ name, price }];
        const catalog = await Catalog.create({ seller: loggedInUser._id, products });
        res.status(StatusCodes.CREATED).json({ success: true, catalog });
    }
});


// @desc    Get All orders belong to a seller
// @route   GET /api/seller/orders
// @access  ONLY SELLERS
const getAllOrders = asyncHandler(async (req, res, next) => {
    const loggedInUser = req.user;

    // Find all orders belonging to the logged-in seller
    const orders = await Order.find({ seller: loggedInUser._id })

    res.status(StatusCodes.OK).json({ success: true, order_Number: orders.length, orders });
});

export { createCatalog, getAllOrders };


