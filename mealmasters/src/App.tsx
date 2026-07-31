import MealCard from './components/MealCard';

function App() {
  return (
    <main className="app">
      <h1 className="app__title">Choose Meals</h1>

      <div className="meal-list">
        <MealCard
          name="Grilled Chicken Salad"
          category="Chicken"
          image="https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg"
        />
        <MealCard
          name="Steak Tacos"
          category="Beef"
          image="https://www.themealdb.com/images/media/meals/uttupv1511382180.jpg"
        />
        <MealCard
          name="Baked Salmon"
          category="Seafood"
          image="https://www.themealdb.com/images/media/meals/1548772327.jpg"
        />
      </div>
    </main>
  );
}

export default App;