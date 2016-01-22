'use strict';
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require('bcrypt');

// Validations with mongoose validator
let usernameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
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

// Encrypt password on save
userSchema.pre('save', next => {
  let user = this;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});


let User = mongoose.model('User', userSchema);

module.exports = User;