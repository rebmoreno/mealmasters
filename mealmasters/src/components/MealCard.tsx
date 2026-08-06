interface MealCardProps {
  name: string;
  category: string;
  image: string;
  isSelected: boolean;
  onSelect: () => void;
}

function MealCard({ name, category, image, isSelected, onSelect }: MealCardProps) {
  return (
    <button
      className={isSelected ? 'meal-card meal-card--selected' : 'meal-card'}
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <img className="meal-card__thumb" src={image} alt="" />
      <span className="meal-card__text">
        <span className="meal-card__name">{name}</span>
        <span className="meal-card__meta">{category}</span>
      </span>
    </button>
  );
}

export default MealCard;