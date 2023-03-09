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
exports.logInUser = async (req,res) => {
    const {email, password} = req.body;
    try {
        //find the user with the provided email
        const user = await User.findOne({email});
        //if the user is not found, return an error
        if(!user) {
            return res.status(400).json({
                message: "invalid email or password"
            })
        }
        //compare the password with the hashed password stored in the dbS
        const isMatch = await bcrypt.compare(password, user.password)

        //if the password dont match return an error
        if(!isMatch){
            return res.status(400).json({
                message: 'invalid email or password'
            })
        }
        //Generate a jwt token with the User's id
        const token  = jwt.sign({ userid: user.id},
            SECRET, {
                expiresIn: '1h'
            });
            //set the token as a cookie and return a success message with the token
            res.cookie('token', token, { httpOnly: true});
            res.status(200).json({
                message: 'login successful',
                token: token
            })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.logOutUser = async (req, res) => {
    //clear the token cookie and return a success message
    res.clearCookie('token');
    res.status(200).json({
        message: 'logout successful'
    })
}
exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        if(users.length === 0)
        return res.status(404).json({
          success: false,
          message: 'No users found'
        })
        res.status(200).json({
          message: 'user found',
          users
        })
      } catch (error) {
          res.status(500).send(error.message)
      }
}
exports.getLoggedInUser = async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select("password");
        res.status(200).json({
            message: "User found succesfully",
            user
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
exports.updateUser = async (req, res)=> {
    try {
        let id = { _id : req.params.id};
        let users =  req.body;
        const update = await User.findOneAndUpdate(id, users, { new: true });
        if(!update) return res.status(400).json({
            message: 'user not found'
        })
        return res.status(200).json({
            message: " User updated",
            users: update
        })
    } catch (error) {
        res.status(500).send(error.message)
    }
}
exports.deleteUser = async (req, res) => {
    try {
        let id = { _id: req.params.id};
        let deleted = await User.findOneAndDelete(id);
        if(!deleted) 
        return res.status(400).send('user not deleted');
        return res.status(200).json({
            message: " user deleted succesfully"
        })
    } catch (error) {
       
    }
}
