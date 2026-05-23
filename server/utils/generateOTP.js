/**
 * generateOTP — return a random 6-digit string (100000–999999).
 * Always 6 digits, no leading zeros, returned as a string.
 */
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export default generateOTP;
