import Tour from '../models/tour.model.js';
import catchAsync from '../utils/catchAsync.js';

export const getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

export const getTour = catchAsync(async (req, res) => {
  res.status(200).render('overview', {
    title: 'The Forest Hiker',
  });
});
