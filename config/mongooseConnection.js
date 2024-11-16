const mongoose = require("mongoose")
const config = require("config")
const dbgr = require("debug")("development:monoogooseConnection")

mongoose
.connect(`${config.get("MONGODB_URI")}/eventmanagement`)
.then(function(){
    dbgr("Connected")
})
.catch(function(err){
    dbgr(err)
})

module.exports = mongoose.connection
