import { FaChevronRight, FaEllipsisV } from 'react-icons/fa';
import type { AreaInfo } from '../../types';
import { deleteArea } from '../../services/AreaService';
import { useNavigate } from 'react-router-dom';

type AreaCardProps = {
  area: AreaInfo;
  onSuccess: () => void;
  onShowModal: (area: AreaInfo | null) => void;
};

const AreaCard = ({ area, onSuccess, onShowModal }: AreaCardProps) => {
  const navigate = useNavigate();

  const handleDeleteArea = async () => {
    const res = await deleteArea(area.id);
    if (res && res.status === 200) {
      onSuccess();
    }
  };

  const handleAreaClick = () => {
    navigate(`/areas/${area.id}`);
  };

  return (
    <div className="rounded shadow-lg h-full" data-testid="area-card">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl mb-2">{area.title}</div>
          <div className="dropdown" data-testid="card-menu-button">
            <div tabIndex={0} className="">
              <FaEllipsisV />
            </div>
            <ul tabIndex={0} className="dropdown-content bg-gray-100 menu rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <a data-testid="edit-button" onClick={() => onShowModal(area)}>
                  Edit
                </a>
              </li>
              <li>
                <a data-testid="delete-button" onClick={handleDeleteArea}>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4" onClick={handleAreaClick} data-testid="area-card-footer">
          <p className="text-base">{area.description}</p>
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default AreaCard;
