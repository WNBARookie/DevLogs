import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectsPage from '../../src/pages/ProjectsPage';
import { getAreaDetails, getAreaSummary } from '../../src/services/AreaService';
import '../base';
import { ApiResponse } from '../../src/types';
import * as ProjectService from '../../src/services/ProjectService';

vi.mock('../../src/services/AreaService');

const mockArea = { id: '1', title: 'Test Area' };
const mockProjects = [
  { id: 'p1', title: 'Project 1', description: 'Desc 1' },
  { id: 'p2', title: 'Project 2', description: 'Desc 2' },
];

describe('ProjectsPage', () => {
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

  const renderProjectsPage = (id = '1') =>
    render(
      <MemoryRouter initialEntries={[`/projects/${id}`]}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectsPage />} />
        </Routes>
      </MemoryRouter>
    );

  it('shows spinner initially', async () => {
    (getAreaDetails as vi.Mock).mockImplementation(() => new Promise(() => {}));
    renderProjectsPage();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders area title and projects after fetch', async () => {
    (getAreaDetails as vi.Mock).mockResolvedValue({ area: mockArea, projects: mockProjects });

    renderProjectsPage();

    await waitFor(() => {
      expect(screen.getByText(/Projects for Test Area/i)).toBeInTheDocument();
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
  });

  it('opens project modal when plus icon is clicked', async () => {
    (getAreaDetails as vi.Mock).mockResolvedValue({ area: mockArea, projects: mockProjects });

    renderProjectsPage();

    await waitFor(() => screen.getByText('Project 1'));

    const plusButton = screen.getByTestId('add-button');
    fireEvent.click(plusButton);

    expect(await screen.findByText(/Add Project/i)).toBeInTheDocument();
  });

  it('opens summary panel and fetches summary', async () => {
    (getAreaDetails as vi.Mock).mockResolvedValue({ area: mockArea, projects: mockProjects });
    (getAreaSummary as vi.Mock).mockResolvedValue({ summary: 'This is the area summary' });

    renderProjectsPage();

    await waitFor(() => screen.getByText('Project 1'));

    const summaryButton = screen.getByTestId('summary-button');
    fireEvent.click(summaryButton);

    await waitFor(() => {
      expect(screen.getByText('This is the area summary')).toBeInTheDocument();
    });
  });

  it('refreshes summary when refresh icon is clicked', async () => {
    (getAreaDetails as vi.Mock).mockResolvedValue({ area: mockArea, projects: mockProjects });
    (getAreaSummary as vi.Mock).mockResolvedValue({ summary: 'Refreshed summary' });

    renderProjectsPage();

    await waitFor(() => screen.getByText('Project 1'));

    const summaryButton = screen.getByTestId('summary-button');
    fireEvent.click(summaryButton);

    const refreshButton = screen.getByTestId('refresh-button');
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(getAreaSummary).toHaveBeenCalledTimes(2);
    });
  });

  it('closes modal when onClose is called', async () => {
    renderProjectsPage();

    await waitFor(() => screen.getByText('Project 1'));

    const plusButton = screen.getByTestId('add-button');
    fireEvent.click(plusButton);

    expect(screen.getByText(/Add Project/i)).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog).not.toHaveAttribute('open');
    });
  });

  it('refreshes data and closes modal when onSuccess is called', async () => {
    vi.spyOn(ProjectService, 'createProject').mockResolvedValue(mockAPIResponse);

    renderProjectsPage();

    await waitFor(() => screen.getByText('Project 1'));

    const plusButton = screen.getByTestId('add-button');
    fireEvent.click(plusButton);

    expect(screen.getByText(/Add Project/i)).toBeInTheDocument();

    const titleInput = screen.getByTestId('title-field');
    const descriptionInput = screen.getByTestId('description-field');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'New title');

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'New description');

    const dialogActionButton = screen.getByTestId('dialog-action-button');

    await waitFor(() => expect(dialogActionButton).toBeEnabled());

    await userEvent.click(dialogActionButton);

    await waitFor(() => {
      expect(ProjectService.createProject).toHaveBeenCalledWith({
        title: 'New title',
        description: 'New description',
        areaId: '1',
      });
      expect(screen.getByText('Project 1')).toBeInTheDocument();
    });
  });

  it('closes the summary panel when close button is clicked', async () => {
    renderProjectsPage();

    await waitFor(() => screen.getByText('Project 1'));

    const summaryButton = screen.getByTestId('summary-button');
    fireEvent.click(summaryButton);

    expect(screen.getByText(/Summary of Projects/i)).toBeInTheDocument();

    const closeButton = screen.getAllByTestId('close-button')[0];
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/Summary of Projects/i)).not.toBeInTheDocument();
    });
  });
});
