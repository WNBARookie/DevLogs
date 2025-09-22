import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleError } from '../../src/utils/ErrorHandler';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { ApiResponse } from '../../src/types';
import '../base';

vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: { error: vi.fn(), warning: vi.fn() },
}));

describe('handleError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockIsAxiosError = (val = true) => {
    vi.mocked(axios.isAxiosError).mockReturnValue(val);
  };

  it('should show multiple toast errors when response has array errors', () => {
    mockIsAxiosError();
    const error = {
      response: { data: { errors: [{ description: 'Error 1' }, { description: 'Error 2' }] } },
    };

    handleError(error);

    expect(toast.error).toHaveBeenCalledWith('Error 1');
    expect(toast.error).toHaveBeenCalledWith('Error 2');
  });

  it('should show toast error when response has ApiResponse with details', () => {
    mockIsAxiosError();
    const error = {
      response: { data: { details: 'Something went wrong' } as ApiResponse },
    };

    handleError(error);

    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
  });

  it('should show toast on 401', () => {
    mockIsAxiosError();

    const error = {
      response: { status: 401, data: { details: 'Unauthorized' } as ApiResponse },
    };

    handleError(error);

    expect(toast.error).toHaveBeenCalledWith('Unauthorized');
  });

  it('should log error and show warning if response exists without data', () => {
    mockIsAxiosError();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const error = {
      response: { status: 500 },
    };

    handleError(error);

    expect(consoleSpy).toHaveBeenCalled();
    expect(toast.warning).toHaveBeenCalledWith('Server error occured.');
  });

  it('should do nothing if not an Axios error', () => {
    mockIsAxiosError(false);

    handleError(new Error('Not axios'));

    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.warning).not.toHaveBeenCalled();
  });
});
