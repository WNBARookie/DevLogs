import { useParams } from 'react-router-dom';
import type { AreaInfo, ProjectInfo } from '../types';
import { getAreaDetails, getAreaSummary } from '../services/AreaService';
import { useState, useEffect } from 'react';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import ProjectList from '../components/projects/ProjectList';
import { FaLightbulb, FaPlus, FaTimes } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import { FaArrowsRotate } from 'react-icons/fa6';

const ProjectsPage = () => {
  const { id } = useParams();

  const [area, setArea] = useState<AreaInfo | null>(null);
  const [projects, setProjects] = useState<ProjectInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAreaSummary, setLoadingAreaSummary] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);
  const [showAreaSummary, setShowAreaSummary] = useState<boolean>(false);
  const [areaSummary, setAreaSummary] = useState<string>('');

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
  }, [id]);

  const fetchAreaSummary = async () => {
    try {
      const res = await getAreaSummary(id!);
      if (res) {
        setAreaSummary(res.summary);
      }
    } catch (error) {
      console.error('Error fetching area summary data: ', error);
    } finally {
      setLoadingAreaSummary(false);
    }
  };

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

  const handleOpenGenerateSummaryDialog = () => {
    setShowAreaSummary(true);
    if (areaSummary.length === 0) {
      handleRefreshGridSummary();
    }
  };

  const handleCloseGenerateSummaryDialog = () => {
    setShowAreaSummary(false);
  };

  const handleRefreshGridSummary = () => {
    setLoadingAreaSummary(true);
    fetchAreaSummary();
  };

  return (
    <div className="px-12 py-4">
      <div className="flex items-center justify-between mb-6">
        {' '}
        <h1 className="text-4xl font-bold">Projects for {area?.title}</h1>
        <div className="flex items-center justify-between gap-8">
          <FaLightbulb data-testid="summary-button" className="text-2xl btn btn-sm btn-circle btn-ghost text-amber-600" onClick={handleOpenGenerateSummaryDialog} />
          <FaPlus data-testid="add-button" className="text-2xl btn btn-sm btn-circle btn-ghost" onClick={() => onShowModal(null)} />
        </div>{' '}
      </div>
      <div>
        {showAreaSummary && (
          <div className="bg-gray-300 shadow-lg p-4 mb-4 rounded-lg relative">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Summary of Projects</h1>
              <div className="flex items-center justify-between gap-4">
                <FaArrowsRotate data-testid="refresh-button" className="btn btn-sm btn-circle btn-ghost" onClick={handleRefreshGridSummary} />
                <FaTimes data-testid="close-button" className="btn btn-sm btn-circle btn-ghost" onClick={handleCloseGenerateSummaryDialog} />
              </div>
            </div>

            {loadingAreaSummary ? <Spinner loading={loadingAreaSummary} /> : <p data-testid="summary-text">{areaSummary}</p>}
          </div>
        )}
      </div>
      {loading ? <Spinner loading={loading} /> : <ProjectList projects={projects} onSuccess={onSuccess} onShowModal={onShowModal} />}

      <ProjectFormModal open={showModal} onClose={onClose} onSuccess={onSuccess} project={selectedProject} areaId={id!} />
    </div>
  );
};

export default ProjectsPage;
