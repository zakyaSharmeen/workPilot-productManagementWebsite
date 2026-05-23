// import { NavLink } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import useAuth from '../../hooks/useAuth';
// import Avatar from '../ui/Avatar';

// const links = [
//   { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
//   { to: '/projects',  label: 'Projects',  icon: '📁' },
//   { to: '/tasks',     label: 'Tasks',     icon: '✅' },
//   { to: '/profile',   label: 'Profile',   icon: '👤' },
// ];

// export default function Sidebar({ open, onClose }) {
//   const { user, handleLogout } = useAuth();

//   const content = (
//     <div className="flex flex-col h-full bg-gray-900 text-white w-64">
//       <div className="p-5 border-b border-gray-700">
//         <h1 className="text-xl font-bold text-blue-400">WorkPilot</h1>
//         <p className="text-xs text-gray-400 mt-0.5">Project Management</p>
//       </div>
//       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//         {links.map((link) => (
//           <NavLink key={link.to} to={link.to} onClick={onClose}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
//                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
//             }
//           >
//             <span className="text-base">{link.icon}</span>
//             {link.label}
//           </NavLink>
//         ))}
//       </nav>
//       <div className="p-4 border-t border-gray-700">
//         <div className="flex items-center gap-3 mb-3">
//           <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium text-white truncate">{user?.name}</p>
//             <p className="text-xs text-gray-400 truncate">{user?.email}</p>
//           </div>
//         </div>
//         <button onClick={handleLogout}
//           className="w-full text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 px-3 py-2 rounded-lg text-left transition-all">
//           🚪 Logout
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="hidden md:flex flex-shrink-0">{content}</div>
//       <AnimatePresence>
//         {open && (
//           <div className="fixed inset-0 z-40 md:hidden">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               className="absolute inset-0 bg-black/50" onClick={onClose} />
//             <motion.div initial={{ x: -256 }} animate={{ x: 0 }} exit={{ x: -256 }}
//               transition={{ type: 'tween', duration: 0.25 }} className="absolute left-0 top-0 h-full">
//               {content}
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import Avatar from "../ui/Avatar";

const links = [
  { to: "/app/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/app/projects", label: "Projects", icon: "📁" },
  { to: "/app/tasks", label: "Tasks", icon: "✅" },
  { to: "/app/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar({ open, onClose }) {
  const { user, handleLogout } = useAuth();

  const content = (
    <div className="flex flex-col h-full bg-gray-900 text-white w-64">
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-xl font-bold text-blue-400">
          <Link to="/">WorkPilot</Link>
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Project Management</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
               ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`
            }>
            <span className="text-base">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 px-3 py-2 rounded-lg text-left transition-all">
          🚪 Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:flex flex-shrink-0">{content}</div>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute left-0 top-0 h-full">
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
