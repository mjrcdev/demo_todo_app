var mongoose = require('mongoose');
// create AuthUser model
var AuthUser = mongoose.model('AuthUser', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  }
});
// //create AuthUser
// var authUser = new AuthUser({
//   email: 'info@gmail.com'
// });
//
// /// AuthUser added to the Database
// authUser.save().then((doc) => {
//   console.log('SUCCESS: New AuthUser has been added', doc);
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('ERROR: Unable to add AuthUser.', e)
// });
module.exports = {AuthUser};
