<template>
  <app-layout>
    <router-view v-if="isAuthChecked" />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";

import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores";
import JwtService from "@/services/jwt/jwt.service";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const isAuthChecked = ref(false);

const checkLoggedIn = async () => {
  const authStore = useAuthStore();
  const token = JwtService.getToken();
  if (!token) {
    isAuthChecked.value = true;
    return;
  }

  try {
    await authStore.whoAmI();
    const { redirect } = route.query;
    router.push(redirect ? redirect : { name: "home" });
  } catch (e) {
    JwtService.removeToken();
    console.error(e);
  } finally {
    isAuthChecked.value = true;
  }
};

onMounted(() => {
  checkLoggedIn();
});
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
