var mongoose = require('mongoose');
// create AuthUser model
var SmartTask = mongoose.model('SmartTask', {
  text: {
    type: String,
    required: true,
    minlengh: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {SmartTask};

// //create SmartTask
// var newSmartTask = new SmartTask({
//   text: '    Is this a Random Sample SmartTask. '
// });
//
// /// SmartTask added to the Database
// newSmartTask.save().then((doc) => {
//   console.log('SUCCESS: SmartTask saved', doc);
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('ERROR: Unable to save SmartTask')
//  });
