// process.env.NODE_ENV is only set if its on heroku
// otherwise it will be set to development if not on heroku
var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] =  envConfig[key];
  });
}
