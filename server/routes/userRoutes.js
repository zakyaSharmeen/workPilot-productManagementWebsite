import { Router } from "express";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  getAssignedTasks,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload, uploadToCloudinary } from "../middleware/uploadMiddleware.js";

const router = Router();

router.use(protect);

router.route("/me").get(getProfile).put(updateProfile);
router.put(
  "/me/avatar",
  upload.single("avatar"),
  uploadToCloudinary("avatars"),
  uploadAvatar,
);
router.get("/me/tasks", getAssignedTasks);

export default router;
