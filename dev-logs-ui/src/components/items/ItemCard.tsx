import type { ItemInfo } from '../../types';
import { deleteItem } from '../../services/ItemService';

type ItemCardProps = {
  item: ItemInfo;
  onSuccess: () => void;
  onShowModal: (item: ItemInfo | null) => void;
};

const ItemCard = ({ item, onSuccess, onShowModal }: ItemCardProps) => {
  const handleDeleteItem = async () => {
    const res = await deleteItem(item.id);
    if (res && res.status === 200) {
      onSuccess();
    }
  };

  return (
    <div className="collapse collapse-arrow bg-gray-200 rounded shadow-lg" data-testid="item-card">
      <input type="checkbox" name="my-accordion-2" />
      <div className="collapse-title font-semibold" data-testid="card-menu-button">
        {item.title}
      </div>
      <div className="collapse-content text-sm">
        <div className="">
          <div className="grid grid-cols-5 gap-4 mb-4">
            <label htmlFor="title" className="font-bold text-gray-900">
              Description:
            </label>
            <p className="col-span-4">{item.description}</p>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4">
            <label htmlFor="title" className="font-bold text-gray-900">
              What Went Well:
            </label>
            <p className="col-span-4">{item.whatWentWell}</p>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4">
            <label htmlFor="title" className="font-bold text-gray-900">
              What Did Not Go Well:
            </label>
            <p className="col-span-4">{item.whatDidNotGoWell}</p>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4">
            <label htmlFor="title" className="font-bold text-gray-900">
              Lessons Learned:
            </label>
            <p className="col-span-4">{item.lessonsLearned}</p>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4">
            <label htmlFor="title" className="font-bold text-gray-900">
              Date Completed:
            </label>
            <p className="col-span-4">
              {new Date(item.dateCompleted).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button data-testid="edit-button" type="button" onClick={() => onShowModal(item)} className="bg-gray-500 rounded-lg px-8 py-2 text-white">
              Edit
            </button>
            <button data-testid="delete-button" type="button" onClick={handleDeleteItem} className="bg-red-500 rounded-lg px-8 py-2 text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
