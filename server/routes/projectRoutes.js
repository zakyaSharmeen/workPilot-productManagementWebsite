import { Router } from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { projectValidator } from "../validators/projectValidator.js";

const router = Router();

router.use(protect);

router.route("/").get(getProjects).post(projectValidator, createProject);
router
  .route("/:id")
  .get(getProject)
  .put(projectValidator, updateProject)
  .delete(deleteProject);

export default router;
