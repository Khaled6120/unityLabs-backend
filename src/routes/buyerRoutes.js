import express from 'express';
import { getListOfSellers, getSellerCatalog } from '../controllers/buyer.js';
import { allowedTo, protect } from '../middleware/authorization.js';

const router = express.Router();

router.get('/list-of-sellers', protect, allowedTo(['buyer']), getListOfSellers);
router.get('/seller-catalog/:seller_id', protect, allowedTo(['buyer']), getSellerCatalog);



export default router