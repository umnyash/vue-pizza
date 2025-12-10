import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import { IngredientCount } from "@/common/enums";
import { calcPizzaPrice } from "@/common/helpers/calcPizzaPrice";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
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
      this.name = "";
      this.doughId = doughJSON[0].id;
      this.sizeId = sizesJSON[0].id;
      this.sauceId = saucesJSON[0].id;
      this.ingredientsCounts = {};
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
