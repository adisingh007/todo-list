const Task = require('../task');

let tasks = [];

const addTask = async (title, description = '') => {
    const addedTask = new Task(title, description);
    tasks.push(addedTask);
    return addedTask;
};

const removeTask = async (uuid) => {
    const removedTask = tasks.find(task => task.uuid === uuid);
    tasks = tasks.filter(task => task.uuid !== uuid);
    return removedTask;
};

const getTask = async (uuid) => {
    return tasks.find(task => task.uuid === uuid);
};

const hasTask = async (uuid) => {
    return tasks.some(task => task.uuid === uuid);
};

const toggleTask = async (uuid) => {
    const task = await getTask(uuid);
    task.toggle();
};

const getTasks =  async () => {
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
