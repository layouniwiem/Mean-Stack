const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema({
    questions: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'questions'
        }
      ]
 
});

module.exports = mongoose.model('Test', TestSchema);
