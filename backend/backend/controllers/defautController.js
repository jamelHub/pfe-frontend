const Defaut = require('../models/defautmodel')
const mongoose = require('mongoose')

//get all defauts
const getDefauts = async (req, res) => {
    const product = await Defaut.find({}).sort({createdAt: -1})

    res.status(200).json(Defaut)
}

//get a single Defaut
 const getDefaut = async (req, res) => {
    const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Defaut'})
}
    const defaut = await Defaut.findById(id)

    if (!defaut) {
        return res.status(404).json({error: 'No such defaut'})
    }
    res.status(200).json(defaut)
 }
// create a defaut
const createDefaut = async (req, res) => {
    const {code,designiation} = req.body

    //add doc to db
    try{
        const defaut = await Defaut .create({code,designiation})
        res.status(200).json(defaut )
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}
//delete defaut 
const deleteDefaut  = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such defaut '})
    }

    const defaut = await Defaut.findOneAndDelete({_id: id})

    if (!defaut) {
        return res.status(400).json({error: 'No such defaut '})
    }
    res.status(200).json(defaut)

}

//update defaut 

const updateDefaut  = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such defaut '})
    }
   const defaut  = await Defaut .findOneAndUpdate({_id: id}, {
    ...req.body
   })
   if (!defaut ) {
    return res.status(400).json({error: 'No such defaut '})
}
res.status(200).json(defaut)
}

module.exports = {
    getDefauts,
    getDefaut,
    createDefaut,
    deleteDefaut,
    updateDefaut
}