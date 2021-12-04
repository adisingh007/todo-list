const server = require('./server');
const TodoList = require('./models/in-memory-todo-list');

const port = process.env.PORT || 3000;
server.setup(new TodoList()).start(port);
