import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../../redux/slices/taskSlice';
import Badge          from '../ui/Badge';
import Avatar         from '../ui/Avatar';
import Modal          from '../ui/Modal';
import TaskForm       from './TaskForm';
import { getPriorityColor, getStatusColor, formatDate } from '../../utils/helpers';

export default function TaskCard({ task, members = [] }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { loading } = useSelector((s) => s.tasks);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit,   setShowEdit]   = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this task?')) dispatch(deleteTask(task._id));
  };

  const handleEdit = async (data) => {
    const res = await dispatch(updateTask({ id: task._id, data }));
    if (!res.error) setShowEdit(false);
  };

  const isCreator = task.createdBy?._id === user?._id || task.createdBy === user?._id;

  return (
    <>
      <div onClick={() => setShowDetail(true)}
        className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer">
        <p className="text-sm font-medium text-gray-800 mb-2 leading-snug">{task.title}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
          {task.dueDate && <Badge className="bg-gray-100 text-gray-600">{formatDate(task.dueDate)}</Badge>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-1">
            {task.assignees?.slice(0, 3).map((a) => (
              <Avatar key={a._id || a} src={a.avatar?.url} name={a.name} size="sm" />
            ))}
          </div>
          {isCreator && (
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button onClick={(e) => { e.stopPropagation(); setShowEdit(true); }}
                className="text-xs text-blue-500 hover:text-blue-700 px-1.5 py-0.5 rounded hover:bg-blue-50">Edit</button>
              <button onClick={handleDelete}
                className="text-xs text-red-500 hover:text-red-700 px-1.5 py-0.5 rounded hover:bg-red-50">Del</button>
            </div>
          )}
        </div>
      </div>

      <Modal open={showDetail} onClose={() => setShowDetail(false)} title={task.title}>
        <div className="space-y-4">
          {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
          <div className="flex flex-wrap gap-2">
            <Badge className={getPriorityColor(task.priority)}>Priority: {task.priority}</Badge>
            <Badge className={getStatusColor(task.status)}>Status: {task.status}</Badge>
            {task.dueDate && <Badge className="bg-gray-100 text-gray-600">Due: {formatDate(task.dueDate)}</Badge>}
          </div>
          {task.assignees?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">ASSIGNEES</p>
              <div className="flex flex-wrap gap-2">
                {task.assignees.map((a) => (
                  <div key={a._id || a} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
                    <Avatar src={a.avatar?.url} name={a.name} size="sm" />
                    <span className="text-xs text-gray-700">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal open={showEdit} onClose={() => setShowEdit(false)} title="Edit Task">
        <TaskForm initial={task} onSubmit={handleEdit} loading={loading} members={members} />
      </Modal>
    </>
  );
}
