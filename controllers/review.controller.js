import Review from '../models/review.model.js';
import catchAsync from '../utils/catchAsync.js';


export const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if(req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter).select('-__v -createdAt');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  console.log(req.body.tourId);
  // Allow nested routes
  if(!req.body.tour) req.body.tour = req.params.tourId;
  if(!req.body.user) req.body.user = req.user.id;
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
