import { defineStore } from "pinia";
import { calcPizzaPrice } from "@/common/helpers/calcPizzaPrice";
import { useDataStore } from "@/stores";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    addonsCounts: {},
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
        totalPrice: pizza.price * pizza.quantity,
      }));
    },
    getPizzaById(state) {
      return (id) => state.pizzas.find((pizza) => pizza.id === id);
    },
    getAddonCount(state) {
      return (id) => state.addonsCounts[id] ?? 0;
    },
    totalPriceLocaleString(state) {
      if (!state.pizzas.length) {
        return String(0);
      }

      const dataStore = useDataStore();

      const pizzasTotalPrice = this.expandedPizzas.reduce((sum, pizza) => {
        return sum + pizza.totalPrice;
      }, 0);

      const addonsTotalPrice = Object.entries(state.addonsCounts).reduce(
        (sum, [id, count]) => {
          const addon = dataStore.getAddonById(Number(id));
          return sum + addon.price * count;
        },
        0,
      );

      const totalPrice = pizzasTotalPrice + addonsTotalPrice;
      return totalPrice.toLocaleString("ru");
    },
  },
  actions: {
    addPizza(pizza) {
      pizza.id = crypto.randomUUID();
      pizza.quantity = 1;
      this.pizzas.push(pizza);
    },
    removePizzaById(id) {
      const pizzaIndex = this.pizzas.findIndex((pizza) => pizza.id === id);
      this.pizzas.splice(pizzaIndex, 1);
    },
    updatePizza(pizza) {
      if (pizza.quantity === 0) {
        this.removePizzaById(pizza.id);
        return;
      }

      const pizzaIndex = this.pizzas.findIndex(({ id }) => id === pizza.id);
      const updatedPizza = { ...this.pizzas[pizzaIndex], ...pizza };
      this.pizzas.splice(pizzaIndex, 1, updatedPizza);
    },
    setAddonCount(id, count) {
      if (count) {
        this.addonsCounts[id] = count;
      } else {
        delete this.addonsCounts[id];
      }
    },
    setOrder(order) {
      this.pizzas = order.orderPizzas.map((pizza) => {
        const adaptedPizza = {
          id: pizza.id,
          name: pizza.name,
          doughId: pizza.doughId,
          sizeId: pizza.sizeId,
          sauceId: pizza.sauceId,
          ingredientsCounts: pizza.ingredients.reduce(
            (acc, { ingredientId, quantity }) => {
              acc[ingredientId] = quantity;
              return acc;
            },
            {},
          ),
          quantity: pizza.quantity,
        };

        adaptedPizza.price = calcPizzaPrice(adaptedPizza);

        return adaptedPizza;
      });

      if (order.orderMisc) {
        this.addonsCounts = order.orderMisc.reduce(
          (acc, { miscId, quantity }) => {
            acc[miscId] = quantity;
            return acc;
          },
          {},
        );
      }
    },
  },
});
