const express = require('express')
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
   
} = require('../controllers/productController')

const router = express.Router()
//enehom route bch t5dmhom fl admin? li chtbda bihom
// f from nheb torbet twali taaml create user 
//fhtk winou l bach t3 
//tahki al lien ?

// GET all product
router.get('/', getProducts)
  
  // GET a single  product
router.get('/:id', getProduct)

// POST a new  product
router.post('/', createProduct)
// DELETE a Product

router.delete('/:id', deleteProduct)

//UPDATE a Product
router.patch('/:id', updateProduct)

module.exports = router