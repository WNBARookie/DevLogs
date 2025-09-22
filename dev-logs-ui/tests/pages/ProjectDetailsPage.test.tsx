import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDetailsPage from '../../src/pages/ProjectDetailsPage';
import { getProjectDetails, getProjectSummary } from '../../src/services/ProjectService';
import '../base';
import * as ItemService from '../../src/services/ItemService';
import { ApiResponse } from '../../src/types';

vi.mock('../../src/services/ProjectService');

const mockProject = { id: '1', title: 'Test Project' };
const mockItems = [{ id: 'i1', title: 'Item 1', description: 'Desc 1' }];

describe('ProjectDetailsPage', () => {
  const mockAPIResponse: ApiResponse = {
    summary: 'summary',
    details: 'details',
    status: 200,
    instance: '/items',
    timeStamp: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getProjectDetails as vi.Mock).mockResolvedValue({ project: mockProject, items: mockItems });
    (getProjectSummary as vi.Mock).mockResolvedValue({ summary: 'Project summary text' });
  });

  const reenderProjectDetailsPage = () =>
    render(
      <MemoryRouter initialEntries={['/projects/1']}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

  it('shows loading spinner initially', async () => {
    (getProjectDetails as vi.Mock).mockImplementation(() => new Promise(() => {}));
    reenderProjectDetailsPage();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders project title and items after fetch', async () => {
    reenderProjectDetailsPage();
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  it('opens and closes item modal (onShowModal and onClose)', async () => {
    reenderProjectDetailsPage();
    await waitFor(() => screen.getByText('Item 1'));

    const plusButton = screen.getByTestId('add-button');
    fireEvent.click(plusButton);
    expect(screen.getByText(/Add Item/i)).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog).not.toHaveAttribute('open');
    });
  });

  it('calls onSuccess and refreshes items', async () => {
    vi.spyOn(ItemService, 'createItem').mockResolvedValue(mockAPIResponse);

    reenderProjectDetailsPage();

    await waitFor(() => screen.getByText('Item 1'));

    const plusButton = screen.getByTestId('add-button');
    fireEvent.click(plusButton);

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
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  it('opens summary panel and displays project summary', async () => {
    reenderProjectDetailsPage();
    await waitFor(() => screen.getByText('Item 1'));

    const summaryButton = screen.getByTestId('summary-button');
    fireEvent.click(summaryButton);

    await waitFor(() => {
      expect(screen.getByText(/Summary of Items/i)).toBeInTheDocument();
      expect(screen.getByText('Project summary text')).toBeInTheDocument();
    });
  });

  it('closes summary panel', async () => {
    reenderProjectDetailsPage();
    await waitFor(() => screen.getByText('Item 1'));

    const summaryButton = screen.getByTestId('summary-button');
    fireEvent.click(summaryButton);

    const closeButton = screen.getAllByTestId('close-button')[0];
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/Summary of Items/i)).not.toBeInTheDocument();
    });
  });

  it('refreshes project summary when refresh button is clicked', async () => {
    reenderProjectDetailsPage();
    await waitFor(() => screen.getByText('Item 1'));

    const summaryButton = screen.getByTestId('summary-button');
    fireEvent.click(summaryButton);

    const refreshButton = screen.getByTestId('refresh-button');
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(getProjectSummary).toHaveBeenCalledTimes(2);
    });
  });
});
