import { Router } from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask, changeStatus } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { taskValidator } from '../validators/taskValidator.js';

const router = Router();

router.use(protect);

router.route('/').get(getTasks).post(taskValidator, createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);
router.patch('/:id/status', changeStatus);

export default router;
