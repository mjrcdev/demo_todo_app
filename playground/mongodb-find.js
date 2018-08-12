// MongoDB module v3
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {

  if (err) {
    return console.log('FAILURE: No connection to MongoDB Server');
  }
  console.log('SUCCESS: Connected to MongoDB Server');
  const db = client.db('TodoApp')

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b6e30750332fc111e631692')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //   console.log('ERROR: Unable to connect to database', err);
  // });

  //uses the cursor count to count the and display the number of todos
  db.collection('Todos').find().count().then((count) => {
    console.log('Total Todos in the database: ${count}');
  }, (err) => {
    console.log('ERROR: Unable to determine number of todos. ', err);
  });

  client.close();

});
