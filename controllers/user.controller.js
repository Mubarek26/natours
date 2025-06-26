import User from '../models/user.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import * as factory from "../controllers/handlerFactory.js";
const filterBody = (body, ...allowedFields) => {
  const filteredBody = {};
  Object.keys(body).forEach((el) => {
    if (allowedFields.includes(el)) filteredBody[el] = body[el];
  });
  return filteredBody;
};

export const getMe = (req, res, next) => {

  // 1) Get the user from the collection
  req.params.id = req.user.id;

  next();
}

export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterBody(req.body, 'name', 'email');
  
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};
export const getUser = factory.getOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
export const getAllUsers = factory.getAll(User);
