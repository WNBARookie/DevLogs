import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import axios from 'axios';

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

  return <RouterProvider router={router} />;
};

export default App;
