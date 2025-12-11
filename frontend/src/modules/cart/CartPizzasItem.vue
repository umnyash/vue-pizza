<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
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
          <li>Начинка: {{ filling }}</li>
        </ul>
      </div>
    </div>

    <app-counter
      :value="pizza.quantity"
      class="cart-list__counter"
      accent
      @input="setPizzaQuantity"
    />

    <div class="cart-list__price">
      <b>{{ pizza.totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="handleEditButtonClick"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getImage } from "@/common/helpers/getImage";
import { usePizzaStore, useCartStore } from "@/stores";
import AppCounter from "@/common/components/AppCounter.vue";

const props = defineProps({
  pizza: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const pizzaStore = usePizzaStore();
const cartStore = useCartStore();

const doughName = props.pizza.dough.name.toLowerCase();
const doughDescription = `на ${doughName.slice(0, doughName.length - 1)}м тесте`;

const sauce = props.pizza.sauce.name.toLowerCase();

const filling = props.pizza.ingredients
  .map(({ name }) => name)
  .join(", ")
  .toLowerCase();

const handleEditButtonClick = () => {
  pizzaStore.set(cartStore.getPizzaById(props.pizza.id));
  router.push({ name: "home" });
};

const setPizzaQuantity = (value) => {
  cartStore.updatePizza({ id: props.pizza.id, quantity: +value });
};
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

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
