<template>
  <div
    class="sheet address-form"
    :class="{ 'address-form--opened': !address || isEditing }"
  >
    <div class="address-form__header">
      <b>Адрес №1</b>

      <div v-if="address && !isEditing" class="address-form__edit">
        <button type="button" class="icon">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <template v-if="address && !isEditing">
      <p>Невский пр., д. 22, кв. 46</p>
      <small>Позвоните, пожалуйста, от проходной</small>
    </template>

    <user-address-form v-if="!address || isEditing" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserAddressForm from "./UserAddressForm.vue";

defineProps({
  address: {
    type: Object,
    default: null,
  },
});

const isEditing = ref(false);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}
</style>
