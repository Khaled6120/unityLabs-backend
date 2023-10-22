import express from 'express';
import { createCatalog, getAllOrders } from '../controllers/seller.js';
import { protect, allowedTo } from '../middleware/authorization.js';

const router = express.Router();

router.post('/create-catalog', protect, allowedTo(['seller']), createCatalog);
router.get('/orders', protect, allowedTo(['seller']), getAllOrders);



export default router