import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../redux/slices/projectSlice";
import { getTasksAPI } from "../services/api";
import TaskFilters from "../components/task/TaskFilters";
import TaskCard from "../components/task/TaskCard";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

export default function TasksPage() {
  const dispatch = useDispatch();
  const { list: projects } = useSelector((s) => s.projects);
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(
      projects.map((p) =>
        getTasksAPI({ project: p._id, limit: 100 })
          .then((r) => r.data.tasks || [])
          .catch(() => []),
      ),
    )
      .then((results) => setMyTasks(results.flat()))
      .finally(() => setLoading(false));
  }, [projects]);

  const filtered = myTasks.filter((t) => {
    if (filters.status && t.status !== filters.status) return false;
    if (filters.priority && t.priority !== filters.priority) return false;
    if (
      filters.search &&
      !t.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  if (loading) return <Loader />;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          All tasks assigned to you
        </p>
      </div>
      <TaskFilters filters={filters} onChange={setFilters} />
      {filtered.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description="You have no tasks assigned, or try adjusting the filters."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <TaskCard key={t._id} task={t} />
          ))}
        </div>
      )}
    </div>
  );
}
