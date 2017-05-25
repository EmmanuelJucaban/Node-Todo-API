var env = process.env.NODE_ENV || 'development';

console.log("env ****", env);
// Runs so we use a different database depending on which environment we're in
if (env === "development") {
  // if it's in development, set port to 3000
  process.env.PORT  = 3000;
  // Sets the mongo database to TodoApp
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === "test") {
  // if in test, set port to 3000
  process.env.PORT = 3000;
  // Sets mongo database TodoAppTest
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
