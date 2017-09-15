const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// This allows us to add methods to the model
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// this overrides the toJSON method that gets called when we return our User
// so that it only returns some properties instead of the whole object
UserSchema.methods.toJSON = function () {
  var user = this;
  // responsible for taking the user and converting it to a regular Object
  var userObject =  user.toObject();

  return _.pick(userObject, ["_id", 'email']);
};
// We can add instance methods to the schema by accessing the methods property
// We need to bind this to the individual document
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  // also add the accesss property using ES6 which is the string auth
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();

  // push these properties into the tokens array in the schema
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

// .statics adds or modifies a model method
UserSchema.statics.findByToken = function(token) {
  var User = this;
  let decoded;

  try {
    // verify will throw an error if anything goes wrong
    decoded = jwt.verify(token, 'secret');
  } catch (e) {
    // shorthand for just returning a reject promise
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    // to query a nested document, we have to wrap our value in quotes
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
