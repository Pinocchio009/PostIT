const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/auth');
const{validateSchema, commentSchema} = require('../validation');
const controller = require('../Controllers/commentsController');

router 
     .post('/posts/:id/comments', isAuthenticated, validateSchema(commentSchema), controller.createComment)
     .get('/posts/:id/comments/:id', isAuthenticated, controller.getComment)
     .get('/posts/:id/comments', controller.getAllComments)

module.exports = router;