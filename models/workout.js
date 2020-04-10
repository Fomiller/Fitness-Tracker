const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
}, { toJSON: { virtuals: true } 
});

WorkoutSchema.virtual('totalDuration').get(function() {
  let totalDuration = 0;
  this.exercises.forEach(exercise => {
    totalDuration += exercise.duration;
  });
  return totalDuration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);
// changed file name
module.exports = Workout;