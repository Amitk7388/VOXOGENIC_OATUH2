var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Client = Schema({
    clientName:{
        type:String,
        unique:true,
        required :true
    },
    clientId :{
        type:String,
        unique:true,
        required :true
    },
    clientSecret : {
        type:String,
        unique:true,
        required :true
    },
    clientScope : {
        type:String,
        unique:true,
        required :true
    },
    clientCallback : {
        type:String,
        required :true
    },
    created_at:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('client', Client)

module.exports.createClient = function(newClient, cb){
                newClient.save(cb)
}