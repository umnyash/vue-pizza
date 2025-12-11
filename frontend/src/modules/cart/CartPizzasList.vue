<template>
  <ul class="cart-list sheet">
    <cart-pizzas-item
      v-for="pizza of cartStore.expandedPizzas"
      :key="pizza.id"
      :pizza="pizza"
    />
  </ul>
</template>

<script setup>
import { useCartStore } from "@/stores";
import CartPizzasItem from "./CartPizzasItem.vue";

const cartStore = useCartStore();
</script>

<style lang="scss">
@import "@/assets/scss/mixins/mixins.scss";

.cart-list {
  @include clear-list;

  padding: 15px 0;
}
</style>
