import * as reviewController from '../controllers/review.controller.js';
import * as authController from '../controllers/auth.controller.js';
import express from 'express';

const router = express.Router({ mergeParams: true });
router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo('user'), reviewController.updateReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

export default router;
