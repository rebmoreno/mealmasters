import { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import type { Meal, MealSearchResponse } from './types';

function App() {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
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
  }, [searchTerm]);
  
  return (
    <main className="app">
      <h1 className="app__title">Choose Meals</h1>

      {isLoading && <p className="app__status">Loading meals...</p>}

      {error && <p className="app__status app__status--error">{error}</p>}

      {!isLoading && !error && meals.length === 0 && (
        <p className="app__status">No meals found.</p>
      )}

      <div className="search">
        <label className="search__label" htmlFor="meal-search">
          Search meals
        </label>
        <input
          id="meal-search"
          className="search__input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try chicken, pasta, beef..."
        />
        <button
          className="search__button"
          type="button"
          onClick={() => setSearchTerm(query)}
        >
          Search
        </button>
      </div>

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