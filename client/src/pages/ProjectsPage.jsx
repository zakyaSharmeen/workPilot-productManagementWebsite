import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '../redux/slices/projectSlice';
import ProjectCard from '../components/project/ProjectCard';
import ProjectForm from '../components/project/ProjectForm';
import Modal      from '../components/ui/Modal';
import Button     from '../components/ui/Button';
import Loader     from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { list: projects, loading } = useSelector((s) => s.projects);
  const { user } = useSelector((s) => s.auth);
  const [showModal,   setShowModal]   = useState(false);
  const [editTarget,  setEditTarget]  = useState(null);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const handleCreate = async (data) => {
    const res = await dispatch(createProject(data));
    if (!res.error) setShowModal(false);
  };

  const handleEdit = async (data) => {
    const res = await dispatch(updateProject({ id: editTarget._id, data }));
    if (!res.error) setEditTarget(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) dispatch(deleteProject(id));
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} project(s)</p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ New Project</Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState title="No projects yet" description="Create your first project to get started."
          action={<Button onClick={() => setShowModal(true)}>Create Project</Button>} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} currentUserId={user?._id}
              onEdit={(p) => setEditTarget(p)} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Project">
        <ProjectForm onSubmit={handleCreate} loading={loading} />
      </Modal>

      <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Project">
        <ProjectForm initial={editTarget} onSubmit={handleEdit} loading={loading} />
      </Modal>
    </div>
  );
}
