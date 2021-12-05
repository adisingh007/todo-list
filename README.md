A TODO app API written in `Nodejs` (uses `express`).

You can:
1. Add task
2. Check/Uncheck task
3. Get all tasks
4. Get a particular task

Phase 1: Uses an in-memory array to store Task objects.  
Phase 2: Design refactor. In-memory ToDo list was tightly coupled to `server.js`.  
        Now `injecting` the todo list as a `dependency` to `server.js`.
Phase 3: Will use `mongodb` instead of in-memory todo list.  
Phase 4 (TODO): Will write a `react` based front end.  
