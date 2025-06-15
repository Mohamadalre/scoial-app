require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
// verify user validity , to know the user
const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization) {
            return res.status(403).json({ message: "Authorization must be required" })
        }

        const token = authorization.split(" ")[1];
  
       
        
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);


        const user = await User.findById(data.id)
      
        
        if(!user) {
            return res.status(401).json({ 
                state:'Error',
                message: "Invalid user id",
                data:null })
        }

        req.id = data.id;
    
        
        next();
    } catch (error) {
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired',
                expiredAt: error.expiredAt
            });
        }
        else{
        return res.status(401).json({state:'Error', message: "invalid token" })}
         return res.status(500).json({state:'Error', message:error.message })
    }
}

module.exports = auth