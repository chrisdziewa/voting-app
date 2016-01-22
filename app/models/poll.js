'use strict';
const mongoose = require('mongoose');
const validate = require('mongoose-validator');

// Choices will be stringified json for easier usage
let questionValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 250],
    message: 'Question should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

let choicesValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 40],
    message: 'Minimim of {ARGS[0]} choices and a maximum of {ARGS[1]}  choices for each poll'
  })
];


let pollSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
    validate: questionValidator    
  },
  choices: {
    type: Object,
    required: true,
    validate: choicesValidator
  }
});

let Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;