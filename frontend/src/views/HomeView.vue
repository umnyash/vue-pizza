<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <dough-selector v-model="pizza.dough" :doughs="doughs" />
        <size-selector v-model="pizza.size" :sizes="sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selector v-model="pizza.sauce" :sauces="sauces" />
              <ingredients-selector
                :ingredients="ingredients"
                :ingredients-counts="pizza.ingredientsCounts"
                @change="updateIngredientsCounts"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizza.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-visualization
            :dough="pizza.dough"
            :sauce="pizza.sauce"
            :ingredients-counts="pizza.ingredientsCounts"
            @drop="handlePizzaVisualizationDrop"
          />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" :disabled="!pizza.name">
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, computed } from "vue";
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";

import {
  normalizeDough,
  normalizeSize,
  normalizeIngredient,
  normalizeSauce,
} from "@/common/helpers/normalize";

import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import SizeSelector from "@/modules/constructor/SizeSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientsSelector from "@/modules/constructor/IngredientsSelector.vue";
import PizzaVisualization from "@/modules/constructor/PizzaVisualization.vue";

const doughs = doughJSON.map(normalizeDough);
const ingredients = ingredientsJSON.map(normalizeIngredient);
const sauces = saucesJSON.map(normalizeSauce);
const sizes = sizesJSON.map(normalizeSize);

const pizza = reactive({
  name: "",
  dough: doughs[0].value,
  size: sizes[1].value,
  sauce: sauces[0].value,
  ingredientsCounts: {},
});

const price = computed(() => {
  const doughPrice = doughs.find((dough) => dough.value === pizza.dough).price;
  const saucePrice = sauces.find((sauce) => sauce.value === pizza.sauce).price;

  const ingredientsPrice = ingredients.reduce((acc, ingredient) => {
    const ingredientCount = pizza.ingredientsCounts[ingredient.value];

    if (ingredientCount) {
      acc += ingredient.price * ingredientCount;
    }

    return acc;
  }, 0);

  const sizeMultiplier = sizes.find(
    (size) => size.value === pizza.size,
  ).multiplier;

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
});

const updateIngredientsCounts = (ingredient, count) => {
  /*
    A technique is used to overwrite the entire object to fix the problem
    where the user repeatedly enters a quantity greater than the maximum,
    which is always saved as the maximum quantity and the component is not updated.

    For example, the current quantity is equal to the maximum (3),
    then the user enters 33, which is saved as the same 3,
    and the value 33 remains in the interface.
  */

  const currentIngredientsCounts = { ...pizza.ingredientsCounts };

  if (count) {
    currentIngredientsCounts[ingredient] = count;
  } else {
    delete currentIngredientsCounts[ingredient];
  }

  pizza.ingredientsCounts = currentIngredientsCounts;
};

const handlePizzaVisualizationDrop = (ingredient) => {
  pizza.ingredientsCounts[ingredient] = pizza.ingredientsCounts[ingredient]
    ? pizza.ingredientsCounts[ingredient] + 1
    : 1;
};
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
