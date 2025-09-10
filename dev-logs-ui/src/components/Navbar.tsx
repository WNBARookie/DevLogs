import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return isLoggedIn() ? (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">DevLogs</h1>

      <button
        onClick={logout}
        className="text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Logout
      </button>
    </div>
  ) : null;
};

export default Navbar;
