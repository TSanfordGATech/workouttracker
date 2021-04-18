const router = require("express").Router();
const Workout = require("../models/exerciseModel");

// make new work outs --- using the API workout
router.post("/api/workouts", (req, res) => {
    Workout.create({
        exercises: []
    })
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch((err) => {
            res.json(err);
        })
});

// Adding an exercise to our workout------ using exerciseModel.js
// List from the exercise model

let workoutData = {};
// if (workoutType === "cardio") {
//   workoutData.type = "cardio";
//   workoutData.name = cardioNameInput.value.trim();
//   workoutData.distance = Number(distanceInput.value.trim());
//   workoutData.duration = Number(durationInput.value.trim());
// } else if (workoutType === "resistance") {
//   workoutData.type = "resistance";
//   workoutData.name = nameInput.value.trim();
//   workoutData.weight = Number(weightInput.value.trim());
//   workoutData.sets = Number(setsInput.value.trim());
//   workoutData.reps = Number(repsInput.value.trim());
//   workoutData.duration = Number(resistanceDurationInput.value.trim());
// }
router.put("/api/workouts/:id", ({
    body,
    params
}, res) => {
    Workout.findByIdAndUpdate({
        _id: params.id
    }, {
        $push: {
            exercises: {
                type: body.type,
                name: body.name,
                duration: body.duration,
                weight: body.weight,
                reps: body.reps,
                sets: body.sets,
                distance: body.distance
            }
        }
    })
        .then(res => {
            res.json(res);
        })
        .catch((err) => {
            res.json(err);
        })
});

// bring back all of the workouts
// fetch
router.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// work outs from the days 
router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .sort({ "day": -1 })
        .limit(7)
        .exec((err, docs) => {
            if (err) throw err;
            res.status(200).json(docs);
        })
});

module.exports = router;