const mongoose = require('mongoose');

// Define the schema for a single to-do item
const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true, // The task description is mandatory
    trim: true      // Removes whitespace from both ends
  },
  completed: {
    type: Boolean,
    default: false // New tasks are not completed by default
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the creation date
  }
});

// Create and export the model
// Mongoose will create a collection named 'todos' (pluralizes 'Todo')
module.exports = mongoose.model('Todo', TodoSchema);