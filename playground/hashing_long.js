//this uses crypto-js to encrypt some text and simulate a man in the middle
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
//bcrypt.js
// npm i bcrypt --save
const bcrypt = require('bcryptjs')

var password = 'ThisIsJustATestPassword';

// //start of 1
// //user to create a hashed password
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });
// //end of 1

var hashedPassword = '$2a$10$Hev.rAQRcIx8MgCGuLjSrOL62Crn66VbNNZpSMWraj8H/IAmDeoFK';
//task x3 arguments the clear and hashed passwords, and an error response
// will give a boolean of true or false
// disable 1 when you run this since you already have the hash
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
});







// //*** Start of original code
// var msg1 = 'Assigned to nYvAcAaZkS by the Most High God !!!';
// var hash = SHA256(msg1).toString();
//
// console.log(`Clear Text Message 01: ${msg1}`);
// console.log(`Hashed Message: ${hash}`);
//
// var data = {
//   id: 13
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secretSalt').toString()
// }
//
// // //simulates man in the middle
// // token.data.id = 6;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secretSalt').toString();
// if (resultHash === token.hash) {
//   console.log('SUCESS: DATA MATCH')
// } else {
//   console.log('DANGER: DATA ERROR DETECTED')
// }
// //** end of original code
