import type { Meal } from '../types';

export interface GroceryItem {
  name: string;
  measures: string[];
}

export function getIngredients(meal: Meal): { name: string; measure: string }[] {
  const items: { name: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && name.trim() !== '') {
      items.push({
        name: name.trim(),
        measure: measure?.trim() ?? '',
      });
    }
  }

  return items;
}

export function buildGroceryList(meals: Meal[]): GroceryItem[] {
  const map = new Map<string, GroceryItem>();

  for (const meal of meals) {
    for (const item of getIngredients(meal)) {
      const key = item.name.toLowerCase();
      const existing = map.get(key);

      if (existing) {
        if (item.measure) existing.measures.push(item.measure);
      } else {
        map.set(key, {
          name: item.name,
          measures: item.measure ? [item.measure] : [],
        });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}