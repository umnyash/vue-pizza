import { defineStore } from "pinia";
import {
  normalizeDough,
  normalizeSize,
  normalizeIngredient,
  normalizeSauce,
} from "@/common/helpers/normalize";
import resources from "@/services/resources";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: [],
    ingredients: [],
    sauces: [],
    sizes: [],
    misc: [],
  }),
  getters: {
    isDataLoaded(state) {
      return (
        state.doughs.length &&
        state.ingredients.length &&
        state.sauces.length &&
        state.sauces.length &&
        state.misc.length
      );
    },
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
  actions: {
    async loadData() {
      await Promise.all([
        this.loadDoughs(),
        this.loadIngredients(),
        this.loadSauces(),
        this.loadSizes(),
        this.loadMisc(),
      ]);
    },

    async loadDoughs() {
      const response = await resources.dough.getDoughs();

      if (response.__state === "success") {
        this.doughs = response.data.map(normalizeDough);
      }
    },

    async loadIngredients() {
      const response = await resources.ingredient.getIngredients();

      if (response.__state === "success") {
        this.ingredients = response.data.map(normalizeIngredient);
      }
    },

    async loadSauces() {
      const response = await resources.sauce.getSauces();

      if (response.__state === "success") {
        this.sauces = response.data.map(normalizeSauce);
      }
    },

    async loadSizes() {
      const response = await resources.size.getSizes();

      if (response.__state === "success") {
        this.sizes = response.data.map(normalizeSize);
      }
    },

    async loadMisc() {
      const response = await resources.misc.getMisc();

      if (response.__state === "success") {
        this.misc = response.data;
      }
    },
  },
});
