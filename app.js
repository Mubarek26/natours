import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import tourRouter from './routes/tour.routes.js';

import { AppError } from './utils/appError.js';
import { globalErrorHandler } from './controllers/error.controller.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_LOCAL);
    console.log('DB connection successful');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

connectDB();

const app = express();

app.use(express.json());
// app.use(morgan('dev')); // Logging middleware
const PORT = process.env.PORT;

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if(process.env.NODE_ENV === "development") console.log("In development mode");
  else console.log("In production mode");
});
