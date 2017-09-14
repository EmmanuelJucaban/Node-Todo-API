const {User} = require('./../models/user');
var authenticate = (req, res, next) => {
  // grab the x-auth value from the request header
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user) {
      // This will automatically execute the catch method
      return Promise.reject();
    }
    // modify the request object for the next function call
    // set the request.user to the user we found
    req.user = user;
    // set request.token to the token header
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
