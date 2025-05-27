import mongoose from 'mongoose';
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
const newTour = new Tour({
  name: 'The Forest Hiker3',
  rating: 4.8,
  price: 497,
});

export default Tour;
