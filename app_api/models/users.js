const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = mongoose.model('User', userSchema);
