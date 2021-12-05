const server = require('./server/server');
const todoList = require('./models/in-memory-todo-list/in-memory-todo-list');

const port = process.env.PORT || 3000;
server.setup(todoList).start(port);
