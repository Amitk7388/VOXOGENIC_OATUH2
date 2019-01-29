var express = require('express');
var router = express.Router();
const User = require('../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//this is for adding the new User
router.post('/', function(req, res, next){
    console.log(req.body)
      let username = req.body.username
      let password = req.body.password

      req.checkBody('username', 'please define the name ').notEmpty();
      req.checkBody('password', 'please enter the password ').notEmpty();

      var errors = req.validationErrors()

  if(errors){
    return res.status(400).json({status:false, response:true})
  }
  else{
    let newUser = new User({
      username     : username, 
      password : password
    })
    console.log(newUser)
    User.createUser(newUser, function(err, created){

      if(err){
        return res.status(400).json({status:false, response:err})
      }
      else{
        console.log(created)
        return  res.status(200).json({status:true, response:created})
      }
    })
  }
})
module.exports = router;
