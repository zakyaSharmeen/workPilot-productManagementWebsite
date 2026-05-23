import jwt from 'jsonwebtoken';

/**
 * generateToken — sign a JWT containing the user's _id.
 * @param {string} id — MongoDB ObjectId as a string
 * @returns {string}  — signed JWT
 */
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

export default generateToken;
