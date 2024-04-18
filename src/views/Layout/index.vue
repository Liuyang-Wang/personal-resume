<template>
  <transition name="page" :duration="1200" @before-enter="beforeTransitionEnter" @after-enter="afterTransitionEnter">
    <router-view />
  </transition>
</template>

<script>
export default {
  methods: {
    beforeTransitionEnter() {
      // 禁止滚动条滚动
      document.documentElement.style.position = 'fixed';
      document.body.style.position = 'fixed';
      document.body.style.paddingRight = '15px';
    },
    afterTransitionEnter() {
      // 动画结束解除
      document.documentElement.style.position = '';
      document.body.style.position = '';
      document.body.style.paddingRight = '';
    }
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
