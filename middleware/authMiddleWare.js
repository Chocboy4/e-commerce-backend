const jwt = require("jsonwebtoken")
const User = require("../models/userModels")
require("dotenv").config()


// This middleWare is used to check for authenticated users (general users)
const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")

            if(!req.user){
                return res.status(401).json({message : "Not Authorised, User not Found"})
            }
            next()
        } catch (error) {
            return res.status(401).json({message : "Not Authorised, token failed"})
        }
    }else{
        return res.status(401).json({message : "Not Authorised, no Token"})
    }
}



// This middleware is use to check  For Admin users

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else {
        res.status(403).json({message: "You are not authorised as an admin"})
    }
}


module.exports = { protect, admin}