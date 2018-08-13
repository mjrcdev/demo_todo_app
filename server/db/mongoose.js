var mongoose = require('mongoose');
//configure global promise, database connection, and model
mongoose.Promise = global.Promise;
//connection to the database
mongoose.connect('mongodb://localhost:27017/TaskSmart', { useNewUrlParser: true });
module.exports = {mongoose};
