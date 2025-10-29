import { body } from 'express-validator';

export const createCategoryValidation = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
];

export const updateCategoryValidation = [
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be true or false'),
];
