const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }, // Unique do not validate input
  password: {
    type: String,
    required: true
  },
});

userSchema.plugin(uniqueValidator); // Validates input while saving data imto database
module.exports = mongoose.model('User', userSchema);
