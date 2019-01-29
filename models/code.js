const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var Code = new Schema({
    userId : {
        type:String,
        required:true
    },
    clientId : {
        type:String,
        required:true
    },
    token:{
        type:String,
        unique:true,
        required:true
    },
    created_at :{
        type: Date,
        expires:'15m',
        default : Date.now
    }
})

module.exports = mongoose.model('code', Code)

module.exports.createCode = function(newCode, cb){
        newCode.save(cb)
}