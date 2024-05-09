const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    //hedhom 
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },//7achti bl code enehou form? ayh ta3 jdid
    contact : {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    matricule: {// bch nchouf belk l mochkla fl port 3000 5ater jena nfess erreur lbera7 ok
        type: String,
        required: true
    },
password:  {
        type: String,
        required: true
    },
    departement:  {
        type: String,
        required: true
    },
}, { timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)