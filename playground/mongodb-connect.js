// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log("Connected to MongoDB server");

  // for creating a todo

  // db.collection('Todos').insertOne({
  //   text: "Eat lunch",
  //   completed: true
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert to do", err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // For creating a user

  db.collection("Users").insertOne({
    name: "Manny",
    age: 16,
    location: "Lords"
  }, (error, result) => {
    if (error) {
      return console.log("Error", error);
    }
    // the ops attribute is gonna store all of the docs that were inserted
    console.log(result.ops);
  });
  // Closest the connection with the MongoDB server
  db.close()
});
