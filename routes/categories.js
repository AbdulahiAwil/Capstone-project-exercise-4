import express from 'express'
import { protect } from '../middlewares/auth.js';
import { listCategories } from '../controller/transaction.js';

const router = express.Router()

router.get('/', protect, listCategories)



export default router;