const db = require('../models');

module.exports = function(app){
  // gets ALL WORKOUTS
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
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

  // add/pushes an EXERCISE into a WORKOUT
  // Updates the Workout Model
  app.put('/api/workouts/:id', (req, res) => {
    // create a new exercise using request.body
    const workoutID = req.params.id
    const exercise = new db.Exercise(req.body);
    console.log('EXERCISE TO ADD: ',exercise);

    db.Exercise.create(exercise)
      .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: workoutID }, { $push: { exercises: _id }}, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        // if an error occurs send the error to the client
        res.json(err);
      });
  });

  app.get('/api/workouts/:id', (req, res) => {
    db.Workout.findOne({ _id: req.params.id })
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err);
    });
  });

  app.get('/populateworkout', (req, res) => {
    db.Workout.find({})
    .populate('exercises')
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err);
    });
  });
};