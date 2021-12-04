const express = require('express');
const uuid = require('uuid');
const app = express();

const todoList = [];

class Todo {
    constructor(title, description = "", completed = false) {
        this.uuid = uuid.v1();
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Thakur Software Services - ✅TODO List!');
});

app.put('/todo', (req, res) => {
    const tasks = req.body.tasks;
    if(!tasks) {
        res.status(400);
        res.send("Tasks not provided");
    } else {
        const response = {
            success: [],
            error: []
        };
        tasks.forEach(task => {
            if(task.title) {
                const todo = new Todo(task.title, task.description);
                todoList.push(todo);
                response.success.push(todo);
            } else {
                response.error.push(task);
            }
        });
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
    }
});

app.get('/todo', (_, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(todoList);
});

app.post('/todo/markComplete/:uuid', (req, res) => {
    const todo = todoList.find(todo => todo.uuid === req.params.uuid);
    if(todo) {
        if(!todo.completed) {
            todo.completed = true;
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(todo);
        } else {
            res.status(409);
            res.send(`Task ${req.params.uuid} already marked complete!`);
        }
    } else {
        res.status(404);
        res.send(`Task ${req.params.uuid} not found`);
    }
});

app.post('/todo/markInomplete/:uuid', (req, res) => {
    const todo = todoList.find(todo => todo.uuid === req.params.uuid);
    if(todo) {
        if(todo.completed) {
            todo.completed = false;
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(todo);
        } else {
            res.status(409);
            res.send(`Task ${req.params.uuid} already marked incomplete!`);
        }
    } else {
        res.status(404);
        res.send(`Task ${req.params.uuid} not found!`);
    }
});

const port = 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
