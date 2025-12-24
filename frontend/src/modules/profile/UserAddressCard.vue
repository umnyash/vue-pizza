<template>
  <div
    class="sheet address-form"
    :class="{ 'address-form--opened': !address || isEditing }"
  >
    <div class="address-form__header">
      <b>{{ heading }}</b>

      <div v-if="address && !isEditing" class="address-form__edit">
        <button type="button" class="icon" @click="isEditing = true">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>

    <template v-if="address && !isEditing">
      <p>{{ formatAddress(address) }}</p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </template>

    <user-address-form
      v-if="!address || isEditing"
      :address="address"
      @cancel-button-click="handleFormCancelButtonClick"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { formatAddress } from "@/common/helpers/formatAddress";
import UserAddressForm from "./UserAddressForm.vue";

const props = defineProps({
  address: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["formSubmit", "formCancelButtonClick"]);

const isEditing = ref(false);

const heading = computed(() =>
  props.address
    ? isEditing.value
      ? "Редактирование адреса"
      : props.address.name
    : "Добавление адреса",
);

const handleFormCancelButtonClick = () => {
  if (props.address) {
    isEditing.value = false;
  } else {
    emit("formCancelButtonClick");
  }
};

const handleFormSubmit = () => {
  if (props.address) {
    isEditing.value = false;
  } else {
    emit("formSubmit");
  }
};
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

    margin: 0;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
    margin-top: 16px;
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
