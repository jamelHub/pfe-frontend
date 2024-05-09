const Defaut = require('../models/departementmodel')
const mongoose = require('mongoose')

//get all departement
const getDepartements = async (req, res) => {
    const departement = await Departement.find({}).sort({createdAt: -1})

    res.status(200).json(Departement)
}

//get a single departement
 const getDepartement = async (req, res) => {
    const {id} = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such departement'})
}
    const departement = await Departement.findById(id)

    if (!departement) {
        return res.status(404).json({error: 'No such departement'})
    }
    res.status(200).json(departement)
 }
 // create departement
const createDepartement = async (req, res) => {
    const {name} = req.body

    //add doc to db
    try{
        const departement = await Departement.create({name})
        res.status(200).json(departement)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}
 //delete departement
const deleteDepartement = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such departement'})
    }

    const departement = await Departement.findOneAndDelete({_id: id})

    if (!departement) {
        return res.status(400).json({error: 'No such departement'})
    }
    res.status(200).json(departement)

}

//update departement

const updateDepartement= async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such departement'})
    }
   const departement = await Departement.findOneAndUpdate({_id: id}, {
    ...req.body
   })
   if (!departement) {
    return res.status(400).json({error: 'No such departement'})
}
res.status(200).json(departement)
}



module.exports = {
    getDepartements,
    getDepartement,
    createDepartement, 
    deleteDepartement,
    updateDepartement
}