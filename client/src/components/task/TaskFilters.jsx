export default function TaskFilters({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <input type="text" placeholder="Search tasks..." value={filters.search || ''}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        className="flex-1 min-w-[180px] px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
      <select value={filters.status || ''} onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="review">Review</option>
        <option value="completed">Completed</option>
      </select>
      <select value={filters.priority || ''} onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
