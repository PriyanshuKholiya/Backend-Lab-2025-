// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

// Route for getting all todos (with pagination) and creating a new todo
router.route('/')
  .get(getAllTodos)
  .post(createTodo);

// Route for getting, updating, and deleting a single todo by its ID
router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;