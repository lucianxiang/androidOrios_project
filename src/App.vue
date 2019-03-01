<template>
<div id="app">
  <!--加载罩-->
  <div id="loading" v-show="isLoading">
    <div class="sk-wave">
      <div class="sk-rect sk-rect1"></div>
      <div class="sk-rect sk-rect2"></div>
      <div class="sk-rect sk-rect3"></div>
      <div class="sk-rect sk-rect4"></div>
      <div class="sk-rect sk-rect5"></div>
    </div>
  </div>

  <!--<keep-alive include="SearchPage">-->
  <router-view></router-view>
  <!--</keep-alive>-->

  <!--<keep-alive :exclude="/\!SearchPage/">-->
  <!--<router-view></router-view>-->
  <!--</keep-alive>-->
  <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
  <!--<div class="toUpdate" v-show="UpdateD">-->
  <!--<div class="toUpdateBox">-->
  <!--<span v-for="item in UpdateArr">{{item}}</span>-->
  <!--<div class="clearfix">-->
  <!--<span @click="cancle">取消</span>-->
  <!--<span @click="updateEdition">更新</span>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->

  <div class="toUpdateWrap" v-show="UpdateD">
    <div class="toUpdateBox">
      <div class="updateBg">
        <div :class="{active:setIsOff,updatePlane:true}"></div>
        <i @click="cancle"></i>
      </div>
      <div class="toUpdateContent">
        <div class="aboutEdition">
          <!--<span>当前版本: V{{obj.version}}</span>-->
          <span>最新版本: V{{obj.sm_as_VersionNo}}</span>
          <span>新版本大小: {{obj.sm_as_Size}}</span>
        </div>
        <div class="newContent">
          <strong>更新内容:</strong>
          <span>{{obj.sm_as_Describe}}</span>
        </div>
        <a href="javascript:;" @click="updateEdition">立即更新</a>
      </div>
    </div>
  </div>


  <!--<Footer></Footer>-->
</div>
</template>

<script>
import Footer from '@/components/Footer'
import {
  mapGetters
} from 'vuex'
import {
  getNewStr
} from '@/assets/js/public'

export default {
  name: 'app',
  components: {
    Footer
  },
  data() {
    return {
      value: '',
      obj: {},
      setIsOff: false,
      UpdateD: false
    }
  },
  computed: mapGetters([
    'isLoading',
    'isOff'
  ]),
  mounted() {
    var _this = this;
    if (this.isOff) {
      //        mui.plusReady(function () {
      document.addEventListener('plusready', function() {
//        plus.key.addEventListener('backbutton', function() {
//          _this.$router.go(-1)
//        }, false);
        plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
          let version = wgtinfo.version;
          console.log(version)
          if (version) {
            let options = {
              "operateUserID": "",
              "operateUserName": "",
              "pcName": "",
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "token": "",
              "sm_as_AppID": "1", //苹果和安卓通用
              "sm_as_AppType": "", //0安卓 1ios
            }
            axios.post(getNewStr + '/AppStore/SelectNewest', JSON.stringify(options), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              })
              .then((data) => {
                var resulte = data.data
                if (Number(resulte.resultcode) === 200) {
                  _this.obj.version = version
                  _this.obj = resulte.data
                  if (resulte.data.sm_as_VersionNo != version) {
                    _this.UpdateD = true;
                  }
                }
              })
          }
        });
      })
    }
    //      this.initCity();
     //移动端打开
     if (!window.plus) {
       this.initCity()
     }
  },
  watch: {
    '$route' (to, from) {
      if (to.name != 'SelectTopContacts' && to.name != 'TicketFillOrder' && to.name != 'AddTopContacts' && sessionStorage.getItem('playTimeObj')) {
        sessionStorage.removeItem('playTimeObj')
      }
    }
  },
  methods: {
    cancle() {
      this.$store.commit('setIsOff', false)
      this.UpdateD = false
    },
    //更新
    updateEdition() {
      this.setIsOff = true
      this.$store.commit('setIsOff', false)
      this.createDownload()
    },
    // 下载wgt文件
    createDownload() {

      var ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) { //苹果手机
        alert('当前测试版本无法更新,请安装前端提供的安装包测试')
        document.location.href = this.obj.sm_as_DownLoadUrl
      } else if (/android/.test(ua)) {
        plus.nativeUI.showWaiting("下载更新文件...");
        var downer = plus.downloader.createDownload(this.obj.sm_as_DownLoadUrl, {}, function(d, status) {
          if (status == 200) {
            plus.nativeUI.showWaiting("安装更新文件...");
            plus.runtime.install(d.filename, {}, function() {
              plus.nativeUI.closeWaiting();
              plus.nativeUI.alert("应用资源更新完成！", function() {
                plus.runtime.restart();
              });
            }, function(e) {
              plus.nativeUI.closeWaiting();
              plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
            });
          } else {
            plus.nativeUI.alert("下载更新失败！");
          }
          plus.nativeUI.closeWaiting();
        });
        downer.start();
      }

    },
    initCity() {
      if (returnCitySN.cname.indexOf('省')) {
        let n = returnCitySN.cname.indexOf('省') + 1;
        let obj = {
          province: returnCitySN.cname.substring(0, n),
        }

        function sa(result) {
          var cityName = result.name;
          obj.city = cityName;
          sessionStorage.setItem('addMap', JSON.stringify(obj))
        } //map.setCenter(cityName); console.log
        var myCity = new BMap.LocalCity();
        myCity.get(sa);
      }
    },
  }
}
</script>

<style scoped type="text/less" lang="less">
@r: 30rem;
@import '~vux/src/styles/reset.less';

body {
    background-color: #fbf9fe;
}

img[lazy=loading] {
    width: 40/@r;
    height: 100/@r;
    margin-left: 50%;
    transform: translateX(-50%);
}

.toUpdateWrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999;
}

.toUpdateBox {
    position: absolute;
    width: 530/@r;
    background-color: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.updateBg {
    width: 100%;
    height: 280/@r;
    background: url("./assets/img/home/toUpdateBg.png") no-repeat center center;
    -webkit-background-size: cover;
    background-size: cover;
    -webkit-border-radius: 20/@r 20/@r 0 0;
    -moz-border-radius: 20/@r 20/@r 0 0;
    border-radius: 20/@r 20/@r 0 0;
}

.updatePlane {
    width: 103/@r;
    height: 210/@r;
    background: url("./assets/img/home/plane.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    top: -68/@r;
    left: 50%;
    margin-left: -51/@r;
    animation: rotatePlane 2s infinite;
    -moz-animation: rotatePlane 2s infinite;
    -webkit-animation: rotatePlane 2s infinite;
    -o-animation: rotatePlane 2s infinite;
}

.updatePlane.active {
    animation: myfirst 2s;
    -moz-animation: myfirst 2s;
    -webkit-animation: myfirst 2s;
    -o-animation: myfirst 2s;
}
@keyframes rotatePlane {
    50% {
        transform: rotateY(180deg);
    }
    100% {
        transform: rotateY(360deg);
    }
}
@keyframes myfirst {
    30% {
        transform: translateY(40/@r);
    }
    100% {
        transform: translateY(-1000/@r);
    }
}

.updateBg > i {
    position: absolute;
    width: 47/@r;
    height: 47/@r;
    right: 20/@r;
    top: -90/@r;
    background: url("./assets/img/home/closeUpdate.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
}

.toUpdateContent {
    padding: 10/@r 35/@r 30/@r;
    background-color: #fff;
    margin-top: -1/@r;
    -webkit-border-radius: 0 0 20/@r 20/@r;
    -moz-border-radius: 0 0 20/@r 20/@r;
    border-radius: 0 0 20/@r 20/@r;
}

.aboutEdition {
    font-weight: bold;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 50/@r;
    color: #333;
}

.aboutEdition > span {
    display: block;
}

.newContent {
    margin-top: 20/@r;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 50/@r;
    color: #666;
}

.newContent > * {
    display: block;
}

.toUpdateContent > a {
    display: block;
    margin-top: 50/@r;
    background-color: #f8921a;
    color: #ffffff;
    font-size: 30/@r;
    font-family: "微软雅黑";
    line-height: 80/@r;

    text-align: center;
}

#loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, .97);
    z-index: 100000;
}

.sk-wave {
    margin: 40/@r auto;
    width: 30%;
    height: 100/@r;
    text-align: center;
    font-size: 30/@r;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f80;
}

.sk-wave .sk-rect {
    background-color: #f80;
    height: 100%;
    width: 10/@r;
    display: inline-block;
    -webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
    animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
}

.sk-wave .sk-rect1 {
    -webkit-animation-delay: -1.2s;
    animation-delay: -1.2s;
}

.sk-wave .sk-rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.sk-wave .sk-rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
}

.sk-wave .sk-rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.sk-wave .sk-rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}
@-webkit-keyframes sk-waveStretchDelay {
    0%,
    100%,
    40% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }
    20% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}
@keyframes sk-waveStretchDelay {
    0%,
    100%,
    40% {
        -webkit-transform: scaleY(0.4);
        transform: scaleY(0.4);
    }
    20% {
        -webkit-transform: scaleY(1);
        transform: scaleY(1);
    }
}
</style>
