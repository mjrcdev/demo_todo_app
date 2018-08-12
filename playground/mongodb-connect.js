// MongoDB module v3
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true},(err, client) => {
  if (err) {
    return console.log('FAILURE: Unable to connect to MongoDB Server');
  }
  console.log('SUCCESS: Connected to MongoDB Server');
  const db = client.db('TodoApp')

  client.close();
});
