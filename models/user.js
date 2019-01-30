const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var crypto = require('crypto')
const bcrypt = require('bcrypt')
var User = Schema({
    username  :{
        type:String,
        unique:true,
        required : true
    },
    password : {
        type:String,
        required :true,
        bcrypt:true
    },
    created_at:{
        type:Date,
        default : Date.now
    }
})


module.exports = mongoose.model('user', User)


module.exports.createUser = function(newUser, cb){
    bcrypt.hash(newUser.password, 10, function(err, hashed){
        if(err){
            return done(err)
        }
        else{
            
            newUser.password = hashed;
            console.log(hashed)
            newUser.save(cb)
        }
    } )   
}

module.exports.comparePassword = function(password, hashedPassword, cb){
    bcrypt.compare(password, hashedPassword, function(err, isMatch) {
        if(err){
            let newobj={
                status:false, 
                response:err, 
                devMessage:'there is some issue while matching the password'
            }
            return newobj
        }
        else{
            cb(null, isMatch)
        }
    });
}

