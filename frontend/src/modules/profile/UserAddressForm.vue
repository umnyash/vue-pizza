<template>
  <form @submit.prevent="submitForm">
    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            v-model="address.name"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            v-model="address.street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            v-model="address.building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            v-model="address.flat"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            v-model="address.comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        class="button button--transparent"
        @click="emit('cancelButtonClick')"
      >
        Отмена
      </button>
      <button type="submit" class="button">Сохранить</button>
      <button
        type="button"
        class="button button--transparent address-form__delete-button"
      >
        Удалить адрес
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore, useProfileStore } from "@/stores";

const emit = defineEmits(["submit", "cancelButtonClick"]);

const props = defineProps({
  address: {
    type: Object,
    default: null,
  },
});

const authStore = useAuthStore();
const profileStore = useProfileStore();

const address = ref(
  props.address
    ? { ...props.address }
    : {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
        userId: authStore.user.id,
      },
);

const submitForm = async () => {
  if (address.value.id) {
    await profileStore.updateAddress(address.value);
    emit("submit");
  } else {
    await profileStore.addAddress(address.value);
    emit("submit");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__delete-button.address-form__delete-button {
  order: -1;
  margin-left: 0;
  margin-right: auto;
}
</style>
