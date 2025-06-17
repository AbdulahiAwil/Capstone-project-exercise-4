import express from 'express'
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { uploadProfile } from '../controller/uploadProfile.js';

const router = express.Router();

router.post('/', protect, upload.single('file'), uploadProfile)


export default router