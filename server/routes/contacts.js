import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  replyToContact
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getContacts)
  .post(createContact);

router.route('/:id')
  .put(protect, authorize('admin'), updateContact)
  .delete(protect, authorize('admin'), deleteContact);

router.route('/:id/reply')
  .post(protect, authorize('admin'), replyToContact);

export default router;
