const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/auth');
const controller = require('../Controllers/PostController')

router
     .post('/posts', isAuthenticated, controller.createPost)
     .get('/posts', isAuthenticated, controller.getPost)
     .get('/posts/:id', isAuthenticated, controller.getSinglePosts)



module.exports = router;