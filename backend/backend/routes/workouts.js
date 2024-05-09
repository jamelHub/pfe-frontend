const express = require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

//tawa 5dem l backend mena ey aaa fhemtek 
// GET all workouts
router.get('/a', getWorkouts)
//fama commentaire mch f blalahdah
// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout 
router.post('/post', createWorkout)

// DELETE a workout

router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)
module.exports = router