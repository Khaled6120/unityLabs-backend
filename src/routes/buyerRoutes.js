import express from 'express';
import { getListOfSellers, getSellerCatalog } from '../controllers/buyer.js';

const router = express.Router();

router.get('/list-of-sellers', getListOfSellers);
router.get('/seller-catalog/:seller_id', getSellerCatalog);



export default router