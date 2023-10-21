import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/apiError.js';
import User from '../models/user.js';
import Catalog from '../models/catalog.js';


// @desc    Get a list of all sellers
// @route   Get /api/buyer/list-of-sellers
// @access  Public
const getListOfSellers = asyncHandler(async (req, res) => {
    const sellers = await User.find({ role: 'seller' }, { name: 1, email: 1, _id: 1 });
    if (!sellers) {
        return next(new AppError(StatusCodes.NOT_FOUND, 'No sellers found'));
    }
    res.status(StatusCodes.OK).json(sellers);
});

// @desc    Get the catalog of a seller by seller_id
// @route   Get /api/buyer/seller-catalog/:seller_id
// @access  Public
const getSellerCatalog = asyncHandler(async (req, res) => {
    console.log(req.params.seller_id)
    const seller = await User.findById(req.params.seller_id);
    if (seller.role !== 'seller') return next(new AppError(StatusCodes.NOT_FOUND, 'This is not a valid seller ID'));

    // TODO: check if the seller has any products in their catalog
    const catalog = await Catalog.find({ seller: seller._id }, { products: 1 });
    res.status(StatusCodes.OK).json(catalog);
});

export { getListOfSellers, getSellerCatalog };
