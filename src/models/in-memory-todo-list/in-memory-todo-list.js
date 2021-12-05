const Task = require('./task');

let tasks = [];

const addTask = (title, description = '') => {
    const addedTask = new Task(title, description);
    tasks.push(addedTask);
    return addedTask;
};

const removeTask = (uuid) => {
    const removedTask = tasks.find(task => task.uuid === uuid);
    tasks = tasks.filter(task => task.uuid !== uuid);
    return removedTask;
};

const getTask = (uuid) => {
    return tasks.find(task => task.uuid === uuid);
};

const hasTask = (uuid) => {
    return tasks.some(task => task.uuid === uuid);
};

const toggleTask = (uuid) => {
    const task = getTask(uuid);
    task.toggle();
};

const getTasks =  () => {
    return tasks;
};

module.exports = {
    addTask,
    removeTask,
    getTask,
    hasTask,
    toggleTask,
    getTasks,
}
