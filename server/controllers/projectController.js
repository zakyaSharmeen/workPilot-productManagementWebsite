import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

// ── Helper: attach full user objects to project.owner and project.members ─────
const populateProject = async (project) => {
  if (!project) return null;

  const allIds = [project.owner, ...project.members];
  const userDocs = await User.find({ _id: { $in: allIds } })
    .select("-password")
    .lean();
  const userMap = Object.fromEntries(
    userDocs.map((u) => [u._id.toString(), u]),
  );

  return {
    ...project,
    owner: userMap[project.owner.toString()] ?? project.owner,
    members: project.members.map((id) => userMap[id.toString()] ?? id),
  };
};

// ── POST /api/projects ────────────────────────────────────────────────────────
export const createProject = asyncHandler(async (req, res) => {
  const { title, description = "", status = "active" } = req.body;

  const project = await Project.create({
    title,
    description,
    status,
    owner: req.user._id,
    members: [req.user._id], // owner is always a member
  });

  res.status(201).json({
    success: true,
    project: await populateProject(project.toObject()),
  });
});

// ── GET /api/projects ─────────────────────────────────────────────────────────
export const getProjects = asyncHandler(async (req, res) => {
  const projectList = await Project.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }],
  })
    .sort({ createdAt: -1 })
    .lean();

  const populated = await Promise.all(projectList.map(populateProject));
  res.json({ success: true, count: populated.length, projects: populated });
});

// ── GET /api/projects/:id ─────────────────────────────────────────────────────
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).lean();

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const isMember = project.members.some(
    (m) => m.toString() === req.user._id.toString(),
  );
  if (!isMember) {
    res.status(403);
    throw new Error("You do not have access to this project");
  }

  res.json({ success: true, project: await populateProject(project) });
});

// ── PUT /api/projects/:id ─────────────────────────────────────────────────────
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).lean();

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Only the project owner can update this project");
  }

  const { title, description, status } = req.body;
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (status !== undefined) updates.status = status;

  const updated = await Project.findByIdAndUpdate(
    project._id,
    { $set: updates },
    { new: true, lean: true },
  );

  res.json({ success: true, project: await populateProject(updated) });
});

// ── DELETE /api/projects/:id ──────────────────────────────────────────────────
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).lean();

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Only the project owner can delete this project");
  }

  await Project.deleteOne({ _id: project._id });
  res.json({ success: true, message: "Project deleted successfully" });
});
