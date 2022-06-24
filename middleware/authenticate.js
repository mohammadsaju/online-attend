const jwt = require('jsonwebtoken')
const User = require('../models/User');


const authenticate = async(req, res, next) => {
    try{
       let token = req.headers.authorization;
       if(!token) {
           res.status(401).json({msg: 'unauthorized user'})
       }

       token = token.split(' ')[1];
       const decoded = jwt.verify(token, process.env.JWT_TOKEN);

       const user = await User.findById({_id: decoded.id});
       if(!user) {
           res.status(401).json({msg: 'unauthorized user'})
       }
       req.user = user

       next();
    } 
    catch(e) {
       console.log(e.message) 
       res.status(400).json({msg: 'token is invalid'})
    }
}

module.exports = authenticate;
