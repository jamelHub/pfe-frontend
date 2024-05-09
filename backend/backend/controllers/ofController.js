const Of = require('../models/ofmodel')
const mongoose = require('mongoose')

//get all of
const getOfs = async (req, res) => {
    const of = await Of.find({}).sort({createdAt: -1})

    res.status(200).json(of)
}

//get a single of
 const getOf = async (req, res) => {
    const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such of'})
}
    const of = await Of.findById(id)

    if (!of) {
        return res.status(404).json({error: 'No such of'})
    }
    res.status(200).json(of)
 }

// create a new of
const createOf = async (req, res) => {
    const {name, date} = req.body

    //add doc to db
    try{
        const of = await Of.create({name, date})
        res.status(200).json(of)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}
//delete a of
const deleteOf = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such of'})
    }

    const of = await Of.findOneAndDelete({_id: id})

    if (!of) {
        return res.status(400).json({error: 'No such of'})
    }
    res.status(200).json(of)

}

//update of

const updateOf = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such of'})
    }
   const of = await Of.findOneAndUpdate({_id: id}, {
    ...req.body
   })
   if (!of) {
    return res.status(400).json({error: 'No such of'})
}
res.status(200).json(of)
}


module.exports = {
    getOfs,
    getOf,
    createOf,
    deleteOf,
    updateOf
   
}