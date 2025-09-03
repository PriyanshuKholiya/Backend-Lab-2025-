const express = require('express');
const app = express();
const port = 5000;


app.use(express.json());

let todos = [
    { id: 1, task: 'Learn Backend Basics', completed: true },
    { id: 2, task: 'Build a simple API', completed: false }
];
let nextId = 3;



// GET 
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST
app.post('/todos', (req, res) => {
    const newTodo = {
        id: nextId++,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT 
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

// DELETE 
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