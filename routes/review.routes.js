import * as reviewController from '../controllers/review.controller.js';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(protect, restrictTo('user'), reviewController.createReview);

export default router;
