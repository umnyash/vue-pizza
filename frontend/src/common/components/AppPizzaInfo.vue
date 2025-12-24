<template>
  <div class="product">
    <img
      :src="getImage('product.svg')"
      class="product__img"
      width="56"
      height="56"
      :alt="pizza.name"
    />
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li>{{ pizza.size.name }}, {{ doughDescription }}</li>
        <li>Соус: {{ sauce }}</li>
        <li>Начинка: {{ filling || "–" }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { getImage } from "@/common/helpers/getImage";

const props = defineProps({
  pizza: {
    type: Object,
    required: true,
  },
});

const doughName = props.pizza.dough.name.toLowerCase();
const doughDescription = `на ${doughName.slice(0, doughName.length - 1)}м тесте`;

const sauce = props.pizza.sauce.name.toLowerCase();

const filling = props.pizza.ingredients
  ?.map(({ name }) => name)
  .join(", ")
  .toLowerCase();
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
