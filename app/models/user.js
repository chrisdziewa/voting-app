const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username:  {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password:  {
    type: String,
    required: true
  }
});


var User = mongoose.model('User', userSchema);

module.exports = User;