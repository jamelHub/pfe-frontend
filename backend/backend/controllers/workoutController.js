const Workout = require('../models/workoutmodel') 
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get a single workout
 const getWorkout = async (req, res) => {
    const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
}
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
    const {lastName,password,firstName,matricule,age,email,contact,departement} = req.body

    //add doc to db
    try{
        const workout = await Workout.create({lastName,password,firstName,matricule,age,email,departement,contact})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}
//wadha7 deja mchet fl post adheka ch7chti ena bhy ldha bhy 
// lazem nthabtou f maj w min kifeh khater yomkn sbeb haka tekhdemech ? l7dha brka  bhy trah jareb e5dem adhiya fl postmannaaml create yaaani? 
//od5el ll backend mn termina
//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: 'No such workout'})
    }
    res.status(200).json(workout)

}

//update a workout

const updateWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
   const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
   })
   if (!workout) {
    return res.status(400).json({error: 'No such workout'})
}
res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}