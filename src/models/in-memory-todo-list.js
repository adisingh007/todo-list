const Task = require('./task');

class InMemoryTodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(title, description = '') {
        const addedTask = new Task(title, description);
        this.tasks.push(addedTask);
        return addedTask;
    }

    removeTask(uuid) {
        const removedTask = this.tasks.find(task => task.uuid === uuid);
        this.tasks = this.tasks.filter(task => task.uuid !== uuid);
        return removedTask;
    }

    getTask(uuid) {
        return this.tasks.find(task => task.uuid === uuid);
    }

    hasTask(uuid) {
        return this.tasks.some(task => task.uuid === uuid);
    }

    toggleTask(uuid) {
        const task = this.getTask(uuid);
        task.toggle();
    }

    getTasks() {
        return this.tasks;
    }
}

module.exports = InMemoryTodoList;
