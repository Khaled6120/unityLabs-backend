import { check } from 'express-validator'
import validatorMiddleware from '../../middleware/validator.js'
import User from '../../models/user.js';

const signupValidator = [
    check('name')
        .notEmpty()
        .withMessage('name required')
        .isLength({ min: 3 })
        .withMessage('Too short firstname, +3 characters required'),


    check('email')
        .notEmpty()
        .withMessage('email required')
        .isEmail()
        .withMessage('Invalid email address format')
        .custom((val) =>
            User.findOne({ email: val }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('E-mail already exist'));
                }
            })
        ),

    check('password')
        .notEmpty()
        .withMessage('Please enter a password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters'),

    check('role')
        .notEmpty()
        .withMessage('Please enter a role')
        .custom((val) => {
            if (val !== 'buyer' && val !== 'seller') {
                throw new Error('Role must be either "buyer" or "seller"');
            }
            return true;
        }),

    validatorMiddleware,
];

const signinValidator = [
    check('email')
        .notEmpty()
        .withMessage('email required')
        .isEmail()
        .withMessage('Invalid email address format')
        .custom((val) =>
            User.findOne({ email: val }).then((user) => {
                if (!user) {
                    return Promise.reject(
                        new Error(
                            `Propably there is no an account associated with this email: ${val}, please sign up first!`
                        )
                    );
                }
            })
        ),

    check('password').notEmpty().withMessage('Please enter a password'),

    validatorMiddleware,
];

export { signupValidator, signinValidator };