

<template>
  <!--创建地图容器-->
  <div class="bMapGLBox" :style="{ height: height, width: width }">
    <div id="bMapGL" class="bMapGL"></div>
  </div>
</template>

<script>
import { loadBaiDuMap } from "./js/bmpgl_lib.js";
import styleJson from "./json/mapstyle.json";
export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    center: {
      type: Array,
      default: () => [126.52341, 42.191403],
    },
    areaName: {
      type: String,
      default: "江源区",
    },
    zoom: {
      type: Number,
      default: 10,
    },
    minZoom: {
      type: Number,
      default: 9,
    },
    maxZoom: {
      type: Number,
      default: 15,
    },
    tilt: {
      type: Number,
      default: 20,
    },
    heading: {
      type: Number,
      default: 0,
    },
    enableScrollWheelZoom: {
      type: Boolean,
      default: true,
    },
    disableDragging: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "2.4rem",
    },
    markers: {
      type: Array,
      default: () => [
        {
          label: "",
          longitude: 126.52341,
          latitude: 42.191403,
          icon: {
            url: require("@/assets/report_images/jyzl_tb_yey.png"),
            size: { width: 32, height: 43 },
          },
        },
      ],
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    markers: {
      deep: true,
      handler(val) {
        this.initMarkers(val);
      },
    },
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const _this = this;
      // 传入密钥获取地图回调。
      loadBaiDuMap()
        .then((BMapGL) => {
          // 创建地图实例
          let map = new BMapGL.Map("bMapGL");
          // 保存地图
          this.map = map;
          // 创建点坐标 axios => res 获取的初始化定位坐标
          const point = new BMapGL.Point(this.center[0], this.center[1]);
          // 初始化地图，设置中心点坐标和地图级别
          map.centerAndZoom(point, this.zoom);
          //设置是否可以拖拽
          if (this.disableDragging) {
            map.disableDragging();
          } else {
            map.enableDragging();
          }
          //设置地图旋转角度
          map.setHeading(this.heading);
          // 保存数据
          map.centerAndZoom(point, this.zoom);
          //设置最大最小比例
          map.setMinZoom(this.minZoom);
          map.setMaxZoom(this.maxZoom);
          //设置地图的倾斜角度
          map.setTilt(this.tilt);
          //开启鼠标滚轮缩放
          map.enableScrollWheelZoom(this.enableScrollWheelZoom);

          var bd = new BMapGL.Boundary();
          bd.get(this.areaName, function (rs) {
            var count = rs.boundaries.length; //行政区域的点有多少个
            for (var i = 0; i < count; i++) {
              var path = [];
              let str = rs.boundaries[i].trim();
              let points = str.split(";");
              for (var j = 0; j < points.length; j++) {
                var lng = points[j].split(",")[0];
                var lat = points[j].split(",")[1];
                path.push(new BMapGL.Point(lng, lat));
              }
              var prism = new BMapGL.Prism(path, 5000, {
                topFillColor: "#000f64",
                topFillOpacity: 1,
                sideFillColor: "#73c0de",
                sideFillOpacity: 0.6,
              });
              map.addOverlay(prism);
            }
          });

          // 地图主题样式
          map.setMapStyleV2({ styleJson: styleJson });

          map.setDisplayOptions({
            skyColors: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    initMarkers(markers) {
      const _this = this;
      // 地图打点
      markers.forEach((item) => {
        // 创建图标
        var myIcon = new BMapGL.Icon(
          item.icon.url,
          new BMapGL.Size(item.icon.size.width, item.icon.size.height)
        );
        // 创建Marker标注，使用图标
        var pt = new BMapGL.Point(item.longitude, item.latitude);
        var marker = new BMapGL.Marker(pt, {
          icon: myIcon,
        });

        // 创建文本标注对象
        var label = new BMapGL.Label(item.label, {
          offset: new BMapGL.Size(10, -25),
        });
        label.setStyle({
          display: "none",
          color: "#fff",
          border: "0",
          padding: "0 10px",
          background: "rgba(0,0,0,0.5)",
          fontSize: "14px",
          height: "28px",
          lineHeight: "28px",
          fontFamily: "SourceHanSansCN-Regula, sans-serif",
        });
        marker.setLabel(label);

        //点标记鼠标滑入滑出事件
        marker.addEventListener("mouseover", function (e) {
          label.setStyle({ display: "block" });
        });
        marker.addEventListener("mouseout", function (e) {
          label.setStyle({ display: "none" });
        });
        // 点标记添加点击事件
        marker.addEventListener("click", function () {
          _this.$emit("markerClick", item); // 开启信息窗口
        });

        // 将标注添加到地图
        _this.map.addOverlay(marker);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bMapGL {
  width: 100%;
  height: 100%;
}
</style>