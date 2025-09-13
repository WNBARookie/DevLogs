import type { AreaInfo } from '../types';
import AreaCard from './AreaCard';

type AreaListProps = {
  areas: AreaInfo[] | null;
  onSuccess: () => void;
  onShowModal: (area: AreaInfo | null) => void;
};

const AreaList = ({ areas, onSuccess, onShowModal }: AreaListProps) => {
  return areas && areas.length > 0 ? (
    <div className="grid grid-cols-3 gap-8">
      {areas.map((area) => (
        <AreaCard key={area.id} area={area} onSuccess={onSuccess} onShowModal={onShowModal} />
      ))}
    </div>
  ) : (
    <h1 className="text-2xl font-bold">Add an area to get started!</h1>
  );
};

export default AreaList;
