require('./config/config');

var express = require('express');
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Post to add a todo
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// Get all todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});


// Get a speficic todo by ID

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// DELETE a todo by a specific id
app.delete('/todos/:id', authenticate, async (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  try {
    const todo = await Todo.findOneAndRemove({_id: id, _creator: req.user._id});
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  } catch(e) {
    res.status(404).send();
  }
});


// PATCH Update a todo by ID
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);


  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user.id },{$set: body}, {new: true}).then((todo) => {
    if (!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch(e => res.status(400).send());
});


// POST /users
app.post("/users", async (req, res) => {
  try {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);
    await user.save();
    var token = user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users/me', authenticate, (req, res, next) => {
  res.send(req.user);
});

app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }
});


app.listen(port, () => {
  console.log(`Server has started on port: ${port }`);
});


module.exports = {app};
