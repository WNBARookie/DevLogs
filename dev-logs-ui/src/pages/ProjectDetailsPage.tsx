import { useParams } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const { id } = useParams();

  return <div className="h-full">ProjectDetailsPage</div>;
};

export default ProjectDetailsPage;
