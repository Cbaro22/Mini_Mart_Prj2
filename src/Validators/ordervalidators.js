import { body } from 'express-validator';

export const createOrderValidation = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.name').notEmpty().withMessage('Item name is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('address').notEmpty().withMessage('Delivery address is required'),
];

export const updateOrderStatusValidation = [
  body('status')
    .isIn(['pending', 'processing', 'completed', 'cancelled'])
    .withMessage('Invalid order status'),
];
