const mongoose = require('mongoose');
const Shchema = mongoose.Schema;
const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Exercise type is required"
  },
  name: {
    type: String,
    trim: true,
    required: "Exercise name is required"
  },
  duration: {
    type: Number,
    trim: true,
    required: "Exercise duration is required"
  },
  weight: {
    type: Number,
    trim: true,
    required: "Exercise weight is required"
  },
  reps: {
    type: Number,
    trim: true,
    required: "Exercise reps is required"
  },
  set: {
    type: Number,
    trim: true,
    required: "Exercise set is required"
  },
})