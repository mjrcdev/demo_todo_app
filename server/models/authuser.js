const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

// email: needs to be a valid email ex. johndoe@thisemail.gov
//password: need to be encrypted
//
var AuthUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//limits what is displayed when a new user is created
AuthUserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

AuthUserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'n0d3d3v3l0pm3nt!@#').toString();

  // ~ original code user.tokens.push({access, token});
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

//08-21-18 Create AuthUserSchema
AuthUserSchema.statics.findByToken = function (token) {
  //variable for the model itself
  var AuthUser = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'n0d3d3v3l0pm3nt!@#');
  } catch (e) {
    return Promise.reject();
  }

  return AuthUser.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

AuthUserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


var AuthUser = mongoose.model('AuthUser', AuthUserSchema);

module.exports = {AuthUser};
