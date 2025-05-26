
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Get __filename and __dirname equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// READ FILE
const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../dev-data', 'data', 'tours-simple.json'),
    'utf-8'
  )
);


export const getAllTours = (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

export const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.json({
    status: 'success',
    data: {
      tour,
    },
  });
};

export const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    path.join(__dirname, 'dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Error saving the tour',
        });
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
export const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here>',
    },
  });
};

export const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};