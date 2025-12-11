<template>
  <ul class="additional-list">
    <cart-addons-item
      v-for="addon of dataStore.misc"
      :key="addon.id"
      :addon="addon"
    />
  </ul>
</template>

<script setup>
import { useDataStore } from "@/stores";
import CartAddonsItem from "./CartAddonsItem.vue";

const dataStore = useDataStore();
</script>

<style lang="scss">
@import "@/assets/scss/mixins/mixins.scss";

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}
</style>
