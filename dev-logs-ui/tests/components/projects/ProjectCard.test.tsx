import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../../../src/components/projects/ProjectCard';
import '../../base';
import { ApiResponse, ProjectInfo } from '../../../src/types';
import * as ProjectService from '../../../src/services/ProjectService';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProjectCard', () => {
  const mockOnSuccess = vi.fn();
  const mockShowModal = vi.fn();

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

  const renderProjectCard = (project: ProjectInfo) => render(<ProjectCard key={1} project={project} onSuccess={mockOnSuccess} onShowModal={mockShowModal} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the project card when project is provided', () => {
    renderProjectCard(mockProject);

    expect(screen.getByTestId('project-card')).toBeInTheDocument();
  });

  it('calls showModal when clicking the edit button', () => {
    renderProjectCard(mockProject);

    const cardMenuButton = screen.getByTestId('card-menu-button');
    fireEvent.click(cardMenuButton);

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    expect(mockShowModal).toHaveBeenCalledTimes(1);
  });

  it('calls handleDeleteProject with success when clicking the delete button', async () => {
    vi.spyOn(ProjectService, 'deleteProject').mockResolvedValue(mockAPIResponse);

    renderProjectCard(mockProject);

    const cardMenuButton = screen.getByTestId('card-menu-button');
    fireEvent.click(cardMenuButton);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    // wait for async deletion
    expect(await ProjectService.deleteProject).toHaveBeenCalledWith('1');
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
  });

  it('call handleProjectClick when clicking an project footer', () => {
    renderProjectCard(mockProject);

    const projectCardFooter = screen.getByTestId('project-card-footer');
    fireEvent.click(projectCardFooter);

    expect(mockNavigate).toHaveBeenCalledWith('/projects/1');
  });
});
