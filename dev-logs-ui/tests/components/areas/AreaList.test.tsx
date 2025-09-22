import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AreaList from '../../../src/components/areas/AreaList';
import '../../base';
import { AreaInfo } from '../../../src/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AreaList', () => {
  const mockOnSuccess = vi.fn();
  const mockShowModal = vi.fn();

  const mockArea: AreaInfo = {
    id: '1',
    title: 'title',
    description: 'description',
  };

  const renderAreaList = (areas: AreaInfo[]) => render(<AreaList areas={areas} onSuccess={mockOnSuccess} onShowModal={mockShowModal} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the area list when areas are provided', () => {
    renderAreaList([mockArea]);

    expect(screen.getByTestId('area-card-from-list')).toBeInTheDocument();
  });

  it('shows fallback text when no areas are provided', () => {
    renderAreaList([]);

    expect(screen.getByText(/Add an area to get started!/i)).toBeInTheDocument();
  });
});
