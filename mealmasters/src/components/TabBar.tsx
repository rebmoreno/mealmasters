import { House, UtensilsCrossed, ClipboardList, Settings } from 'lucide-react';

function TabBar() {
  return (
    <nav className="tabbar">
      <button className="tabbar__item" type="button">
        <House size={20} />
        <span className="tabbar__label">Home</span>
      </button>
      <button className="tabbar__item tabbar__item--active" type="button">
        <UtensilsCrossed size={20} />
        <span className="tabbar__label">Meals</span>
      </button>
      <button className="tabbar__item" type="button">
        <ClipboardList size={20} />
        <span className="tabbar__label">List</span>
      </button>
      <button className="tabbar__item" type="button">
        <Settings size={20} />
        <span className="tabbar__label">Settings</span>
      </button>
    </nav>
  );
}

export default TabBar;