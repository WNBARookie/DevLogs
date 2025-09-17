import { useEffect, useState } from 'react';
import { getAreas } from '../services/AreaService';
import type { AreaInfo } from '../types';
import Spinner from '../components/Spinner';
import AreaList from '../components/areas/AreaList';
import { FaPlus } from 'react-icons/fa';

import AreaFormModal from '../components/areas/AreaFormModal';

const HomePage = () => {
  const [areas, setAreas] = useState<AreaInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<AreaInfo | null>(null);

  const fetchData = async () => {
    try {
      const res = await getAreas();
      setAreas(res);
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
    setSelectedArea(null);
  };

  const onSuccess = () => {
    setShowModal(false);
    setLoading(true);
    setSelectedArea(null);
    fetchData();
  };

  const onShowModal = (area: AreaInfo | null) => {
    setSelectedArea(area);
    setShowModal(true);
  };

  return (
    <div className="px-12 py-4">
      <div className="flex items-center justify-between mb-6">
        {' '}
        <h1 className="text-4xl font-bold">Welcome</h1>
        <FaPlus className="text-2xl btn btn-sm btn-circle btn-ghost" onClick={() => onShowModal(null)} />
      </div>
      {loading ? <Spinner loading={loading} /> : <AreaList areas={areas} onSuccess={onSuccess} onShowModal={onShowModal} />}

      <AreaFormModal open={showModal} onClose={onClose} onSuccess={onSuccess} area={selectedArea} />
    </div>
  );
};

export default HomePage;
