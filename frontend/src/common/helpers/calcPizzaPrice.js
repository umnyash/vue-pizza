import { useDataStore } from "@/stores";

export const calcPizzaPrice = (pizza) => {
  const dataStore = useDataStore();

  const doughPrice = dataStore.doughs.find(
    (dough) => dough.id === pizza.doughId,
  ).price;

  const saucePrice = dataStore.sauces.find(
    (sauce) => sauce.id === pizza.sauceId,
  ).price;

  let ingredientsPrice = 0;

  if (pizza.ingredientsCounts) {
    ingredientsPrice = dataStore.ingredients.reduce((acc, ingredient) => {
      const ingredientCount = pizza.ingredientsCounts[ingredient.id];

      if (ingredientCount) {
        acc += ingredient.price * ingredientCount;
      }

      return acc;
    }, 0);
  } else if (pizza.ingredients) {
    ingredientsPrice = pizza.ingredients.reduce(
      (acc, { ingredientId, quantity }) => {
        const ingredient = dataStore.getIngredientById(+ingredientId);
        acc += ingredient.price * quantity;
        return acc;
      },
      0,
    );
  }

  const sizeMultiplier = dataStore.sizes.find(
    (size) => size.id === pizza.sizeId,
  ).multiplier;

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};
