// MongoDB module v3
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'ammon', age: 51};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
  if (err) {
    return console.log('FAILURE: Unable to connect to MongoDB Server');
  }
  console.log('SUCCESS: Connected to MongoDB Server');
  const db = client.db('TodoApp')

  // db.collection('Todos').insertOne({
  //   text: 'Replace with a task',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('ALERT: Unable to insert into Todo.', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new document into Users (name, age, location)
  // db.collection('SysUsers').insertOne({
  //   name: 'JW',
  //   age: 50,
  //   location: 'KS'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('ALERT: Unable to add user to SysUsers.', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  client.close();
});
