<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient of ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <div class="filling">
          <img :src="getImage(ingredient.image)" :alt="ingredient.name" />
          {{ ingredient.name }}
        </div>

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="getIngredientCount(ingredient.value) === IngredientCount.Min"
            @click="decrementIngredientCount(ingredient.value)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="getIngredientCount(ingredient.value)"
            @input="
              handleCountFieldInput(ingredient.value, $event.target.value)
            "
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            :disabled="
              getIngredientCount(ingredient.value) === IngredientCount.Max
            "
            @click="incrementIngredientCount(ingredient.value)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { IngredientCount } from "@/common/enums";
import { getImage } from "@/common/helpers/getImage";

const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
  ingredientsCounts: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["change"]);

const emitChangeEvent = (ingredient, count) => {
  emit("change", ingredient, count);
};

const getIngredientCount = (ingredient) =>
  props.ingredientsCounts[ingredient] ?? IngredientCount.Min;

const handleCountFieldInput = (ingredient, count) => {
  const normalizedCount = parseInt(count) || IngredientCount.Min;

  emitChangeEvent(
    ingredient,
    Math.max(
      Math.min(normalizedCount, IngredientCount.Max),
      IngredientCount.Min,
    ),
  );
};

const incrementIngredientCount = (ingredient) => {
  emitChangeEvent(ingredient, getIngredientCount(ingredient) + 1);
};

const decrementIngredientCount = (ingredient) => {
  emitChangeEvent(ingredient, getIngredientCount(ingredient) - 1);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  img {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    box-sizing: border-box;
    padding: 4px;

    border-radius: 50%;
  }
}
</style>
