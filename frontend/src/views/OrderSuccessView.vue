<template>
  <div>
    <transition name="fade" appear>
      <app-modal @close-button-click="closeModal">
        <app-alert
          heading="Спасибо за заказ"
          text="Мы начали готовить Ваш заказ, скоро привезём его вам ;)"
          button-text="Отлично, я жду!"
          @button-click="closeModal"
        />
      </app-modal>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import AppModal from "@/common/components/AppModal.vue";
import AppAlert from "@/common/components/AppAlert.vue";

const router = useRouter();
const authStore = useAuthStore();

const closeModal = () => {
  router.push({ name: authStore.isAuthenticated ? "orders" : "home" });
};
</script>
