<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>{{roomInfo.RoomInfo.ht_bt_RoomName}}</strong>
    </header>
    <section>
      <div class="sowingMap" @click="lookBigPicture">
        <swiper auto height="200px" v-model="swIndex">
          <swiper-item class="black" v-for="item,index in roomInfo.RoomInfo.imgList" :key="index"><img
            class="swiperImage" v-lazy="item" alt="">
          </swiper-item>
        </swiper>
        <p>{{swIndex + 1}}/{{roomInfo.RoomInfo.imgList.length}}</p>
      </div>
      <ul class="roomInfo clearfix">
        <li><strong>床型: </strong>
          <div><span>单人床1.1米x2</span></div>
        </li>
        <li><strong>楼层: </strong>
          <div><span>{{roomInfo.RoomInfo.ht_bt_Level}}</span></div>
        </li>
        <li><strong>无烟房: </strong>
          <div><span>{{roomInfo.RoomInfo.ht_bt_Smoke}}</span></div>
        </li>
        <li><strong>面积: </strong>
          <div><span>{{roomInfo.RoomInfo.ht_bt_Area}}m²</span></div>
        </li>
        <li><strong>加床: </strong>
          <div><span>{{roomInfo.RoomInfo.ht_bt_AddBed}}</span></div>
        </li>
      </ul>
      <div class="clearfix aboutRoom" v-for="item,index in roomInfo.RoomTypeHardList">
        <strong>{{item.ht_rh_RoomHardTypeName}}:</strong>
        <div>
          <span><em v-for="ite,index in item.SubArray">{{ite.ht_rth_RoomHardName}},</em></span>
        </div>
      </div>
      <p>部分设备在部分房型中提供</p>
    </section>
    <div class="reserve">
      <strong>￥<em>{{roomInfo.price}}</em>起</strong>
      <a href="javascript:;" @click="goReserve">去预定</a>
    </div>

    <div class="roomListWrap" @click="goReserve" v-show="showRoomInfo">
      <ul class="roomTypeList">
        <li class="clearfix" @click.stop="clickWhite" v-for="item,index in roomInfo.RoomProductPriceList">
          <div class="roomDetails">
            <strong>{{item.ht_rpp_Name}}</strong>
            <span>{{item.ht_rpp_BreakfastType + ' ' + item.ht_rpp_BedType + ' ' + item.ht_rpp_WafiType}}</span>
            <em>超值价</em>
          </div>
          <div class="roomPriceWrap">
            <div class="roomPrice clearfix">
              <span @click="goFillOrder(item,index)">
                <strong :class="{active: item.orderState}">{{item.orderState ? '订完' : '订'}}</strong>
                <span>在线付</span>
              </span>
              <strong>
                <span>￥<em>{{item.ht_rpp_ProductPrice}}</em></span>起
              </strong>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ImagePreview v-model="showImageList" :data="roomInfo.RoomInfo.imgList"></ImagePreview>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Swiper, SwiperItem, Toast} from 'vux'
  import ImagePreview from '@/components/ImagePreview'

  export default {
    components: {
      Swiper,
      SwiperItem,
      Toast,
      ImagePreview
    },
    computed: mapGetters([
      'roomInfo'
    ]),
    data() {
      return {
        text: '订',
        swIndex: 0,
        showRoomInfo: false,
        token: '',
        showErr: false,
        errCon: '',
        showImageList: false,
        imageList: [],
      }
    },
    created() {
      let user = JSON.parse(localStorage.getItem('userInfo'));
      if (user) {
        this.token = user.token
      }

    },
    methods: {
      lookBigPicture() {
        this.showImageList = true;
      },
      goTopPage() {
        this.$router.go(-1);
      },
      clickWhite() {
      },
      goReserve() {
        if (!this.token) {
          this.showErr = true;
          this.errCon = '请先登录';
          this.$router.push({name: 'UserLogin'});
          return
        }
        this.showRoomInfo = !this.showRoomInfo;
      },
      goFillOrder(item, index) {
        if (item.orderState) {
          return
        }
        let obj = {
          hotelInfo: this.roomInfo.hotelInfo,
          roomType: this.roomInfo.RoomInfo,
          roomInfo: item,
          inTime: this.roomInfo.inTime,
          outTime: this.roomInfo.outTime,
          days: this.roomInfo.days
        }
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.token,
          "ht_rpp_ID": item.ht_rpp_ID,
          "inDate": this.roomInfo.inTime,
          "outDate": this.roomInfo.outTime
        }
        this.$store.dispatch('initHotelRoomNum', options)
          .then(num => {
            if (num <= 0) {
              this.$store.commit('UpdateRoomProductPriceList', index)
            } else {
              this.$store.commit('hotelOrderInfo', obj)
              this.$router.push({name: 'HotelFillOrder'})
            }
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .swiperImage {
    width: 100%;
    height: 100%;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 88/@r;
  }

  .leftIcon {
    float: left;
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/hotel/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 25/@r 0 0 30/@r;
  }

  header > strong {
    position: absolute;
    top: 22/@r;
    font-size: 34/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    color: #000;
    left: 50%;
    transform: translateX(-50%);
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 88/@r;
    overflow: auto;
    background-color: #fff;
  }

  .sowingMap {
    position: relative;
  }

  .sowingMap > p {
    position: absolute;
    bottom: 20/@r;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    background-color: rgba(0, 0, 0, .8);
    font-size: 30/@r;
    line-height: 50/@r;
    padding: 0 20/@r;
    -webkit-border-radius: 25/@r;
    -moz-border-radius: 25/@r;
    border-radius: 25/@r;
    color: #fff;
    font-family: "微软雅黑";
  }

  .roomInfo {
    padding: 30/@r;
    font-size: 28/@r;
    color: #666;
    border-bottom: 20/@r solid #f1f1f1;
    margin-bottom: 30/@r;
  }

  .roomInfo > li {
    float: left;
    width: 50%;
    line-height: 35/@r;
    font-family: "微软雅黑";
    padding: 20/@r 10/@r 0 0;
  }

  .roomInfo > li strong {
    color: #333;
    font-weight: bold;
    height: 100%;
    float: left;
    margin-right: 10/@r;
  }

  .roomInfo div {
    overflow: hidden;
  }

  .roomInfo span {
    float: left;
    width: 100%;
  }

  .aboutRoom {
    margin: 0 30/@r;
    padding: 10/@r 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .aboutRoom > strong {
    float: left;
    width: 200/@r;
    font-size: 28/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #333;
  }

  .aboutRoom > div {
    overflow: hidden;
  }

  .aboutRoom span {
    float: left;
    width: 100%;
    font-size: 28/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #666;
  }

  .aboutRoom em {
    line-height: 40/@r;
    margin-right: 10/@r;
  }

  section > p {
    font-size: 28/@r;
    line-height: 2.5;
    text-align: center;
    background-color: #f1f1f1;
    color: #ff7261;
    margin-top: 30/@r;
  }

  .reserve {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 88/@r;
    font-family: "微软雅黑";
  }

  .reserve strong {
    float: left;
    background-color: #fff;
    width: 50%;
    text-align: center;
    color: #f80;
    font-size: 23/@r;
    line-height: 88/@r;
  }

  .reserve em {
    font-size: 35/@r;
    line-height: 88/@r;
  }

  .reserve a {
    float: left;
    background-color: #e25959;
    width: 50%;
    text-align: center;
    line-height: 88/@r;
    color: #fff;
    font-size: 28/@r;
  }

  .roomListWrap {
    position: fixed;
    background-color: rgba(0, 0, 0, .7);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .roomTypeList {
    background-color: #f7f5f5;
    position: absolute;
    top: 50%;
    left: 0;
    width: 90%;
    max-height: 90%;
    transform: translate(5%, -50%);
    overflow: auto;
    -webkit-border-radius: 20/@r;
    -moz-border-radius: 20/@r;
    border-radius: 20/@r;
  }

  .roomTypeList > li {
    padding: 20/@r 30/@r;
    border-bottom: 1/@r solid #e3e1e1;
  }

  .roomTypeList > li:last-of-type {
    border-bottom: none;
  }

  .roomDetails {
    float: left;
    width: 60%;
  }

  .roomDetails strong {
    display: block;
    font-size: 32/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    padding-top: 10/@r;
    color: #000000;
  }

  .roomDetails span {
    display: block;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    padding: 7/@r 0;
    color: #6b6b6b;
  }

  .roomDetails em {
    margin-top: 10/@r;
    font-size: 23/@r;
    line-height: 28/@r;
    font-family: "微软雅黑";
    background-color: #fb6a64;
    color: #fff;
    padding: 0 5/@r;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .roomPriceWrap {
    overflow: hidden;
    margin-top: 10/@r;
  }

  .roomPrice {
    float: left;
    width: 100%;
    text-align: right;
  }

  .roomPrice .active {
    background-color: #ccc;
    color: #fff;
  }

  .roomPrice > span > strong {
    display: block;
    font-size: 28/@r;
    line-height: 54/@r;
    font-family: "微软雅黑";
    background-color: #fb6a64;
    color: #fff;
    text-align: center;
  }

  .roomPrice > span {
    width: 85/@r;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    display: inline-block;
    overflow: hidden;
    background-color: #fff;
  }

  .roomPrice > span > span {
    font-size: 25/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #fb6a64;
    display: block;
  }

  .roomPrice > strong {
    display: block;
    width: 100%;
  }

  .roomPrice > strong > span {
    color: #dd2b15;
  }

  .roomPrice > strong em {
    font-size: 33/@r;
    font-family: "微软雅黑";
  }


</style>
