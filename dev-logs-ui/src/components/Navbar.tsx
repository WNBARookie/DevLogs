import { useAuth } from '../context/useAuth';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {currentPath !== '/' ? (
        <div className="flex items-center justify-between px-12 py-4 bg-gray-900 text-white w-full">
          <Link to="/home">
            <h1 className="text-xl font-bold text-white">DevLogs</h1>
          </Link>

          {isLoggedIn() ? (
            <div className="flex items-center">
              <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 rounded-lg px-6 py-2 text-center">
                Logout
              </button>
            </div>
          ) : // <div className="flex items-center gap-6">
          //   <Link to="/login">Login</Link>
          //   <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 rounded-lg px-6 py-2 text-center">
          //     Sign Up
          //   </Link>
          // </div>
          null}
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
