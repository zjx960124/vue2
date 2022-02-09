<template>
  <div class="logo-wrapper">
    <img
      class="logo-img"
      src="../../assets/other_images/logos.png"
    />
  </div>
</template>

<script>
  export default {
    name: 'Logo'
  }
</script>

<style lang="scss" scoped>
  .logo-wrapper {
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    .logo-img {
      width: 94px;
    }
    .logo-title {
      margin-left: 5px;
      font-weight: bold;
    }
  }
</style>
