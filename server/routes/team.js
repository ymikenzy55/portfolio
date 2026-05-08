import express from 'express';
import {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTeamMembers)
  .post(protect, authorize('admin'), createTeamMember);

router.route('/:id')
  .get(getTeamMember)
  .put(protect, authorize('admin'), updateTeamMember)
  .delete(protect, authorize('admin'), deleteTeamMember);

export default router;
