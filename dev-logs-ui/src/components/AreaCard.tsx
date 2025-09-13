import { FaTrash } from 'react-icons/fa';
import type { AreaInfo } from '../types';
import { deleteArea } from '../services/AreaService';

type AreaCardProps = {
  area: AreaInfo;
  onSuccess: () => void;
  onShowModal: (area: AreaInfo | null) => void;
};

const AreaCard = ({ area, onSuccess, onShowModal }: AreaCardProps) => {
  const handleDeleteArea = async () => {
    const res = await deleteArea(area.id);
    if (res && res.status === 200) {
      onSuccess();
    }
  };

  return (
    <div className=" rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{area.title}</div>
        <p className="text-base">{area.description}</p>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            Click
          </div>
          <ul tabIndex={0} className="dropdown-content dark:bg-gray-700 menu rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a onClick={() => onShowModal(area)}>Edit</a>
            </li>
            <li>
              <a onClick={handleDeleteArea}>Delete</a>
              <FaTrash className="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AreaCard;
