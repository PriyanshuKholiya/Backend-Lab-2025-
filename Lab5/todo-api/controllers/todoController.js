const Todo = require('../models/Todo');

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

exports.getAllTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Todo.countDocuments();
    const todos = await Todo.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

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

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!todo) {
      return res.status(404).json({ success: false, error: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(44).json({ success: false, error: 'Todo not found' });
    }
    await todo.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
