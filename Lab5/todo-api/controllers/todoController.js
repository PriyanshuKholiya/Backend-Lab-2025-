// controllers/todoController.js

const Todo = require('../models/Todo');

// @desc    Create a new todo
// @route   POST /api/todos
exports.createTodo = async (req, res) => {
  try {
    const { task, priority } = req.body;
    const todo = await Todo.create({ task, priority });
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all todos with pagination
// @route   GET /api/todos
exports.getAllTodos = async (req, res) => {
  try {
    // -----------------------------------------
    // EXPERIMENT REQUIREMENT 4: PAGINATION
    // -----------------------------------------
    // Get page and limit from query string, with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the 'skip' value
    const skip = (page - 1) * limit;

    // Get total document count for pagination metadata
    const total = await Todo.countDocuments();

    // Find todos for the current page
    const todos = await Todo.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest

    res.status(200).json({
      success: true,
      count: todos.length,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTodos: total
      },
      data: todos
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get a single todo by ID
// @route   GET /api/todos/:id
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    // Notice the 'taskSummary' virtual property will be present in the response
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a todo by ID
// @route   PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Run schema validators
    });

    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a todo by ID
// @route   DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    // Note: findByIdAndDelete will not trigger 'pre/post remove' middleware.
    // To trigger it, we must do this:
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(44).json({ success: false, error: 'Todo not found' });
    }

    await todo.remove(); // This triggers the 'remove' middleware in the model

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};