<template>
  <div class="foldBttonBox">
    <svg
      :class="{ 'is-active': isActive }"
      class="foldBttonSvg"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      @click="toggleClick"
    >
      <path
        d="M456.535 477.297c-18.555 19.258-18.555 50.353 0 69.376l334.966 350.902c18.555 19.258 48.243 19.258 66.759 0 18.32-19.219 18.32-50.352 0-69.609L556.303 511.985 858.26 196.004c18.32-19.258 18.32-50.391 0-69.61-18.516-19.219-48.204-19.219-66.759 0L456.535 477.297z m110.94 350.67L265.751 511.985l301.723-315.981c18.516-19.258 18.516-50.391 0-69.61-18.281-19.219-48.243-19.219-66.524 0L165.711 477.297c-18.281 19.024-18.281 50.353 0 69.376L500.95 897.576c18.281 19.258 48.243 19.258 66.524 0 18.516-19.219 18.516-50.351 0.001-69.609z"
        fill="#cdcdcd"
        p-id="17603"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'FoldButton',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.foldBttonBox {
  padding: 10px 0;
}
.foldBttonSvg {
  display: inline-block;
  width: 20px;
  height: 20px;
  transform: rotate(180deg);
}

.foldBttonSvg.is-active {
  transform: rotate(0);
}
</style>
