import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemList from '../../../src/components/items/ItemList';
import '../../base';
import { ItemInfo } from '../../../src/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ItemList', () => {
  const mockOnSuccess = vi.fn();
  const mockShowModal = vi.fn();

  const mockItem: ItemInfo = {
    id: '1',
    title: 'title',
    description: 'description',
    whatWentWell: 'whatWentWell',
    whatDidNotGoWell: 'whatDidNotGoWell',
    lessonsLearned: 'lessonsLearned',
    dateCompleted: new Date(),
  };

  const renderItemList = (items: ItemInfo[]) => render(<ItemList items={items} onSuccess={mockOnSuccess} onShowModal={mockShowModal} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the item list when items are provided', () => {
    renderItemList([mockItem]);

    expect(screen.getByTestId('item-card-from-list')).toBeInTheDocument();
  });

  it('shows fallback text when no items are provided', () => {
    renderItemList([]);

    expect(screen.getByText(/Add an item to get started!/i)).toBeInTheDocument();
  });
});
