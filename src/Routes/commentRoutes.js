const router = require('express').Router();
const {isAuthenticated} = require('../middleware/auth');
const{validateSchema, commentSchema} = require('../validation');
const controller = require('../Controllers/commentsController');

router 
     .post('/posts/:id/comments', isAuthenticated, validateSchema(commentSchema), controller.createComment)
     .get('/posts/:id/comments/:id', isAuthenticated, controller.getComment)
     .get('/posts/:id/comments', controller.getAllComments)
     .put('/posts/:id/comments/:id', isAuthenticated, validateSchema(commentSchema), controller.updateComments)
     .delete('/posts/:id/comments/:id', isAuthenticated, controller.deleteComment)
     
module.exports = router;