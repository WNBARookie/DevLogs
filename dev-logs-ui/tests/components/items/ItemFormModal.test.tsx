import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemFormModal from '../../../src/components/items/ItemFormModal';
import '../../base';
import { ApiResponse, ItemInfo } from '../../../src/types';
import * as ItemService from '../../../src/services/ItemService';

describe('ItemFormModal', () => {
  const mockOnSuccess = vi.fn();
  const mockOnClose = vi.fn();

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

  const renderItemFormModal = (open: boolean, item: ItemInfo | null, projectId = '1') =>
    render(<ItemFormModal open={open} onSuccess={mockOnSuccess} onClose={mockOnClose} item={item} projectId={projectId} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not have the open attribute added to the dialog when open is set to false', () => {
    renderItemFormModal(false, null);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).not.toHaveAttribute('open');
  });

  it('does have the open attribute added to the dialog when open is set to true', () => {
    renderItemFormModal(true, null);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('open');
  });

  it('has EdAddit in the title and footer button when item is provided', () => {
    renderItemFormModal(true, null);

    //expect add to exist twice in the document because of the title and footer
    expect(screen.getAllByText(/Add/i)).toHaveLength(2);
  });

  it('has Edit in the title and footer button when item is provided', () => {
    renderItemFormModal(true, mockItem);

    //expect edit to exist twice in the document because of the title and footer
    expect(screen.getAllByText(/Edit/i)).toHaveLength(2);
  });

  it('closes the dialog if the close button is clicked', () => {
    renderItemFormModal(true, mockItem);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls create item with success when clicking the add button', async () => {
    vi.spyOn(ItemService, 'createItem').mockResolvedValue(mockAPIResponse);

    renderItemFormModal(true, null);

    const titleInput = screen.getByTestId('title-field');
    const descriptionInput = screen.getByTestId('description-field');
    const whatWentWellInput = screen.getByTestId('what-went-well-field');
    const whatDidNotGoWellInput = screen.getByTestId('what-did-not-go-well-field');
    const lessonsLearnedInput = screen.getByTestId('lessons-learned-field');
    const dateCompletedInput = screen.getByTestId('date-completed-field');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'New title');

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'New description');

    await userEvent.clear(whatWentWellInput);
    await userEvent.type(whatWentWellInput, 'New what went well');

    await userEvent.clear(whatDidNotGoWellInput);
    await userEvent.type(whatDidNotGoWellInput, 'New what did not go well');

    await userEvent.clear(lessonsLearnedInput);
    await userEvent.type(lessonsLearnedInput, 'New lessons learned');

    fireEvent.focus(dateCompletedInput);
    const dayButton = await screen.getByText(/18/i);
    await userEvent.click(dayButton);

    const dialogActionButton = screen.getByTestId('dialog-action-button');

    await waitFor(() => expect(dialogActionButton).toBeEnabled());

    await userEvent.click(dialogActionButton);

    await waitFor(() => {
      expect(ItemService.createItem).toHaveBeenCalledWith({
        title: 'New title',
        description: 'New description',
        whatWentWell: 'New what went well',
        whatDidNotGoWell: 'New what did not go well',
        lessonsLearned: 'New lessons learned',
        dateCompleted: expect.any(Date),
        projectId: '1',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('calls update item with success when clicking the edit button', async () => {
    vi.spyOn(ItemService, 'updateItem').mockResolvedValue(mockAPIResponse);

    renderItemFormModal(true, mockItem);

    const titleInput = screen.getByTestId('title-field');
    const descriptionInput = screen.getByTestId('description-field');
    const whatWentWellInput = screen.getByTestId('what-went-well-field');
    const whatDidNotGoWellInput = screen.getByTestId('what-did-not-go-well-field');
    const lessonsLearnedInput = screen.getByTestId('lessons-learned-field');
    const dateCompletedInput = screen.getByTestId('date-completed-field');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated title');

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Updated description');

    await userEvent.clear(whatWentWellInput);
    await userEvent.type(whatWentWellInput, 'Updated what went well');

    await userEvent.clear(whatDidNotGoWellInput);
    await userEvent.type(whatDidNotGoWellInput, 'Updated what did not go well');

    await userEvent.clear(lessonsLearnedInput);
    await userEvent.type(lessonsLearnedInput, 'Updated lessons learned');

    fireEvent.focus(dateCompletedInput);
    const dayButton = await screen.getByText(/18/i);
    await userEvent.click(dayButton);

    const dialogActionButton = screen.getByTestId('dialog-action-button');

    await waitFor(() => expect(dialogActionButton).toBeEnabled());

    await userEvent.click(dialogActionButton);

    await waitFor(() => {
      expect(ItemService.updateItem).toHaveBeenCalledWith({
        id: mockItem.id,
        title: 'Updated title',
        description: 'Updated description',
        whatWentWell: 'Updated what went well',
        whatDidNotGoWell: 'Updated what did not go well',
        lessonsLearned: 'Updated lessons learned',
        dateCompleted: expect.any(Date),
        projectId: '1',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('closes the day picker when clicking outside', async () => {
    renderItemFormModal(false, null);
    const dateInput = screen.getByTestId('date-completed-field');

    fireEvent.focus(dateInput);

    // Look for a day cell by text instead of role
    const dayCell = await screen.findByText('1');
    expect(dayCell).toBeInTheDocument();

    // ✅ Click outside the calendar
    fireEvent.mouseDown(document.body);

    // ✅ The calendar should close (day "1" disappears)
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });
});
