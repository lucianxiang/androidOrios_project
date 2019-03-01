<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
        <a href="javascript:;" class="searchIcon"></a>
      </div>
      <strong class="title">租车</strong>
      <div class="rightIcon">
        <a href="javascript:;" class="centerIcon"></a>
        <a href="javascript:;" class="menuIcon"></a>
      </div>
    </header>
    <section>
      <div class="bannerImage">
        <img src="../../assets/img/home/car.png">
      </div>
      <div class="carRenting">
        <strong>国内租车</strong>
        <div class="pickCar clearfix">
          <strong>取车</strong>
          <div class="pickCity" @click="pickCar">
            <span>{{carChangeCityObj.CityName ? carChangeCityObj.CityName : '选择'}}</span>
            <i></i>
          </div>
          <div class="pickPlace" @click="pickCarAd">
            <span>地点</span>
            <em>{{pickCarCityObj.MarkName ? pickCarCityObj.MarkName : '选择取车地点'}}</em>
            <i></i>
          </div>
        </div>
        <div class="pickCar clearfix">
          <strong>还车</strong>
          <div class="pickCity" @click="returnCar">
            <span>{{carReturnCityObj.CityName ? carReturnCityObj.CityName : '选择'}}</span>
            <i></i>
          </div>
          <div class="pickPlace" @click="returnCarAd">
            <span>地点</span>
            <em>{{returnCarCityObj.MarkName ? returnCarCityObj.MarkName : '选择还车地点'}}</em>
            <i></i>
          </div>
        </div>
        <div class="setDateBox clearfix">
          <!--取车-->
          <div class="setDate" @click="openPicker">
            <strong>{{pickUpTime}}</strong>
            <span>{{pickSpotTime}}</span>
          </div>
          <div class="excessive">
            <span>{{days}}天</span>
            <em></em>
          </div>
          <!--还车-->
          <div class="outDate" @click="returnDate">
            <strong>{{returnTime}}</strong>
            <span>{{returnSpotTime}}</span>
          </div>
        </div>
        <a href="javascript:;">立即选车</a>
      </div>
      <ul class="pickCarService clearfix">
        <li class="haveCity">
          <div></div>
          <span>
            <span>个城市</span>
            <span>全国2000家门店</span>
          </span>
        </li>
        <li class="haveCarType">
          <div></div>
          <span>
            <span>种车型</span>
            <span>满足旅行需求</span>
          </span>
        </li>
        <li class="haveCarNum">
          <div></div>
          <span>
            <span>预留车辆</span>
            <span>到店免费升级</span>
          </span>
        </li>
        <li class="haveSecurity">
          <div></div>
          <span>
            <span>预留车辆</span>
            <span>到店免费升级</span>
          </span>
        </li>
      </ul>
      <div class="aboutPickCar clearfix">
        <a href="javacript:;" class="consultation"><em></em></a>
        <a href="javacript:;" class="order"><em></em></a>
      </div>
    </section>
    <!--城市地标-->
    <div class="landmark" v-show="showLandmark" @click="pickCarAd">
      <div class="landmarkBox">
        <dl v-for="item,index in carLandmarkList" class="clearfix">
          <dt>{{item.AttrName}}</dt>
          <dd v-for="item,index in item.MarkArry" @click.stop="changCityAd(item)">{{item.MarkName}}</dd>
        </dl>
      </div>
    </div>
    <!--还车城市地标-->
    <div class="landmark" v-show="showReturnLandmark" @click="returnCarAd">
      <div class="landmarkBox">
        <dl v-for="item,index in returnLandmarkList" class="clearfix">
          <dt>{{item.AttrName}}</dt>
          <dd v-for="item,index in item.MarkArry" @click.stop="changReturnCityAd(item)">{{item.MarkName}}</dd>
        </dl>
      </div>
    </div>
    <toast v-model="showErr" type="warn" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Datetime, Group} from 'vux'
  import {toZear2, getDaysByDateString} from '@/assets/js/public'

  export default {
    components: {
      Toast,
      Datetime,
      Group,
    },
    computed: mapGetters([
      'carLandmarkList',
      'carChangeCityObj',
      'carReturnCityObj',
      'returnLandmarkList',
      'pickCarCityObj',
      'returnCarCityObj'
    ]),
    data() {
      return {
        showErr: false,
        errCon: '',
        showCityList: false,
        showLandmark: false,
        showReturnCityList: false,
        showReturnLandmark: false,
        addComp: {},
        selectCarAr: {},
        limitHourValue: '',
        selectOutCarAr: {},
        n: 0,
        m: 0,
        pickUpTime: '',
        returnTime: '',
        days: 1,
        pickSpotTime: '',
        returnSpotTime: '',
      }
    },
    created() {
      let t = new Date();
      this.pickUpTime = t.getFullYear() + '-' + toZear2(t.getMonth() + 1) + '-' + toZear2(t.getDate());
      this.pickSpotTime = this.returnSpotTime = toZear2(t.getHours()) + ':' + toZear2(t.getMinutes());
      t.setDate(t.getDate() + 1);
      this.returnTime = t.getFullYear() + '-' + toZear2(t.getMonth() + 1) + '-' + toZear2(t.getDate());


      if (sessionStorage.getItem('addComp')) {
        this.addComp = JSON.parse(sessionStorage.getItem('addComp'));
      }
      ;
      if (this.carChangeCityObj.CityId) {
        this.initLandmark(this.carChangeCityObj.CityId);
      }
      if (this.carReturnCityObj.CityId) {
        this.initReturnLandmark(this.carReturnCityObj.CityId);
      }
    },
    methods: {
      //初始化城市地标
      initLandmark(id) {
        let GetCityLandmarkInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "CityId": id ? id : '',
        };
        this.$store.dispatch('initCarLandmark', GetCityLandmarkInfo)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //初始化还车城市地标
      initReturnLandmark(id) {
        let GetCityLandmarkInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "CityId": id ? id : '',
        };
        this.$store.dispatch('initReturnLandmark', GetCityLandmarkInfo)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //取车城市
      pickCar() {
        this.$router.push({name: 'SearchCity', params: {id: 0}});
      },
      //取车城市地点
      pickCarAd() {
        if (this.showLandmark) {
          this.showLandmark = false;
        } else {
          this.showLandmark = true;
        }
        if (!this.carChangeCityObj.CityName) {
          this.showErr = true;
          this.errCon = '请选择取车城市';
          this.showLandmark = false;
        }
      },
      //还车城市
      returnCar() {
        this.$router.push({name: 'SearchCity', params: {id: 1}});
      },
      //还车城市地点
      returnCarAd() {
        if (this.showReturnLandmark) {
          this.showReturnLandmark = false;
        } else {
          this.showReturnLandmark = true;
        }
        if (!this.carReturnCityObj.CityName) {
          this.showErr = true;
          this.errCon = '请选择还车城市';
          this.showReturnLandmark = false;
        }
      },
      //选择城市
      changeCity(item) {
        this.selectCarCity = item;
        this.initLandmark(item.CityId);
        this.showCityList = false;
      },
      //选择城市地点
      changCityAd(item) {
        this.selectCarAr = item;
        this.$store.commit('pickCarCity', item)
        this.showLandmark = false;
      },
      //选择还车城市
      changeReturnCity(item) {
        this.carReturnCityObj = item;
        this.initLandmark(item.CityId);
        this.showReturnCityList = false;
      },
      //选择还车城市地点
      changReturnCityAd(item) {
        this.selectOutCarAr = item;
        this.$store.commit('returnCarCity', item)
        this.showReturnLandmark = false;
      },
      //取车日期
      openPicker() {
        var _this = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD HH:mm',
          value: _this.pickUpTime + ' ' + _this.pickSpotTime,
          onConfirm(val) {
            _this.pickUpTime = val.split(' ')[0];
            _this.pickSpotTime = _this.returnSpotTime = val.split(' ')[1];
          }
        })
      },
      //还车日期
      returnDate() {
        var _this = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: _this.returnTime,
          onConfirm(val) {
            _this.returnTime = val;
          },
          onHide() {
            _this.days = getDaysByDateString(_this.pickUpTime, _this.returnTime);

          }
        })
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 24/@r 30/@r 23/@r 26/@r;
    z-index: 2;
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
  }

  .searchIcon {
    float: left;
    width: 34/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/searchIcon.png") no-repeat;

    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
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

  section {
    position: fixed;
    top: 88/@r;
    bottom: 98/@r;
    left: 0;
    right: 0;
    background-color: #fff;
    padding-bottom: 100/@r;
    overflow: auto;
  }

  .bannerImage img {
    width: 100%;
  }

  .carRenting {
    position: relative;
    width: 690/@r;
    margin: -28/@r auto 0;
    background-color: #fff;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
    box-shadow: 1/@r 2/@r 3/@r #000;
    padding: 10/@r 45/@r 36/@r;
  }

  .carRenting > strong {
    display: block;
    text-align: center;
    font-size: 33/@r;
    line-height: 77/@r;
    font-family: "微软雅黑";
    color: #333333;
  }

  .pickCar > strong {
    float: left;
    font-size: 32/@r;
    line-height: 72/@r;
    font-family: "微软雅黑";
    margin-right: 40/@r;
    color: #333333;
  }

  .pickCity {
    float: left;
    width: 112/@r;
  }

  .pickCity > span {
    float: left;
    font-size: 23/@r;
    line-height: 72/@r;
    font-family: "微软雅黑";
    color: #7a7a7a;
    width: 90/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pickCity > i {
    float: left;
    width: 22/@r;
    height: 12/@r;
    background: url("../../assets/img/ticket/down.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 30/@r;
  }

  .pickPlace {
    float: left;
    margin-left: 30/@r;
  }

  .pickPlace > span {
    float: left;
    font-size: 28/@r;
    line-height: 72/@r;
    font-family: "微软雅黑";
    color: #7a7a7a;
  }

  .pickPlace > em {
    float: left;
    width: 268/@r;
    text-align: center;
    border-bottom: 2/@r solid #9b9b9b;
    font-size: 23/@r;
    line-height: 27/@r;
    font-family: "微软雅黑";
    color: #7a7a7a;
    margin-top: 23/@r;
  }

  .pickPlace > i {
    float: right;
    width: 22/@r;
    height: 12/@r;
    background: url("../../assets/img/ticket/down.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 30/@r;
  }

  .setDateBox {
    width: 600/@r;
    margin: 15/@r auto 0;
  }

  .setDate,
  .outDate {
    float: left;
    width: 214/@r;
    border-bottom: 1/@r solid #c1c1c1;
  }

  .setDate > strong,
  .outDate > strong {
    font-size: 32/@r;
    line-height: 53/@r;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
    color: #333333;
  }

  .setDate > span,
  .outDate > span {
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #7a7a7a;
    display: block;
    text-align: center;
  }

  .excessive {
    float: left;
    width: 133/@r;
    margin: 9/@r 19/@r 0;
    font-size: 25/@r;
    line-height: 31/@r;
    font-family: "微软雅黑";
  }

  .excessive > span {
    display: block;
    text-align: center;
  }

  .excessive > em {
    display: block;
    width: 133/@r;
    height: 9/@r;
    background: url("../../assets/img/hotel/icon8.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .carRenting > a {
    display: block;
    width: 600/@r;
    margin: 0 auto;
    text-align: center;
    margin-top: 35/@r;
    background-color: #2dbb55;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
    color: #fff;
    font-size: 32/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
    box-shadow: 1/@r 1/@r 1/@r #000;
  }

  .pickCarService {
    margin-top: 26/@r;
    padding: 0 26/@r 36/@r;
  }

  .pickCarService > li {
    float: left;
    width: 50%;
    margin-top: 44/@r;
    padding-left: 50/@r;
  }

  .pickCarService > li > div {
    width: 84/@r;
    height: 84/@r;
    float: left;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .haveCity > div {
    background: url("../../assets/img/car/icon1.png") no-repeat;
  }

  .haveCarType > div {
    background: url("../../assets/img/car/icon2.png") no-repeat;
  }

  .haveCarNum > div {
    background: url("../../assets/img/car/icon3.png") no-repeat;
  }

  .haveSecurity > div {
    background: url("../../assets/img/car/icon4.png") no-repeat;
  }

  .pickCarService > li > span {
    float: left;
    font-size: 23/@r;
    line-height: 31/@r;
    font-family: "微软雅黑";
    color: #706f6d;
    margin-left: 20/@r;
    margin-top: 14/@r;
  }

  .pickCarService span > span {
    display: block;
  }

  .aboutPickCar {
    border-top: 1/@r solid #c9c9c9;
    border-bottom: 1/@r solid #c9c9c9;
    height: 98/@r;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: #fff;
    z-index: 200;
  }

  .aboutPickCar > a {
    float: left;
    height: 100%;
    width: 50%;
    text-align: center;
  }

  .consultation {
    border-right: 1/@r solid #c9c9c9;
  }

  .consultation > em {
    display: inline-block;
    width: 49/@r;
    height: 75/@r;
    background: url('../../assets/img/car/icon5.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 9/@r;
  }

  .order > em {
    display: inline-block;
    width: 46/@r;
    height: 75/@r;
    background: url('../../assets/img/car/icon6.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 9/@r;
  }

  .cityList {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
  }

  .cityListBox {
    background-color: #fff;
    height: 50%;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    overflow: auto;
    padding: 10/@r;
  }

  .cityListBox dt {
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    color: #f80;
  }

  .cityListBox dd {
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    color: #000;
    padding-left: 50/@r;
    float: left;
    width: 50%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .landmark {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
  }

  .landmarkBox {
    position: absolute;
    bottom: 0;
    height: 40%;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 10/@r;
    overflow: auto;
  }

  .landmarkBox dt {
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
  }

  .landmarkBox dd {
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    padding-left: 50/@r;
    float: left;
    width: 50%;
  }


</style>
