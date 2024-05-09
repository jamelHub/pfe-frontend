const mongoose = require('mongoose')

const Schema = mongoose.Schema

const defautSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    designiation: {
        type: String,
        required: true
    },

}, { timestamps: true})

module.exports = mongoose.model('Defaut', defautSchema)