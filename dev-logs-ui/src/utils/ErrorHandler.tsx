import axios from 'axios';
import { toast } from 'react-toastify';
import type { ApiResponse } from '../types';

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (Array.isArray(err?.data.errors)) {
      for (const val of err.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === 'object') {
      for (const e of err.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      const response = err.data as ApiResponse;
      toast.error(response.details);
    } else if (err?.status === 401) {
      const response = err.data as ApiResponse;
      toast.error(response.details);
      window.history.pushState({}, 'LoginPage', '/login');
    } else if (err) {
      toast.warning(err?.data);
    }
  }
};
