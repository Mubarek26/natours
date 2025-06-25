import Review from '../models/review.model.js';
import catchAsync from '../utils/catchAsync.js';
export const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().select('-__v -createdAt');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
