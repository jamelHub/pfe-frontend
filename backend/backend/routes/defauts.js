const express = require('express')
const {
    getDefauts,
    getDefaut,
    createDefaut,
    deleteDefaut,
    updateDefaut
   
} = require('../controllers/defautController')

const router = express.Router()


// GET all  Defauts,,
router.get('/', getDefauts)

// GET a single defaut
router.get('/:id', getDefaut)
// POST a new Defaut
router.post('/', createDefaut)

// DELETE Defaut

router.delete('/:id', deleteDefaut)

//UPDATE Defaut
router.patch('/:id', updateDefaut)

module.exports = router