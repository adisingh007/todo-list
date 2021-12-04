const uuid = require('uuid');

class Task {
    constructor(title, description = '', completed = false) {
        this.uuid = uuid.v1();
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

module.exports = Task;