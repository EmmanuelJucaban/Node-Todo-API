const { MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {

  if (err) {
    return console.log("Unable to connect to server", err);
  }

  // delete many
  db.collection("Todos").deleteMany({
    text: "Eat lunch"
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log("Unable to delete todos");
  });

  // delete one. Note that this deletes the first item it sees in the criteria and then stops

  // findOneAndDelete

  console.log("Connected to MongoDB server");

  // db.close()
});
