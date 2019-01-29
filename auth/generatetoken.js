const crypto = require('crypto');
 
//this function is used to select random number which help to genrete token
var uid = function(len) {
    var buf = []
      , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , charlen = chars.length;
  
    for (var i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
  
    return buf.join('');
  };
  
  /**
   * Return a random int, used by `utils.uid()`
   *
   * @param {Number} min
   * @param {Number} max
   * @return {Number}
   * @api private
   */

//this will select th generate the some random string
var getRandomInt=  function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


// using crypto to genrate token
var getToken = function(secret){
    const code = crypto.createHmac('sha256', secret)
                        .update(uid(16))
                        .digest('hex');
      return code
  }

  
//exporting all the function to use api route 
module.exports ={
    getRandomInt,
    getToken,
    uid
  }