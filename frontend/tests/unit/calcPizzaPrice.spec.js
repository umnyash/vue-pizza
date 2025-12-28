import { createPinia, setActivePinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { prepareData } from "../helpers/prepare-data";
import { calcPizzaPrice } from "@/common/helpers/calcPizzaPrice";

describe("Test calcPizzaPrice common function", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    prepareData();
  });

  it("should return pizza price", () => {
    const pizza = {
      sauceId: 1,
      doughId: 1,
      sizeId: 1,
      ingredientsCounts: {
        1: 1,
        3: 2,
      },
    };

    const result = calcPizzaPrice(pizza);

    expect(result).toBe(467);
  });
});
