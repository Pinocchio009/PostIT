const router = require('express').Router();
const {isAuthenticated} = require('../middlewares/auth');
const{validateSchema, commentSchema} = require('../validation');
const controller = require('../Controllers/commentsController');

router 
     .post('/posts/:id/comments', isAuthenticated, validateSchema(commentSchema), controller.createComment)


module.exports = router;