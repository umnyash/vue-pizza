<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import AppMainLayout from "@/layouts/AppMainLayout.vue";

const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    try {
      const component = await import(`./${meta.layout}.vue`);
      layout.value = component?.default ?? AppMainLayout;
    } catch (err) {
      layout.value = AppMainLayout;
    }
  },
);
</script>
