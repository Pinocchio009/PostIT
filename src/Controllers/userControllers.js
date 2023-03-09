const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;

exports.registerUser = async(req, res) => {
    try {
        //set this so you don't call req.body everytime
        const {username ,email, password, role} = req.body;
        if (!(username && email && password && role)) {
            res.status(400).send('all input is required');
        }
        //check if an account was created before
        const oldUser = await User.findOne({email: req.body.email});
        if(oldUser){
            return res.status(409).send('user already registered');
        }
        //now we create users and also save 
   
    const user = await User.create({
        username,
        email,
        password,
         role,
    
    })
    await user.save() 
        //NOW WE hash the password
        bcrypt.genSalt(10, (err, salt) => {
            if(err) {
                throw err
            }
            else {
                bcrypt.hash(password, salt, async (err, hashedPassword)=> {
                    if(err) {
                        return res.status(500).send(error.message)
                    }
                    user.password = hashedPassword;
                    const savedUser = await user.save();

            const token = jwt.sign(
                {
                    id: user._id, email
                }, SECRET,
                {
                    expiresIn: "2h"
                }
            );
            savedUser.token = token;
            res.header('x-auth-token', token).send(user)
                }) 
            }
            })     
    } catch (error) {
        res.status(500).send(error.message)
    }
}