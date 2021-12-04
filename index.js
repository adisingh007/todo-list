const express = require('express');
const app = express();

const todoList = [];

app.use(express.json());

app.get('/', (_, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Thakur Software Services</h1><br>✅TODO List!');
});

app.post('/todo', (req, res) => {
    const todo = req.body.task;

    if(!todo) {
        res.status(400);
        res.setHeader('Content-Type', 'text/html');
        res.send("<div align='center'>No task provided</div>");
    } else{
        todoList.push(req.body.task);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send({
            taskAdded: todo,
        });
    }
});

app.get('/todo', (_, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(todoList);
});

const port = 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
