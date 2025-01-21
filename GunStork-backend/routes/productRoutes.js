const express=require('express');
const router = express.Router();
const productController=require('../controllers/productController');
const purchaseController=require('../controllers/purchaseController');
const authenticateToken = require('../middlewares/authenticateToken');
//router.get('/',productController.getAllProducts);
router.get('/sale',productController.getOnlyTwoSaleProducts);
router.get('/newest',productController.getOnlyTwoNewProducts);
router.get('/',productController.getProductsByCategoryAndCount);
router.get('/categories',productController.getCategories);
router.get('/:productId',productController.getProductById);
router.post('/purchase',authenticateToken,purchaseController.handlePurchase);
router.get('/categories/subcategories',productController.getChildrenCategory);

module.exports=router;