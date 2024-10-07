
const express = require('express');
const { getAllProducts, createProduct, findAllProducts, deleteProduct } = require('../controllers/productsConrtoller');
const upload = require('../middleware/uploadMiddleWare');
const router = express.Router();

router.get('/getAllProducts', getAllProducts)
// router.post('/createProducts', 
//     upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 10 }]), 
//     createProduct
// );

router.post('/create-product', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]), createProduct);

router.get('/findallProducts', findAllProducts)
router.delete('/deleteProduct/:id', deleteProduct)


module.exports = router;
