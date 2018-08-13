var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {SmartTask} = require('./models/smarttask');
var {AuthUser} = require('./models/authuser');

var app = express();

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

app.listen(3000, () => {
  console.log('Application started on port 3000');
});
