import Review from '../models/review.model.js';
// import catchAsync from '../utils/catchAsync.js';
import * as factory from "../controllers/handlerFactory.js";

export const getAllReviews = factory.getAll(Review);

export const setTourUserIds = (req, res, next ) => {
    // Allow nested routes
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;
  next();
}
export const getReview = factory.getOne(Review);
export const createReview = factory.createOne(Review);
export const deleteReview = factory.deleteOne(Review);
export const updateReview = factory.updateOne(Review);