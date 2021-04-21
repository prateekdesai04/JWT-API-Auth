const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 7,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Users', UserSchema);
