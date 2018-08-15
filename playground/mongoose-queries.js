const {ObjectID} = require('mongodb');

//establish a connection to the database and the schema
const {mongooge} = require('./../server/db/mongoose');
const {SmartTask} = require('./../server/models/smarttask');
const {AuthUser} = require('./../server/models/authuser');
// create a static variable
var id = '5b73600c47ed070351242fc3';
var user_id = '5b70cba55f643809dc30c1bd';

//validates if the objectID is valid
if (!ObjectID.isValid(id)) {
  console.log('ERROR: Invalid ID');
}
//this is an array that returns smart tasks
// SmartTask.find({
//   _id: id
// }).then((smarttasks) => {
//   console.log('1. Array of SmartTasks', smarttasks);
// });

AuthUser.find({
  _id: user_id
}).then((authusers) => {
  console.log('1. Array of Authorized Users', authusers);
});

// // this is a method that returns a single task by id specified
// SmartTask.findOne({
//   _id: id
// }).then((smarttask) => {
//   console.log('2. Single SmartTask', smarttask);
// });
// ** end of smart task and start of authuser
// AuthUser.findOne({
//   _id: user_id
// }).then((authuser) => {
//   console.log('2. One Authorized User', authuser);
// });
// // ** end with authuser

//
// // similar to the findOne method, this will return a singleID
// SmartTask.findById(id).then((smarttask) => {
//   if (!smarttask) {
//     return console.log('ERROR: ID Not Found');
//   }
//   //the code to follow displays the error message if the ID is not valid
//   console.log('3. SmartTask By ID', smarttask);
// }).catch((e) => console.log());

AuthUser.findById(user_id).then((authuser) => {
  if (!authuser) {
    return console.log('ERROR: Unable to find user');
  }
  console.log(JSON.stringify(authuser, undefined, 2));
}, (e) => {
  console.log(e);
});
