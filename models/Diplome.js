const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiplomeSchema = new Schema({
    tiltle: {
        type: String,
        required: true
      },

    school: {
        type: String,
        required: true
      },
    degree: {
        type: String,
        required: true
      },
    fieldofstudy: {
        type: String,
        required: true
      },
    from: {
        type: Date,
        required: true
      },
    to: {
        type: Date
      },
    current: {
        type: Boolean,
        default: false
      },
    description: {
        type: String
      }
    
});

module.exports = mongoose.model('Diplome', DiplomeSchema);