import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AreaCard from '../../../src/components/areas/AreaCard';
import '../../base';
import { ApiResponse, AreaInfo } from '../../../src/types';
import * as AreaService from '../../../src/services/AreaService';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AreaCard', () => {
  const mockOnSuccess = vi.fn();
  const mockShowModal = vi.fn();

  const mockAPIResponse: ApiResponse = {
    summary: 'summary',
    details: 'details',
    status: 200,
    instance: '/areas',
    timeStamp: new Date(),
  };

  const mockArea: AreaInfo = {
    id: '1',
    title: 'title',
    description: 'description',
  };

  const renderAreaCard = (area: AreaInfo) => render(<AreaCard key={1} area={area} onSuccess={mockOnSuccess} onShowModal={mockShowModal} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the area card when area is provided', () => {
    renderAreaCard(mockArea);

    expect(screen.getByTestId('area-card')).toBeInTheDocument();
  });

  it('calls showModal when clicking the edit button', () => {
    renderAreaCard(mockArea);

    const cardMenuButton = screen.getByTestId('card-menu-button');
    fireEvent.click(cardMenuButton);

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    expect(mockShowModal).toHaveBeenCalledTimes(1);
  });

  it('calls handleDeleteArea with success when clicking the delete button', async () => {
    vi.spyOn(AreaService, 'deleteArea').mockResolvedValue(mockAPIResponse);

    renderAreaCard(mockArea);

    const cardMenuButton = screen.getByTestId('card-menu-button');
    fireEvent.click(cardMenuButton);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // wait for async deletion
    expect(await AreaService.deleteArea).toHaveBeenCalledWith('1');
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
  });

  it('call handleAreaClick when clicking an area footer', () => {
    renderAreaCard(mockArea);

    const areaCardFooter = screen.getByTestId('area-card-footer');
    fireEvent.click(areaCardFooter);

    expect(mockNavigate).toHaveBeenCalledWith('/areas/1');
  });
});
