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
    <div className=" rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl mb-2">{area.title}</div>
          <div className="dropdown">
            <div tabIndex={0} className="">
              <FaEllipsisV />
            </div>
            <ul tabIndex={0} className="dropdown-content bg-gray-100 menu rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <a onClick={() => onShowModal(area)}>Edit</a>
              </li>
              <li>
                <a onClick={handleDeleteArea}>Delete</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4" onClick={handleAreaClick}>
          <p className="text-base">{area.description}</p>
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default AreaCard;
