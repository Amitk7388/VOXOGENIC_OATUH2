var express = require('express');
var router = express.Router();
const Client = require('../models/client')
/* GET users listing. */
//this is for adding the new User
router.post('/addclient', function(req, res, next){
    console.log(req.body)
      let clientName = req.body.clientName
      let clientId = req.body.clientId
      let clientSecret = req.body.clientSecret
      let clientScope = req.body.clientScope
      let clientCallback = req.body.clientCallback

      req.checkBody('clientName', 'please enter the clientName').notEmpty();
      req.checkBody('clientId', 'please define the name ').notEmpty();
      req.checkBody('clientSecret', 'please enter the password ').notEmpty();
      req.checkBody('clientScope', 'please enter the clientScope ').notEmpty();
      req.checkBody('clientCallback', 'please enter the clientCallback ').notEmpty();

      var errors = req.validationErrors()

  if(errors){
    return res.status(400).json({status:false, response:true})
  }
  else{
    let newClient = new Client({
        clientName : clientName,
        clientId:clientId,
        clientSecret:clientSecret,
        clientScope:clientScope,
        clientCallback:clientCallback
    })
    console.log('this is object'+newClient)
    Client.createClient(newClient, function(err, created){

      if(err){
        return res.status(400).json({status:false, response:err})
      }
      else{
        console.log('this is created'+created)
        return  res.status(200).json({status:true, response:created})
      }
    })
  }
})
module.exports = router;
