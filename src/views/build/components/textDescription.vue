<template>
  <div class="view">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="item"
    >
      <div class="label">{{ item.label }}</div>
      <div class="value">{{ item.value | locale }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'textDescription',
    props: {
      data: {
        type: Array,
        default: () => {
          return [
            {
              label: '总在籍人数',
              value: '3555789'
            },
            {
              label: '上期总毕业人数',
              value: '3555789'
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .view {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 55px;
    margin-bottom: 18px;
    .item {
      width: 2.22rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .label {
        color: #D2FAFA;
        font-size: 14px;
        background: url("../../../assets/build/xssj_sqzbyrs_img1.png") no-repeat;
        background-size: 100% 100%;
        width: 1.43rem;
        height: 20px;
        line-height: 18px;
        font-style: italic;
        margin-bottom: 7px;
        font-family: "PingFang SC";
        font-weight: bold;
        text-align: center;
      }
      .value {
        font-size: 20px;
        color: #04E0E0;
        background: url("../../../assets/build/xssj_sqzbyrs_img2.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        font-family: DIN-MEDIUM;
        font-weight: 500;
        height: 57px;
        text-align: center;
        line-height: 57px;
      }
    }
  }
</style>
