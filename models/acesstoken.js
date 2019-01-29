var mongoose  =  require('mongoose');

var Schema = mongoose.Schema;

var accessToken = new Schema({
    userId : {
        type:String,
        required:true
    },
    clientId : {
        type:String,
        required:true
    },
    accessToken:{
        type:String,
        unique:true,
        required:true
    },
    refreshToken:{
        type:String,
        unique:true,
        required:true
    },
    created_at :{
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('accessToken', accessToken)
module.exports.createAcessToken = function(newToken, callback){
    newToken.save(callback)
}