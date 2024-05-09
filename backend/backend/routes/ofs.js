const express = require('express')
const {
    getOfs,
    getOf,
    createOf,
    deleteOf,
    updateOf
   
} = require('../controllers/ofController')

const router = express.Router()


// GET all of
router.get('/', getOfs)

// GET a single of
router.get('/:id', getOf)

// POST a new of 
router.post('/', createOf)
// DELETE a of

router.delete('/:id', deleteOf)

//UPDATE a of
router.patch('/:id', updateOf)

module.exports = router