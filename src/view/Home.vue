<template>
  <div id="wrap">
    <!--头部-->
    <header class="clearfix">
      <div class="hlyIcon"></div>
      <div class="nowAddress" @click="goCityList">
        <strong>{{city}}</strong>
        <i></i>
      </div>
      <div class="searchBox" @click="goSearchPage">
        <i></i>
        <em></em>
        <span>迪士尼</span>
      </div>
      <div class="rightIconBox">
        <router-link to="/UserCenter"></router-link>
        <div class="rightMenu" @click="toBarcode">
          <a href="javascript:;"></a>
          <!--@click="showAllMenu"-->
        </div>
      </div>
    </header>
    <!--旅游菜单部分-->
    <div id="allNavBox" v-show="showAllNav">
      <div>
        <!--旅游-->
        <div class="tourismWrap clearfix">
          <div class="tourismIcon">
            <strong>旅游</strong>
            <i></i>
          </div>
          <div class="tourismType clearfix">
            <a href="javascript:;">国内游</a>
            <a href="javascript:;">周边游</a>
            <a href="javascript:;">热门 目的地</a>
            <a href="javascript:;">出境游</a>
          </div>
        </div>
        <!--门票-->
        <div class="ticketWrap clearfix">
          <div class="ticketIcon">
            <strong>门票</strong>
            <i></i>
          </div>
          <div class="ticketType clearfix">
            <a href="javascript:;">精选</a>
            <a href="javascript:;">周边城市</a>
            <a href="javascript:;">热门城市</a>
            <a href="javascript:;">游玩主题</a>
          </div>
        </div>
        <!--酒店-->
        <div class="hotelWrap clearfix">
          <div class="hotelIcon">
            <strong>酒店</strong>
            <i></i>
          </div>
          <div class="hotelType clearfix">
            <a href="javascript:;">特惠酒店</a>
            <a href="javascript:;">海外酒店</a>
            <a href="javascript:;">客栈</a>
            <a href="javascript:;">民宿</a>
          </div>
        </div>
        <!--其他类型-->
        <div class="otherType clearfix">
          <div class="foodWrap"><i></i><span>美食</span></div>
          <div class="carWrap"><i></i><span>用车</span></div>
          <div class="movieWrap"><i></i><span>微电影</span></div>
        </div>
      </div>
    </div>
    <div id="mask" v-show="showAllNav" @click="showAllMenu"></div>
    <section>
      <div class="content">
        <!--旅游-->
        <div class="travel">
          <flexbox>
            <flexbox-item v-for="item,index in TourTypeList" :key="index">
              <div :class="item.classN" @click="goNearbyTour(item,index)">
                <div :class="item.classCN"></div>
                <strong>{{item.name}}</strong>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <!--旅游相关-->
        <div
          :class="item.classN"
          v-for="item,index in HomeList"
          :style="{backgroundColor: item.backgroundC}"
          @click="goDetails(item)"
        >
          <div>
            <strong
              :style="{color: item.color}"
            >{{item.title}}</strong>
            <span>
            <a
              href="javascript:;"
              v-for="n in item.list"
              :style="{color: item.color}"
            >{{n.name}}</a>
          </span>
            <i
              :style="{borderTopColor: item.backgroundC}"
            ></i>
          </div>
          <img
            :src="item.imgUrl"

          >
        </div>
      </div>
    </section>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
    <toast v-model="showSuc" type="success" :text="sucCon"></toast>
  </div>
</template>
<script>
  //首页
  import {mapGetters} from 'vuex'
  import {Flexbox, FlexboxItem, Toast} from 'vux'
  import BScroll from 'better-scroll'


  export default {
    name: 'Home',
    computed: mapGetters([
      'cityObj'
    ]),
    components: {
      Flexbox,
      FlexboxItem,
      Toast
    },
    beforeRouteLeave(to, from, next){
      to.meta.keepAlive = false;
      next()
    },
    data() {
      return {
        city: '',
        UpdateD: false,
        UpdateArr: [],
        TourTypeList: [
          {
            name: '国内游',
            classN: 'domestic',
            classCN: 'domesticImage',
            id: 1
          },
          {
            name: '周边游',
            classN: 'periphery',
            classCN: 'peripheryImage',
            id: 1
          },
          {
            name: '境外短线',
            classN: 'abroadShort',
            classCN: 'abroadShortImage',
            id: 2
          },
          {
            name: '境外长线',
            classN: 'abroadLang',
            classCN: 'abroadLangImage',
            id: 2
          }
        ],
        HomeList: [
          {
            title: '酒店',
            color: '#ff941a',
            backgroundC: '#eae2d9',
            classN: 'hotelBox',
            imgUrl: require('@/assets/img/home/hotel.png'),
            url: 'HotelHome',
            list: [
              {
                name: '境内',
                url: ''
              },
              {
                name: '国内',
                url: ''
              }
            ],
          },
          {
            title: '门票',
            color: '#1c83b8',
            backgroundC: '#d5e4eb',
            classN: 'ticketBox',
            imgUrl: require('@/assets/img/home/ticket.png'),
            url: 'TicketDetails',
            list: [
              {
                name: '精选',
                url: ''
              },
              {
                name: '城市',
                url: ''
              }
            ],
          },
          {
            title: '美食',
            color: '#c9255d',
            backgroundC: '#ead4db',
            classN: 'foodBox',
            imgUrl: require('@/assets/img/home/food.png'),
            url: 'FoodDetails',
            list: [
              {
                name: '更多',
                url: ''
              }
            ],
          },
//          {
//            title: '租车',
//            color: '#dd7015',
//            backgroundC: '#eae2d9',
//            classN: 'carBox',
//            imgUrl: require('@/assets/img/home/car.png'),
//            url: 'CarDetails',
//            list: [
//              {
//                name: '取车',
//                url: ''
//              },
//              {
//                name: '还车',
//                url: ''
//              }
//            ],
//          },
//          {
//            title: '微电影',
//            color: '#000000',
//            backgroundC: '#eddfdf',
//            classN: 'movieBox',
//            imgUrl: require('@/assets/img/home/movie.png'),
//            url: 'MovieDetails',
//            list: [
//              {
//                name: '频道',
//                url: ''
//              },
//              {
//                name: '系列',
//                url: ''
//              }
//            ],
//          },
        ],
        mapObj: {},
        showAllNav: false,
        loginInfo: {},
        showErr: false,
        errCon: '',
        showSuc: false,
        sucCon: '',
      }
    },
    created() {
      document.title = "全域惠乐游";
      if (localStorage.getItem('userParams') && !sessionStorage.getItem('userInfo')) {
        this.loginInfo = JSON.parse(localStorage.getItem('userParams'));
        this.loginSubmit();
      }
    },
    mounted() {
      let mapObj = JSON.parse(sessionStorage.getItem('addMap'))
      if (window.plus) {
        this.initCity().then(data => {
          sessionStorage.setItem('addMap', JSON.stringify(data))
//          alert(JSON.stringify(data))
          this.city = data.address.city
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "sm_af_AreaName": data.address.city,//用户编码
          }
          this.$store.dispatch('GetAreaID', options)
          .then(suc => {
            console.log(suc)
          }, err => {
            console.log(err)
          })
        })
      }

//
////          var wvs = plus.webview.all();//获取所有的窗口
////        plus.webview.close(wvs[0]);//关闭欢迎页
//
//          //首页返回键处理  
//          //处理逻辑：2秒内，连续两次按返回键，则退出应用  
//
      // var first = null;

      // plus.key.addEventListener('backbutton',()=>{
      //   if(!first){
      //     first = new Date().getTime();
      //     mui.toast('再按一次退出应用');
      //     setTimeout(function(){
      //       first = null;
      //     },3000);
      //   } else {
      //     if(new Date().getTime() - first < 2000){
      //       plus.runtime.quit();
      //     }
      //   }
      // })
      // document.addEventListener('plusready', function() {
      //   var webview = plus.webview.currentWebview();
      //   plus.key.addEventListener('backbutton', function() {
      //     webview.canBack(function(e) {
      //       if(e.canBack) {
      //         webview.back();
      //       } else {
      //         //webview.close(); //hide,quit
      //         //plus.runtime.quit();
      //         //首页返回键处理
      //         //处理逻辑：1秒内，连续两次按返回键，则退出应用；
      //         var first = null;
      //         plus.key.addEventListener('backbutton', function() {
      //           //首次按键，提示‘再按一次退出应用’
      //           if (!first) {
      //             first = new Date().getTime();
      //             console.log('再按一次退出应用');
      //             setTimeout(function() {
      //               first = null;
      //             }, 1000);
      //           } else {
      //             if (new Date().getTime() - first < 1500) {
      //               plus.runtime.quit();
      //             }
      //           }
      //         }, false);
      //       }
      //     })
      //   });
      // });
      if (!this.cityObj.sm_af_AreaID) {
        this.initCity().then((data) => {
          sessionStorage.setItem('addMap', JSON.stringify(data))
//          alert(JSON.stringify(data))
          this.city = data.address.city
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "sm_af_AreaName": data.address.city,//用户编码
          }
          this.$store.dispatch('GetAreaID', options)
          .then(suc => {
            console.log(suc)
          }, err => {
            console.log(err)
          })
        })
      } else {
        this.city = this.cityObj.sm_af_AreaName
      }

    },
    methods: {
      //点击扫一扫
      toBarcode(){
        this.$router.push({name: 'Barcode'})
      },
      //城市列表
      goCityList() {
        this.$router.push({name: 'CityList'})
      },
//      登录
      loginSubmit() {
        let userLogin = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "userID": this.loginInfo.number,//用户编码
          "password": this.loginInfo.passworld//密码
        };
        this.$store.dispatch('loginSubmit', userLogin)
        .then(data => {
          sessionStorage.setItem('userInfo', JSON.stringify(data.data));
          localStorage.setItem('userInfo', JSON.stringify(data.data));
        }, err => {
          this.errCon = err;
          this.showErr = true;
        })
      },
      initCity() {
        return new Promise((relove, reject) => {
//          mui.plusReady(function () {
          document.addEventListener('plusready', function () {
            plus.geolocation.getCurrentPosition(function (p) {
              relove(p)
            }, function (e) {
              alert('Geolocation error: ' + e.message);
            }, {geocode: true, provider: 'baidu'})
          })
        })
      },
      //跟团游
      goNearbyTour(item, index) {
        this.$router.push({name: 'NearbyTour', query: {title: item.name, id: index, flagId: item.id}})
      },
      //周边
      goNearbyAllTour() {
        this.$router.push({name: 'NearbyTour', query: {title: '周边游', id: 1, provice: this.mapObj.province}})
      },
      //短线
      goExitShortTour() {
        this.$router.push({name: 'NearbyTour', query: {title: '境外短线', id: 3}})
//        this.$router.push({name: 'ExitShortTour'})
      },
      //长线
      goExitLongTour() {
        this.$router.push({name: 'NearbyTour', query: {title: '境外长线', id: 2}})
      },
      showAllMenu() {
        if (this.showAllNav) {
          this.showAllNav = false;
        } else {
          this.showAllNav = true;
        }
      },
      goDetails(item) {
        this.$router.push({name: item.url})
      },
      goSearchPage() {
        this.$router.push({name: 'SearchPage', query: {id: 0}})
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  #wrap {
    background-color: #fff;
  }

  header {
    background-color: #ffa948;
    height: 88/@r;
    padding: 16/@r 0 12/@r 26/@r;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
  }

  header > * {
    float: left;
  }

  .hlyIcon {
    width: 60/@r;
    height: 60/@r;
    background: url("../assets/img/home/hlyIcon.png") no-repeat;
    -webkit-background-size: 60/@r 60/@r;
    background-size: 60/@r 60/@r;
    -webkit-border-radius: 15/@r;
    -moz-border-radius: 15/@r;
    border-radius: 15/@r;
    box-shadow: 0 0 5/@r #c78438;
    margin-right: 15/@r;
  }

  .nowAddress {
    color: #fff;
    position: relative;
    width: 130/@r;
    margin-right: 35/@r;
    height: 57/@r;
  }

  .nowAddress strong {
    width: 115/@r;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    font-size: 26/@r;
    line-height: 57/@r;
    font-family: "微软雅黑";
    text-align: center;
  }

  .nowAddress i {
    position: absolute;
    width: 15/@r;
    height: 15/@r;
    border-bottom: 2/@r solid #fff;
    border-right: 2/@r solid #fff;
    top: 15/@r;
    right: 0/@r;
    transform: rotate(45deg);
  }

  .searchBox {
    position: absolute;
    width: 48%;
    height: 56/@r;
    left: 50%;
    top: 16/@r;
    transform: translateX(-35%);
    border: 2/@r solid #f49a36;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
    background-color: #eeeeee;
    padding: 13/@r 0;
  }

  .searchBox i {
    float: left;
    width: 25/@r;
    height: 25/@r;
    background: url("../assets/img/home/searchIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 1/@r 10/@r 0 11/@r;
  }

  .searchBox em {
    float: left;
    width: 2/@r;
    height: 26/@r;
    background-color: #dcdada;
    margin-right: 14/@r;
  }

  .searchBox span {
    float: left;
    font-size: 22/@r;
    line-height: 26/@r;
    font-family: "微软雅黑";
    color: #9a9a9a;
  }

  .rightIconBox {
    float: right;
    margin-top: 11/@r;
  }

  .rightIconBox > a {
    float: left;
    width: 32/@r;
    height: 36/@r;
    margin-right: 30/@r;
    background: url("../assets/img/home/userIcon.png") no-repeat;
    -webkit-background-size: 32/@r 36/@r;
    background-size: 32/@r 36/@r;
  }

  .rightMenu {
    float: left;
    position: relative;
    padding-right: 30/@r;
  }

  .rightMenu > a {
    display: block;
    width: 34/@r;
    height: 34/@r;
    background: url("../assets/img/home/sweepCode.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .travel {
    background-color: #ead4db;
    padding: 20/@r 23/@r 30/@r 23/@r;
    font-size: 27/@r;
    font-family: '微软雅黑';
    font-weight: bold;
  }

  .travel strong {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50/@r;
    left: 0;
  }

  #mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    z-index: 19;
    opacity: .6;
  }

  #allNavBox {
    position: fixed;
    top: 85/@r;
    left: 0;
    z-index: 21;
    width: 100%;
    background-color: #e6e6e6;
    padding-top: 16/@r;
  }

  #allNavBox:before {
    position: absolute;

    top: -36/@r;
    right: 40/@r;
    content: '';
    border-left: 10/@r solid transparent;
    border-right: 10/@r solid transparent;
    border-bottom: 20/@r solid #e6e6e6;
    border-top: 20/@r solid transparent;
  }

  #allNavBox > div {
    background-color: #fff;
    padding: 6/@r 10/@r 30/@r 10/@r;
  }

  .tourismWrap {
    background-color: #990f3f;
    height: 162/@r;
  }

  .tourismIcon,
  .ticketIcon,
  .hotelIcon {
    height: 162/@r;
    float: left;
    width: 33.333333%;
    box-shadow: 1/@r 0 0 1/@r #fff;
  }

  .tourismIcon > strong,
  .ticketIcon > strong,
  .hotelIcon > strong {
    font-size: 28/@r;
    line-height: 95/@r;
    font-family: "微软雅黑";
    color: #f6eff1;
    display: block;
    text-align: center;
  }

  .tourismIcon > i {
    width: 80/@r;
    height: 66/@r;
    background: url("../assets/img/home/tourismIcon.png") no-repeat;
  }

  .ticketIcon > i {
    width: 62/@r;
    height: 66/@r;
    background: url("../assets/img/home/ticketIcon.png") no-repeat;
  }

  .hotelIcon > i {
    width: 50/@r;
    height: 67/@r;
    background: url("../assets/img/home/hotelIcon.png") no-repeat;
  }

  .tourismIcon > i,
  .ticketIcon > i,
  .hotelIcon > i {
    display: block;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .tourismType,
  .ticketType,
  .hotelType {
    float: left;
    width: 66.6666666%;
  }

  .tourismType > a,
  .ticketType > a,
  .hotelType > a {
    height: 81/@r;
    float: left;
    width: 50%;
    text-align: center;
    font-size: 28/@r;
    line-height: 81/@r;
    font-family: "微软雅黑";
    color: #f6eff1;
    box-shadow: 0 0 0 1/@r #fff inset;
  }

  .ticketWrap {
    height: 162/@r;
    background-color: #0e6b99;
    margin-top: 6/@r;
  }

  .hotelWrap {
    height: 162/@r;
    background-color: #259946;
    margin-top: 6/@r;
  }

  .otherType {
    margin-top: 6/@r;
    font-size: 28/@r;
    line-height: 42/@r;
    font-family: "微软雅黑";
  }

  .otherType > div {
    float: left;
    height: 80/@r;
    width: 33.333333%;
    text-align: center;
    background-color: #f58e19;
    color: #fff;
    box-shadow: 0 0 0 1/@r #fff;
    padding: 19/@r 0;
  }

  .otherType > div > span {
    display: inline-block;
    vertical-align: middle;
    margin-left: 10/@r;
  }

  .otherType > div > i {
    display: inline-block;
    height: 42/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    vertical-align: middle;
  }

  .foodWrap > i {
    width: 31/@r;
    background: url("../assets/img/home/foodIcon.png") no-repeat;
  }

  .carWrap > i {
    width: 63/@r;
    background: url("../assets/img/home/carIcon.png") no-repeat;
  }

  .movieWrap > i {
    width: 48/@r;
    background: url("../assets/img/home/movieIcon.png") no-repeat;
  }

  section {
    position: fixed;
    top: 88/@r;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .domestic,
  .periphery,
  .abroadShort,
  .abroadLang {
    width: 100%;
    position: relative;
  }

  .domesticImage {
    height: 311/@r;
    background: url("../assets/img/home/domestic.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .domestic > strong,
  .abroadShort > strong {
    color: #fff;
  }

  .periphery > strong,
  .abroadLang > strong {
    color: #000;
  }

  .peripheryImage {
    height: 311/@r;
    background: url("../assets/img/home/periphery.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .abroadShortImage {
    height: 311/@r;
    background: url("../assets/img/home/abroadShort.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .abroadLangImage {
    height: 311/@r;
    background: url("../assets/img/home/abroadLang.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .hotelBox,
  .ticketBox,
  .foodBox,
  .carBox,
  .movieBox {
    margin-top: 10/@r;
    padding: 10/@r 10/@r 30/@r;
    position: relative;
  }

  .hotelBox img,
  .ticketBox img,
  .foodBox img,
  .carBox img,
  .movieBox img {
    width: 100%;
    height: 215/@r;
  }

  .hotelBox strong,
  .ticketBox strong,
  .foodBox strong,
  .carBox strong,
  .movieBox strong {
    display: block;
    text-align: center;
    font-size: 28/@r;
    line-height: 68/@r;
    font-family: "微软雅黑";
    color: #ff941a;
  }

  .hotelBox span,
  .ticketBox span,
  .foodBox span,
  .carBox span,
  .movieBox span {
    position: absolute;
    top: 25/@r;
    right: 15/@r;
    font-size: 20/@r;
    line-height: 2;
    font-family: "微软雅黑";
  }

  .hotelBox a,
  .ticketBox a,
  .foodBox a,
  .carBox a,
  .movieBox a {
    float: left;
    margin: 0 15/@r;
  }

  .hotelBox i,
  .ticketBox i,
  .foodBox i,
  .carBox i,
  .movieBox i {
    position: absolute;
    top: 60/@r;
    left: 50%;
    border: 30/@r solid transparent;
    transform: translateX(-50%);
  }

</style>
