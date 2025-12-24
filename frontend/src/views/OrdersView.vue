<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section
    v-for="order of profileStore.expandedOrders"
    :key="order.id"
    class="sheet order"
  >
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>
          Сумма заказа: {{ calcOrderPrice(order).toLocaleString("ru") }} ₽
        </span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza of order.expandedPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <app-pizza-info :pizza="pizza" />

        <p class="order__price">
          <span v-if="pizza.quantity > 1">{{ pizza.quantity }}x</span>
          {{ pizza.price }} ₽
        </p>
      </li>
    </ul>

    <ul v-if="order.expandedMisc" class="order__additional">
      <li v-for="misc of order.expandedMisc" :key="misc.miscId">
        <img
          :src="getPublicImage(misc.data.image)"
          width="20"
          height="30"
          :alt="misc.data.name"
        />
        <p>
          <span>{{ misc.data.name }}</span>
          <b>
            <span v-if="misc.quantity > 1">{{ misc.quantity }}x</span>
            {{ misc.data.price }} ₽
          </b>
        </p>
      </li>
    </ul>

    <p v-if="order.orderAddress" class="order__address">
      Адрес доставки: {{ order.orderAddress.name }}
    </p>
  </section>
</template>

<script setup>
import { getPublicImage } from "@/common/helpers/getPublicImage";
import { calcOrderPrice } from "@/common/helpers/calcOrderPrice";
import { useProfileStore } from "@/stores";
import AppPizzaInfo from "@/common/components/AppPizzaInfo.vue";

const profileStore = useProfileStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
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
