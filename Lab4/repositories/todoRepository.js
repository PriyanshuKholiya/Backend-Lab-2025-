import Todo, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/todo.js';

// An object that contains all our database logic for Todos
const todoRepository = {
  // CREATE a new to-do item
  create: async (taskData) => {
    const todo = new Todo(taskData);
    return await todo.save();
  },

  // READ all to-do items
  getAll: async () => {
    // .sort({ createdAt: -1 }) shows the newest tasks first
    return await find().sort({ createdAt: -1 });
  },

  // READ a single to-do item by its ID
  getById: async (id) => {
    return await findById(id);
  },

  // UPDATE a to-do item by its ID
  update: async (id, updateData) => {
    // { new: true } returns the modified document instead of the original
    return await findByIdAndUpdate(id, updateData, { new: true });
  },

  // DELETE a to-do item by its ID
  delete: async (id) => {
    return await findByIdAndDelete(id);
  },
};

export default todoRepository;