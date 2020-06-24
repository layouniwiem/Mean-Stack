const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RoleSchema = new Schema(
  {
  
    _id : {
      type : Number
    },
    name :{
      type: String,
      default: 'admin'

    } 
    
    },
    {
    _id :{
      type : Number,
      default: 2
    },
    name :{
      type: String,
      default: 'recruter'
    }
    },
    {
    _id :{
      type : Number,
      default: 3

    },
    name :{
      type: String,
      default: 'admin'
    }}
);

module.exports = Role = mongoose.model('role', RoleSchema);