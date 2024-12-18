const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

module.exports.registerUser = async function (req, res) {
    try {
        let { name, email, password, contact, role } = req.body
        let user = await userModel.findOne({ email })
        if (user) return res.status(401).send("User already exists.")
        const adminCount = await userModel.countDocuments({ role: 'admin' });
        if (role === 'admin' && adminCount > 0) {
            return res.status(401).send("Something went wrong !");
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.status(401).send(err.message)
                else {
                    let user = await userModel.create({
                        name,
                        email,
                        password: hash,
                        contact,
                        role,
                    })
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.send(token);
                }
            });
        });
    } catch (error) {

    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body
    let user = await userModel.findOne({ email })
    if (!email) return res.status(401).send("Email or password incorrect.")
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.send("Login successful.")
        }
        else {
            return res.status(401).send("Email or password incorrect.")
        }
    });
}

module.exports.logoutUser = async function (req, res) {
            res.cookie("token","")
            res.send("Logout successful.")
    }