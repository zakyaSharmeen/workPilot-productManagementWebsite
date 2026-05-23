// import { useState, useEffect } from 'react';
// import Input  from '../ui/Input';
// import Button from '../ui/Button';

// export default function ProjectForm({ initial, onSubmit, loading }) {
//   const [form, setForm] = useState({ title: '', description: '', status: 'active' });

//   useEffect(() => {
//     if (initial) setForm({ title: initial.title, description: initial.description || '', status: initial.status });
//   }, [initial]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.title.trim()) return;
//     onSubmit(form);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input label="Project Title *" value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Website Redesign" />
//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-700">Description</label>
//         <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
//           placeholder="What is this project about?" rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
//       </div>
//       <div className="flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-700">Status</label>
//         <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
//           <option value="active">Active</option>
//           <option value="archived">Archived</option>
//         </select>
//       </div>
//       <Button type="submit" className="w-full" loading={loading}>
//         {initial ? 'Update Project' : 'Create Project'}
//       </Button>
//     </form>
//   );
// }

import { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ProjectForm({ initial, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    if (initial)
      setForm({
        title: initial.title,
        description: initial.description || "",
        status: initial.status,
      });
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Project Title *"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="e.g. Website Redesign"
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="What is this project about?"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <Button type="submit" className="w-full" loading={loading}>
        {initial ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
