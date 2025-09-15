import { useParams } from 'react-router-dom';
import type { ItemInfo, ProjectInfo } from '../types';
import { useEffect, useState } from 'react';
import { getProjectDetails } from '../services/ProjectService';
import { FaLightbulb, FaPlus } from 'react-icons/fa';
import ItemFormModal from '../components/ItemFormModal';
import ItemList from '../components/ItemList';
import Spinner from '../components/Spinner';

const ProjectDetailsPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [items, setItems] = useState<ItemInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInfo | null>(null);

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
  }, []);

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

  const handleGenerateSummary = () => {
    console.log('Generate summary for items in a project');
  };

  return (
    <div className="px-12 py-4">
      <div className="flex items-center justify-between mb-6">
        {' '}
        <h1 className="text-4xl font-bold">{project?.title}</h1>
        <div className="flex items-center justify-between gap-8">
          <FaLightbulb className="text-2xl btn btn-sm btn-circle btn-ghost text-amber-600" onClick={handleGenerateSummary} />
          <FaPlus className="text-2xl btn btn-sm btn-circle btn-ghost" onClick={() => onShowModal(null)} />
        </div>
      </div>
      {loading ? <Spinner loading={loading} /> : <ItemList items={items} onSuccess={onSuccess} onShowModal={onShowModal} />}

      <ItemFormModal open={showModal} onClose={onClose} onSuccess={onSuccess} item={selectedItem} projectId={id!} />
    </div>
  );
};

export default ProjectDetailsPage;
