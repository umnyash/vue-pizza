import { createPinia, setActivePinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { prepareData } from "../helpers/prepare-data";
import { useCartStore } from "@/stores";

describe("Test cart store", () => {
  let cartStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    prepareData();
    cartStore = useCartStore();
  });

  it("should return total price locale string", () => {
    const pizza = {
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      ingredientsCounts: {},
      price: 467,
    };

    const addonsCounts = {
      1: 1,
      2: 2,
    };

    cartStore.pizzas = [{ ...pizza, quantity: 1 }];
    cartStore.addonsCounts = addonsCounts;

    const result = cartStore.totalPriceLocaleString;

    expect(result).toBe("583");
  });
});
