const jwt = require('jsonwebtoken');

var data = {
  id: 13
};

var token = jwt.sign(data, 'nYvAcAaZkS was the last known route');
console.log(token);

var decoded = jwt.verify(token, 'nYvAcAaZkS was the last known route');
console.log('decoded', decoded);

//jwt.sign
//jwt.verify
