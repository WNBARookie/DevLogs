import { FaEllipsisV, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../services/ProjectService';
import type { ProjectInfo } from '../types';

type ProjectCardProps = {
  project: ProjectInfo;
  onSuccess: () => void;
  onShowModal: (project: ProjectInfo | null) => void;
};

const ProjectCard = ({ project, onSuccess, onShowModal }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    const res = await deleteProject(project.id);
    if (res && res.status === 200) {
      onSuccess();
    }
  };

  const handleProjectClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className=" rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl mb-2">{project.title}</div>
          <div className="dropdown">
            <div tabIndex={0} className="">
              <FaEllipsisV />
            </div>
            <ul tabIndex={0} className="dropdown-content bg-gray-100 menu rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <a onClick={() => onShowModal(project)}>Edit</a>
              </li>
              <li>
                <a onClick={handleDeleteProject}>Delete</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-4 " onClick={handleProjectClick}>
          <p className="text-base">{project.description}</p>
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
