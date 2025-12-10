<template>
  <ul class="cart-list sheet">
    <cart-pizzas-item />
    <cart-pizzas-item />
  </ul>
</template>

<script setup>
import CartPizzasItem from "./CartPizzasItem.vue";
</script>

<style lang="scss">
@import "@/assets/scss/mixins/mixins.scss";

.cart-list {
  @include clear-list;

  padding: 15px 0;
}
</style>
