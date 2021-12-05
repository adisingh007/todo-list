const Task = require('./task');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'todo-list';
const collectionName = 'tasks';

async function useDB(command, collectionName) {
    const mongoClient = new MongoClient(url);
    try {
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);
        return await command(collection);
    } catch(ex) {
        console.error(ex);
    } finally {
        mongoClient.close();
    }
}

const addTask = async (title, description = '') => {
    return await useDB(async collection => await collection.insertOne(new Task(title, description)), collectionName);
};

const removeTask = async (uuid) => {
    const removedTask = await getTask(uuid);
    await useDB(async collection => await collection.deleteOne({uuid}), collectionName);
    return removedTask;
};

const getTask = async (uuid) => {
    return await useDB(async collection => await collection.findOne({uuid}), collectionName);
};

const hasTask = async (uuid) => {
    return await useDB(async collection => await collection.findOne({uuid}), collectionName);
};

const toggleTask = async (uuid) => {
    const task = await getTask(uuid);
    task.completed = !task.completed;
    await useDB(async collection => await collection.updateOne({uuid}, {'$set': {completed: task.completed}}), collectionName);
    return task;
};

const getTasks =  async () => {
    return await useDB(async collection => await collection.find({}).toArray(), collectionName);
};

module.exports = {
    addTask,
    removeTask,
    getTask,
    hasTask,
    toggleTask,
    getTasks,
}
