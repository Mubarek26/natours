import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import tourRouter from './routes/tour.routes.js';
import viewRouter from './routes/view.routes.js';
import AppError from './utils/appError.js';
import { globalErrorHandler } from './controllers/error.controller.js';
import reviewRouter from './routes/review.routes.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Required when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Shuting down...');
  process.exit(1);
});

async function connectDB() {
  await mongoose.connect(process.env.DATABASE_LOCAL);
  console.log('DB connection successful');
}
connectDB();
const PORT = process.env.PORT;

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "ws://localhost:*"
      ],
    },
  })
);


const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
// app.use(morgan('dev')); // Logging

// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Test middleware
// app.use((req, res, next) => {
//   next();
// })

// Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// START SERVER
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (process.env.NODE_ENV === 'development')
    console.log('In development mode');
  else console.log('In production mode');
});

process.on('unhandledRejection', (err) => {
  server.close(() => {
    console.log(err.name, err.message);
    console.log('Shuting down...');
    process.exit(1);
  });
});
