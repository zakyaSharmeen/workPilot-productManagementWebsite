import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { APIFeatures } from "../utils/apiFeatures.js";

// ── Private helpers ────────────────────────────────────────────────────────────

/** Verify the user is a member of the project; return the project doc. */
const assertProjectMember = async (projectId, userId, res) => {
  const project = await Project.findById(projectId).lean();
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const isMember = project.members.some(
    (m) => m.toString() === userId.toString(),
  );
  if (!isMember) {
    res.status(403);
    throw new Error("You do not have access to this project");
  }

  return project;
};

/** Fetch user docs for an array of id values (password excluded). */
const fetchUsers = async (ids) => {
  if (!ids || ids.length === 0) return [];
  return User.find({ _id: { $in: ids } })
    .select("-password")
    .lean();
};

/** Attach user objects to task.assignees and task.createdBy. */
const populateTask = async (task) => {
  if (!task) return null;
  const assignees = await fetchUsers(task.assignees || []);
  const [creator] = await fetchUsers([task.createdBy]);
  return { ...task, assignees, createdBy: creator ?? task.createdBy };
};

// ── POST /api/tasks ───────────────────────────────────────────────────────────
export const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description = "",
    project,
    assignees = [],
    priority = "medium",
    status = "todo",
    dueDate,
  } = req.body;

  await assertProjectMember(project, req.user._id, res);

  const task = await Task.create({
    title,
    description,
    project,
    assignees,
    createdBy: req.user._id,
    priority,
    status,
    dueDate: dueDate ? new Date(dueDate) : null,
    attachments: [],
  });

  res
    .status(201)
    .json({ success: true, task: await populateTask(task.toObject()) });
});

// ── GET /api/tasks?project=<id>&status=todo&priority=high&search=...&sort=...&page=1&limit=10
export const getTasks = asyncHandler(async (req, res) => {
  const { project } = req.query;
  if (!project) {
    res.status(400);
    throw new Error(
      '"project" query parameter is required, e.g. ?project=<id>',
    );
  }

  await assertProjectMember(project, req.user._id, res);

  const features = new APIFeatures(req.query)
    .search()
    .filter({ project })
    .sort()
    .paginate();

  const taskList = await features.execute(Task);
  const total = await Task.countDocuments(features.criteria);

  // Populate assignees for all tasks in one batched query
  const allAssigneeIds = [
    ...new Set(taskList.flatMap((t) => t.assignees.map((a) => a.toString()))),
  ];
  const allUsers = await fetchUsers(allAssigneeIds);
  const userMap = Object.fromEntries(
    allUsers.map((u) => [u._id.toString(), u]),
  );

  const populated = taskList.map((t) => ({
    ...t,
    assignees: t.assignees.map((id) => userMap[id.toString()] ?? id),
  }));

  res.json({
    success: true,
    page: features.page,
    limit: features.limit,
    total,
    count: populated.length,
    tasks: populated,
  });
});

// ── GET /api/tasks/:id ────────────────────────────────────────────────────────
export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await assertProjectMember(task.project, req.user._id, res);
  res.json({ success: true, task: await populateTask(task) });
});

// ── PUT /api/tasks/:id ────────────────────────────────────────────────────────
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await assertProjectMember(task.project, req.user._id, res);

  const { title, description, assignees, priority, status, dueDate } = req.body;
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (assignees !== undefined) updates.assignees = assignees;
  if (priority !== undefined) updates.priority = priority;
  if (status !== undefined) updates.status = status;
  if (dueDate !== undefined)
    updates.dueDate = dueDate ? new Date(dueDate) : null;

  const updated = await Task.findByIdAndUpdate(
    task._id,
    { $set: updates },
    { new: true, lean: true },
  );

  res.json({ success: true, task: await populateTask(updated) });
});

// ── DELETE /api/tasks/:id ─────────────────────────────────────────────────────
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const project = await assertProjectMember(task.project, req.user._id, res);

  const isCreator = task.createdBy.toString() === req.user._id.toString();
  const isOwner = project.owner.toString() === req.user._id.toString();
  if (!isCreator && !isOwner) {
    res.status(403);
    throw new Error(
      "Only the task creator or project owner can delete this task",
    );
  }

  await Task.deleteOne({ _id: task._id });
  res.json({ success: true, message: "Task deleted successfully" });
});

// ── PATCH /api/tasks/:id/status ───────────────────────────────────────────────
export const changeStatus = asyncHandler(async (req, res) => {
  const valid = ["todo", "in-progress", "review", "completed"];
  const { status } = req.body;

  if (!status || !valid.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${valid.join(", ")}`);
  }

  const task = await Task.findById(req.params.id).lean();
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await assertProjectMember(task.project, req.user._id, res);

  const updated = await Task.findByIdAndUpdate(
    task._id,
    { $set: { status } },
    { new: true, lean: true },
  );

  res.json({ success: true, task: updated });
});
