'use strict';
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');

//=== Validations with mongoose validator ====
let usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 32],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: false,
    message: 'Name should contain alpha-numeric characters only'
  })
];

let emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Email is invalid'
  })
]

let passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 32],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

// ==== Schema Design ====

let userSchema = mongoose.Schema({
  username:  {
    type: String,
    required: true,
    unique: true,
    index: {
      unique: true
    },
    validate: usernameValidator
  },
  lowercase_name: {
    type: String,
    unique: true,
    select: false
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: emailValidator
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

// ==== Before Save Middleware ====

// Encrypt password on save
// Use of function instead of ES6 since a bug prevented the function from running
userSchema.pre('save', function(next) {
  let user = this;

  if (user.isModified('username') || user.isNew) {
    user.lowercase_name = user.username.toLowerCase();
  }

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return console.error(err);
      }
      user.password = hash;
      next();
    });
  });
});

// ==== Methods ====
userSchema.methods.comparePassword = function(password) {
  let user = this;
  return bcrypt.compareSync(password, user.password);
}

let User = mongoose.model('User', userSchema);

module.exports = User;
