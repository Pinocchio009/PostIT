const mongoose = require("mongoose");
const Joi = require('joi')

const userSchema = mongoose.Schema (
    {
        username:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
       role: {
        type: String,
        enum: ["guest", "admin"],
        default: "guest"
       },
       deleted: {
        type: Boolean,
        default: false
       }

    }, {timestamps: true}
);



module.exports = mongoose.model("User", userSchema);