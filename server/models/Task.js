import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    project:     { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignees:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    priority:    { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status:      { type: String, enum: ['todo', 'in-progress', 'review', 'completed'], default: 'todo' },
    dueDate:     { type: Date, default: null },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
