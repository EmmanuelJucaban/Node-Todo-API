const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'user1@test.com',
    password: 'user1pass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, '123secret').toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'user2@test.com',
    password: 'user2pass'
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo",
    completed: true,
    completedAt: '333'
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: false,
    completedAt: null
  }
];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const user1 = new User(users[0]).save();
    const user2 = new User(users[1]).save();

    return Promise.all([user1, user2])
  }).then(() => done());
};

module.exports = { todos, users, populateUsers, populateTodos };
