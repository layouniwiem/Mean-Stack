const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true
      },
      response: {
        type: String
      }
});

module.exports = mongoose.model('Question', QuestionSchema);