import { defineStore } from "pinia";
import { useDataStore } from "@/stores";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
  }),
  getters: {
    expandedPizzas(state) {
      const dataStore = useDataStore();

      return state.pizzas.map((pizza) => ({
        ...pizza,
        dough: dataStore.getDoughById(pizza.doughId),
        sauce: dataStore.getSauceById(pizza.sauceId),
        size: dataStore.getSizeById(pizza.sizeId),
        ingredients: Object.keys(pizza.ingredientsCounts).map((ingredientId) =>
          dataStore.getIngredientById(+ingredientId),
        ),
      }));
    },
  },
  actions: {
    addPizza(pizza) {
      this.pizzas.push(pizza);
    },
  },
});
