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
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

todoSchema.index({ priority: 1 });
todoSchema.index({ isCompleted: 1 });

todoSchema.virtual('taskSummary').get(function() {
  return `[${this.task}] - Priority: ${this.priority} (Completed: ${this.isCompleted})`;
});

todoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  console.log('Running pre-save middleware...');
  next();
});

todoSchema.post('save', function(doc, next) {
  console.log(`Todo '${doc.task}' was successfully saved to the database.`);
  next();
});

todoSchema.pre('deleteOne', async function(next) {
  try {
    const docToDelete = await this.model.findOne(this.getFilter());
    console.log(`Todo '${docToDelete.task}' is about to be removed.`);
    next();
  } catch (error) {
    next(error);
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
