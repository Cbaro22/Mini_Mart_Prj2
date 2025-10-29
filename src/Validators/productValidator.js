import { body, param } from 'express-validator';

export const createProductValidation = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters long'),

  body('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('image')
    .optional()
    .isURL()
    .withMessage('Image must be a valid URL'),

  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a positive number'),

  body('category')
    .notEmpty()
    .withMessage('Category ID is required')
    .isMongoId()
    .withMessage('Invalid category ID format')
];

export const updateProductValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID'),

  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters long'),

  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),

  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a positive number'),

  body('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category ID')
];
