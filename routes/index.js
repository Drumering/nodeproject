const express = require('express');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');


//Routes
const router = express.Router();
router.get('/',homeController.userMiddleware, homeController.index);
router.get('/users/login', userController.login);
router.get('/post/add', postController.add);
router.post('/post/add', postController.addAction);

module.exports = router;