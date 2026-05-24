import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

// ── POST /api/auth/register ───────────────────────────────────────────────────
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409);
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: { url: "", publicId: "" },
    role: "user",
    isVerified: true,
  });

  res.status(201).json({
    success: true,
    token: generateToken(newUser._id.toString()),
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      role: newUser.role,
    },
  });
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Fetch WITH password — needed to compare hashes
  const user = await User.findOne({ email }).lean();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (!user.isVerified) {
    res.status(403);
    throw new Error("Please verify your email before logging in");
  }

  res.json({
    success: true,
    token: generateToken(user._id.toString()),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  });
});
