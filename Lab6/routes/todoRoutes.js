// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

// --- NEW IMPORT ---
const asyncHandler = require('../middleware/asyncHandler');

// Routes for /api/todos
router.route('/')
  .get(asyncHandler(getAllTodos))     // <-- Wrap with asyncHandler
  .post(asyncHandler(createTodo));   // <-- Wrap with asyncHandler

// --- DYNAMIC ROUTE ---
// This ':id' part is a "dynamic route parameter".
// It allows the route to handle any ID.
// Ex: /api/todos/123, /api/todos/abc, etc.
router.route('/:id')
  .get(asyncHandler(getTodoById))       // <-- Wrap with asyncHandler
  .put(asyncHandler(updateTodo))        // <-- Wrap with asyncHandler
  .delete(asyncHandler(deleteTodo));   // <-- Wrap with asyncHandler

module.exports = router;