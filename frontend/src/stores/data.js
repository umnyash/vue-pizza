import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import miscJSON from "@/mocks/misc.json";
import {
  normalizeDough,
  normalizeSize,
  normalizeIngredient,
  normalizeSauce,
} from "@/common/helpers/normalize";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: doughJSON.map(normalizeDough),
    ingredients: ingredientsJSON.map(normalizeIngredient),
    sauces: saucesJSON.map(normalizeSauce),
    sizes: sizesJSON.map(normalizeSize),
    misc: miscJSON,
  }),
  getters: {
    getDoughById(state) {
      return (id) => state.doughs.find((dough) => dough.id === id);
    },
    getSauceById(state) {
      return (id) => state.sauces.find((sauce) => sauce.id === id);
    },
    getSizeById(state) {
      return (id) => state.sizes.find((size) => size.id === id);
    },
    getAddonById(state) {
      return (id) => state.misc.find((addon) => addon.id === id);
    },
    getIngredientById(state) {
      return (id) =>
        state.ingredients.find((ingredient) => ingredient.id === id);
    },
  },
  actions: {},
});
