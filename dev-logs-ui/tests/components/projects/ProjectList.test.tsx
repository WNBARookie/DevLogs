import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectList from '../../../src/components/projects/ProjectList';
import '../../base';
import { ProjectInfo } from '../../../src/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProjectList', () => {
  const mockOnSuccess = vi.fn();
  const mockShowModal = vi.fn();

  const mockProject: ProjectInfo = {
    id: '1',
    title: 'title',
    description: 'description',
  };

  const renderProjectList = (projects: ProjectInfo[]) => render(<ProjectList projects={projects} onSuccess={mockOnSuccess} onShowModal={mockShowModal} />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the project list when projects are provided', () => {
    renderProjectList([mockProject]);

    expect(screen.getByTestId('project-card-from-list')).toBeInTheDocument();
  });

  it('shows fallback text when no projects are provided', () => {
    renderProjectList([]);

    expect(screen.getByText(/Add a project to get started!/i)).toBeInTheDocument();
  });
});
