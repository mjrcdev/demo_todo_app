// MongoDB module v3
const {MongoClient, ObjectID} = require('mongodb');
//connects to the Users database on the local server
MongoClient.connect('mongodb://localhost:27017/Users', {useNewUrlParser: true}, (err, client) => {

  if (err) {
    return console.log('FAILURE: No connection to MongoDB Server');
  }
  console.log('SUCCESS: Connected to MongoDB Server');
  const db = client.db('Users')

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b6e30750332fc111e631692')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //   console.log('ERROR: Unable to connect to database', err);
  // });

  //uses the cursor count to count the and display the number of todos
  db.collection('Users').find({name: 'John'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
     console.log('ERROR: Unable to connect to database', err);
  });
  client.close();

});
