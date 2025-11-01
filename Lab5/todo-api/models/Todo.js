// models/Todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task is required'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, {
  // Options to enable virtuals in JSON and Object outputs
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// -----------------------------------------
// EXPERIMENT REQUIREMENT 1: INDEXING
// -----------------------------------------
// Creates an index on 'priority' and 'isCompleted' for faster queries.
// This is crucial for performance when you filter or sort by these fields.
todoSchema.index({ priority: 1 });
todoSchema.index({ isCompleted: 1 });

// -----------------------------------------
// EXPERIMENT REQUIREMENT 2: VIRTUALS
// -----------------------------------------
// A 'virtual' property is not saved in the database.
// It's computed on the fly.
todoSchema.virtual('taskSummary').get(function() {
  // 'this' refers to the document
  return `[${this.task}] - Priority: ${this.priority} (Completed: ${this.isCompleted})`;
});

// -----------------------------------------
// EXPERIMENT REQUIREMENT 3: TRIGGERS (Middleware)
// -----------------------------------------

// 1. 'pre' save middleware (a "trigger" that runs *before* saving)
// We use this to automatically update the 'updatedAt' timestamp.
todoSchema.pre('save', function(next) {
  // 'this' refers to the document being saved
  this.updatedAt = Date.now();
  console.log('Running pre-save middleware...');
  next(); // Call next() to continue to the save operation
});

// 2. 'post' save middleware (a "trigger" that runs *after* saving)
// We can use this for logging.
todoSchema.post('save', function(doc, next) {
  // 'doc' is the document that was just saved
  console.log(`Todo '${doc.task}' was successfully saved to the database.`);
  next(); // Call next() to finish
});

// 3. 'pre' remove middleware (a "trigger" that runs *before* deleting)
todoSchema.pre('remove', function(next) {
  console.log(`Todo '${this.task}' is about to be removed.`);
  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;