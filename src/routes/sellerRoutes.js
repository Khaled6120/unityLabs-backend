import express from 'express';
import { createCatalog } from '../controllers/seller.js';

const router = express.Router();

router.post('/create-catalog', createCatalog);



export default router