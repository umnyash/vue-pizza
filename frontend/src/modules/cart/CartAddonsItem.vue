<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="getImage(`${addon.image}.svg`)"
        width="39"
        height="60"
        :alt="addon.name"
      />
      <span>{{ addon.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <app-counter class="additional-list__counter" accent />
      <div class="additional-list__price">
        <b>× {{ addon.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script setup>
import { getImage } from "@/common/helpers/getImage";
import AppCounter from "@/common/components/AppCounter.vue";

defineProps({
  addon: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
