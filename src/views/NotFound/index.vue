<template>
  <div>
    {{ errorStr }} 404
    <button @click="$router.back(-1)">go back</button>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data() {
    return {
      errorStr: this.$store.state.str
    };
  }
};
</script>

<style></style>
