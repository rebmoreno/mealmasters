export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    [key: string]: string | null;
}

export interface MealSearchResponse {
    meals: Meal[] | null;
}