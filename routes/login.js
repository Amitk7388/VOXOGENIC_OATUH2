var express = require('express');
var router = express.Router();
const Client = require('../models/client')
const User = require('../models/user')
const Code = require('../models/code')
const crypto = require('crypto')
const generateToken = require('../auth/generatetoken')


router.get('/login', function(req, res, next){
    let id = req.query.client_id
    console.log(id)
    var newID = id
    Client.findOne({clientId:id}, function(err, isMatched){
        if(err){
            res.json({response:err, message:'unauthorized'})
        }
        else if(!isMatched){
            res.json({message:'unauthorized'})
        }
        else{
            res.render('login', {newId:newID})
        }
    })
})


router.post('/login', function(req, res){
    console.log('this function called')
    let newId = req.body.newId
    let email = req.body.email
    let password = req.body.password

    console.log(email+password)
    console.log('this is new Id'+newId)

    Client.findOne({clientId:newId}, function(err, isMatch){
        if(err || !isMatch){
            res.json({response:err, message:'unauthorized'})
        }else{
            User.findOne({username:email}, function(err, data){
                if(err || !data){
                    res.json({response:err, message:'user not found'})
                }
                User.comparePassword(password, data.password, function(err, isMatched){
                    if(err || !isMatched){
                        res.json({response:err, message:'incorrect details'})
                    }else{

                        const token = generateToken.getToken(newId)
                        console.log('code'+token)
                        // res.json({response:'token '+token})
                        console.log(token)
                        let newCode = new Code({
                            userId : data._id,
                            clientId:newId,
                            token:token
                        })
                        Code.createCode(newCode, function(err, created){
                            if(err || !created){
                                res.json({response:err})
                            }else{
                                let state = 'state=token'
                                let auth = '&authuser=0'
                                console.log(isMatch.clientCallback)
                                res.redirect(isMatch.clientCallback+'?'+state+'&code='+token+auth)
                                // res.json({response:created, message:'sucessfully created'})
                            }
                        })
                    }
                })
            })
        }
    })
})





    

module.exports = router;
