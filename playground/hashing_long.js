//this uses crypto-js to encrypt some text and simulate a man in the middle
const {SHA256} = require('crypto-js');

var msg1 = 'Assigned to nYvAcAaZkS by the Most High God !!!';
var hash = SHA256(msg1).toString();

console.log(`Clear Text Message 01: ${msg1}`);
console.log(`Hashed Message: ${hash}`);

var data = {
  id: 13
};
var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'secretSalt').toString()
}

// //simulates man in the middle
// token.data.id = 6;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'secretSalt').toString();
if (resultHash === token.hash) {
  console.log('SUCESS: DATA MATCH')
} else {
  console.log('DANGER: DATA ERROR DETECTED')
}
