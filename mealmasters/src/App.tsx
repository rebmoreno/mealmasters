import { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import type { Meal, MealSearchResponse } from './types';

function App() {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        if (!response.ok) throw new Error('Cloud not load meals');
        return response.json();
      })
      .then((data: MealSearchResponse) => {
        setMeals(data.meals ?? []);
      })
      .catch(() => {
        setError('Something went wrong while loading meals. Try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  
  return (
    <main className="app">
      <h1 className="app__title">Choose Meals</h1>

      {isLoading && <p className="app__status">Loading meals...</p>}

      {error && <p className="app__status app__status--error">{error}</p>}

      {!isLoading && !error && meals.length === 0 && (
        <p className="app__status">No meals found.</p>
      )}


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