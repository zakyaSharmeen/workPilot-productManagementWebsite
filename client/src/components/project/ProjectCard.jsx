// // import { Link } from 'react-router-dom';
// // import Badge  from '../ui/Badge';
// // import Avatar from '../ui/Avatar';
// // import Button from '../ui/Button';

// // export default function ProjectCard({ project, onEdit, onDelete, currentUserId }) {
// //   const isOwner = project.owner?._id === currentUserId || project.owner === currentUserId;
// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
// //       <div className="flex items-start justify-between mb-3">
// //         <Link to={`/projects/${project._id}`}>
// //           <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors leading-tight">{project.title}</h3>
// //         </Link>
// //         <Badge className={project.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}>
// //           {project.status}
// //         </Badge>a
// //       </div>
// //       <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description || 'No description'}</p>
// //       <div className="flex items-center gap-1 mb-4">
// //         {project.members?.slice(0, 4).map((m) => (
// //           <Avatar key={m._id || m} src={m.avatar?.url} name={m.name} size="sm" />
// //         ))}
// //         {project.members?.length > 4 && (
// //           <span className="text-xs text-gray-500 ml-1">+{project.members.length - 4}</span>
// //         )}
// //       </div>
// //       {isOwner && (
// //         <div className="flex gap-2 border-t border-gray-100 pt-3">
// //           <Button variant="ghost" size="sm" onClick={() => onEdit(project)}>Edit</Button>
// //           <Button variant="danger" size="sm" onClick={() => onDelete(project._id)}>Delete</Button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { Link } from "react-router-dom";
// import Badge from "../ui/Badge";
// import Avatar from "../ui/Avatar";
// import Button from "../ui/Button";

// export default function ProjectCard({
//   project,
//   onEdit,
//   onDelete,
//   currentUserId,
// }) {
//   const isOwner =
//     project.owner?._id === currentUserId || project.owner === currentUserId;
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
//       <div className="flex items-start justify-between mb-3">
//         <Link to={`/projects/${project._id}`}>
//           <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors leading-tight">
//             {project.title}
//           </h3>
//         </Link>
//         <Badge
//           className={
//             project.status === "active"
//               ? "bg-green-100 text-green-700"
//               : project.status === "completed"
//                 ? "bg-blue-100 text-blue-700"
//                 : "bg-gray-100 text-gray-600"
//           }>
//           {project.status}
//         </Badge>
//       </div>
//       <p className="text-sm text-gray-500 mb-4 line-clamp-2">
//         {project.description || "No description"}
//       </p>
//       <div className="flex items-center gap-1 mb-4">
//         {project.members?.slice(0, 4).map((m) => (
//           <Avatar
//             key={m._id || m}
//             src={m.avatar?.url}
//             name={m.name}
//             size="sm"
//           />
//         ))}
//         {project.members?.length > 4 && (
//           <span className="text-xs text-gray-500 ml-1">
//             +{project.members.length - 4}
//           </span>
//         )}
//       </div>
//       {isOwner && (
//         <div className="flex gap-2 border-t border-gray-100 pt-3">
//           <Button variant="ghost" size="sm" onClick={() => onEdit(project)}>
//             Edit
//           </Button>
//           <Button
//             variant="danger"
//             size="sm"
//             onClick={() => onDelete(project._id)}>
//             Delete
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  currentUserId,
}) {
  const isOwner =
    project.owner?._id === currentUserId || project.owner === currentUserId;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <Link to={`/app/projects/${project._id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors leading-tight">
            {project.title}
          </h3>
        </Link>
        <Badge
          className={
            project.status === "active"
              ? "bg-green-100 text-green-700"
              : project.status === "completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
          }>
          {project.status}
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {project.description || "No description"}
      </p>
      <div className="flex items-center gap-1 mb-4">
        {project.members?.slice(0, 4).map((m) => (
          <Avatar
            key={m._id || m}
            src={m.avatar?.url}
            name={m.name}
            size="sm"
          />
        ))}
        {project.members?.length > 4 && (
          <span className="text-xs text-gray-500 ml-1">
            +{project.members.length - 4}
          </span>
        )}
      </div>
      {isOwner && (
        <div className="flex gap-2 border-t border-gray-100 pt-3">
          <Button variant="ghost" size="sm" onClick={() => onEdit(project)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(project._id)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
