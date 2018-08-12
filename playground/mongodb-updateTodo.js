const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.log('FAILURE: Unable to make a DB connection. ');
  }
  console.log('SUCESS: Connected to DB. ');
  const db = client.db('TodoApp')

  //findOneAndUpdate ~ takes a filter, update, and option
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b70944a0c2db66ef32d71ea')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  //find an update by ID, change name and increment age by 2
  db.collection('TodoUsers').findOneAndUpdate({
    _id: new ObjectID('5b70ab580c2db66ef32d71f1')
  }, {
    $set: {
      name: 'Nobles'
    },
    $inc: {
      age: 2
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })

  client.close
});
