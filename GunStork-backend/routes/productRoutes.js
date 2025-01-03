const express=require('express');
const router = express.Router();
const productController=require('../controllers/productController');

//router.get('/',productController.getAllProducts);
router.get('/sale',productController.getOnlyTwoSaleProducts);
router.get('/newest',productController.getOnlyTwoNewProducts);
router.get('/',productController.getProductsByCategory);
router.get('/categories',productController.getCategories);
router.get('/:productId',productController.getProductById);

module.exports=router;