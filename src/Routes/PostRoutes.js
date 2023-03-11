const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/auth');
const {validateSchema, postItSchema} = require('../validation')
const controller = require('../Controllers/PostController')

router
     .post('/posts', isAuthenticated,validateSchema(postItSchema), controller.createPost)
     .get('/posts', isAuthenticated, controller.getPost)
     .get('/posts/:id', isAuthenticated, controller.getSinglePosts)
     .put('/posts/:id', isAuthenticated, validateSchema(postItSchema), controller.updatePost)
     .delete('/posts/:id', isAuthenticated, controller.deletePost)


module.exports = router;