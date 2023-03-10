const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/auth');
const controller = require('../Controllers/PostController')

router.post('/posts', isAuthenticated, controller.createPost);



module.exports = router;