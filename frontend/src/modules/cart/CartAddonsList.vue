<template>
  <ul class="additional-list">
    <cart-addons-item />
    <cart-addons-item />
    <cart-addons-item />
  </ul>
</template>

<script setup>
import CartAddonsItem from "./CartAddonsItem.vue";
</script>

<style lang="scss">
@import "@/assets/scss/mixins/mixins.scss";

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}
</style>
