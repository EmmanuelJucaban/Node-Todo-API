const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }

  // db.collection("Todos").find({
  //   // Since the id is not a string, we need to use this function to turn it into an object
  //   _id: new ObjectID('5906b2c24aaef7ab0f5a4969')
  // }).toArray().then((docs) => {
  //   console.log("Todos");
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log("Unable to find Todos", err);
  // });

  db.collection("Users").find({
    age: 16
  }).toArray().then((docs) => {
    console.log(`Here is all all the Manny with age of 17`);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("Unable to find the count", err);
  });
  console.log("connected to mongo server");
  db.close()
});
