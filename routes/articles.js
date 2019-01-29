var express = require('express');
var router = express.Router();
const AccessToken = require('../models/acesstoken')
/* GET home page. */

// this route is used for the details user wants to know his details.
// in this case user will ask about thier high score of game

router.get('/highscore/details', function(req, res, next) {
 
 
  const obj = {
    name:'user1',
    highscore:'480 out of 1000',
    email:'user1@gmail.com',
    number:'123456'
  }

  let accessToken = req.query.accesstoken;

  AccessToken.findOne({accessToken:accessToken}, function(err, dataFound){
    if(err || !dataFound){
      res.json({status:false, response:err, message:'your accesstoken is incorrect'})
    }
    else{
      let accessTokenTime = dataFound.created_at ;
      let date =new Date(accessTokenTime)
        console.log('database date'+date)
        let today = new Date()
        console.log('current time'+today)
        let findTime =dateTime.subtract(today, date).toMinutes();
        console.log(findTime)

        if(findTime > 10){
            res.json({status:false, response:'Token Expire', token:accessToken})
        }
        res.json({status:true, response:obj, message:'succesfully message delivered'})
    }
  })
});




module.exports = router;
