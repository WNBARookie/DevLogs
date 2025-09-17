import { useParams } from 'react-router-dom';
import type { ItemInfo, ProjectInfo } from '../types';
import { useEffect, useState } from 'react';
import { getProjectDetails, getProjectSummary } from '../services/ProjectService';
import { FaLightbulb, FaPlus, FaTimes } from 'react-icons/fa';
import ItemFormModal from '../components/items/ItemFormModal';
import ItemList from '../components/items/ItemList';
import Spinner from '../components/Spinner';
import { FaArrowsRotate } from 'react-icons/fa6';

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [items, setItems] = useState<ItemInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProjectSummary, setLoadingProjectSummary] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInfo | null>(null);
  const [showProjectSummary, setShowProjectSummary] = useState<boolean>(false);
  const [projectSummary, setProjectSummary] = useState<string>('');

  const fetchData = async () => {
    try {
      const res = await getProjectDetails(id!);
      if (res) {
        setProject(res.project);
        setItems(res.items);
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

  const fetchProjectSummary = async () => {
    try {
      const res = await getProjectSummary(id!);
      if (res) {
        setProjectSummary(res.summary);
      }
    } catch (error) {
      console.error('Error fetching area summary data: ', error);
    } finally {
      setLoadingProjectSummary(false);
    }
  };

  const onClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const onSuccess = () => {
    setShowModal(false);
    setLoading(true);
    setSelectedItem(null);
    fetchData();
  };

  const onShowModal = (item: ItemInfo | null) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleOpenGenerateSummaryDialog = () => {
    setShowProjectSummary(true);
    if (projectSummary.length === 0) {
      handleRefreshGridSummary();
    }
  };

  const handleCloseGenerateSummaryDialog = () => {
    setShowProjectSummary(false);
  };

  const handleRefreshGridSummary = () => {
    setLoadingProjectSummary(true);
    fetchProjectSummary();
  };

  return (
    <div className="px-12 py-4">
      <div className="flex items-center justify-between mb-6">
        {' '}
        <h1 className="text-4xl font-bold">{project?.title}</h1>
        <div className="flex items-center justify-between gap-8">
          <FaLightbulb className="text-2xl btn btn-sm btn-circle btn-ghost text-amber-600" onClick={handleOpenGenerateSummaryDialog} />
          <FaPlus className="text-2xl btn btn-sm btn-circle btn-ghost" onClick={() => onShowModal(null)} />
        </div>
      </div>
      <div>
        {showProjectSummary && (
          <div className="bg-gray-300 shadow-lg p-4 mb-4 rounded-lg relative">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Summary of Items</h1>
              <div className="flex items-center justify-between gap-4">
                <FaArrowsRotate className="btn btn-sm btn-circle btn-ghost" onClick={handleRefreshGridSummary} />
                <FaTimes className="btn btn-sm btn-circle btn-ghost" onClick={handleCloseGenerateSummaryDialog} />
              </div>
            </div>

            {loadingProjectSummary ? <Spinner loading={loadingProjectSummary} /> : <p>{projectSummary}</p>}
          </div>
        )}
      </div>
      {loading ? <Spinner loading={loading} /> : <ItemList items={items} onSuccess={onSuccess} onShowModal={onShowModal} />}

      <ItemFormModal open={showModal} onClose={onClose} onSuccess={onSuccess} item={selectedItem} projectId={id!} />
    </div>
  );
};

export default ProjectDetailsPage;
