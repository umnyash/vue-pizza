import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import { IngredientCount } from "@/common/enums";
import { calcPizzaPrice } from "@/common/helpers/calcPizzaPrice";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    id: null,
    name: "",
    doughId: doughJSON[0].id,
    sizeId: sizesJSON[0].id,
    sauceId: saucesJSON[0].id,
    ingredientsCounts: {},
  }),
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
      this.id = null;
      this.name = "";
      this.doughId = doughJSON[0].id;
      this.sizeId = sizesJSON[0].id;
      this.sauceId = saucesJSON[0].id;
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
