<template>
  <transition name="page" :duration="1300" @before-enter="beforeTransitionEnter" @after-enter="afterTransitionEnter">
    <router-view />
  </transition>
</template>

<script>
export default {
  methods: {
    beforeTransitionEnter() {},
    afterTransitionEnter() {}
  }
};
</script>

<style lang="scss" scoped>
.page {
  &-enter {
    opacity: 0;
    transform: translateY(200px);
    &-active {
      transition: transform 1s, opacity 1s;
    }
  }
}
</style>
