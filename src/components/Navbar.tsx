import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <span className="font-bold text-xl">RekApps</span>
            </Link>
            <div className="hidden md:flex md:items-center md:ml-6 space-x-4">
              <Link to="/warga" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
                Data Warga
              </Link>
              <Link to="/activity" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
                Activity
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}