import { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import type { Meal, MealSearchResponse } from './types';

function App() {

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data: MealSearchResponse) => {
        setMeals(data.meals ?? []);
      });
  }, []);
  
  return (
    <main className="app">
      <h1 className="app__title">Choose Meals</h1>

      <div className="meal-list">
        {meals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            name={meal.strMeal}
            category={meal.strCategory}
            image={meal.strMealThumb}
          />
        ))}
      </div>
    </main>
  );
}

export default App;