const Joi = require('joi');


const validateSchema = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body)

        if(error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        next()
    }
}

const registrationSchemaValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
    
})

const loginSchemaValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})


module.exports = {
    registrationSchemaValidation,
    validateSchema,
    loginSchemaValidation
}