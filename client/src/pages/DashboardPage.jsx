// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { fetchProjects } from "../redux/slices/projectSlice";
// import { fetchProfile } from "../redux/slices/authSlice";
// import { getTasksAPI } from "../services/api";
// import Loader from "../components/ui/Loader";
// import Badge from "../components/ui/Badge";
// import { formatDate, getPriorityColor, getStatusColor } from "../utils/helpers";

// export default function DashboardPage() {
//   const dispatch = useDispatch();
//   const { list: projects, loading } = useSelector((s) => s.projects);
//   const [allTasks, setAllTasks] = useState([]);

//   useEffect(() => {
//     dispatch(fetchProjects());
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (projects.length === 0) return;
//     Promise.all(
//       projects.map((p) =>
//         getTasksAPI({ project: p._id, limit: 100 })
//           .then((r) => r.data.tasks || [])
//           .catch(() => []),
//       ),
//     ).then((results) => setAllTasks(results.flat()));
//   }, [projects]);

//   const todoTasks = allTasks.filter((t) => t.status === "todo").length;
//   const inProgressTasks = allTasks.filter(
//     (t) => t.status === "in-progress",
//   ).length;
//   const completedTasks = allTasks.filter(
//     (t) => t.status === "completed",
//   ).length;
//   const completedProjects = projects.filter(
//     (p) => p.status === "completed",
//   ).length;

//   const stats = [
//     {
//       label: "My Projects",
//       value: projects.length,
//       color: "bg-blue-500",
//       icon: "📁",
//     },
//     { label: "Todo", value: todoTasks, color: "bg-gray-500", icon: "📝" },
//     {
//       label: "In Progress",
//       value: inProgressTasks,
//       color: "bg-yellow-500",
//       icon: "⚡",
//     },
//     {
//       label: "Completed Tasks",
//       value: completedTasks,
//       color: "bg-purple-500",
//       icon: "📋",
//     },
//     {
//       label: "Completed Projects",
//       value: completedProjects,
//       color: "bg-green-500",
//       icon: "✅",
//     },
//   ];

//   if (loading) return <Loader />;

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Here's what's happening today.
//         </p>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
//             <div
//               className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-xl mb-3`}>
//               {stat.icon}
//             </div>
//             <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//             <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-semibold text-gray-800">Recent Projects</h2>
//             <Link
//               to="/projects"
//               className="text-sm text-blue-600 hover:underline">
//               View all
//             </Link>
//           </div>
//           {projects.length === 0 ? (
//             <p className="text-sm text-gray-400 text-center py-6">
//               No projects yet
//             </p>
//           ) : (
//             <div className="space-y-2">
//               {projects.slice(0, 4).map((p) => (
//                 <Link
//                   key={p._id}
//                   to={`/projects/${p._id}`}
//                   className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all group">
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-sm text-gray-800 truncate group-hover:text-blue-600">
//                       {p.title}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-0.5">
//                       {p.members?.length} member(s)
//                     </p>
//                   </div>
//                   <Badge
//                     className={
//                       p.status === "active"
//                         ? "bg-green-100 text-green-700"
//                         : p.status === "completed"
//                           ? "bg-blue-100 text-blue-700"
//                           : "bg-gray-100 text-gray-600"
//                     }>
//                     {p.status}
//                   </Badge>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-semibold text-gray-800">My Tasks</h2>
//             <Link to="/tasks" className="text-sm text-blue-600 hover:underline">
//               View all
//             </Link>
//           </div>
//           {allTasks.length === 0 ? (
//             <p className="text-sm text-gray-400 text-center py-6">
//               No tasks yet
//             </p>
//           ) : (
//             <div className="space-y-2">
//               {allTasks.slice(0, 4).map((t) => (
//                 <div
//                   key={t._id}
//                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-800 truncate">
//                       {t.title}
//                     </p>
//                     {t.dueDate && (
//                       <p className="text-xs text-gray-400 mt-0.5">
//                         Due {formatDate(t.dueDate)}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex gap-1.5 flex-shrink-0">
//                     <Badge className={getPriorityColor(t.priority)}>
//                       {t.priority}
//                     </Badge>
//                     <Badge className={getStatusColor(t.status)}>
//                       {t.status}
//                     </Badge>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../redux/slices/projectSlice";
import { fetchProfile } from "../redux/slices/authSlice";
import { getTasksAPI } from "../services/api";
import Loader from "../components/ui/Loader";
import Badge from "../components/ui/Badge";
import { formatDate, getPriorityColor, getStatusColor } from "../utils/helpers";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { list: projects, loading } = useSelector((s) => s.projects);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length === 0) return;
    Promise.all(
      projects.map((p) =>
        getTasksAPI({ project: p._id, limit: 100 })
          .then((r) => r.data.tasks || [])
          .catch(() => []),
      ),
    ).then((results) => setAllTasks(results.flat()));
  }, [projects]);

  const todoTasks = allTasks.filter((t) => t.status === "todo").length;
  const inProgressTasks = allTasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const completedTasks = allTasks.filter(
    (t) => t.status === "completed",
  ).length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;

  const stats = [
    {
      label: "My Projects",
      value: projects.length,
      color: "bg-blue-500",
      icon: "📁",
    },
    { label: "Todo", value: todoTasks, color: "bg-gray-500", icon: "📝" },
    {
      label: "In Progress",
      value: inProgressTasks,
      color: "bg-yellow-500",
      icon: "⚡",
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      color: "bg-purple-500",
      icon: "📋",
    },
    {
      label: "Completed Projects",
      value: completedProjects,
      color: "bg-green-500",
      icon: "✅",
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div
              className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-xl mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Recent Projects</h2>
            <Link
              to="/app/projects"
              className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No projects yet
            </p>
          ) : (
            <div className="space-y-2">
              {projects.slice(0, 4).map((p) => (
                <Link
                  key={p._id}
                  to={`/app/projects/${p._id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all group">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate group-hover:text-blue-600">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {p.members?.length} member(s)
                    </p>
                  </div>
                  <Badge
                    className={
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : p.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                    }>
                    {p.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">My Tasks</h2>
            <Link
              to="/app/tasks"
              className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          {allTasks.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No tasks yet
            </p>
          ) : (
            <div className="space-y-2">
              {allTasks.slice(0, 4).map((t) => (
                <div
                  key={t._id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {t.title}
                    </p>
                    {t.dueDate && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        Due {formatDate(t.dueDate)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Badge className={getPriorityColor(t.priority)}>
                      {t.priority}
                    </Badge>
                    <Badge className={getStatusColor(t.status)}>
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
