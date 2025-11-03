// controllers/todoController.js

const Todo = require('../models/Todo');

// @desc    Create a new todo
// @route   POST /api/todos
exports.createTodo = async (req, res, next) => {
  const { task, priority } = req.body;
  
  // The asyncHandler will catch any validation errors
  const todo = await Todo.create({ task, priority });
  
  res.status(201).json({
    success: true,
    data: todo,
  });
};

// @desc    Get all todos with pagination
// @route   GET /api/todos
exports.getAllTodos = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const total = await Todo.countDocuments();

  const todos = await Todo.find().skip(skip).limit(limit).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: todos.length,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTodos: total,
    },
    data: todos,
  });
};

// @desc    Get a single todo by ID
// @route   GET /api/todos/:id
exports.getTodoById = async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    // If we can't find it, we manually send an error to the error handler
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }

  res.status(200).json({ success: true, data: todo });
};

// @desc    Update a todo by ID
// @route   PUT /api/todos/:id
exports.updateTodo = async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // This will trigger validation errors if body is bad
  });

  res.status(200).json({ success: true, data: todo });
};

// @desc    Delete a todo by ID
// @route   DELETE /api/todos/:id
exports.deleteTodo = async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }

  await todo.deleteOne();

  res.status(200).json({ success: true, data: {} });
};