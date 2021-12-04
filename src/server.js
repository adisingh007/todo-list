const express = require('express');
const app = express();

const TodoList = require('./models/in-memory-todo-list');
const todoList = new TodoList();

app.use(express.json());

app.get('/', (_, res) => {
    res.status(200);
    res.send('Thakur Software Services - ✅TODO List!');
});

app.post('/todo', (req, res) => {
    const task = req.body.task;
    if(!task) {
        res.status(400);
        res.send('Task not provided');
    } else {
        if(task.title) {
            const taskAdded = todoList.addTask(task.title, task.description);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(taskAdded);
        } else {
            res.status(400);
            res.send('Title not provided!');
        }
    }
});

app.get('/todo', (_, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(todoList.getTasks());
});

app.get('/todo/:uuid', (req, res) => {
    if(todoList.hasTask(req.params.uuid)) {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(todoList.getTask(req.params.uuid));
    } else {
        res.status(404);
        res.send(`Task ${req.params.uuid} not found!`);
    }
});

app.patch('/todo/:uuid', (req, res) => {
    if(todoList.hasTask(req.params.uuid)) {
        todoList.toggleTask(req.params.uuid);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(todoList.getTask(req.params.uuid));
    } else {
        res.status(404);
        res.send(`Task ${req.params.uuid} not found!`);
    }
});

app.delete('/todo/:uuid', (req, res) => {
    if(todoList.hasTask(req.params.uuid)) {
        todoList.removeTask(req.params.uuid);
        res.status(200);
        res.send(`Task ${req.params.uuid} removed!`);
    } else {
        res.status(404);
        res.send(`Task ${req.params.uuid} not found!`);
    }
});

module.exports = {
    start: (port) => {
        app.listen(port, () => console.log(`Server up and running on port ${port}`));
    }
};
