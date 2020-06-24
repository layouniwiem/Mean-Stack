const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DemandeSchema = new Schema({
  offre: [
    {
      post: { type: Object, required: true },
     duree: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Demande', DemandeSchema);