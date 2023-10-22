import express from 'express';
import { createCatalog, getAllOrders } from '../controllers/seller.js';
import { protect, allowedTo } from '../middleware/authorization.js';
import { createCatalogValidator } from '../utils/validators/sellerValidator.js';

const router = express.Router();

router.post('/create-catalog', protect, allowedTo(['seller']), createCatalogValidator, createCatalog);
router.get('/orders', protect, allowedTo(['seller']), getAllOrders);



export default router