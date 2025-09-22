import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectFormModal from '../../../src/components/projects/ProjectFormModal';
import '../../base';
import { ApiResponse, ProjectInfo } from '../../../src/types';
import * as ProjectService from '../../../src/services/ProjectService';

describe('ProjectFormModal', () => {
  const mockOnSuccess = vi.fn();
  const mockOnClose = vi.fn();

  const mockAPIResponse: ApiResponse = {
    summary: 'summary',
    details: 'details',
    status: 200,
    instance: '/projects',
    timeStamp: new Date(),
  };

  const mockProject: ProjectInfo = {
    id: '1',
    title: 'title',
    description: 'description',
  };

  const renderProjectFormModal = (open: boolean, project: ProjectInfo | null, areaId = '1') =>
    render(<ProjectFormModal open={open} onSuccess={mockOnSuccess} onClose={mockOnClose} project={project} areaId={areaId} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not have the open attribute added to the dialog when open is set to false', () => {
    renderProjectFormModal(false, null);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).not.toHaveAttribute('open');
  });

  it('does have the open attribute added to the dialog when open is set to true', () => {
    renderProjectFormModal(true, null);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('open');
  });

  it('has EdAddit in the title and footer button when project is provided', () => {
    renderProjectFormModal(true, null);

    //expect add to exist twice in the document because of the title and footer
    expect(screen.getAllByText(/Add/i)).toHaveLength(2);
  });

  it('has Edit in the title and footer button when project is provided', () => {
    renderProjectFormModal(true, mockProject);

    //expect edit to exist twice in the document because of the title and footer
    expect(screen.getAllByText(/Edit/i)).toHaveLength(2);
  });

  it('closes the dialog if the close button is clicked', () => {
    renderProjectFormModal(true, mockProject);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls create project with success when clicking the edit button', async () => {
    vi.spyOn(ProjectService, 'createProject').mockResolvedValue(mockAPIResponse);

    renderProjectFormModal(true, null);

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
      expect(ProjectService.createProject).toHaveBeenCalledWith({
        title: 'New title',
        description: 'New description',
        areaId: '1',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('calls update project with success when clicking the edit button', async () => {
    vi.spyOn(ProjectService, 'updateProject').mockResolvedValue(mockAPIResponse);

    renderProjectFormModal(true, mockProject);

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
      expect(ProjectService.updateProject).toHaveBeenCalledWith({
        id: mockProject.id,
        title: 'Updated title',
        description: 'Updated description',
        areaId: '1',
      });
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
