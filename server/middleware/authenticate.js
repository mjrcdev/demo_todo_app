//import the AutherUser model
var {AuthUser} = require('./../models/authuser');

// this is the middleware code 
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  AuthUser.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();

  }).catch((e) => {
    res.status(401).send();
  });
};

//export authenticate so that it can be used by other modules
module.exports = {authenticate};
