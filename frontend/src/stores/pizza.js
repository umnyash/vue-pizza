import { defineStore } from "pinia";
import { IngredientCount } from "@/common/enums";
import { calcPizzaPrice } from "@/common/helpers/calcPizzaPrice";
import { useDataStore } from "./data";

export const usePizzaStore = defineStore("pizza", {
  state: () => {
    const dataStore = useDataStore();

    return {
      id: null,
      name: "",
      doughId: dataStore.doughs[0].id,
      sizeId: dataStore.sizes[0].id,
      sauceId: dataStore.sauces[0].id,
      ingredientsCounts: {},
    };
  },
  getters: {
    getIngredientCount(state) {
      return (id) => state.ingredientsCounts[id] ?? IngredientCount.Min;
    },
    price(state) {
      return calcPizzaPrice(state);
    },
  },
  actions: {
    reset() {
      const dataStore = useDataStore();

      this.id = null;
      this.name = "";
      this.doughId = dataStore.doughs[0].id;
      this.sizeId = dataStore.sizes[0].id;
      this.sauceId = dataStore.sauces[0].id;
      this.ingredientsCounts = {};
    },
    set(pizza) {
      this.id = pizza.id;
      this.name = pizza.name;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.sauceId = pizza.sauceId;
      this.ingredientsCounts = pizza.ingredientsCounts;
    },
    setIngredientCount(id, count) {
      if (count) {
        this.ingredientsCounts[id] = count;
      } else {
        delete this.ingredientsCounts[id];
      }
    },
    increaseIngredientCount(id) {
      this.ingredientsCounts[id] = this.ingredientsCounts[id]
        ? this.ingredientsCounts[id] + 1
        : 1;
    },
  },
});
