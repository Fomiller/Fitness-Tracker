const db = require('../models');

module.exports = function(app){
  // gets ALL WORKOUTS
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err)
      });
  });

// creates a WORKOUT
  app.post('/api/workouts', ({ body }, res) => {
    // create a new exercise using request.body
    const workout = new db.Workout(body);

    db.Workout.create(workout)
      .then(dbWorkout => {
        // if saved correctly send the new Exercise document to the client
        res.json(dbWorkout);
      })
      .catch(err => {
        // if an error occurs send the error to the client
        res.json(err);
      });
  });

  // pushes an EXERCISE into a WORKOUT
  app.put('/api/workouts/:id', (req, res) => {
    // create a new exercise using request.body
    const exercise = new db.Exercise(req.body);

    db.Exercise.create(exercise)
      .then(({_id}) => db.Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: _id}}))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        // if an error occurs send the error to the client
        res.json(err);
      });
  });
}