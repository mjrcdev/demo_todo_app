
var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {SmartTask} = require('./models/smarttask');
var {AuthUser} = require('./models/authuser');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/tasks', (req, res) => {
  var task = new SmartTask({
    text: req.body.text
  });

  task.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
//get all tasks
app.get('/tasks', (req, res) => {
  SmartTask.find().then((tasks) => {
    res.send({tasks});
  }, (e) => {
    res.statue(400).send(e);
  });
});

//challenge using params and key value pairs
// created on 8-14
app.get('/tasks/:id', (req, res) => {
  // id variable from params id
  var id = req.params.id;
  //ID validation
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  SmartTask.findById(id).then((task) => {
    if(!task) {
      return res.status(404).send();
    }
    res.send({task});
  }).catch((e) => {
    res.status(400).send();
  });
});

//delete function
app.delete('/tasks/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  SmartTask.findByIdAndRemove(id).then((task) => {
    if(!task) {
      return res.status(404).send();
    }

    res.send(task);
  }).catch((e) => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

//need to export for testing
module.exports = {app};
