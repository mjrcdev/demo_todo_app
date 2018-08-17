const {ObjectID} = require('mongodb');
//establish a connection to the database and the schema
const {mongooge} = require('./../server/db/mongoose');
const {SmartTask} = require('./../server/models/smarttask');
const {AuthUser} = require('./../server/models/authuser');

//Ex. 1 Removes all TaskSmarts
SmartTask.remove({}).then((result) => {
  console.log(result);
});

// //SmartTask.findByIdAndRemove
// SmartTask.findByIdAndRemove('5b7630c958cad7046ec2da80').then((smarttask) => {
//   console.log(smarttask);
// });
