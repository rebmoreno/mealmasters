interface MealCardProps {
  name: string;
  category: string;
  image: string;
}

function MealCard({ name, category, image }: MealCardProps) {
  return (
    <button className="meal-card" type="button">
      <img className="meal-card__thumb" src={image} alt="" />
      <span className="meal-card__text">
        <span className="meal-card__name">{name}</span>
        <span className="meal-card__meta">{category}</span>
      </span>
    </button>
  );
}

export default MealCard;