<template>
  <form class="layout-form" @submit.prevent="handleFormSubmit">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <template v-if="cartStore.pizzas.length">
          <cart-pizzas-list />

          <div class="cart__additional">
            <cart-addons-list />
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select v-model="receiveValue" class="select" name="test">
                  <option value="pickup">Сам заберу</option>
                  <option value="new-address">Новый адрес</option>
                  <option
                    v-for="address of profileStore.addresses"
                    :key="address.id"
                    :value="address.id"
                  >
                    {{ address.name }}
                  </option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input
                  v-model="orderStore.phone"
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
                  required
                />
              </label>

              <div v-if="orderStore.isDelivery" class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input
                      v-model="orderStore.address.street"
                      type="text"
                      name="street"
                      :required="orderStore.isNewAddress"
                      :disabled="!orderStore.isNewAddress"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input
                      v-model="orderStore.address.building"
                      type="text"
                      name="house"
                      :required="orderStore.isNewAddress"
                      :disabled="!orderStore.isNewAddress"
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input
                      v-model="orderStore.address.flat"
                      type="text"
                      name="apartment"
                      :disabled="!orderStore.isNewAddress"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
      </div>
    </main>
    <section v-if="cartStore.pizzas.length" class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.totalPriceLocaleString }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore, useCartStore, useOrderStore } from "@/stores";
import CartPizzasList from "@/modules/cart/CartPizzasList.vue";
import CartAddonsList from "@/modules/cart/CartAddonsList.vue";

const router = useRouter();
const profileStore = useProfileStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const receiveValue = computed({
  get() {
    return orderStore.isPickup
      ? "pickup"
      : orderStore.isNewAddress
        ? "new-address"
        : orderStore.addressId;
  },
  set(value) {
    if (value === "pickup") {
      orderStore.selectPickupReceiveMethod();
    } else if (value === "new-address") {
      orderStore.selectDeliveryReceiveMethod();
    } else {
      orderStore.selectDeliveryReceiveMethod(value);
    }
  },
});

const handleFormSubmit = async () => {
  const response = await orderStore.sendOrder();

  if (response.__state === "success") {
    router.push({ name: "order-success" });
    orderStore.reset();
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;
  max-width: 180px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}
</style>
