import Todo from '../models/todo.js';

// An object that contains all our database logic for Todos
const todoRepository = {
  // CREATE a new to-do item
  create: async (taskData) => {
    const todo = new Todo(taskData);
    return await todo.save();
  },

  // READ all to-do items
  getAll: async () => {
    return await Todo.find().sort({ createdAt: -1 });
  },

  // READ a single to-do item by its ID
  getById: async (id) => {
    return await Todo.findById(id);
  },

  // UPDATE a to-do item by its ID
  update: async (id, updateData) => {
    return await Todo.findByIdAndUpdate(id, updateData, { new: true });
  },

  // DELETE a to-do item by its ID
  delete: async (id) => {
    return await Todo.findByIdAndDelete(id);
  },
};

export default todoRepository;
