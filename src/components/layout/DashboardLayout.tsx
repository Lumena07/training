import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LogOut,
  BookOpen,
  Calendar,
  FileText,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

export function DashboardLayout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                  Auric Air Training
                </Link>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/training"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Training
                </Link>
                <Link
                  to="/schedule"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Link>
                <Link
                  to="/documents"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Documents
                </Link>
              </div>

              {/* Add mobile menu button */}
              <div className="sm:hidden -mr-2 flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  onClick={handleLogout}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>

          {/* Add mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  <Home className="h-4 w-4 inline-block mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/training"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  <BookOpen className="h-4 w-4 inline-block mr-1" />
                  Training
                </Link>
                <Link
                  to="/schedule"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  <Calendar className="h-4 w-4 inline-block mr-1" />
                  Schedule
                </Link>
                <Link
                  to="/documents"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  <FileText className="h-4 w-4 inline-block mr-1" />
                  Documents
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}