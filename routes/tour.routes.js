import express from 'express';
import * as tourController from '../controllers/tour.controller.js';
import * as aliasMiddleware from '../middlewares/alias.middleware.js';
import * as authController from '../controllers/auth.controller.js';
const router = express.Router();
router.route('/top-5-tours').get(aliasMiddleware.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:id").get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
