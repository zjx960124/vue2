<template>
  <div
    id="bmapGLChart"
    ref="bmapGLChart"
    :class="className"
    :style="{ height: height, width: width }"
  ></div>
</template>

<script>
import resize from "./mixins/resize";
import { loadBaiDuMap } from "./js/bmpgl_lib.js";
import mapStyle from "@/components/Chart/json/mapstyle.json";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    center: {
      type: Array | String,
      default: () => [126.52341, 42.191403],
    },
    minZoom: {
      type: Number,
      default: 5,
    },
    maxZoom: {
      type: Number,
      default: 12,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "240px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      map: null,
    };
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
    const _this = this;
    window.onresize = function () {
      _this.chart.resize();
    };
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initMap() {
      // 传入密钥获取地图回调。
      loadBaiDuMap()
        .then((BMapGL) => {
          this.map = new BMapGL.Map("bmapGLChart"); // 创建Map实例
          this.map.centerAndZoom(this.center, 7); // 初始化地图,设置中心点坐标和地图级别
          this.map.setMinZoom(this.minZoom); //最小地图级别
          this.map.setMaxZoom(this.maxZoom); //最大地图级别
          this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
          this.map.setMapStyleV2(mapStyle); //自定义个性化样式
          this.map.setTilt(45); //倾斜角
          this.map.setDisplayOptions({
            //遮罩层
            skyColors: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"], //不显示
          }); // 保存数据
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
