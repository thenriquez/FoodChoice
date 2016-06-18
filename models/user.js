var Promise = require('bluebird')
var mongoose = Promise.promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  username: {
    type: String,
    minlength: [3, "Username needs to be between 3-20 characters long."],
    maxlength: [20, "Username needs to be between 3-20 characters long."],
    trim: true,
    lowercase: true,
    required: [true, "Username is required to register."],
    unique: [true, "That Username is already taken. :("]
  },
  password: {
    type: String,
    minlength: [8, "Password needs to be between 8-32 characters long."],
    maxlength: [32, "Password needs to be between 8-32 characters long."],
    trim: true,
    required: [true, "Password is required to register."]
  },
  firstName: {
    type: String,
    minlength: [2, "Password needs to be between 2-20 characters long."],
    maxlength: [20, "Password needs to be between 2-20 characters long."],
    trim: true,
    lowercase: true,
    required: [true, "First Name is required to register."]
  },
  lastName: {
    type: String,
    minlength: [2, "Password needs to be between 2-20 characters long."],
    maxlength: [20, "Password needs to be between 2-20 characters long."],
    trim: true,
    lowercase: true,
    required: [true, "Last Name is required to register."]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "A valid Email is required to register."],
    unique: [true, "This email is already in our system. Please try to login."]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  activeAcc: {
    type: Boolean,
    default: true
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});



var User = mongoose.model('User', UserSchema);
module.exports = User;
