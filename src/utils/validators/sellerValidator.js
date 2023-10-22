import { check } from 'express-validator'
import validatorMiddleware from '../../middleware/validator.js'

const createCatalogValidator = [
    check('name')
        .notEmpty()
        .withMessage('name required')
        .isLength({ min: 3 })
        .withMessage('Too short product name, +3 characters required'),

    check('price')
        .notEmpty()
        .withMessage('Please enter a price')
        .isNumeric()
        .withMessage('Price must be a number'),



    validatorMiddleware,
];



export { createCatalogValidator };