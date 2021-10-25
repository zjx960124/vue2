<template>
  <div class="view-title">
    {{ title }}
  </div>
</template>

<script>
  export default {
    name: 'ViewTitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .view-title {
    position: absolute;
    top: 12px;
    left: .07rem;
    font-family: PMZD;
    font-size: .19rem;
    font-weight: 400;
    color: #D2FAFA;
    font-style: italic;
  }
</style>
