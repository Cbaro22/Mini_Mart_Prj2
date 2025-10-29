
 
import express from 'express';
import { protect, admin } from '../Middlewares/authMiddleware.js';
import { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder, 
  cancelOrder
} from '../controllers/orderCtrls.js';
import { createOrderValidation, updateOrderStatusValidation } from '../Validators/ordervalidators.js';

const router = express.Router();

router.post('/createOrder', protect, createOrderValidation, createOrder);
router.get('/allOrder', protect, admin, getAllOrders);
router.get('/order/:id', protect, getOrderById);
router.put('/update/:id/status', protect, updateOrderStatusValidation, updateOrderStatus);
router.delete('/deleteorder/:id', protect, admin, deleteOrder);
router.put('/cancelOrder/:id',protect, cancelOrder);

export default router;
