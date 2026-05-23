import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

/**
 * protect — verify the Bearer JWT and attach the user document to req.user.
 * Apply to any route that requires a logged-in user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorised — no token provided');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password').lean();

  if (!user) {
    res.status(401);
    throw new Error('Not authorised — user no longer exists');
  }

  req.user = user;
  next();
});

/**
 * adminOnly — restrict a route to admin users only.
 * Must be used AFTER protect so req.user is already set.
 */
export const adminOnly = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.status(403);
  throw new Error('Forbidden — admin access required');
};
