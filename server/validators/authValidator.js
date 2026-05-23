import { body, validationResult } from 'express-validator';

const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

export const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  runValidation,
];

export const loginValidator = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  runValidation,
];

// Used by resend-otp — validates email only
export const emailValidator = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  runValidation,
];

export const otpValidator = [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('otp')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be exactly 6 digits')
    .isNumeric().withMessage('OTP must contain only numbers'),
  runValidation,
];
