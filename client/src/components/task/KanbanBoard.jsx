import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { changeTaskStatus } from '../../redux/slices/taskSlice';
import KanbanColumn from './KanbanColumn';
import { TASK_STATUSES } from '../../constants';

export default function KanbanBoard({ members = [] }) {
  const dispatch = useDispatch();
  const { list: tasks } = useSelector((s) => s.tasks);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    dispatch(changeTaskStatus({ id: draggableId, status: destination.droppableId }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {TASK_STATUSES.map((status) => (
          <KanbanColumn key={status} status={status}
            tasks={tasks.filter((t) => t.status === status)} members={members} />
        ))}
      </div>
    </DragDropContext>
  );
}
