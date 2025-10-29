import express from 'express';
import upload  from '../Middlewares/uploadMiddleware.js';
import { createProductValidation, updateProductValidation } from '../Validators/productValidator.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productCtrls.js';
import { protect, admin } from '../Middlewares/authMiddleware.js';

const router = express.Router();


router.post('/createProducts', protect, admin, upload.single('image'),createProductValidation, createProduct);
router.get('/allProducts', getProducts);
router.get('/oneProduct/:id', getProductById);
router.put('/update/:id', protect, admin, upload.single('image'),updateProductValidation, updateProduct);
router.delete('/deleteproduct/:id', protect, admin, deleteProduct);

export default router;
