import express from 'express';
import { createCatalog } from '../controllers/seller.js';
import { protect, allowedTo } from '../middleware/authorization.js';

const router = express.Router();

router.post('/create-catalog', protect, allowedTo(['seller']), createCatalog);



export default router