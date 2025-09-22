import type { ProjectInfo } from '../../types';
import ProjectCard from './ProjectCard';

type ProjectListProps = {
  projects: ProjectInfo[] | null;
  onSuccess: () => void;
  onShowModal: (project: ProjectInfo | null) => void;
};

const ProjectList = ({ projects, onSuccess, onShowModal }: ProjectListProps) => {
  return projects && projects.length > 0 ? (
    <div className="grid md:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div data-testid="project-card-from-list">
          <ProjectCard key={project.id} project={project} onSuccess={onSuccess} onShowModal={onShowModal} />
        </div>
      ))}
    </div>
  ) : (
    <h1 className="text-2xl font-bold">Add a project to get started!</h1>
  );
};

export default ProjectList;
