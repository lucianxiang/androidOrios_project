<template>
  <div>
    <header>
      <div class="leftIcon" @click="goBack"><i></i></div>
      <strong>{{tourProducteObj.ta_tg_Title}}</strong>
      <!--<div class="operationIcon"></div>-->
      <div class="shareIcon" @click="shareSystem"></div>
    </header>

    <div id="wrap" ref="wrap">
      <div class="wrapBox">
        <!--顶部轮播-->
        <div class="topBroadcast">
          <div class="topBroadcastBox">
            <div class="operationBox">
              <a href="javascript:;" class="goLast" @click="goBack"></a>
              <a href="javascript:;" class="goShare"></a>
            </div>
            <div class="exhibitionBox" @click="showImageSwiper = true">
              <swiper auto style="height: 100%;" v-model="imageIndex">
                <swiper-item
                  style="height: 100%;"
                  class="swiper-demo-img"
                  v-for="item,index in tourProducteObj.imgData"
                  :key="index"
                >
                  <img
                    :src="item"
                    class="imgClass"

                  ></swiper-item>
              </swiper>
              <p>{{imageIndex + 1}}/{{pictureNum}}张</p>
            </div>
            <!--<div class="imgSpot">-->
            <!--<em></em>-->
            <!--</div>-->
            <div class="maskBox">
              <span>产品编号：{{tourId}}</span>
            </div>
          </div>
          <div class="thisDetails">
            <strong>{{tourProducteObj.ta_tg_Title}}</strong>
            <div class="clearfix">
              <span class="price">￥ <em>{{tourProducteObj.ts_tg_lowestPrice}}</em> 起</span>
              <!--<span class="comment">评论325条(<em>92%</em>满意度)</span>-->
            </div>
          </div>
        </div>
        <!--优惠信息-->
        <div class="siscountInfo clearfix">
          <strong>优惠信息</strong>
          <span>暂无任何优惠</span>
        </div>
        <!--出发地点-->
        <div class="setOutPlace clearfix" @click="initProductLine">
          <span>出发：{{outCity ? outCity.ts_cc_Name : '选择出发城市'}} (成团地点{{tourProducteObj.cityName}})</span>
          <em></em>
        </div>
        <!--出发日期-->
        <div class="setOutDate">
          <strong><span>出发日期</span><em>以下价格均为起价</em></strong>
          <a href="javascript:;" @click="goDate">更多班期</a>
          <ul class="setOutDateList clearfix">
            <li v-for="item,index in dateList" v-show="dateList.length" @click="goFillOrder(item)">
              <strong>{{item.date ? item.date : item}}</strong>
              <span v-show="item.ts_pp_Price">￥{{item.ts_pp_Price}}</span>
            </li>
            <li class="noData" v-show="!dateList.length">当月暂无</li>
          </ul>
        </div>
        <!--产品-->
        <div class="aboutProduct" ref="navBox">
          <!--导航-->
          <div class="productNav clearfix">
            <span v-for="item,index in lineMenuList"
                  :class="{active: index == navClass}"
                  @click="changeNav(item,index)">
              {{item.ts_mu_Name}}
            </span>
          </div>
          <!--产品详情-->
          <ProductFeatures v-show="navClass === 0" :tourId="id"></ProductFeatures>
          <!--行程线路-->
          <TourTrip v-show="navClass === 1"></TourTrip>
          <!--费用说明-->
          <CostDescription v-show="navClass === 2"></CostDescription>
          <!--预定须知-->
          <PredeterminedInstructions v-show="navClass === 3"></PredeterminedInstructions>
          <!--游客点评-->
          <TouristComment v-show="navClass === 4"></TouristComment>
        </div>
      </div>
    </div>

    <!--导航-->
    <div class="productNav clearfix" :class="{active: navFix}">
      <span v-for="item,index in lineMenuList"
            :class="{active: index == navClass}"
            @click="changeNav(item,index)">
        {{item.ts_mu_Name}}
      </span>
    </div>


    <!--预定栏-->
    <div class="reserveBox">
      <div class="clearfix">
        <div class="collection">
          <i></i>
          <span>收藏</span>
        </div>
        <div class="phoneConsultation">
          <i></i>
          <span @click="toPhone">电话咨询</span>
        </div>
        <div class="inLineConsultation">
          <i></i>
          <span @click="toPhone">在线咨询</span>
        </div>
      </div>
      <button @click="submit">立即预定</button>
    </div>

    <div class="changeOutCity" v-show="cityState" @click="closeOutCity">
      <ul class="outCityList" @click.stop="clickWhite">
        <li
          v-for="item,index in outCityList"
          @click.stop="changeOutCity(item,index)"
          :class="{active: index == outCityIndex}"
        >{{item.ts_cc_Name}}
        </li>
        <li style="text-align: center" v-show="!outCityList.length">暂无出发城市</li>
      </ul>
    </div>
    <ImagePreview v-model="showImageSwiper" :data="tourProducteObj.imgData"></ImagePreview>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import ProductFeatures from './ProductFeatures'
  import TourTrip from './TourTrip'
  import CostDescription from './CostDescription'
  import PredeterminedInstructions from './PredeterminedInstructions'
  import TouristComment from './TouristComment'
  import {Toast, Swiper, SwiperItem} from 'vux'
  import {toZear2} from '@/assets/js/public'
  import ImagePreview from '@/components/ImagePreview'
  import BScroll from 'better-scroll'

  export default {
    computed: mapGetters([
      'lineMenuList',
      'tourProducteObj',
      'outCityList'
    ]),
    components: {
      ProductFeatures,
      TourTrip,
      CostDescription,
      PredeterminedInstructions,
      Toast,
      Swiper,
      SwiperItem,
      TouristComment,
      ImagePreview
    },
    data() {
      return {
        navClass: 0,
        tourId: '',
        id: '',
        showErr: false,
        errCon: '',
        navFix: false,
        outCity: '',
        cityState: false,
        englisWordIndex: 0,
        cityList: [],
        outCityIndex: -1,
        dateString: '',
        dateList: [],
        showImageSwiper: false,
        imageIndex: 0,
        pictureNum: 0,
        day: ''
      }
    },
    created() {
      this.dateString = new Date().getFullYear() + '-' + toZear2(new Date().getMonth() + 1) + '-01';
      this.tourId = this.$route.params.id;
      this.initTourProducte();
      this.initDate();
    },
    beforeRouteLeave(to,from,next){
      to.meta.keepAlive = true;
      next()
    },
    methods: {

      //发送分享
      shareSystem() {
        var _this = this;
//        mui.plusReady(function () {
          plus.share.sendWithSystem({
            content: '跟团游:' + _this.tourProducteObj.ta_tg_Title,
            href: 'http://hly.1000da.com.cn/mobile/index.html#/productChara/' + _this.tourId
          }, function () {
            console.log('分享成功');
          }, function (e) {
            _this.$vux.toast.show({
              text: '分享失败'
            })
            console.log('分享失败：' + JSON.stringify(e));
          });
      },

      //电话咨询
      toPhone() {
        if (window.plus) {
          plus.device.dial(this.tourProducteObj.sm_ui_Phone, false);
        } else {
          let _this = this;
          this.$vux.alert.show({
            title: '商家电话号码',
            content: _this.tourProducteObj.sm_ui_Phone,
            onShow() {
              console.log('Plugin: I\'m showing')
            },
            onHide() {
              console.log('Plugin: I\'m hiding')
            }
          })
        }
      },
      //初始化日期
      initDate() {
        let t = new Date();
        let lt = new Date();
        let nowM = t.getMonth();
        lt.setMonth(nowM + 1);
        lt.setDate(0);
        for (let i = t.getDate(); i < t.getDate() + 4;) {
          if (i > lt.getDate()) {
            break;
          }
          this.dateList.push(toZear2(t.getMonth() + 1) + '/' + toZear2(i));
          i++;
        }
      },
      //点击空白
      clickWhite() {
      },
      //返回
      goBack() {
        this.$router.go(-1);
      },
      //产品详情
      initTourProducte() {
        let selectTradeGoodInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "goodID": this.tourId,//产品编码
//          "lineID": 248//线路编码
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('initTourProducte', selectTradeGoodInfo)
          .then(id => {
            this.pictureNum = this.tourProducteObj.imgData.length;
            this.getLineMenu(id);
            this.$nextTick(() => {
              document.title = this.tourProducteObj.ta_tg_Title;
              this.$store.commit('hideLoading')
            })
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //线路菜单
      getLineMenu(id) {
        var getLineMenuInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          // "token": "",
          "lineID": id ? id : ''
        };
        this.$store.dispatch('initLineMenu', getLineMenuInfo)
          .then(() => {
            this.scrollPage();
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //产品详情
      changeNav(item, index) {
        this.navClass = index;
        if (index == 4) {
          this.$store.commit('showLoading')
          this.allComment();
          this.initCommentData();
        }
      },
      //去填写订单
      goDate() {
        if (!this.outCity) {
          this.showErr = true;
          this.errCon = '请选择出发城市';
          return
        }
        if (!localStorage.getItem('userInfo')) {
          this.showErr = true;
          this.errCon = '请先登录';
          setTimeout(() => {
            this.$router.push({name: 'UserLogin'})
          }, 200)
          return
        }
        this.$router.push({
          name: 'SeletePlayDate',
          query: {
            cityId: this.outCity.ts_cc_Code,
            lineId: this.outCity.ts_cc_LineID
          }
        })
      },
      //立即预订
      submit() {
        if (!this.outCity) {
          this.showErr = true;
          this.errCon = '请选择出发城市';
          return
        }
        if (!this.day) {
          this.showErr = true;
          this.errCon = '请选择出发日期';
          return
        }
        this.$router.push({
          name: 'SeletePlayDate',
          query: {
            cityId: this.outCity.ts_cc_Code,
            lineId: this.outCity.ts_cc_LineID,
            day: this.day
          }
        })
      },
      goFillOrder(item) {
        if (!this.outCity) {
          this.showErr = true;
          this.errCon = '请选择出发城市';
          return
        }
        if (!sessionStorage.getItem('userInfo')) {
          this.showErr = true;
          this.errCon = '请先登录';
          setTimeout(() => {
            this.$router.push({name: 'UserLogin'})
          }, 200)
          return
        }
        this.day = item.day
        this.$router.push({
          name: 'SeletePlayDate',
          query: {
            cityId: this.outCity.ts_cc_Code,
            lineId: this.outCity.ts_cc_LineID,
            day: item.day
          }
        })
        sessionStorage.setItem('orderObj', JSON.stringify(item))
      },
      //总体评论
      allComment() {
        let selectComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "GoodID": this.tourId,       //产品编码
          "ts_ct_SysID": "6",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
        }
        this.$store.dispatch('allComment', selectComment)
          .then(() => {
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //评论数据
      initCommentData() {
        let SelectAllComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ID": "",       //产品评论编码
          "UserInfoID": "",  // 用户信息编码
          "GoodID": this.tourId,       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "6",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
          "page": 1,
          "rows": 5,
        }
        this.$store.dispatch('initCommentData', SelectAllComment)
          .then(() => {
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //页面滚动
      scrollPage() {
        if(this.$refs.navBox){
          let box = this.$refs.navBox.offsetTop;
          let wrap = this.$refs.wrap;
          wrap.addEventListener('scroll', () => {
            if (wrap.scrollTop > (box + 100)) {
              this.navFix = true;
            } else {
              this.navFix = false;
            }
          })
        }
      },
      //初始化产品线路
      initProductLine() {
        let getProduceLine = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "goodID": this.tourId,
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('initProductLine', getProduceLine)
          .then(id => {
            if (id) {
              this.initOutCity(id);
            } else {
              this.cityState = true;
            }
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.$store.commit('hideLoading')
          })
      },
      //初始化出发城市
      initOutCity(id) {
        let getFirstAreaInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "lineID": id
        }
        this.$store.dispatch('initOutCity', getFirstAreaInfo)
          .then(() => {
            this.cityState = true;
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.$store.commit('hideLoading')
          })
      },
      //关闭出发城市弹窗
      closeOutCity() {
        this.cityState = false;
      },
      //选择出发城市
      changeOutCity(item, index) {
        this.outCityIndex = index;
        this.outCity = item;
        this.cityState = false;
        this.initProductLinePrice(item);
      },
      //当月票价
      initProductLinePrice(obj) {
        let getProductPrice = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "lineID": obj.ts_cc_LineID,
          "city": obj.ts_cc_Code,
          "monthChose": this.dateString,
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('initProductLinePrice', getProductPrice)
          .then(data => {
            for (var n = 0; n < data.length; n++) {
              data[n].day = Number(data[n].ts_pp_Date.split('-')[2])
              data[n].date = toZear2(new Date().getMonth() + 1) + '/' + Number(data[n].ts_pp_Date.split('-')[2]);
            }
            data = data.filter(item => {
              if (item.day >= new Date().getDate()) {
                return true
              }
              return false
            })
            this.dateList = data.slice(0, 4);
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
    },
    mounted() {
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #3e3f5b;
    width: 100%;
    height: 88/@r;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    padding: 22/@r 10/@r 22/@r 30/@r;
  }

  header > strong {
    position: absolute;
    top: 22/@r;
    font-size: 34/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    width: 60%;
    left: 17%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
  }

  .leftIcon {
    float: left;
    padding: 20/@r;
    margin: -15/@r 0 0 -20/@r;
  }

  .leftIcon > i {
    display: block;
    width: 19/@r;
    height: 35/@r;
    background: url("../../assets/img/productChara/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

  }

  .operationIcon {
    float: right;
    width: 56/@r;
    height: 11/@r;
    background: url("../../assets/img/productChara/operationIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 17/@r 0 0 27/@r;
  }

  .shareIcon {
    float: right;
    width: 44/@r;
    height: 44/@r;
    background: url("../../assets/img/productChara/shareIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  #wrap {
    background-color: #dadedd;
    width: 100%;
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 98/@r;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .topBroadcast {
    background-color: #fff;
  }

  .topBroadcastBox {
    height: 350/@r;
    width: 100%;
    position: relative;
  }

  .exhibitionBox {
    width: 100%;
    height: 350/@r;
    overflow: hidden;
  }

  .exhibitionBox .imgClass {
    height: 350/@r;
    width: 100%;
  }

  .imgList li {
    width: 100%;
    float: left;
  }

  .maskBox {
    background-color: rgba(0, 0, 0, .2);
    position: absolute;
    width: 100%;
    height: 48/@r;
    bottom: 0;
    left: 0;
    color: #fff;
    padding: 0 30/@r;
    font-size: 23/@r;
    line-height: 48/@r;
    font-family: "微软雅黑";
  }

  .maskBox strong {
    float: left;
  }

  .maskBox span {
    float: left;
  }

  .thisDetails {
    padding: 31/@r 30/@r 32/@r 30/@r;
  }

  .thisDetails > strong {
    display: block;
    font-size: 33/@r;
    line-height: 47/@r;
    font-family: "微软雅黑";
    margin-bottom: 33/@r;
  }

  .price {
    float: left;
    font-size: 23/@r;
    line-height: 33/@r;
    font-family: "微软雅黑";
    color: #dd2b15;
  }

  .price em {
    font-size: 37/@r;
  }

  .comment {
    float: right;
    font-size: 25/@r;
    line-height: 33/@r;
    font-family: "微软雅黑";
    color: #686868;
  }

  .comment > em {
    color: #dd2b15;
  }

  .siscountInfo {
    margin-top: 20/@r;
    padding-left: 30/@r;
    background-color: #fff;
    font-size: 28/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
  }

  .siscountInfo > strong {
    float: left;
    color: #010101;
  }

  .siscountInfo > span {
    float: left;
    margin-left: 135/@r;
    color: #8a8a8a;
  }

  .setOutPlace {
    margin-top: 20/@r;
    background-color: #fff;
    font-size: 28/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
    padding: 0 30/@r;
  }

  .setOutPlace span {
    float: left;
  }

  .setOutPlace > em {
    float: right;
    width: 13/@r;
    height: 23/@r;
    background: url("../../assets/img/hotel/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 25/@r;
  }

  .setOutDate {
    margin-top: 20/@r;
    background-color: #fff;
    padding: 16/@r 30/@r 20/@r 30/@r;
    position: relative;
  }

  .setOutDate > strong {
    font-size: 28/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
    color: #000;
  }

  .setOutDate > strong > em {
    font-size: 22/@r;
    color: #8a8a8a;
    margin-left: 20/@r;
  }

  .setOutDate > a {
    font-size: 22/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    position: absolute;
    right: 24/@r;
    top: 100/@r;
    width: 75/@r;
    padding-right: 25/@r;
    color: #117db5;
  }

  .setOutDate > a:before {
    content: '';
    position: absolute;
    top: 20/@r;
    right: 10/@r;
    width: 15/@r;
    height: 15/@r;
    border-left: 2/@r solid #127eb5;
    border-bottom: 2/@r solid #127eb5;
    transform: rotate(-135deg);
  }

  .setOutDateList > li {
    float: left;
    width: 131/@r;
    height: 80/@r;
    border: 1/@r solid #cdcdcd;
    background: #f8f9f9;
    text-align: center;
    padding: 7/@r 0 4/@r 0;
    margin-right: 30/@r;
    margin-bottom: 20/@r;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .setOutDateList > .noData {
    width: 100%;
    border: none;
    background-color: #fff;
    font-size: 28/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    color: #666;
  }

  .setOutDateList strong {
    font-size: 29/@r;
    line-height: 1;
    font-family: "微软雅黑";
    color: #010101;
  }

  .setOutDateList span {
    font-size: 25/@r;
    line-height: 1;
    font-family: "微软雅黑";
    color: #dd2b15;
    display: block;
  }

  .aboutProduct {
    margin-top: 20/@r;
    padding-top: 12/@r;
    padding-bottom: 37/@r;
    background-color: #fff;
  }

  .productNav {
    border-bottom: 1/@r solid #dadedd;
    font-size: 28/@r;
    line-height: 82/@r;
    font-family: "微软雅黑";
    overflow: hidden;
    background-color: #fff;
  }

  .productNav.active {
    position: fixed;
    top: 88/@r;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .productNav > span {
    float: left;
    width: 20%;
    text-align: center;
    border-bottom: 3/@r solid transparent;
    /*overflow: auto;*/
  }

  .productNav > span.active {
    border-color: #117db5;
    color: #117db5;
  }

  .outlineCon > p {
    font-size: 23/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    color: #686868;
  }

  .reserveBox {
    position: fixed;
    z-index: 10000;
    bottom: 0;
    left: 0;
    background-color: #3e3f5b;
    width: 100%;
    height: 98/@r;
  }

  .reserveBox > div {
    width: 66.6666666%;
    float: left;
  }

  .collection,
  .phoneConsultation,
  .inLineConsultation {
    float: left;
    width: 33.333333%;
    font-size: 23/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    color: #fff;
    text-align: center;
    padding-top: 10/@r;
  }

  .collection > i {
    width: 47/@r;
    background: url("../../assets/img/productChara/collectionIcon.png") no-repeat;
  }

  .phoneConsultation > i {
    width: 44/@r;
    background: url("../../assets/img/productChara/phoneIcon.png") no-repeat;
  }

  .inLineConsultation > i {
    width: 42/@r;
    background: url("../../assets/img/productChara/inLineIcon.png") no-repeat;
  }

  .collection > i,
  .phoneConsultation > i,
  .inLineConsultation > i {
    display: block;
    height: 44/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .reserveBox > button {
    width: 33.33333333%;
    border: none;
    font-size: 28/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
    text-align: center;
    background-color: #dd7015;
    color: #fff;
  }

  .changeOutCity {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    overflow: auto;
    z-index: 999;
    transition: 1s;
    padding: 100/@r 0;
  }

  .outCityList {
    width: 70%;
    background-color: #fff;
    font-size: 28/@r;
    line-height: 38/@r;
    font-family: "微软雅黑";
    padding: 20/@r 0;
    color: #333;
    margin: 0 auto;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .outCityList li {
    padding: 20/@r 30/@r;
    border-bottom: 1/@r solid #ccc;
  }

  .outCityList li.active {
    color: #fff;
    background-color: #409EFF;
  }

  .outCityList li:last-of-type {
    border-bottom: none;
  }

  .wrapBox {
    overflow: hidden;
  }

  .exhibitionBox > p {
    position: absolute;
    right: 30/@r;
    bottom: 0;
    font-size: 28/@r;
    line-height: 48/@r;
    font-family: "微软雅黑";
    color: #fff;
  }
</style>

