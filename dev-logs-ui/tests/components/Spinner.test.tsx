import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../../src/components/Spinner';
import '../base';

describe('Spinner', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders when loading is true', () => {
    render(<Spinner loading={true} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('does not render when loading is false', () => {
    render(<Spinner loading={false} />);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });
});
