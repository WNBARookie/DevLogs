import type { ItemInfo } from '../types';
import ItemCard from './ItemCard';

type ItemListProps = {
  items: ItemInfo[] | null;
  onSuccess: () => void;
  onShowModal: (project: ItemInfo | null) => void;
};

const ItemList = ({ items, onSuccess, onShowModal }: ItemListProps) => {
  return items && items.length > 0 ? (
    // <div className="grid grid-cols-3 gap-8">
    <div className="grid gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onSuccess={onSuccess} onShowModal={onShowModal} />
      ))}
    </div>
  ) : (
    <h1 className="text-2xl font-bold">Add an item to get started!</h1>
  );
};

export default ItemList;
