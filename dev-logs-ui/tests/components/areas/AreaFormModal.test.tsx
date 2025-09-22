import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AreaFormModal from '../../../src/components/areas/AreaFormModal';
import '../../base';
import { ApiResponse, AreaInfo } from '../../../src/types';
import * as AreaService from '../../../src/services/AreaService';

describe('AreaFormModal', () => {
  const mockOnSuccess = vi.fn();
  const mockOnClose = vi.fn();

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

  const renderAreaFormModal = (open: boolean, area: AreaInfo | null) => render(<AreaFormModal open={open} onSuccess={mockOnSuccess} onClose={mockOnClose} area={area} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not have the open attribute added to the dialog when open is set to false', () => {
    renderAreaFormModal(false, null);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).not.toHaveAttribute('open');
  });

  it('does have the open attribute added to the dialog when open is set to true', () => {
    renderAreaFormModal(true, null);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('open');
  });

  it('has Add in the title and footer button when area is provided', () => {
    renderAreaFormModal(true, null);

    //expect add to exist twice in the document because of the title and footer
    expect(screen.getAllByText(/Add/i)).toHaveLength(2);
  });

  it('has Edit in the title and footer button when area is provided', () => {
    renderAreaFormModal(true, mockArea);

    //expect edit to exist twice in the document because of the title and footer
    expect(screen.getAllByText(/Edit/i)).toHaveLength(2);
  });

  it('closes the dialog if the close button is clicked', () => {
    renderAreaFormModal(true, mockArea);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls create area with success when clicking the edit button', async () => {
    vi.spyOn(AreaService, 'createArea').mockResolvedValue(mockAPIResponse);

    renderAreaFormModal(true, null);

    const titleInput = screen.getByTestId('title-field');
    const descriptionInput = screen.getByTestId('description-field');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'New title');

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'New description');

    const dialogActionButton = screen.getByTestId('dialog-action-button');

    // wait for validation to re-enable the button
    await waitFor(() => expect(dialogActionButton).toBeEnabled());

    await userEvent.click(dialogActionButton);

    await waitFor(() => {
      expect(AreaService.createArea).toHaveBeenCalledWith({
        title: 'New title',
        description: 'New description',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('calls update area with success when clicking the edit button', async () => {
    vi.spyOn(AreaService, 'updateArea').mockResolvedValue(mockAPIResponse);

    renderAreaFormModal(true, mockArea);

    const titleInput = screen.getByTestId('title-field');
    const descriptionInput = screen.getByTestId('description-field');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated title');

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Updated description');

    const dialogActionButton = screen.getByTestId('dialog-action-button');

    // wait for validation to re-enable the button
    await waitFor(() => expect(dialogActionButton).toBeEnabled());

    await userEvent.click(dialogActionButton);

    await waitFor(() => {
      expect(AreaService.updateArea).toHaveBeenCalledWith({
        id: mockArea.id,
        title: 'Updated title',
        description: 'Updated description',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
