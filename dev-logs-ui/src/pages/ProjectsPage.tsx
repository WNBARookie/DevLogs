import { useParams } from 'react-router-dom';
import type { AreaInfo, ProjectInfo } from '../types';
import { getAreaDetails } from '../services/AreaService';
import { useState, useEffect } from 'react';
import ProjectFormModal from '../components/ProjectFormModal';
import ProjectList from '../components/ProjectList';
import { FaLightbulb, FaPlus } from 'react-icons/fa';
import Spinner from '../components/Spinner';

const ProjectsPage = () => {
  const { id } = useParams();

  const [area, setArea] = useState<AreaInfo | null>(null);
  const [projects, setProjects] = useState<ProjectInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAreaDetails(id!);
      if (res) {
        setArea(res.area);
        setProjects(res.projects);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClose = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const onSuccess = () => {
    setShowModal(false);
    setLoading(true);
    setSelectedProject(null);
    fetchData();
  };

  const onShowModal = (project: ProjectInfo | null) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleGenerateSummary = () => {
    console.log('Generate summary for projects in an area');
  };

  return (
    <div className="px-12 py-4">
      <div className="flex items-center justify-between mb-6">
        {' '}
        <h1 className="text-4xl font-bold">Projects for {area?.title}</h1>
        <div className="flex items-center justify-between gap-8">
          <FaLightbulb className="text-2xl btn btn-sm btn-circle btn-ghost text-amber-600" onClick={handleGenerateSummary} />
          <FaPlus className="text-2xl btn btn-sm btn-circle btn-ghost" onClick={() => onShowModal(null)} />
        </div>{' '}
      </div>
      {loading ? <Spinner loading={loading} /> : <ProjectList projects={projects} onSuccess={onSuccess} onShowModal={onShowModal} />}

      <ProjectFormModal open={showModal} onClose={onClose} onSuccess={onSuccess} project={selectedProject} areaId={id!} />
    </div>
  );
};

export default ProjectsPage;
