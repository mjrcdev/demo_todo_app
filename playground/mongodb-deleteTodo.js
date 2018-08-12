const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('FAILURE: Unable to make a DB connection. ');
  }
  console.log('SUCESS: Connected to DB. ');
  const db = client.db('TodoApp')

  //deleteMany Exmaple
  // db.collection('Todos').deleteMany({text: 'Write program'}).then((result) => {
  //   console.log(result);

  // deletOne Exmaple
  // db.collection('Todos').deleteOne({text: 'Write program'}).then((result) => {
  //   console.log(result);

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);

  client.close
  });
});
