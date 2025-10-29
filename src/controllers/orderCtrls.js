import { validationResult } from 'express-validator';
import * as orderService from '../Services/orderServices.js';
import { sendOrderEmail } from '../Utils/emailServices.js';

export const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const order = await orderService.createOrder(req.user._id, req.body);
    await sendOrderEmail(req.user.email, {
    name: req.user.name,
    orderId: order._id,
    totalAmount: order.totalAmount,
  })
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user);
    res.status(200).json({message:'Order successfully made',order});
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const updateOrderStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id; // from JWT middleware

    const order = await orderService.cancelOrderService(userId, orderId);

    res.status(200).json({
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteOrder = async (req, res) => {
  try {
    const result = await orderService.deleteOrder(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
