const router = require('express').Router();
const {validateSchema, registrationSchemaValidation,loginSchemaValidation} = require('../validation');
const controller = require('../Controllers/userControllers');

router
      .post('/register', validateSchema(registrationSchemaValidation), controller.registerUser)
      .post('/login', validateSchema(loginSchemaValidation), controller.logInUser)
      .post('/logout', controller.logOutUser)

module.exports = router;