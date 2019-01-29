const mongoose = require('mongoose')
var db = mongoose.connection
module.exports = {
    databaseConnection : mongoose.connect('mongodb://oauth123:oauth123@ds163402.mlab.com:63402/oauth_database'),
    // default database => mongodb://localhost/oauthdatabase
    secret : 'secret'
 }

