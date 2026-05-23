// import asyncHandler from "../utils/asyncHandler.js";
// import users from "../models/User.js";
// import tasks from "../models/Task.js";
// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Types;
// import cloudinary from "../config/cloudinary.js";

// // ── GET /api/users/me ─────────────────────────────────────────────────────────
// export const getProfile = asyncHandler(async (req, res) => {
//   // req.user is already attached by protect middleware (password excluded)
//   res.json({ success: true, user: req.user });
// });

// // ── PUT /api/users/me ─────────────────────────────────────────────────────────
// export const updateProfile = asyncHandler(async (req, res) => {
//   const { name, email } = req.body;
//   const updates = {};
//   if (name) updates.name = name;
//   if (email) updates.email = email;
//   updates.updatedAt = new Date();

//   const user = await users().findOneAndUpdate(
//     { _id: req.user._id },
//     { $set: updates },
//     { returnDocument: "after", projection: { password: 0 } },
//   );

//   res.json({ success: true, user });
// });

// // ── PUT /api/users/me/avatar ──────────────────────────────────────────────────
// export const uploadAvatar = asyncHandler(async (req, res) => {
//   if (!req.cloudinaryResult) {
//     res.status(400);
//     throw new Error("No image file uploaded");
//   }

//   // Delete old avatar from Cloudinary to avoid orphaned files
//   if (req.user.avatar?.publicId) {
//     await cloudinary.uploader.destroy(req.user.avatar.publicId);
//   }

//   const avatar = {
//     url: req.cloudinaryResult.secure_url,
//     publicId: req.cloudinaryResult.public_id,
//   };

//   await users().updateOne(
//     { _id: req.user._id },
//     { $set: { avatar, updatedAt: new Date() } },
//   );

//   res.json({ success: true, message: "Avatar updated", avatar });
// });

// // ── GET /api/users/me/tasks ───────────────────────────────────────────────────
// export const getAssignedTasks = asyncHandler(async (req, res) => {
//   // Find all tasks where the current user appears in the assignees array
//   const taskList = await tasks()
//     .find({ assignees: req.user._id })
//     .sort({ createdAt: -1 })
//     .toArray();

//   // Attach project info with a simple separate query (beginner-friendly vs $lookup)
//   const { projects } = await import("../models/Project.js");
//   const projectIds = [...new Set(taskList.map((t) => t.project.toString()))];
//   const projectDocs = await projects()
//     .find({ _id: { $in: projectIds.map((id) => new ObjectId(id)) } })
//     .toArray();
//   const projectMap = Object.fromEntries(
//     projectDocs.map((p) => [p._id.toString(), p]),
//   );

//   const enriched = taskList.map((t) => ({
//     ...t,
//     project: projectMap[t.project.toString()] ?? t.project,
//   }));

//   res.json({ success: true, count: enriched.length, tasks: enriched });
// });

import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// ── GET /api/users/me ─────────────────────────────────────────────────────────
export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

// ── PUT /api/users/me ─────────────────────────────────────────────────────────
export const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updates = {};
  if (name) updates.name = name;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, lean: true },
  ).select("-password");

  res.json({ success: true, user });
});

// ── PUT /api/users/me/avatar ──────────────────────────────────────────────────
export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.cloudinaryResult) {
    res.status(400);
    throw new Error("No image file uploaded");
  }

  if (req.user.avatar?.publicId) {
    await cloudinary.uploader.destroy(req.user.avatar.publicId);
  }

  const avatar = {
    url: req.cloudinaryResult.secure_url,
    publicId: req.cloudinaryResult.public_id,
  };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    { new: true, lean: true },
  ).select("-password");

  res.json({ success: true, message: "Avatar updated", user });
});

// ── GET /api/users/me/tasks ───────────────────────────────────────────────────
export const getAssignedTasks = asyncHandler(async (req, res) => {
  const taskList = await Task.find({ assignees: req.user._id })
    .sort({ createdAt: -1 })
    .lean();

  // Attach project info in one batched query
  const projectIds = [...new Set(taskList.map((t) => t.project.toString()))];
  const projectDocs = await Project.find({ _id: { $in: projectIds } }).lean();
  const projectMap = Object.fromEntries(
    projectDocs.map((p) => [p._id.toString(), p]),
  );

  const enriched = taskList.map((t) => ({
    ...t,
    project: projectMap[t.project.toString()] ?? t.project,
  }));

  res.json({ success: true, count: enriched.length, tasks: enriched });
});
