import mongoose from 'mongoose';
import Tour from '../../models/tour.model.js';
import User from '../../models/user.model.js';
import Review from '../../models/review.model.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tours.json'), 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'reviews.json'), 'utf-8')
);

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, {
      validateBeforeSave: false, // Disable validation for bulk insert
    });
    await Review.create(reviews);
    console.log('Data successfully loaded');
  } catch (err) {
    console.error('Error loading data:', err);
  } finally {
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.error('Error deleting data:', err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log(
    'Invalid command. Use --import to import data or --delete to delete data.'
  );
  process.exit(1);
}
// Note: This script is intended to be run from the command line.
// Usage: node dev-data/data/import-dev-data.js --import or --delete
