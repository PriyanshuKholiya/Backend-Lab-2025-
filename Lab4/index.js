const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

let todos = [
    { id: 1, task: 'Learn Backend Basics', completed: true },
    { id: 2, task: 'Build a simple API', completed: false }
];
let nextId = 3;

// 4. Define API Routes (Endpoints)

// GET /todos - Get all to-do items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos - Create a new to-do item
app.post('/todos', (req, res) => {
    const newTodo = {
        id: nextId++,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id - Update a to-do item
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.task = req.body.task || todo.task;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    } else {
        res.status(404).send('To-do not found');
    }
});

// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).send('To-do not found');
    }
});


// 5. Start the server
app.listen(port, () => {
    console.log(`To-Do API listening at http://localhost:${port} 🚀`);
});