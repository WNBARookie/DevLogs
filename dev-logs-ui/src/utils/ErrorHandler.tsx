import axios from 'axios';
import { toast } from 'react-toastify';
import type { ApiResponse } from '../types';

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (err?.status === 401) {
      const response = err.data as ApiResponse;
      toast.error(response.details);
      window.history.pushState({}, 'LoginPage', '/login');
    } else if (Array.isArray(err?.data?.errors)) {
      for (const val of err.data.errors) {
        toast.error(val.description);
      }
    } else if (err?.data) {
      const response = err.data as ApiResponse;
      toast.error(response.details);
    } else if (err) {
      console.error(err);
      toast.warning('Server error occured.');
    }
  }
};
