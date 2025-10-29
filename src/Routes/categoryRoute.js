import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/categoryCtrls.js';
import {
  createCategoryValidation,
  updateCategoryValidation
} from '../validators/categoryValidator.js';
import { protect, admin } from '../Middlewares/authMiddleware.js';

const router = express.Router();


router.get('/allCategory', getAllCategories);
router.get('/getCategory/:id', getCategoryById);


router.post('/createCategory', protect, admin, createCategoryValidation, createCategory);
router.put('/updateCategory/:id', protect, admin, updateCategoryValidation, updateCategory);
router.delete('/deleteCat/:id', protect, admin, deleteCategory);

export default router;
