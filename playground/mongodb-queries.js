const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '590fe2ccbe0f3c1a49bf205a';

Todo.find({
  _id: id
}).then((todos) => {
  console.log('todos', todos);
});


Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('todo', todo);
});


Todo.findById(id).then((todo) => {
  console.log('todo', todo);
});
