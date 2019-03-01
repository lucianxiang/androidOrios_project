<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
      </div>
      <div class="searchBox">
        <div class="currentLocation">
          <i></i>
          <span>{{cityObj.sm_af_AreaName}}</span>
          <em></em>
        </div>
        <div class="searchInput">
          <div>
            <i></i>
            <span @click="goFoodSearch">美食搜索</span>
          </div>
        </div>
      </div>
      <div class="rightIcon">
        <router-link to="/UserCenter" class="centerIcon"></router-link>
        <!--<a href="javascript:;" class="menuIcon"></a>-->
      </div>
    </header>
    <section>
      <scroller :on-infinite="infinite" ref="my_scroller" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
        <!--轮播图-->

        <div class="exhibitionBox">
          <swiper auto height="100%">
            <swiper-item class="black" v-for="item,index in topTurnLlist" :key="index" @click.native="changeFood(item)">
              <img :src="item.fd_st_ImageURL" style="height: 100%;width: 100%;"></swiper-item>
          </swiper>
        </div>
        <!--美食详情-->

        <div class="foodDtail" style="margin-top: 1.333rem">
          <!--美食详情顶部-->
          <div class="foodHeader">
            <img src="../../assets/img/ticket/loLeft.png" height="6" width="70"/>
            <strong>全部餐厅</strong>
            <img src="../../assets/img/ticket/loRight.png" height="6" width="70"/>
          </div>
          <!--美食详情内容区域-->
          <ul>
            <li class="foodContent clearfix" v-for="item,index in RecommendMerchantsShopList">
              <div class="foodDtailLeft">
                <img @click="imgGo(item)" height="100%" width="100%" v-lazy="item.imageList[0].fd_pi_ImageUrl"/>
              </div>
              <!--美食详情中-->
              <div class="foodDtailMiddle" @click="rightOrder(item)">
                <h1>{{item.fd_sf_ProductName}}</h1>
                <span class="hot">人气值 263</span><em>
                <img class="fire" src="../../assets/img/food/shouye_44.png" height="10" width="10"/>
              </em><span class="capite">人均{{item.fd_sf_AvgPrice}}元</span>
                <div class="featrue clearfix">
                  <div class="featureOne clearfix" v-for="item,index in RecommendMerchantsShopList[0].foodTypeList">
                    {{item.fd_py_Name}}
                  </div>
                </div>
                <p class="sdistance">距离: <em style="color: #f60;">{{Number(item.sdistance).toFixed(2)}}</em>km
                </p>

              </div>
              <!--美食详情右-->
              <div class="foodDtailRight">
                <a href="javascript:;" @click="rightOrder(item)">预定</a>
              </div>
            </li>
          </ul>
        </div>

        <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
          <g>
            <circle cx="16" cy="32" stroke-width="0" r="3">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="32" cy="32" stroke-width="0" r="3.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="48" cy="32" stroke-width="0" r="4.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
            </circle>
          </g>
        </svg>

      </scroller>
    </section>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    Toast,
    Swiper,
    SwiperItem
  } from 'vux'

  export default {
    components: {
      Toast,
      Swiper,
      SwiperItem,
    },
    computed: mapGetters([
      'topTurnLlist',
      'RecommendMerchants',
      'RecommendMerchantsShopList',
      'initRecommendMerchantsShopList',
      'cityObj'
    ]),
    created() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      if (userInfo) {
        this.userInfo = userInfo
      }
      let searchObj = this.$route.query
      for (let attr in searchObj) {
        if (searchObj[attr]) {
          this.searchObj[attr] = searchObj[attr]
        }
      }
      //获取当前位置信息
      let mapObj = JSON.parse(sessionStorage.getItem('addMap'))
      //      console.log(sessionStorage.getItem('addMap'))
      //      console.log(mapObj)
      if (mapObj) {
        this.mapObj = mapObj
      }

      this.initFoodPage(this.searchObj, 1);
    },
    data() {
      return {
        userInfo: {},
        mapObj: {},
        searchObj: {
          keyword: "",
          foodTypeID: '',
          usePersontID: '',
          catagoryID: ''
        },
        //图标菜单
        menuList: [{
          imgId: '@/assets/img/food/shouye_17.png',
          imgName: '距离'
        },
          {
            imgId: '../../assets/img/food/shouye_19.png',
            imgName: '菜系'
          },
          {
            imgId: '../../assets/img/food/shouye_21.png',
            imgName: '星级/特色'
          },
          {
            imgId: '../../assets/img/food/shouye_23.png',
            imgName: '综合排序'
          },
        ],
        showErr: false,
        errCon: '',
      }
    },
    methods: {
      //立即预定
      rightOrder(obj) {
        if (!this.userInfo.sm_ui_ID) {
          this.$router.push({
            name: 'UserLogin'
          })
          return
        }
        this.$store.commit('foodModel', obj)
        this.$router.push({
          name: 'FoodOrderIfo',
          query: {
            id: obj.fd_sf_ID,
          }
        })
      },
      //改变美食首页
      changeFood() {
      },
      //餐厅简介
      imgGo(obj) {
        sessionStorage.setItem('introduceInfo', JSON.stringify(obj))
        this.$router.push({
          name: 'FoodRestaurantIntroduction'
        })
      },
      initFoodPage(obj, page) {
        let addMap = JSON.parse(sessionStorage.getItem('addMap'))
        let Recommends = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "longitude": this.mapObj.coords ? this.mapObj.coords.longitude : '', //经度
          "latitude": this.mapObj.coords ? this.mapObj.coords.latitude : '', //纬度
          "keyName": obj.keyword,
          distance: '200',
          "foodType": obj.foodTypeID, //菜系名称
          "eatType": obj.catagoryID, //早中晚餐
          "eatMans": obj.usePersontID, //人数
          "page": page ? page : 1,
          "rows": 10,
        };
        if (!this.mapObj.coords) {
          var myGeo = new BMap.Geocoder();
          var _this = this;
          myGeo.getPoint(addMap.city, function (point) {
            if (point) {
              Recommends.longitude = point.lng
              Recommends.latitude = point.lat
              _this.$store.commit('showLoading')
              _this.$store.dispatch('initRecommendMerchants', Recommends)
                .then(() => {
                  _this.$nextTick(() => {
                    _this.$store.commit('hideLoading')
                  })
                })
            } else {
              alert("您选择地址没有解析到结果!");
            }
          }, addMap.city);
        } else {
          var ggPoint = new BMap.Point(this.mapObj.coords.longitude, this.mapObj.coords.latitude);
          var convertor = new BMap.Convertor();
          var pointArr = [];
          pointArr.push(ggPoint);
          convertor.translate(pointArr, 1, 5, (data) => {
            if (data.status === 0) {
              console.log(JSON.stringify(data.points))
              Recommends.longitude = data.points[0].lng
              Recommends.latitude = data.points[0].lat
              this.$store.commit('showLoading')
              this.$store.dispatch('initRecommendMerchants', Recommends)
                .then(() => {
                  this.$nextTick(() => {
                    this.$store.commit('hideLoading')
                    // this.$vux.loading.hide()
                  })
                })
            }
          })

        }
      },
      goFoodSearch() {
        this.$router.push({
          name: 'FoodSearch'
        })
      },
      //下拉加载
      infinite(done) {
        this.rowsNum += 5;
        this.initSelected(this.thisProviceId, this.rowsNum)
          .then((total) => {
            done(true)
          })
      },
      //精选
      initSelected(id, num) {
        let selectChoiceList = {
          "loginUserID": "huileyou", //惠乐游用户ID
          "loginUserPass": "123", //惠乐游用户密码
          "operateUserID": "", //操作员编码
          "operateUserName": "", //操作员名称
          "pcName": "", //机器码
          "tm_ts_ProviceID": id ? id : '', //省编号
          "page": 1, //页码
          "rows": num ? num : 5 //条数
        }
        return this.$store.dispatch('initTicketSelected', selectChoiceList)
      },
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: relative;
    padding: 16/@r 30/@r 16/@r 26/@r;
  }

  .sdistance {
    font-size: 25/@r;
    padding-top: 10/@r;
    padding-bottom: 20/@r;
    /*color: green;*/
  }

  .leftIcon {
    float: left;
  }

  .homeIcon {
    float: left;
    width: 41/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/homeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 33/@r;
    margin-top: 8/@r;
  }

  header > strong {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 33/@r;
    line-height: 41/@r;
    font-family: "微软雅黑";
    color: #efeff1;
  }

  .rightIcon {
    float: right;
    margin-top: 10/@r;
  }

  .centerIcon {
    float: left;
    width: 32/@r;
    height: 37/@r;
    background: url("../../assets/img/home/userIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 2/@r;
    margin-right: 30/@r;
  }

  .menuIcon {
    float: left;
    width: 40/@r;
    height: 34/@r;
    background: url("../../assets/img/home/menuIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 3/@r;
  }

  .searchBox {
    width: 500/@r;
    height: 56/@r;
    float: left;
    background-color: #fff;
    padding: 13/@r 26/@r;
    font-size: 22/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .currentLocation {
    float: left;
    border-right: 1/@r solid #e6e6e6;
  }

  .currentLocation > i {
    float: left;
    width: 22/@r;
    height: 26/@r;
    background: url("../../assets/img/ticket/locationB.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 2/@r;
    margin-right: 6/@r;
  }

  .currentLocation > span {
    float: left;
    color: #343432;
    max-width: 155/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .currentLocation > em {
    float: right;
    width: 17/@r;
    height: 9/@r;
    background: url("../../assets/img/ticket/down.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 11/@r 13/@r 0 0;
  }

  .searchInput {
    overflow: hidden;
  }

  .searchInput > div {
    float: left;
    width: 100%;
  }

  .searchInput i {
    float: left;
    width: 26/@r;
    height: 25/@r;
    background: url("../../assets/img/ticket/searchIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 3/@r 5/@r 0 8/@r;
  }

  .searchInput span {
    float: left;
    border: none;
    font-size: 22/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    color: #a5a5a5;
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    overflow: auto;
  }

  .foodImageBox img {
    width: 100%;
  }

  .recommendBox {
    margin-top: 20/@r;
    background-color: #f5f5f5;
    overflow: hidden;
    margin-bottom: 28/@r;
    height: 140/@r;
    overflow-x: auto;
  }

  .recommendList {
    padding: 0 10/@r;
    overflow: hidden;
  }

  .recommendList > li {
    padding: 10/@r 30/@r 10/@r 0;
    float: left;
    background-color: #f5f5f5;
    width: 270/@r;
    position: relative;
    overflow: hidden;
  }

  .recommendList > li:last-of-type {
    width: 240/@r;
    padding: 10/@r 0;
  }

  .recommendList img {
    width: 240/@r;
    height: 132/@r;
  }

  .recommendList strong {
    font-size: 25/@r;
    line-height: 63/@r;
    font-family: "微软雅黑";
    color: #383838;
    display: block;
    text-align: center;
    padding: 0 5/@r;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background-color: #fff;
  }

  .recommendList span {
    font-size: 19/@r;
    line-height: 31/@r;
    font-family: "微软雅黑";
    color: #808080;
    display: block;
    text-align: center;
    background-color: #fff;
    padding-bottom: 3/@r;
  }

  .recommendList em {
    color: #c9255d;
  }

  .recommendList b {
    font-size: 30/@r;
  }

  .recommendList i {
    position: absolute;
    top: 0;
    left: 0;
    width: 53/@r;
    height: 26/@r;
    background: url("../../assets/img/ticket/bgIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    font-size: 14/@r;
    line-height: 26/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #fff;
  }

  .currentRecommend {
    border-top: 16/@r solid #e6e6e6;
    padding-top: 33/@r;
  }

  .currentRecommend > strong {
    position: relative;
    display: block;
    height: 40/@r;
  }

  .currentRecommend > strong > span {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .localSelected {
    border-top: 16/@r solid #e6e6e6;
    padding-top: 33/@r;
  }

  .localSelected > strong {
    position: relative;
    display: block;
    height: 40/@r;
  }

  .localSelected > strong > span {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .loLeft {
    position: absolute;
    top: 17/@r;
    left: -168/@r;
    width: 156/@r;
    height: 6/@r;
    background: url("../../assets/img/ticket/loLeft.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .loRight {
    width: 156/@r;
    height: 6/@r;
    position: absolute;
    top: 17/@r;
    right: -168/@r;
    width: 156/@r;
    height: 6/@r;
    background: url("../../assets/img/ticket/loRight.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .currentRecommendList img {
    width: 209/@r;
    height: 138/@r;
    float: left;
  }

  .currentRecommendList > li {
    padding: 24/@r 20/@r 24/@r 16/@r;
    border-bottom: 1/@r solid #d8d9de;
  }

  .scenicAbout > strong {
    font-size: 28/@r;
    line-height: 34/@r;
    font-family: "微软雅黑";
    display: block;
    color: #000;
  }

  .scenicAbout > span {
    font-size: 19/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
  }

  .scenicAbout em {
    float: left;
    width: 13/@r;
    height: 16/@r;
    background: url("../../assets/img/food/Popularity.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 14/@r;
    margin-right: 30/@r;
  }

  .perCapita {
    float: left;
    color: #5a5a5a;
  }

  .thisLabel {
    margin-top: 3/@r;
  }

  .thisLabel > span {
    float: left;
    margin-right: 19/@r;
    border: 1/@r solid #c2c2c2;
    color: #5a5a5a;
    padding: 0 5/@r;
    font-size: 18/@r;
    line-height: 22/@r;
    font-family: "微软雅黑";
  }

  .commentNum {
    float: right;
    font-size: 23/@r;
    line-height: 28/@r;
    font-family: "微软雅黑";
    color: #9e9e9e;
    margin-top: 3/@r;
  }

  .commentNum > span {
    float: left;
  }

  .commentNum > i {
    float: left;
    width: 10/@r;
    height: 17/@r;
    background: url("../../assets/img/userCenter/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 5/@r;
    margin-left: 3/@r;
  }

  .exhibitionImage {
    height: 100%;
    transition: 0.5s;
  }

  .exhibitionImage > img {
    float: left;
    height: 100%;
  }

  .foodImageBox {
    width: 100%;
    height: 328/@r;
    overflow: hidden;
  }

  .aboutPrice {
    background-color: rosybrown;
    height: 40/@r;
  }

  .aboutPrice > span {
    font-size: 6/@r;
  }

  .distance > i {
    float: left;
    width: 14/@r;
    height: 17/@r;
    background: url("../../assets/img/ticket/locationS.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 10/@r;
    margin-right: 5/@r;
  }

  .distance {
    display: block;
    font-size: 20/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #5a5a5a;
    margin-top: 20/@r;
  }

  .distance > em {
    float: left;
  }

  .imgBox {
    width: 150/@r;
    height: 80/@r;
    /*background-color: rosybrown;*/
  }

  .imgBox > img {
  }

  .recommendBox {
    /*text-align: center;*/
  }

  .recommendBox > ul {
    margin: 0 auto;
    width: 650/@r;
  }

  .recommendBox > ul > li {
    margin-left: 12/@r;
    float: left;
    width: 150/@r;
    text-align: center;
    /*background-color: royalblue;*/
  }

  .recommendBox > ul > li > strong {
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .foodHeader {
    text-align: center;
    line-height: 20/@r;
    margin-bottom: 10/@r;
    margin-top: 30/@r;
  }

  .foodHeader > img {
    opacity: 0.3;
    padding-top: 6/@r;
  }

  .foodHeader > strong {
    /*font-weight: bold;*/
    font-size: 36/@r;
    padding: 0 20/@r;
  }

  .foodContent {
    border-bottom: 1/@r solid #e5e5e5;
    margin: 20/@r 20/@r 0;
  }

  .foodDtailLeft {
    padding: 0/@r 10/@r 20/@r 0/@r;
    width: 25%;
    height: 200/@r;
    float: left;
  }

  .foodDtailMiddle {
    float: left;
    width: 50%;
    padding-top: 20/@r;
    overflow: hidden;
  }

  .foodDtailMiddle > h1 {
    font-size: 32/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
    /*font-weight: bold;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 45/@r;
  }

  .foodDtailMiddle > h1:active {
    color: #f60;
  }

  .foodDtailMiddle > span {
    line-height: 60/@r;
  }

  .hot {
    color: red;
  }

  .foodDtailRight {
    float: right;
    margin-top: 60/@r;
    margin-right: 10/@r;
  }

  .foodDtailRight > a {
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
    background-color: #f90;
    padding: 0 20/@r;
    color: #fff;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .featrue > .featureOne {
    float: left;
    background-color: #f90;
    margin-right: 10/@r;
    font-size: 25/@r;
    line-height: 30/@r;
    padding: 0 5/@r;
    margin-top: 10/@r;
    color: #fff;
  }

  .foodDtailRightImgBox {
    display: block;
  }

  .middleBottom {
    overflow: hidden;
    /*height:100/@r;*/
  }

  .quan,
  .tuan {
    width: 20/@r;
    height: 20/@r;
    float: left;
    margin-top: 8/@r;
  }

  .foodDtailRightImgBox > a > img {
    text-align: center;
    margin: 20/@r 0/@r 20/@r 20/@r;
  }

  .foodDtailRight > h6 {
    float: left;
    padding-left: 10/@r;
  }

  .fire {
    margin-top: 20/@r;
  }

  .capite {
    margin-left: 20/@r;
  }

  .exhibitionBox {
    width: 100%;
    height: 328/@r;
    overflow: hidden;
  }
</style>
