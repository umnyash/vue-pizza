<template>
  <div class="popup__title">
    <h2 class="title">{{ heading }}</h2>
  </div>
  <p class="popup__text">{{ text }}</p>
  <div class="popup__button">
    <a href="#" class="button" @click.prevent="emit('buttonClick')">
      {{ buttonText }}
    </a>
  </div>
</template>

<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["buttonClick"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.popup__text {
  margin-top: 24px;
  margin-bottom: 24px;

  text-align: center;
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}
</style>
