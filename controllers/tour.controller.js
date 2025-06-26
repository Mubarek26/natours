import Tour from '../models/tour.model.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from '../controllers/handlerFactory.js';
export const getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    results: stats.length,
    data: { stats },
  });
});

export const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.id;
  const plan = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { numTours: -1, month: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    results: plan.length,
    data: { plan },
  });
});

export const getAllTours = factory.getAll(Tour);
export const getTour = factory.getOne(Tour, {
  path: 'reviews',
});
export const createTour = factory.createOne(Tour);
export const updateTour = factory.updateOne(Tour);
export const deleteTour = factory.deleteOne(Tour);
