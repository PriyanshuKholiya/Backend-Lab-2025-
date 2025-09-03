const express = require('express');
const connectDB = require('./config/db');
const todoRepository = require('./repositories/todoRepository');

// Initialize app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to Database
connectDB();

// --- API ROUTES ---

// CREATE a new To-Do Item 📝
app.post('/todos', async (req, res) => {
  try {
    const newTodo = await todoRepository.create({ task: req.body.task });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating to-do item', error });
  }
});

// GET all To-Do Items
app.get('/todos', async (req, res) => {
  try {
    const todos = await todoRepository.getAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching to-do items', error });
  }
});

// UPDATE a To-Do Item
app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await todoRepository.update(req.params.id, req.body);
    if (!updatedTodo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating to-do item', error });
  }
});

// DELETE a To-Do Item
app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await todoRepository.delete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }
    res.status(200).json({ message: 'To-do item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting to-do item', error });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));