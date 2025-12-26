<template>
  <div class="sign-form">
    <router-link :to="{ name: 'home' }" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="authData.email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            required
            @input="handleFieldInput"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="authData.password"
            type="password"
            name="pass"
            placeholder="***********"
            required
            @input="handleFieldInput"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>

      <div v-if="serverErrorMessage" class="sign-form__error-message">
        {{ serverErrorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
const router = useRouter();

const authData = reactive({
  email: "",
  password: "",
});

const serverErrorMessage = ref(null);

const handleFieldInput = () => {
  if (serverErrorMessage.value) {
    serverErrorMessage.value = null;
  }
};

const login = async () => {
  serverErrorMessage.value = "";

  const responseMessage = await authStore.login(authData);

  if (responseMessage === "success") {
    await authStore.whoAmI();
    router.push({ name: "home" });
  } else {
    serverErrorMessage.value = responseMessage;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("/api/public/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.close {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 25px;
  height: 25px;

  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;

  color: $black;
  border-radius: 50%;
  outline: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}

.sign-form__error-message {
  margin-top: 20px;
  color: $red-800;
}
</style>
