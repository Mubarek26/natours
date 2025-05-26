import express from 'express';
import userRouter from "./routes/user.routes.js";
import tourRouter from "./routes/tour.routes.js";
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev')); // Logging middleware
const PORT = process.env.PORT;

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
