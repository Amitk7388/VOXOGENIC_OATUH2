const express = require('express');
const router = express.Router();
const Client = require('../models/client')
const crypto = require('crypto');
const Code = require('../models/code')
const generateToken = require('../auth/generatetoken')
const AccessToken = require('../models/acesstoken')



/**
*this `route` will verify client details from databaase and after verification will route to `login` page
*=> please login to `login router` for further details
*/

router.get('/', function(req, res){
  res.send('Welcome to Voxogenic. start the process')
})


router.get('/auth/clientside/newauth', function(req, res, next){
  
  let id = req.query.client_id
  let redirectUri = req.query.redirect_uri
  let state = req.query.state
  let scope = req.query.scope
  console.log('this is is'+id)
  Client.findOne({clientId:id}, function(err, hasData){
    if(!err && hasData){    
      console.log('hashData'+hasData)
      res.redirect('/login'+'?client_id='+id+'&redirecturi='+redirectUri+'&state='+state+'&scope='+scope)
    }else{
      console.log('err')
      res.json({response:err})
    }
  })
})

/**
 * this route will generate `accessToken`
 */


router.post('/req/acesstoken/clientside', function(req, res){
  
  res.setHeader('Content-Type', 'application/json');
    
  console.log('req query')
  console.log(req.query)
  console.log('req.body')
  console.log(req.body)
  console.log('requesting the headers')
  console.log(JSON.stringify(req.headers));

  let code=  req.body.code
  let clientId = req.body.client_id
  let clientSecret = req.body.client_secret
  let redirectUri = req.body.redirect_uri
  let refreshToken = req.body.refreshtoken
  console.log('code'+code)
  console.log('clientId'+clientId)
  console.log('clientSecret'+clientSecret)
  console.log('redirectUri'+redirectUri)
  console.log('refreshToken'+refreshToken)

if(refreshToken == undefined){
  console.log('accesstoken should be genetrated')

  Client.findOne({clientId:clientId, clientSecret:clientSecret}, function(err, isMatch){
      if(err || !isMatch){
        return res.json({status:false, 
                        response:'unauthorized', 
                        message:'unsuccesfull please try again'})
      }
      Code.findOne({token:code}, function(err, found){
        console.log('finding the code from database')
        if(err || !found){
          return res.json({status:false, 
                          response:'unauthorized', 
                          message:'unsuccesfull please try again'})
        }  
        else if(found.clientId !==clientId){
          return res.json({status:false, 
            response:'unauthorized', 
            message:'unsuccesfull please try again'})
        }
        else{ 
          /**
           * `genrating token here accessToken and RefreshToken`
           */
          console.log('generating the accesstoken')
          let accessToken = generateToken.getToken(found.userId)
          let reFreshToken = generateToken.getToken(found.userId)
          console.log('refreashToken'+reFreshToken)
          console.log('AccessToken'+accessToken)

          let newToken = new AccessToken({
            userId:found.userId,
            clientId: clientId,
            accessToken: accessToken,
            refreshToken: reFreshToken
          })
          
          AccessToken.createAcessToken(newToken, function(err, created){
            if(err || !created)
            {
              return res.json({response: err, message: 'access token not created'})
            }
            else{
              console.log(created)
              let newObj= {
                access_token  :accessToken,
                token_type    : "bearer",
                expires_in    : 3600,
                refresh_token :reFreshToken
              }
              console.log(newObj)
              // newObj = JSON.stringify(newObj)
              return res.send(JSON.stringify({response:newObj}));
              // return res.json({response:newObj})
            }
          })
        }
      })
  })
}else{
  AccessToken.findOne({refreshToken:refreshToken}, function(err, data){
    if(err || !data){
      res.json({status:false, response:err, message:'unauthorized token'})
    }
    else{
          /**
           * `genrating again token here accessToken and RefreshToken`
           */

          let accessToken = generateToken.getToken(data.userId)
          let reFreshToken = generateToken.getToken(data.userId)
          console.log('refreashToken'+reFreshToken)
          console.log('AccessToken'+accessToken)
          
          let newToken = {
            userId:data.userId,
            clientId: data.clientId,
            accessToken: accessToken,
            refreshToken: reFreshToken
          }
          /**
           * `updating the access token and return the json data with refreash Token`
           */

          AccessToken.findOneAndUpdate({refreshToken:refreshToken}, newToken, function(err, updated){
            if(err || !updated){
              res.json({status:false, devMessage:'there is some while updateing the token'})
            }
            else{
              let newObj= {
                access_token  :accessToken,
                token_type    : "Bearer",
                expires_in    : 3600,
                refresh_token :reFreshToken
              }
              return res.json({status:true, response:newObj, message:'please update your accessToken'})
            }
          })
    }
  })

}

})


/**
 * Now creating the `resfresh` token 
 * if accesstoken is `expire` then new `refresh token` will be generated
 */

router.post('/refreashToken', function(req, res, next){
  let refreshToken = req.query.refreshtoken

  AccessToken.findOne({refreshToken:refreshToken}, function(err, data){
    if(err || !data){
      res.json({status:false, response:err, message:'unauthorized token'})
    }
    else{
          /**
           * `genrating again token here accessToken and RefreshToken`
           */

          let accessToken = generateToken.getToken(data.userId)
          let reFreshToken = generateToken.getToken(data.userId)
          console.log('refreashToken'+reFreshToken)
          console.log('AccessToken'+accessToken)
          
          let newToken = {
            userId:data.userId,
            clientId: data.clientId,
            accessToken: accessToken,
            refreshToken: reFreshToken
          }
          /**
           * `updating the access token and return the json data with refreash Token`
           */

          AccessToken.findOneAndUpdate({refreshToken:refreshToken}, newToken, function(err, updated){
            if(err || !updated){
              res.json({status:false, devMessage:'there is some while updateing the token'})
            }
            else{
              let newObj= {
                access_token  :accessToken,
                token_type    : "Bearer",
                expires_in    : 3600,
                refresh_token :reFreshToken
              }
              return res.json({status:true, response:newObj, message:'please update your accessToken'})
            }
          })
    }
  })
})
module.exports = router;
