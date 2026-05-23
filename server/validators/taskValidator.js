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

export const taskValidator = [
  body('title').trim().notEmpty().withMessage('Task title is required')
    .isLength({ max: 150 }).withMessage('Title must be 150 characters or fewer'),
  body('project').isMongoId().withMessage('Valid project ID is required'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Max 1000 characters'),
  body('priority').optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority: low, medium, or high'),
  body('status').optional()
    .isIn(['todo', 'in-progress', 'review', 'completed'])
    .withMessage('Status: todo, in-progress, review, or completed'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
  body('assignees').optional().isArray().withMessage('Assignees must be an array'),
  body('assignees.*').optional().isMongoId().withMessage('Each assignee must be a valid user ID'),
  runValidation,
];
