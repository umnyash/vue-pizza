import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
  }),
  getters: {},
  actions: {
    addPizza(pizza) {
      this.pizzas.push(pizza);
    },
  },
});
