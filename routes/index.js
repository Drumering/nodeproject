const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');


//Routes
const router = express.Router();
router.get('/',homeController.userMiddleware, homeController.index);
router.get('/users/login', userController.login);

module.exports = router;