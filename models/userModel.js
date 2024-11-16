const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true  },
    role: {type: String , enum:['user','admin','event manager'], default:'user'},
    contact : {type:Number , required: true}
})

module.exports = mongoose.model("user",userSchema)