// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProject, addMember, removeMember } from '../redux/slices/projectSlice';
// import { fetchTasks, createTask } from '../redux/slices/taskSlice';
// import Loader      from '../components/ui/Loader';
// import Button      from '../components/ui/Button';
// import Modal       from '../components/ui/Modal';
// import Avatar      from '../components/ui/Avatar';
// import Input       from '../components/ui/Input';
// import TaskForm    from '../components/task/TaskForm';
// import KanbanBoard from '../components/task/KanbanBoard';

// export default function ProjectDetailPage() {
//   const { id }     = useParams();
//   const dispatch   = useDispatch();
//   const navigate   = useNavigate();
//   const { current: project, loading } = useSelector((s) => s.projects);
//   const { user }   = useSelector((s) => s.auth);

//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [memberInput,   setMemberInput]   = useState('');
//   const [addingMember,  setAddingMember]  = useState(false);

//   useEffect(() => {
//     dispatch(fetchProject(id));
//     dispatch(fetchTasks({ project: id }));
//   }, [dispatch, id]);

//   const isOwner = project?.owner?._id === user?._id || project?.owner === user?._id;

//   const handleAddMember = async () => {
//     if (!memberInput.trim()) return;
//     setAddingMember(true);
//     await dispatch(addMember({ id, userId: memberInput.trim() }));
//     setMemberInput('');
//     setAddingMember(false);
//   };

//   const handleCreateTask = async (data) => {
//     const res = await dispatch(createTask({ ...data, project: id }));
//     if (!res.error) setShowTaskModal(false);
//   };

//   if (loading || !project) return <Loader />;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-start justify-between">
//         <div>
//           <button onClick={() => navigate('/projects')} className="text-sm text-gray-500 hover:text-gray-700 mb-1 flex items-center gap-1">
//             ← Projects
//           </button>
//           <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
//           {project.description && <p className="text-sm text-gray-500 mt-1">{project.description}</p>}
//         </div>
//         <Button onClick={() => setShowTaskModal(true)}>+ New Task</Button>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-100 p-5">
//         <h2 className="font-semibold text-gray-700 mb-3">Team Members</h2>
//         <div className="flex flex-wrap gap-3">
//           {project.members?.map((m) => (
//             <div key={m._id || m} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
//               <Avatar src={m.avatar?.url} name={m.name} size="sm" />
//               <span className="text-sm text-gray-700">{m.name || m}</span>
//               {isOwner && (m._id || m) !== user?._id && (
//                 <button onClick={() => dispatch(removeMember({ id, userId: m._id || m }))}
//                   className="text-red-400 hover:text-red-600 text-xs ml-1">✕</button>
//               )}
//             </div>
//           ))}
//         </div>
//         {isOwner && (
//           <div className="flex gap-2 mt-4">
//             <Input placeholder="Paste user ID to add as member" value={memberInput}
//               onChange={(e) => setMemberInput(e.target.value)} className="max-w-xs" />
//             <Button onClick={handleAddMember} loading={addingMember} size="sm">Add</Button>
//           </div>
//         )}
//       </div>

//       <KanbanBoard members={project.members || []} />

//       <Modal open={showTaskModal} onClose={() => setShowTaskModal(false)} title="New Task">
//         <TaskForm onSubmit={handleCreateTask} members={project.members || []} />
//       </Modal>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProject,
//   addMember,
//   removeMember,
// } from "../redux/slices/projectSlice";
// import { fetchTasks, createTask } from "../redux/slices/taskSlice";
// import Loader from "../components/ui/Loader";
// import Button from "../components/ui/Button";
// import Modal from "../components/ui/Modal";
// import Avatar from "../components/ui/Avatar";
// import Input from "../components/ui/Input";
// import TaskForm from "../components/task/TaskForm";
// import KanbanBoard from "../components/task/KanbanBoard";

// export default function ProjectDetailPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { current: project, loading } = useSelector((s) => s.projects);
//   const { user } = useSelector((s) => s.auth);

//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [memberInput, setMemberInput] = useState("");
//   const [addingMember, setAddingMember] = useState(false);

//   useEffect(() => {
//     dispatch(fetchProject(id));
//     dispatch(fetchTasks({ project: id }));
//   }, [dispatch, id]);

//   const isOwner =
//     project?.owner?._id === user?._id || project?.owner === user?._id;

//   const handleAddMember = async () => {
//     if (!memberInput.trim()) return;
//     setAddingMember(true);
//     await dispatch(addMember({ id, userId: memberInput.trim() }));
//     setMemberInput("");
//     setAddingMember(false);
//   };

//   const handleCreateTask = async (data) => {
//     const res = await dispatch(createTask({ ...data, project: id }));
//     if (!res.error) setShowTaskModal(false);
//   };

//   if (loading || !project) return <Loader />;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-start justify-between">
//         <div>
//           <button
//             onClick={() => navigate("/app/projects")}
//             className="text-sm text-gray-500 hover:text-gray-700 mb-1 flex items-center gap-1">
//             ← Projects
//           </button>
//           <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
//           {project.description && (
//             <p className="text-sm text-gray-500 mt-1">{project.description}</p>
//           )}
//         </div>
//         <Button onClick={() => setShowTaskModal(true)}>+ New Task</Button>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-100 p-5">
//         <h2 className="font-semibold text-gray-700 mb-3">Team Members</h2>
//         <div className="flex flex-wrap gap-3">
//           {project.members?.map((m) => (
//             <div
//               key={m._id || m}
//               className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
//               <Avatar src={m.avatar?.url} name={m.name} size="sm" />
//               <span className="text-sm text-gray-700">{m.name || m}</span>
//               {isOwner && (m._id || m) !== user?._id && (
//                 <button
//                   onClick={() =>
//                     dispatch(removeMember({ id, userId: m._id || m }))
//                   }
//                   className="text-red-400 hover:text-red-600 text-xs ml-1">
//                   ✕
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         {isOwner && (
//           <div className="flex gap-2 mt-4">
//             <Input
//               placeholder="Paste user ID to add as member"
//               value={memberInput}
//               onChange={(e) => setMemberInput(e.target.value)}
//               className="max-w-xs"
//             />
//             <Button onClick={handleAddMember} loading={addingMember} size="sm">
//               Add
//             </Button>
//           </div>
//         )}
//       </div>

//       <KanbanBoard members={project.members || []} />

//       <Modal
//         open={showTaskModal}
//         onClose={() => setShowTaskModal(false)}
//         title="New Task">
//         <TaskForm onSubmit={handleCreateTask} members={project.members || []} />
//       </Modal>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../redux/slices/projectSlice";
import { fetchTasks, createTask } from "../redux/slices/taskSlice";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Avatar from "../components/ui/Avatar";
import TaskForm from "../components/task/TaskForm";
import KanbanBoard from "../components/task/KanbanBoard";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { current: project, loading } = useSelector((s) => s.projects);

  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProject(id));
    dispatch(fetchTasks({ project: id }));
  }, [dispatch, id]);

  const handleCreateTask = async (data) => {
    const res = await dispatch(createTask({ ...data, project: id }));
    if (!res.error) setShowTaskModal(false);
  };

  if (loading || !project) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate("/app/projects")}
            className="text-sm text-gray-500 hover:text-gray-700 mb-1 flex items-center gap-1">
            ← Projects
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
          {project.description && (
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          )}
        </div>
        <Button onClick={() => setShowTaskModal(true)}>+ New Task</Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-700 mb-3">Team Members</h2>
        <div className="flex flex-wrap gap-3">
          {project.members?.map((m) => (
            <div
              key={m._id || m}
              className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <Avatar src={m.avatar?.url} name={m.name} size="sm" />
              <span className="text-sm text-gray-700">{m.name || m}</span>
            </div>
          ))}
        </div>
      </div>

      <KanbanBoard members={project.members || []} />

      <Modal
        open={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title="New Task">
        <TaskForm onSubmit={handleCreateTask} members={project.members || []} />
      </Modal>
    </div>
  );
}
