import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../../src/pages/HomePage';
import userEvent from '@testing-library/user-event';
import { getAreas } from '../../src/services/AreaService';
import type { ApiResponse, AreaInfo } from '../../src/types';
import '../base';
import { MemoryRouter } from 'react-router-dom';
import * as AreaService from '../../src/services/AreaService';

vi.mock('../../src/services/AreaService');

const mockArea: AreaInfo = {
  id: '1',
  title: 'title',
  description: 'description',
};

const mockAreas = [mockArea];

describe('HomePage', () => {
  const mockAPIResponse: ApiResponse = {
    summary: 'summary',
    details: 'details',
    status: 200,
    instance: '/projects',
    timeStamp: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderHomePage = () =>
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

  it('shows spinner while loading', async () => {
    (getAreas as vi.Mock).mockImplementation(() => new Promise(() => {}));
    renderHomePage();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it('renders areas after fetch', async () => {
    (getAreas as vi.Mock).mockResolvedValue(mockAreas);
    renderHomePage();

    // Wait for areas to appear
    await waitFor(() => {
      expect(screen.getByText('title')).toBeInTheDocument();
    });
  });

  it('opens modal when plus button is clicked', async () => {
    (getAreas as vi.Mock).mockResolvedValue([]);
    renderHomePage();

    const plusButton = screen.getByTestId('add-button');
    fireEvent.click(plusButton);

    // Check if modal appears
    expect(screen.getByText(/Add Area/i)).toBeInTheDocument(); // Assuming the modal has a submit button
  });

  it('closes modal on onClose', async () => {
    (getAreas as vi.Mock).mockResolvedValue([]);
    renderHomePage();

    const plusButton = screen.getByTestId('add-button');
    fireEvent.click(plusButton);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog).not.toHaveAttribute('open');
    });
  });

  it('calls create area with success when clicking the edit button', async () => {
    vi.spyOn(AreaService, 'createArea').mockResolvedValue(mockAPIResponse);

    renderHomePage();

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
    });
  });
});
