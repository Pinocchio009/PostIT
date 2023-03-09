const router = require('express').Router();
const {validateSchema, registrationSchemaValidation} = require('../validation');
const controller = require('../Controllers/userControllers');

router
      .post('/register', validateSchema(registrationSchemaValidation), controller.registerUser)

      module.exports = router;