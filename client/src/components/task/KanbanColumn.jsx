import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const COLUMN_STYLES = {
  'todo':        'border-gray-300 bg-gray-50',
  'in-progress': 'border-blue-300 bg-blue-50',
  'review':      'border-purple-300 bg-purple-50',
  'completed':   'border-green-300 bg-green-50',
};

const COLUMN_HEADERS = {
  'todo':        { label: 'Todo',        dot: 'bg-gray-400' },
  'in-progress': { label: 'In Progress', dot: 'bg-blue-500' },
  'review':      { label: 'Review',      dot: 'bg-purple-500' },
  'completed':   { label: 'Completed',   dot: 'bg-green-500' },
};

export default function KanbanColumn({ status, tasks, members }) {
  const { label, dot } = COLUMN_HEADERS[status];
  return (
    <div className={`flex flex-col rounded-xl border-2 ${COLUMN_STYLES[status]} min-w-[260px] w-[260px] max-h-[calc(100vh-260px)]`}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-inherit">
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
        <span className="font-semibold text-sm text-gray-700">{label}</span>
        <span className="ml-auto bg-white text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full border border-gray-200">
          {tasks.length}
        </span>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}
            className={`flex-1 overflow-y-auto p-3 space-y-2 transition-colors ${snapshot.isDraggingOver ? 'bg-blue-100/50' : ''}`}>
            {tasks.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.85 : 1 }}>
                    <TaskCard task={task} members={members} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
