import express from 'express';
import * as tourController from '../controllers/tour.controller.js';
import * as aliasMiddleware from '../middlewares/alias.middleware.js';
import * as authController from '../controllers/auth.controller.js';
import reviewRouter from '../routes/review.routes.js';

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-tours')
  .get(aliasMiddleware.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

  router.route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

export default router;
