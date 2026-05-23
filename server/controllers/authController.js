import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import generateOTP from '../utils/generateOTP.js';
import User from '../models/User.js';
import OtpVerification from '../models/OtpVerification.js';
import { sendOTPEmail } from '../mails/emailService.js';

// ── POST /api/auth/register ───────────────────────────────────────────────────
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409);
    throw new Error('An account with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: { url: '', publicId: '' },
    role: 'user',
    isVerified: false,
  });

  const otp = generateOTP();
  const expiresMinutes = parseInt(process.env.OTP_EXPIRES_MINUTES, 10) || 10;
  await OtpVerification.create({
    userId: newUser._id,
    otp,
    expiresAt: new Date(Date.now() + expiresMinutes * 60 * 1000),
  });

  await sendOTPEmail({ name, email }, otp);

  res.status(201).json({
    success: true,
    message: 'Registration successful. Check your email for the OTP.',
    userId: newUser._id,
  });
});

// ── POST /api/auth/verify-otp ─────────────────────────────────────────────────
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email }).lean();
  if (!user) { res.status(404); throw new Error('User not found'); }
  if (user.isVerified) { res.status(400); throw new Error('Email already verified'); }

  const otpRecord = await OtpVerification.findOne({ userId: user._id }).lean();
  if (!otpRecord) {
    res.status(400);
    throw new Error('OTP not found or already used. Request a new one.');
  }
  if (otpRecord.expiresAt < new Date()) {
    await OtpVerification.deleteOne({ _id: otpRecord._id });
    res.status(400);
    throw new Error('OTP has expired. Request a new one.');
  }
  if (otpRecord.otp !== otp) {
    res.status(400);
    throw new Error('Invalid OTP');
  }

  await User.updateOne({ _id: user._id }, { $set: { isVerified: true } });
  await OtpVerification.deleteOne({ _id: otpRecord._id });

  res.json({
    success: true,
    message: 'Email verified. You are now logged in.',
    token: generateToken(user._id.toString()),
    user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
  });
});

// ── POST /api/auth/resend-otp ─────────────────────────────────────────────────
export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).lean();
  if (!user) { res.status(404); throw new Error('User not found'); }
  if (user.isVerified) { res.status(400); throw new Error('Email already verified'); }

  await OtpVerification.deleteMany({ userId: user._id });

  const otp = generateOTP();
  const expiresMinutes = parseInt(process.env.OTP_EXPIRES_MINUTES, 10) || 10;
  await OtpVerification.create({
    userId: user._id,
    otp,
    expiresAt: new Date(Date.now() + expiresMinutes * 60 * 1000),
  });

  await sendOTPEmail(user, otp);
  res.json({ success: true, message: 'A new OTP has been sent to your email.' });
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Fetch WITH password — needed to compare hashes
  const user = await User.findOne({ email }).lean();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  if (!user.isVerified) {
    res.status(403);
    throw new Error('Please verify your email before logging in');
  }

  res.json({
    success: true,
    token: generateToken(user._id.toString()),
    user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
  });
});
