const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports.registerUser = async function(req,res){
    try{
        let {name,email,password,contact,role} = req.body
        let user = await userModel.findOne({email})
        if(user) return res.status(401).send("User already exists.")
        const adminCount = await userModel.countDocuments({ role: 'admin' });
        if (role === 'admin' && adminCount > 0) {
            return res.status(403).send("An admin already exists. Only one admin is allowed.");
        }
        
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    if(err) return res.status(401).send(err.message)
                    else{
                        let user = await userModel.create({
                            name,
                            email,
                            password : hash,
                            contact,
                            role,
                        })
                        res.json({
                            status: 200,
                            message: "User registered successfully",
                            user
                        })
                    }
                });
            });

            // const salt = 10;
            // const hashedPassword = await bcrypt.hash(password,salt);
            // const create
    }catch(error){

    }
}