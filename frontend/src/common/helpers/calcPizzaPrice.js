import { useDataStore } from "@/stores";

export const calcPizzaPrice = (pizza) => {
  const dataStore = useDataStore();

  const doughPrice = dataStore.doughs.find(
    (dough) => dough.id === pizza.doughId,
  ).price;

  const saucePrice = dataStore.sauces.find(
    (sauce) => sauce.id === pizza.sauceId,
  ).price;

  const ingredientsPrice = dataStore.ingredients.reduce((acc, ingredient) => {
    const ingredientCount = pizza.ingredientsCounts[ingredient.id];

    if (ingredientCount) {
      acc += ingredient.price * ingredientCount;
    }

    return acc;
  }, 0);

  const sizeMultiplier = dataStore.sizes.find(
    (size) => size.id === pizza.sizeId,
  ).multiplier;

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};
