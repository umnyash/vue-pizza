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
    getPizzaById(state) {
      return (id) => state.pizzas.find((pizza) => pizza.id === id);
    },
  },
  actions: {
    addPizza(pizza) {
      pizza.id = crypto.randomUUID();
      this.pizzas.push(pizza);
    },
    updatePizza(pizza) {
      const pizzaIndex = this.pizzas.findIndex(({ id }) => id === pizza.id);
      const updatedPizza = { ...this.pizzas[pizzaIndex], ...pizza };
      this.pizzas.splice(pizzaIndex, 1, updatedPizza);
    },
  },
});
