<template>
  <app-sidebar>
    <template #links>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'orders' }"
        :to="{ name: 'orders' }"
      >
        История заказов
      </router-link>
      <router-link
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'profile' }"
        :to="{ name: 'profile' }"
      >
        Мои данные
      </router-link>
    </template>

    <router-view />
  </app-sidebar>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppSidebar from "@/layouts/AppSidebar.vue";

const route = useRoute();
const routeName = computed(() => route.name);
</script>
