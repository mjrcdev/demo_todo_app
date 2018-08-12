// MongoDB module v3
const {MongoClient, ObjectID} = require('mongodb');
//connects to the TodoApp database on the local server
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
  db.collection('Todos').find({text: 'Write program'}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
     console.log('ERROR: Unable to display the todos.', err);
  });
  client.close();

});
