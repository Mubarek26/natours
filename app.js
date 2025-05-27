import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import tourRouter from './routes/tour.routes.js';
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
// Ensure query strings like duration[gte]=5 are parsed as nested objects using qs
app.set("query parser", "extended");

app.use(express.json());
app.use(morgan('dev')); // Logging middleware
const PORT = process.env.PORT;

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
