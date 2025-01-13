const express=require('express');
const { register }=require('../controllers/accountController');
const userController=require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/register', register);
router.get('/profile',authenticateToken,userController.getUserData);

module.exports=router;