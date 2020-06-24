const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateQuestionInput(data) {
  let errors = {};
  data.description = !isEmpty(data.description) ? data.description : '';
  data.response = !isEmpty(data.response) ? data.response : '';
  data.title = !isEmpty(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 10, max: 300 })) {
    errors.title = 'the question must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'question field is required';
  }
  
  if (!Validator.isLength(data.description, { min: 10, max: 300 })) {
    errors.description = 'description must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'description field is required';
  }
  if (!Validator.isLength(data.response, { min: 10, max: 300 })) {
    errors.response = 'response must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.response)) {
    errors.response = 'response field is required';
  }
  

  return {
    errors,
    isValid: isEmpty(errors)
  };

};