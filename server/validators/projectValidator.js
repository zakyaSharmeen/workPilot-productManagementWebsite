// import { body, validationResult } from 'express-validator';

// const runValidation = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       success: false,
//       errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
//     });
//   }
//   next();
// };

// export const projectValidator = [
//   body('title').trim().notEmpty().withMessage('Project title is required')
//     .isLength({ max: 100 }).withMessage('Title must be 100 characters or fewer'),
//   body('description').optional().isLength({ max: 500 }).withMessage('Max 500 characters'),
//   body('status').optional()
//     .isIn(['active', 'on-hold', 'completed', 'archived'])
//     .withMessage('Status must be: active, on-hold, completed, or archived'),
//   runValidation,
// ];

import { body, validationResult } from "express-validator";

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

export const projectValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be 100 characters or fewer"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Max 500 characters"),
  body("status")
    .optional()
    .isIn(["active", "completed"])
    .withMessage("Status must be: active or completed"),
  runValidation,
];
