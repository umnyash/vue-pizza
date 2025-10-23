import { DoughType, Ingredient, PizzaSize, Sauce } from "@/common/enums";

export const normalizeDough = (dough) => ({
  ...dough,
  value: DoughType[dough.id],
});

export const normalizeSize = (size) => ({
  ...size,
  value: PizzaSize[size.id],
});

export const normalizeIngredient = (ingredient) => ({
  ...ingredient,
  value: Ingredient[ingredient.id],
});

export const normalizeSauce = (sauce) => ({
  ...sauce,
  value: Sauce[sauce.id],
});
