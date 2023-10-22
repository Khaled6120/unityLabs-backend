import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/apiError.js';
import User from '../models/user.js';
import Catalog from '../models/catalog.js';
import Order from '../models/order.js';


// @desc    Get a list of all sellers
// @route   Get /api/buyer/list-of-sellers
// @access  buyers
const getListOfSellers = asyncHandler(async (req, res) => {
    const sellers = await User.find({ role: 'seller' }, { name: 1, email: 1, _id: 1 });
    if (!sellers) {
        return next(new AppError(StatusCodes.NOT_FOUND, 'No sellers found'));
    }
    res.status(StatusCodes.OK).json(sellers);
});

// @desc    Get the catalog of a seller by seller_id
// @route   Get /api/buyer/seller-catalog/:seller_id
// @access  buyer
const getSellerCatalog = asyncHandler(async (req, res) => {
    const seller = await User.findById(req.params.seller_id);
    if (seller.role !== 'seller') return next(new AppError(StatusCodes.NOT_FOUND, 'This is not a valid seller ID'));

    // TODO: check if the seller has any products in their catalog
    const catalog = await Catalog.find({ seller: seller._id }, { products: 1 });
    res.status(StatusCodes.OK).json(catalog);
});

// @desc    Create order
// @route   Post /api/buyer/create-order/:seller_id
// @access  buyer
const createOrder = asyncHandler(async (req, res, next) => {

    const { seller_id } = req.params;
    const { items } = req.body;

    // Check if seller exists
    const seller = await User.findById(seller_id);
    if (!seller || seller.role !== 'seller') {
        return next(new AppError(StatusCodes.NOT_FOUND, 'This is not a valid seller ID'));
    }
    // find seller's catalog
    const sellerCatalog = await Catalog.findOne({ seller: seller_id });

    // Check if seller has any products in their catalog
    if (!sellerCatalog.products.length || !items.length) {
        return next(new AppError(StatusCodes.BAD_REQUEST, 'No products in the catalog or no items in the order'));
    }

    // Check if all items belong to the same seller
    const itemSellers = new Set(items.map(item => sellerCatalog.products.find(product => product.name.toUpperCase() === item.name.toUpperCase())));
    itemSellers.delete(undefined);
    if (items.length !== itemSellers.size) {
        console.log(items.length, itemSellers.size)
        return next(new AppError(StatusCodes.BAD_REQUEST, 'All items should belong to the same sellerr'));
    }

    // Calculate total price
    const totalPrice = items.reduce((total, item) => {
        const product = sellerCatalog.products.find(product => product.name.toUpperCase() === item.name.toUpperCase());
        return total + product.price
    }, 0);

    // Create the order
    const order = new Order({
        buyer: req.user._id,
        seller: seller_id,
        products: items.map(item => ({
            name: item.name,
        })),
        totalPrice
    });

    await order.save();

    res.status(StatusCodes.CREATED).json(order);
});

export { getListOfSellers, getSellerCatalog, createOrder };
