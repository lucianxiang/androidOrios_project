<template>
  <div>
    <div class="scheduleWrap">
      <ul class="scheduleList">
        <li v-for="item,index in prepareList">
          <strong class="scheduleTitle">
            <em>第{{item.ts_pt_Day}}天</em>
            <!--car plane train ship-->
            <div>
              <span class="clearfix" v-for="ite,index in item.titleList">
                <b>{{ite.ts_dtp_FromSite}}</b>
                <i
                  :class="{car:ite.ts_dtp_GoWay==0,train:ite.ts_dtp_GoWay==1,plane:ite.ts_dtp_GoWay==2,ship:ite.ts_dtp_GoWay==3}"
                  v-show="!ite.ts_dtp_ReachSite"
                ></i>
              </span>
            </div>
          </strong>
          <div class="scheduleDetails">
            <!--温馨提示-->
            <div class="reminder">
              <i></i>
              <strong class="title">温馨提示：</strong>
              <p>{{item.ts_pt_HappyNotice}}</p>
            </div>
            <!--交通-->
            <!--<div class="traffic">-->
            <!--<i></i>-->
            <!--<div class="clearfix title">-->
            <!--<span>交通:</span>-->
            <!--<span>峨眉山市</span>-->
            <!--<em></em>-->
            <!--<span>雷洞坪</span>-->
            <!--</div>-->
            <!--<div class="useTime clearfix">-->
            <!--<span>07：00</span>-->
            <!--<span>交通约3个小时</span>-->
            <!--</div>-->
            <!--<p>-->
            <!--抵达峨眉山景区后换成观光车前往雷洞坪-->
            <!--</p>-->
            <!--</div>-->
            <div v-for="val in item.getSortList">
              <!--早餐-->
              <div class="havingDinner" v-show="val.ts_fd_UseType==0">
                <i></i>
                <strong class="breakfast title">早餐：{{val.ts_fd_Include}}</strong>
                <div class="useTime clearfix">
                  <span>时间：{{val.ts_fd_Time}}</span>
                  <span>用餐约{{val.ts_fd_WasteMinute}}分钟</span>
                </div>
                <p>{{val.ts_fd_Des}}</p>
                <div class="trafficImage clearfix" v-show="val.ts_fd_Image.length">
                  <div v-for="i in val.ts_fd_Image">
                    <img v-lazy="i" alt="" @click="showImage(i)">
                  </div>
                </div>
              </div>
              <!--景点-->
              <div class="scenicSpot" v-show="val.ts_ts_ID">
                <i></i>
                <strong class="title">景点:{{val.ts_ts_TourName}}</strong>
                <div class="useTime clearfix">
                  <span>{{val.ts_ts_Fee}}</span>
                  <span>时间：{{val.ts_ts_Time}}</span>
                  <span>游玩时长：约{{val.ts_ts_NeedMinute}}分钟</span>
                </div>
                <p>{{val.ts_ts_Des}}</p>
                <div class="trafficImage clearfix" v-show="val.ts_ts_Image.length">
                  <div v-for="i in val.ts_ts_Image">
                    <img v-lazy="i" alt="" @click="showImage(i)">
                  </div>
                </div>

              </div>
              <!--中餐-->
              <div class="havingDinner" v-show="val.ts_fd_UseType==1">
                <i></i>
                <strong class="breakfast title">中餐：{{val.ts_fd_Include}}</strong>
                <div class="useTime clearfix">
                  <span>时间：{{val.ts_fd_Time}}</span>
                  <span>用餐约{{val.ts_fd_WasteMinute}}分钟</span>
                </div>
                <p>{{val.ts_fd_Des}}</p>
                <div class="trafficImage clearfix" v-show="val.ts_fd_Image.length">
                  <div v-for="i in val.ts_fd_Image">
                    <img v-lazy="i" alt="" @click="showImage(i)">
                  </div>
                </div>
              </div>
              <!--晚餐-->
              <div class="havingDinner" v-show="val.ts_fd_UseType==2">
                <i></i>
                <strong class="breakfast title">晚餐：{{val.ts_fd_Include}}</strong>
                <div class="useTime clearfix">
                  <span>时间：{{val.ts_fd_Time}}</span>
                  <span>用餐约{{val.ts_fd_WasteMinute}}分钟</span>
                </div>
                <p>{{val.ts_fd_Des}}</p>
                <div class="trafficImage clearfix" v-show="val.ts_fd_Image.length">
                  <div v-for="i in val.ts_fd_Image">
                    <img v-lazy="i" alt="" @click="showImage(i)">
                  </div>
                </div>
              </div>

              <!--住宿-->
              <div class="accommodation" v-show="val.ts_hl_ID">
                <i></i>
                <strong class="clearfix title">
                  <span>住宿：</span>
                  <span>{{val.ts_hl_HotelName}}</span>
                </strong>
                <div class="useTime clearfix">
                  <span>时间：{{val.ts_hl_Time}}</span>
                </div>
                <ul class="hptelList">
                  <li>
                    <strong>{{val.ts_hl_LookHotel}}</strong>
                    <div class="hotelDetails clearfix">
                      <div>
                        <span>酒店星级：</span>
                        <em>{{val.ts_hl_Star}}</em>
                      </div>
                      <div>
                        <span>酒店地址：</span>
                        <em>{{val.ts_hl_Address}}</em>
                      </div>
                      <div>
                        <span>标准间：</span>
                        <em>{{val.ts_hl_StandardRoom}}</em>
                      </div>
                      <div>
                        <span>床型：</span>
                        <em>{{val.ts_hl_BedType}}</em>
                      </div>
                      <div>
                        <span>设施：</span>
                        <em>{{val.ts_hl_Good}}</em>
                      </div>
                      <div>
                        <span>温馨提示：</span>
                        <em>{{val.ts_hl_HappyNotice}}</em>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="trafficImage clearfix" v-show="val.ts_hl_HotelImage.length">
                  <div v-for="i in val.ts_hl_HotelImage">
                    <img v-lazy="i" alt="" @click="showImage(i)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ImagePreview v-model="showImageSwiper" :data="imgData"></ImagePreview>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import ImagePreview from '@/components/ImagePreview'

  export default {
    components: {
      ImagePreview
    },
    computed: mapGetters([
      'prepareList'
    ]),
    data() {
      return {
        tourTrip: '',
        imgData: [],
        showImageSwiper: false
      }
    },
    created() {
    },
    methods: {
      showImage(item){
        this.imgData = [];
        this.showImageSwiper = true;
        this.imgData.push(item);
      }
    },
    mounted() {
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .scheduleWrap {
    margin-top: 20/@r;
    background-color: #fff;
  }

  .scheduleTitle {
    display: block;
    width: 100%;
    /*height: 155/@r;*/
    border-bottom: 1/@r solid #dadedd;
    position: relative;
  }

  .scheduleTitle > em {
    display: block;
    width: 140/@r;
    text-align: center;
    margin: 0 auto;
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:42/@r;
    background-color: #117db5;
    color: #fff;
    -webkit-border-radius: 3/@r;
    -moz-border-radius: 3/@r;
    border-radius: 3/@r;
  }

  .scheduleTitle > div {
    line-height: 0;
    width: 100%;
    padding: 30/@r 0 0;
    text-align: center;
  }

  .scheduleTitle span {
    display: inline-block;
    font-size:34/@r;
    font-family:"微软雅黑";
    line-height:50/@r;
    color: #000;
  }

  .scheduleTitle span > * {
    float: left;
  }

  .scheduleTitle span > .car {
    width: 30/@r;
    height: 24/@r;
    margin: 0 10/@r;
    background: url("../../assets/img/productChara/carIcon1.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 14/@r;
  }

  .scheduleTitle span > .plane {
    width: 40/@r;
    height: 20/@r;
    background: url("../../assets/img/productChara/planeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 10/@r;
    margin-top: 15/@r;
  }

  .scheduleTitle span > .train {
    width: 30/@r;
    height: 30/@r;
    background: url("../../assets/img/productChara/trainIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 10/@r;
    margin-top: 10/@r;
  }

  .scheduleTitle span > .ship {
    width: 30/@r;
    height: 30/@r;
    background: url("../../assets/img/productChara/shipIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 10/@r;
    margin-top: 10/@r;
  }

  .scheduleDetails {
    padding: 24/@r 30/@r 0 20/@r;
  }

  .scheduleDetails > div {
    position: relative;
    padding-left: 34/@r;
    margin-left: 27/@r;
    border-left: 2/@r solid #117db5;
    padding-bottom: 40/@r;
  }

  .scheduleDetails > div > i {
    position: absolute;
    left: -19/@r;
    top: 0;
    width: 35/@r;
    height: 35/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .scheduleDetails > div > div > i {
    position: absolute;
    left: -19/@r;
    top: 0;
    width: 35/@r;
    height: 35/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .scheduleDetails .title {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:1;
    color: #000;
    display: block;
  }

  .scheduleDetails .title > * {
    float: left;
  }

  .havingDinner .title:last-of-type {
    /*margin-top: 16/@r;*/
  }

  .traffic > i {
    background: url("../../assets/img/productChara/carIcon2.png") no-repeat;
  }

  .traffic .title em {
    width: 26/@r;
    height: 21/@r;
    background: url("../../assets/img/productChara/carIcon3.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 7/@r 7/@r 0;
  }

  .useTime {
    color: #808080;
    margin-top: 5/@r;
    font: 23/@r/61/@r "微软雅黑";
  }

  .useTime > span {
    float: left;
    margin-right: 35/@r;
  }

  .scheduleList p {
    font-size:24/@r;
    font-family:"微软雅黑";
    line-height:30/@r;
    color: #000;
  }

  .scheduleList > li {
    margin-top: 20/@r;
  }

  .reminder > .title {
    margin-bottom: 24/@r;
  }

  .reminder > i {
    background: url("../../assets/img/productChara/promptIcon.png") no-repeat;
  }

  .trafficImage {
    font-size:20/@r;
    font-family:"微软雅黑";
    line-height:2;
  }

  .trafficImage img {
    width: 100%;
    height: 180/@r;
  }

  .trafficImage > div {
    float: left;
    margin-right: 6%;
    width: 47%;
    margin-top: 20/@r;
    position: relative;
    /*height: 180/@r;*/
  }

  .trafficImage > div:nth-of-type(2n) {
    margin-right: 0;
  }

  .trafficImage > div > span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, .5);
    text-align: center;
    color: #fff;
  }

  .havingDinner > i {
    background: url("../../assets/img/productChara/eatMeal.png") no-repeat;
  }

  .scenicSpot > i {
    background: url("../../assets/img/productChara/scenicIcon.png") no-repeat;
  }

  .accommodation > i {
    background: url("../../assets/img/productChara/hotelIcon.png") no-repeat;
  }

  .accommodation .title > span:first-of-type {
    display: block;
  }

  .accommodation .title > span:last-of-type {
    display: block;
    padding-left: 100/@r;
    line-height: 36/@r;
  }

  .hptelList strong {
    display: block;
    color: #117db5;
    font-size:22/@r;
    font-family:"微软雅黑";
    line-height:2;
    margin-top: 10/@r;
  }

  .hptelList strong em {
    color: #808080;
    margin-right: 10/@r;
  }

  .hotelDetails {
    width: 100%;
    border: 1/@r dashed #808080;
    margin-top: 10/@r;
    padding: 20/@r;
  }

  .hotelDetails > div {
    float: left;
    width: 100%;
    font-size:22/@r;
    font-family:"微软雅黑";
    line-height:2;
    color: #9e9e9e;
  }

  .hotelDetails span {
    float: left;
    margin-right: 10/@r;
    width: 110/@r;
  }

  .hotelDetails em {
    float: left;
    width: 450/@r;
  }

  .dinner > i {
    background: url("../../assets/img/productChara/eatMeal.png") no-repeat;
    left: -17/@r;
  }

  .scheduleDetails .dinner,
  .scheduleDetails .remarks {
    border-left: none;
  }

  .scheduleDetails .remarks {
    padding-left: 0;
    margin-left: 0;
  }

  .remarks > strong {
    display: block;
    font-size:32/@r;
    font-family:"微软雅黑";
    line-height:1;
    text-align: center;
    margin-bottom: 55/@r;
  }

  .remarksContent {
    color: #666;
    font-size:23/@r;
    font-family:"微软雅黑";
    line-height:30/@r;
  }

  .remarksContent > p {
    margin-top: 10/@r;
  }
</style>
