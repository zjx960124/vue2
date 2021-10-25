<template>
  <div class="table-views">
    <div class="header">
      <div
        v-for="(item, index) in data.fields"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="main">
      <div
        v-for="(item, index) in data.data"
        class="column"
        :key="index"
      >
        <div
          v-for="(items, indexs) in data.fields"
          :key="indexs"
        >
          {{ item[items['key']] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TableView',
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table-views {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      width: 100%;
      height: 28px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #012E2E;
      & > div {
        color: #677A7A;
        font-size: 12px;
        flex: 1;
        padding-left: .07rem;
        padding-right: .07rem;
      }
      & > div:last-of-type {
         text-align: center;
      }
      & > div:not(:first-of-type):not(:last-of-type) {
        text-align: center;
      }
    }
    .main {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .column {
        width: 100%;
        height: 23px;
        display: flex;
        align-items: center;
        & > div {
          color: #677A7A;
          font-size: 12px;
          flex: 1;
          padding-left: .07rem;
          padding-right: .07rem;
          font-weight: bold;
          font-family: DIN;
        }
        & > div:last-of-type {
          text-align: center;
        }
        & > div:not(:first-of-type):not(:last-of-type) {
          text-align: center;
        }
      }
      .column:nth-child(2n) {
        background: #012E2E;
        & > div {
          color: #04E0E0;
        }
      }
    }
  }
</style>
