export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

export const getPriorityColor = (priority) => {
  const map = {
    low:    'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high:   'bg-red-100 text-red-700',
  };
  return map[priority] || 'bg-gray-100 text-gray-700';
};

export const getStatusColor = (status) => {
  const map = {
    'todo':        'bg-gray-100 text-gray-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'review':      'bg-purple-100 text-purple-700',
    'completed':   'bg-green-100 text-green-700',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
};

export const getInitials = (name = '') =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
