import { useState, useEffect } from 'react';
import Input  from '../ui/Input';
import Button from '../ui/Button';

export default function TaskForm({ initial, onSubmit, loading, members = [] }) {
  const [form, setForm] = useState({
    title: '', description: '', priority: 'medium', status: 'todo', dueDate: '', assignees: [],
  });

  useEffect(() => {
    if (initial) setForm({
      title:       initial.title || '',
      description: initial.description || '',
      priority:    initial.priority || 'medium',
      status:      initial.status || 'todo',
      dueDate:     initial.dueDate ? initial.dueDate.split('T')[0] : '',
      assignees:   initial.assignees?.map((a) => a._id || a) || [],
    });
  }, [initial]);

  const toggleAssignee = (id) => {
    setForm((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(id)
        ? prev.assignees.filter((a) => a !== id)
        : [...prev.assignees, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Task Title *" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Design login page" />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Task details..." rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <Input label="Due Date" type="date" value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />

      {members.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Assignees</label>
          <div className="flex flex-wrap gap-2">
            {members.map((m) => {
              const mid      = m._id || m;
              const selected = form.assignees.includes(mid);
              return (
                <button key={mid} type="button" onClick={() => toggleAssignee(mid)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
                    ${selected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
                  {m.name || mid}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" loading={loading}>
        {initial ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
}
