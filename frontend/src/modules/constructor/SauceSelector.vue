<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce of dataStore.sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        v-model="pizzaStore.sauceId"
        type="radio"
        name="sauce"
        :value="sauce.id"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { useDataStore, usePizzaStore } from "@/stores";

const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
