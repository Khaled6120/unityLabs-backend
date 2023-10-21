import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/apiError.js';
import User from '../models/user.js';
import Catalog from '../models/catalog.js';



// @desc    Create a catalog for a seller
// @route   POST /api/seller/create-catalog
// @access  ONLY SELLERS
const createCatalog = asyncHandler(async (req, res, next) => {

    // TODO: seller id must be taken from the token (not from the request body)
    const { sellerId, name, price } = req.body;

    // Check if seller exists
    const seller = await User.findById(sellerId);
    if (!seller) {
        return next(new AppError(StatusCodes.NOT_FOUND, 'Seller not found'));
    }

    // Find existing catalog for the seller
    const existingCatalog = await Catalog.findOne({ seller: sellerId });

    // If catalog exists, add the new product to the existing products array
    if (existingCatalog) {
        existingCatalog.products.push({ name, price });
        await existingCatalog.save();
        res.status(StatusCodes.OK).json({ success: true, catalog: existingCatalog });
    } else {
        // If catalog does not exist, create a new catalog with the new product
        const products = [{ name, price }];
        const catalog = await Catalog.create({ seller: sellerId, products });
        res.status(StatusCodes.CREATED).json({ success: true, catalog });
    }
});

export { createCatalog };


