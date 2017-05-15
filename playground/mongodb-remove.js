+const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})

 Todo.remove({}).then((res) => {
   console.log(res);
 });

//
// Find one and delete it

Todo.findOneAndRemove({_id: "12345667"}).then((todo) => {
   console.log(todo);
});


Todo.findByIdAndRemove({'4897987897897'}).then((todo) => {
   console.log(todo);
});
