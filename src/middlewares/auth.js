const jwt = require('jsonwebtoken');

require('dotenv').config();

const {SECRET} = process.env;

exports.isAuthenticated = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token)
      return res.status(401).json({
        message: "Token not found"
      })

      try {
        const decoded = jwt.verify(token, SECRET);

       req.user = decoded

        next()
      } catch (error) {
        res.status(500).send(error.message)
      }
      
 };

 