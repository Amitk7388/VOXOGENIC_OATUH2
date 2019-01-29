
//ROUGH USE



const dateTime = require('date-and-time')

//  let time = "2019-01-28T08:06:39.910Z"

// let newTime = dateTime.format(time, 'hh:mm:ss')
// console.log(newTime)
let date =new Date("2019-01-28T08:06:39.910Z")
console.log(date)
let today = new Date()
console.log('today'+today)
let findTime =dateTime.subtract(today, date).toMinutes();
console.log(findTime)        // => 1440

let newTime = dateTime.format(date, 'hh:mm:ss')
 newTime = Number(newTime);
 console.log(typeof newTime)