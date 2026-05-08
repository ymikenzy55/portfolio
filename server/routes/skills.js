import express from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, authorize('admin'), createSkill);

router.route('/:id')
  .put(protect, authorize('admin'), updateSkill)
  .delete(protect, authorize('admin'), deleteSkill);

export default router;
