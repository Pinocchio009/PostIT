const router = require('express').Router();
const {validateSchema, registrationSchemaValidation,loginSchemaValidation} = require('../validation');
const controller = require('../Controllers/userControllers');
const {isAuthenticated} = require('../middlewares/auth')


router
      .post('/users', validateSchema(registrationSchemaValidation), controller.registerUser)
      .post('/login' , validateSchema(loginSchemaValidation), controller.logInUser)
      .post('/logout', controller.logOutUser)
      .get('/users', controller.getAllUsers)
      .get('/users/:id',isAuthenticated,controller.getLoggedInUser)
      .put('/users/:id', controller.updateUser)

module.exports = router;