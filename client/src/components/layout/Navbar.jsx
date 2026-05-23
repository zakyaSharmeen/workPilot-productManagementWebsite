import useAuth from '../../hooks/useAuth';
import Avatar from '../ui/Avatar';

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="hidden md:block text-sm text-gray-500">
        Welcome back, <span className="font-medium text-gray-800">{user?.name}</span> 👋
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <Avatar src={user?.avatar?.url} name={user?.name} size="sm" />
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-800 leading-none">{user?.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{user?.role}</p>
        </div>
      </div>
    </header>
  );
}
