<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div class="user">
    <img
      :src="getPublicImage(user.avatar)"
      :alt="user.name"
      width="72"
      height="72"
    />
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>

  <div
    v-for="address of profileStore.addresses"
    :key="address.id"
    class="layout__address"
  >
    <user-address-card :address="address" />
  </div>

  <div class="layout__address">
    <user-address-card />
  </div>

  <div class="layout__button">
    <button type="button" class="button button--border">
      Добавить новый адрес
    </button>
  </div>
</template>

<script setup>
import { getPublicImage } from "@/common/helpers/getPublicImage";
import { useAuthStore, useProfileStore } from "@/stores";
import UserAddressCard from "@/modules/profile/UserAddressCard.vue";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const user = authStore.user;
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}
</style>
