import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from '../../../src/components/items/ItemCard';
import '../../base';
import { ApiResponse, ItemInfo } from '../../../src/types';
import * as ItemService from '../../../src/services/ItemService';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ItemCard', () => {
  const mockOnSuccess = vi.fn();
  const mockShowModal = vi.fn();

  const mockAPIResponse: ApiResponse = {
    summary: 'summary',
    details: 'details',
    status: 200,
    instance: '/items',
    timeStamp: new Date(),
  };

  const mockItem: ItemInfo = {
    id: '1',
    title: 'title',
    description: 'description',
    whatWentWell: 'whatWentWell',
    whatDidNotGoWell: 'whatDidNotGoWell',
    lessonsLearned: 'lessonsLearned',
    dateCompleted: new Date(),
  };

  const renderItemCard = (item: ItemInfo) => render(<ItemCard key={1} item={item} onSuccess={mockOnSuccess} onShowModal={mockShowModal} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the item card when item is provided', () => {
    renderItemCard(mockItem);

    expect(screen.getByTestId('item-card')).toBeInTheDocument();
  });

  it('calls showModal when clicking the edit button', () => {
    renderItemCard(mockItem);

    const cardMenuButton = screen.getByTestId('card-menu-button');
    fireEvent.click(cardMenuButton);

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    expect(mockShowModal).toHaveBeenCalledTimes(1);
  });

  it('calls handleDeleteItem with success when clicking the delete button', async () => {
    vi.spyOn(ItemService, 'deleteItem').mockResolvedValue(mockAPIResponse);

    renderItemCard(mockItem);

    const cardMenuButton = screen.getByTestId('card-menu-button');
    fireEvent.click(cardMenuButton);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // wait for async deletion
    expect(await ItemService.deleteItem).toHaveBeenCalledWith('1');
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
  });
});
