<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient of dataStore.ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <app-drag
          :data-transfer="ingredient.value"
          :draggable="
            getIngredientCount(ingredient.value) < IngredientCount.Max
          "
        >
          <div class="filling">
            <img :src="getImage(ingredient.image)" :alt="ingredient.name" />
            {{ ingredient.name }}
          </div>
        </app-drag>

        <app-counter
          class="ingredients__counter"
          :value="getIngredientCount(ingredient.value)"
          :max="IngredientCount.Max"
          @input="handleCountFieldInput(ingredient.value, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { IngredientCount } from "@/common/enums";
import { getImage } from "@/common/helpers/getImage";
import { useDataStore } from "@/stores";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";

const dataStore = useDataStore();

const props = defineProps({
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
    pointer-events: none;
  }
}
</style>
