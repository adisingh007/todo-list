const express = require('express');
const app = express();

const todoList = [];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Thakur Software Services - TODO List!');
});

app.post('/todo', (req, res) => {
    const todo = req.body.task;

    if(!todo) {
        res.status(400);
        res.send("No task provided");
    } else{
        todoList.push(req.body.task);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send({
            taskAdded: todo,
        });
    }
});

app.get('/todo', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(todoList);
});

const port = 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
