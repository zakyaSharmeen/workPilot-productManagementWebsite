import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white/70 backdrop-blur sticky top-0 z-10">
        <span className="text-xl font-bold text-blue-600">WorkPilot</span>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
            Log in
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
          Project Management
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight max-w-2xl">
          Manage Projects &amp; Tasks
          <br />
          <span className="text-blue-600">All in One Place</span>
        </h1>
        <p className="mt-5 text-gray-500 text-base md:text-lg max-w-xl">
          WorkPilot helps teams organise work, track progress, and collaborate —
          from a simple to-do to a full Kanban board.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md">
            Start for Free
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 hover:border-blue-400 text-gray-700 font-semibold px-6 py-3 rounded-xl text-sm transition-all">
            Log in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-10">
          Everything you need to stay on track
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              icon: "📁",
              title: "Projects",
              desc: "Create and manage multiple projects with team members.",
            },
            {
              icon: "✅",
              title: "Tasks",
              desc: "Add tasks, set priorities, due dates, and assignees.",
            },
            {
              icon: "📋",
              title: "Kanban Board",
              desc: "Drag and drop tasks across Todo, In Progress, and Done.",
            },

            {
              icon: "🔍",
              title: "Filters & Search",
              desc: "Quickly find tasks by status, priority, or keyword.",
            },
            {
              icon: "👤",
              title: "Profile",
              desc: "Update your name and avatar to personalise your account.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-100">
        &copy; {new Date().getFullYear()} WorkPilot. Built with React &amp;
        Node.js.
      </footer>
    </div>
  );
}
