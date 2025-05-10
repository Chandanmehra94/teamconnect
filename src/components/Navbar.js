import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Hide Navbar on login page
  if (location.pathname === '/login' || location.pathname === '/') {
    return null;
  }

  return (
    <nav className="navy-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TeamConnect</h1>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/feed" className="hover:text-teal-300 transition duration-200">Feed</Link>
              <Link to="/analytics" className="hover:text-teal-300 transition duration-200">Analytics</Link>
              <button
                onClick={logout}
                className="teal-accent text-white px-3 py-1 rounded hover:text-teal-300 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-teal-300 transition duration-200">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;