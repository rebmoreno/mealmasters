import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import MealCard from './components/MealCard';
import TabBar from './components/TabBar';
import type { Meal, MealSearchResponse } from './types';
import { buildGroceryList } from './utils/ingredients';

function App() {

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [showGroceryList, setShowGroceryList] = useState(false);

  function toggleMeal(meal: Meal) {
    setSelectedMeals((current) =>
      current.some((m) => m.idMeal === meal.idMeal)
        ? current.filter((m) => m.idMeal !== meal.idMeal)
        : [...current, meal]
    );
  }

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
      {showGroceryList ? (
        <>
          <div className="app__header">
            <button
              className="app__back"
              type="button"
              aria-label="Back to meals"
              onClick={() => setShowGroceryList(false)}
            >
              <ChevronLeft size={22} />
            </button>
            <h1 className="app__title">Grocery List</h1>
          </div>

          <ul className="grocery">
            {buildGroceryList(selectedMeals).map((item) => (
              <li key={item.name} className="grocery__item">
                <span className="grocery__name">{item.name}</span>
                {item.measures.length > 0 && (
                  <span className="grocery__measure">
                    {item.measures.join(', ')}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="app__header">
            <button className="app__back" type="button" aria-label="Go back">
              <ChevronLeft size={22} />
            </button>
            <h1 className="app__title">Choose Meals</h1>
          </div>

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
                isSelected={selectedMeals.some((m) => m.idMeal === meal.idMeal)}
                onSelect={() => toggleMeal(meal)}
              />
            ))}
          </div>

          {selectedMeals.length > 0 && (
            <button
              className="generate"
              type="button"
              onClick={() => setShowGroceryList(true)}
            >
              Generate Grocery List ({selectedMeals.length})
            </button>
          )}
        </>
      )}

      <TabBar />
    </main>
  );
}

export default App;