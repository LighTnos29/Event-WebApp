const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

module.exports = async function (req,res,next) {
    if(!req.cookies.token){
        return res.status(405).send("Session expired, please login again.")
    }
    try {
        let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        let user = await userModel.findOne({ email: decode.email }).select("-password")
        req.user = user
        next();
    } catch (err) {
        req.send("error","something went wrong.")
    }
}