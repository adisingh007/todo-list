const express = require('express');
const uuid = require('uuid');
const app = express();

const todoList = [];

class Todo {
    constructor(title, description = '', completed = false) {
        this.uuid = uuid.v1();
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}

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
            const todo = new Todo(task.title, task.description);
            todoList.push(todo);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(todo);
        } else {
            res.status(400);
            res.send('Title not provided!');
        }
    }
});

app.get('/todo', (_, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(todoList);
});

app.get('/todo/:uuid', (req, res) => {
    const todo = todoList.find(todo => todo.uuid === req.params.uuid);
    if(todo) {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(todo);
    } else {
        res.status(404);
        res.send(`Task ${req.params.uuid} not found!`);
    }
});

app.patch('/todo/:uuid', (req, res) => {
    const todo = todoList.find(todo => todo.uuid === req.params.uuid);
    if(todo) {
        todo.completed = !todo.completed;
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(todo);
    } else {
        res.status(404);
        res.send(`Task ${req.params.uuid} not found`);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
