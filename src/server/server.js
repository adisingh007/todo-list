const express = require('express');
const app = express();
app.use(express.json());
const { swaggerSetup, swaggerServe } = require('./swagger-setup');
app.use('/api-docs', swaggerServe, swaggerSetup);

module.exports = {
    setup: (todoList) => {
        /**
         * @swagger
         * /:
         *   get:
         *      description: Returns a simple message representing SUCCESS
         *      responses:
         *        200:
         *          description: Name of the company and application
         */
        app.get('/', async (_, res) => {
            res.send('Thakur Software Services - ✅TODO List!');
        });

        /**
         * @swagger
         * /todo:
         *   post:
         *      description: Add a new task in the todo list
         *      parameters:
         *        - name: task
         *          in: body
         *          description: Task to be added
         *          required: true
         *          schema:
         *              type: object
         *      responses:
         *        200:
         *          description: Returns the added task
         *        400:
         *          description: Returns an error message if task was not provided or `title` is empty
         */
        app.post('/todo', async (req, res) => {
            const task = req.body.task;
            if(!task) {
                res.status(400);
                res.send('Task not provided');
            } else {
                if(task.title) {
                    res.send(await todoList.addTask(task.title, task.description));
                } else {
                    res.status(400);
                    res.send('Title not provided!');
                }
            }
        });

        /**
         * @swagger
         * /todo:
         *   get:
         *      description: Returns all the tasks in the todo list
         *      responses:
         *        200:
         *          description: All the tasks in the todo list
         */
        app.get('/todo', async (_, res) => {
            res.send(await todoList.getTasks());
        });

        /**
         * @swagger
         * /todo/{uuid}:
         *   get:
         *      description: Returns a task by its uuid
         *      parameters:
         *        - in: path
         *          name: uuid
         *          required: true
         *          schema:
         *              type: string
         *          description: uuid of the required task
         *      responses:
         *        200:
         *          description: Returns the task
         *        404:
         *          description: Returns an error message if task is not found
         */
        app.get('/todo/:uuid', async (req, res) => {
            if(todoList.hasTask(req.params.uuid)) {
                res.send(await todoList.getTask(req.params.uuid));
            } else {
                res.status(404);
                res.send(`Task ${req.params.uuid} not found!`);
            }
        });

        /**
         * @swagger
         * /todo/{uuid}:
         *   patch:
         *      description: Toggles the task status by its uuid
         *      parameters:
         *        - in: path
         *          name: uuid
         *          required: true
         *          schema:
         *              type: string
         *          description: uuid of the task to be toggled
         *      responses:
         *        200:
         *          description: Returns the updated task
         *        404:
         *          description: Returns an error message if task is not found  
         */
        app.patch('/todo/:uuid', async (req, res) => {
            if(todoList.hasTask(req.params.uuid)) {
                await todoList.toggleTask(req.params.uuid);
                res.send(await todoList.getTask(req.params.uuid));
            } else {
                res.status(404);
                res.send(`Task ${req.params.uuid} not found!`);
            }
        });

        /**
         * @swagger
         * /todo/{uuid}:
         *   delete:
         *      description: Deletes the task by its uuid
         *      parameters:
         *        - in: path
         *          name: uuid
         *          required: true
         *          schema:
         *              type: string
         *          description: uuid of the task to be deleted
         *      responses:
         *        200:
         *          description: Returns the deleted task
         *        404:
         *          description: Returns an error message if task is not found
         */
        app.delete('/todo/:uuid', async (req, res) => {
            if(await todoList.hasTask(req.params.uuid)) {
                res.send(await todoList.removeTask(req.params.uuid));
            } else {
                res.status(404);
                res.send(`Task ${req.params.uuid} not found!`);
            }
        });

        return {
            start: (port) => {
                app.listen(port, () => console.log(`Server up and running on port ${port}`));
            }
        }
    }
};
