import { body, check } from 'express-validator'

export const validateAddProduct = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('stock')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),

    check('files').custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
            throw new Error('At least one image must be uploaded');
        }
        
        const allowedExtensions = /jpg|jpeg|png|gif/;
        const filesArray = Array.isArray(req.files) ? req.files : [req.files];
        
        filesArray.forEach(file => {
            if (!allowedExtensions.test(file.mimetype)) {
                throw new Error('Invalid file type. Only jpg, jpeg, png, and gif are allowed.');
            }
        });

        return true;
    })
];

export const validateEditProduct = [
    body('_id').notEmpty().withMessage('Product ID is required'),
    body('name').optional().notEmpty().withMessage('Product name is required'),
    body('description').optional().notEmpty().withMessage('Description is required'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('imagesToDelete').optional().isArray().withMessage('Images to delete must be an array'),
];

export const validateUserLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

export const validateUserSignUp = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];