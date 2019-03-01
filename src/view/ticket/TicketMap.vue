<template>
  <div>
    <div id="wrap">
      <div class="topPage" @click="goTopPage"><i></i></div>
      <div id="allmap"></div>
    </div>
    <p @click="toDestination" class="toDestination">到目的地</p>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        point:{
          lng:'',
          lat:""
        }
      }
    },
    methods: {
      //到目的地
      toDestination(){
        if(window.plus){
          let obj = JSON.parse(sessionStorage.getItem('addMap'))
          let address = obj.addresses
          let coords = obj.coords
//          alert(JSON.stringify(JSON.parse(sessionStorage.getItem('addMap')).coords))
//          alert('当前位置:'+'经度'+coords.longitude)
//          alert('当前位置:'+'纬度'+coords.latitude)
//          alert('到达位置:'+'经度'+this.$route.query.longitude)
//          alert('到达位置:'+'纬度'+this.$route.query.latitude)
////          var dst = new plus.maps.Point(116.39131928,39.90793074); // 天安门
////
////          var src = new plus.maps.Point(116.335,39.966);
//          alert(this.$route.query.address)
          var dst = new plus.maps.Point(this.point.lng,this.point.lat); // 天安门
          var src = new plus.maps.Point(coords.longitude,coords.latitude); // 当前位置
          plus.maps.openSysMap( dst, this.$route.query.address, src );
        }
      },
      goTopPage() {
        this.$router.go(-1);
      },
    },
    mounted() {
      this.$nextTick(() => {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        var _this = this;
        myGeo.getPoint(this.$route.query.address, function (point) {
          if (point) {
            var newPoint = new BMap.Point(point.lng, point.lat);
            _this.point.lng = point.lng;
            _this.point.lat = point.lat;
            var marker = new BMap.Marker(newPoint);
            map.addOverlay(marker);
            map.centerAndZoom(newPoint, 13);
            var opts = {
              width: 200,     // 信息窗口宽度
              height: 100,     // 信息窗口高度
              title: _this.$route.query.title, // 信息窗口标题
              enableMessage: true,//设置允许信息窗发送短息
              message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
            };
            var infoWindow = new BMap.InfoWindow("地址：" + _this.$route.query.address, opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口
            marker.addEventListener("click", function () {
              map.openInfoWindow(infoWindow, newPoint); //开启信息窗口
            });
          } else {
            alert("您选择地址没有解析到结果!");
          }
        }, "北京市");
      })
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .toDestination{
    position: absolute;
    bottom: 100/@r;
    right: 0;
    background-color: #fff;
    padding: 20/@r 80/@r;
    z-index: 8888;
  }

  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  #allmap {
    width: 100%;
    height: 100%;
  }

  .topPage {
    position: absolute;
    top: 20/@r;
    left: 20/@r;
    width: 50/@r;
    height: 50/@r;
    box-sizing: content-box;
    padding: 10/@r;
    z-index: 999;
  }

  .topPage i {
    display: block;
    width: 50/@r;
    height: 50/@r;
    background: url("../../assets/img/movie/back.png") no-repeat;
    -webkit-background-size:  100% 100%;
    background-size:  100% 100%;
  }

</style>
