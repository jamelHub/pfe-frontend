const express = require('express')
const {
    getDepartements,
    getDepartement,
    createDepartement, 
    deleteDepartement,
    updateDepartement
   
} = require('../controllers/departementController')

const router = express.Router()


// GET all  Departements
router.get('/', getDepartements)

// GET a single Departement
router.get('/:id', getDepartement)
// POST Departement
router.post('/', createDepartement)

// DELETE Departement

router.delete('/:id', deleteDepartement)

//UPDATE Departement
router.patch('/:id', updateDepartement)

module.exports = router