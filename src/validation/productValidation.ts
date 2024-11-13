import { body } from 'express-validator';

export const validateProductTitle = [
    body('title').trim().isLength({ min: 3, max: 10 }).withMessage('Title must be between 3 and 10 characters'),
];
