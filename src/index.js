const server = require('./server/server');
const todoList = require('./models/mongodb-todo-list/mongodb-todo-list');

const port = process.env.PORT || 3000;
server.setup(todoList).start(port);
