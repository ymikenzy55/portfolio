import express from 'express';
import {
  getSiteContent,
  getContentByKey,
  updateSiteContent,
  updateContentByKey
} from '../controllers/contentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getSiteContent)
  .put(protect, authorize('admin'), updateSiteContent);

router.route('/:key')
  .get(getContentByKey)
  .put(protect, authorize('admin'), updateContentByKey);

export default router;
