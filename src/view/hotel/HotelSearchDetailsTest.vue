<template>
  <div>
    <header class="clearfix">
      <div class="returnIcon" @click="goTopPage"></div>
      <div class="searchBox">
        <div class="selectDate">
          <span><i>入</i><em>{{timeObj.inTime}}</em></span>
          <span><i>离</i><em>{{timeObj.outTime}}</em></span>
        </div>
        <input type="text" placeholder="酒店名" v-model="hotelName">
      </div>
    </header>
    <section>
      <scroller
        :on-infinite="infinite"
        ref="my_scroller"
        refresh-layer-color="#4b8bf4"
        loading-layer-color="#ec4949"
      >

        <ul class="HotelData">
          <li class="clearfix" v-for="item,index in hotelList" @click="goHotelDetails(item.ht_ht_hotelID)">
            <img v-lazy="item.showImage" alt="">
            <div class="hotelDetails">
              <strong>{{item.ht_ht_HotelName}}</strong>
              <span class="aboutHotel clearfix">
              <span>4.3分</span><em>440条点评</em>
            </span>
              <span class="hotelActive clearfix">
              <span>促</span>
              <em>可返</em>
            </span>
              <p>{{item.ht_ht_HotelAddress}}</p>
            </div>
            <div class="priceAndPosition">
              <span class="startPrice"><span>￥<em>{{item.ht_ht_RecommendPrice}}</em></span><em>起</em></span>
              <span class="address">东门</span>
            </div>
          </li>
        </ul>
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
    <!--筛选导航-->
    <div class="screenBox clearfix">
      <a href="javascript:;" class="screen">
        <i></i>
        <span>筛选</span>
      </a>
      <a href="javascript:;" class="positionRegion">
        <i></i>
        <span>位置区域</span>
      </a>
      <a href="javascript:;" class="priceAndStar">
        <i></i>
        <span>价格/星级</span>
      </a>
      <a href="javascript:;" class="recomOrder">
        <i></i>
        <span>推荐排序</span>
      </a>
    </div>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    components: {
      Toast
    },
    computed: mapGetters([
      'hotelList'
    ]),
    data() {
      return {
        hotelSearchObj: {},
        hotelName: '',
        rowsNum: 10,
        showErr: false,
        errCon: '',
        timeObj: {},
      }
    },
    created() {
      if (sessionStorage.getItem('hotelSearchObj')) {
        this.hotelSearchObj = JSON.parse(sessionStorage.getItem('hotelSearchObj'));
      }
      if (sessionStorage.getItem('timeObj')) {
        this.timeObj = JSON.parse(sessionStorage.getItem('timeObj'));
      }
    },
    methods: {
      goHotelDetails(id){
        this.$router.push({name: 'HotelDetails',params:{id:id}})
      },
      goTopPage() {
        this.$router.go(-1)
      },
      initData(num) {
        console.log(111,this.hotelSearchObj)
        return
        let HotelSearchInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ht_it_ID": this.hotelSearchObj.hotelTypeObj.ht_it_ID ? this.hotelSearchObj.hotelTypeObj.ht_it_ID : '',//推荐类型
          "ht_tt_ID": "",//主题
//          "ht_hd_ID":"",//设施
//          "ht_rh_ID": "",//房间设施
          "ht_ht_HotelName": this.hotelName ? this.hotelName : '',//模糊搜索酒店名称
          "ht_ht_HotelAddress": this.hotelSearchObj.searchAddress ? this.hotelSearchObj.searchAddress : '',//模糊搜索酒店地址
          "ht_ht_Stars": this.hotelSearchObj.hotelType.value ? this.hotelSearchObj.hotelType.value : '',//酒店星级
//          "sm_af_AreaID": "", //城市
          "page": "1", //页面编号  默认为 1
          "rows": num ? num : 10,//单页显示数据数量
        };
        // console.log(111,this.hotelSearchObj)
        this.$store.commit('showLoading')
        return this.$store.dispatch('initHotelList', HotelSearchInfo)
      },
      //下拉加载
      infinite(done) {
        this.rowsNum += 5;
        this.initData(this.rowsNum)
          .then((total) => {
            done(true)
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      goHotelDetails(id){
        this.$router.push({name: 'HotelDetails',params:{id:id}})
      }
    },
    mounted() {
      document.onkeydown = (e) => {
        var e = event || e;
        if (e.keyCode == 13) {
          this.initData(this.rowsNum)
        }
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #f0f0f0;
    height: 88/@r;
    padding: 16/@r 30/@r;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .returnIcon {
    float: left;
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/hotel/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 9/@r 33/@r 0 0;
  }

  .searchBox {
    float: left;
    height: 100%;
    position: relative;
    width: 636/@r;
    padding-left: 140/@r;
    background-color: #fff;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .selectDate {
    position: absolute;
    left: 0;
    top: 0;
    width: 100/@r;
    font-size: 18/@r;
    line-height: 22/@r;
    font-family: "微软雅黑";
    top: 5/@r;
    left: 15/@r;
  }

  .selectDate:before {
    content: '';
    position: absolute;
    width: 20/@r;
    height: 11/@r;
    background: url("../../assets/img/ticket/down.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    top: 20/@r;
    right: 0;
  }

  .selectDate em {
    color: #33bd61;
  }

  .selectDate i {
    color: #333;
  }

  .selectDate > span {
    display: block;
  }

  .searchBox input {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 25/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    color: #333333;
  }

  section {
    background-color: #fff;
    padding-top: 32/@r;
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 96/@r;
    overflow: auto;
  }

  .HotelData img {
    width: 184/@r;
    height: 200/@r;
    float: left;
    margin-right: 20/@r;
  }

  .HotelData {
    border-top: 1/@r solid #f0f0f0;
  }

  .HotelData > li {
    padding: 0 30/@r 0 10/@r;
    border-bottom: 1/@r solid #f0f0f0;
  }

  .hotelDetails {
    float: left;
    width: 330/@r;
  }

  .hotelDetails > strong {
    display: block;
    font-size: 30/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    margin-top: 9/@r;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .aboutHotel {
    display: block;
  }

  .aboutHotel > span {
    float: left;
    color: #dd7015;
    font-size: 26/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
  }

  .aboutHotel > em {
    float: left;
    color: #999;
    font-size: 23/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    margin-left: 15/@r;
  }

  .hotelActive {
    display: block;
    font-size: 18/@r;
    line-height: 22/@r;
    font-family: "微软雅黑";
    margin-top: 11/@r;
  }

  .hotelActive span {
    float: left;
    color: #117db5;
    border: 1/@r solid #117db5;
    padding: 0 5/@r;
  }

  .hotelActive em {
    float: left;
    color: #dd7015;
    border: 1/@r solid #dd7015;
    padding: 0 5/@r;
    margin-left: 16/@r;
  }

  .hotelDetails > p {
    font-size: 23/@r;
    line-height: 1.3;
    font-family: "微软雅黑";
    color: #999999;
    margin-top: 5/@r;
  }

  .priceAndPosition {
    float: right;
    margin-top: 50/@r;
    font-size: 23/@r;
    line-height: 43/@r;
    font-family: "微软雅黑";
  }

  .startPrice {
    display: block;
    color: #262626;
  }

  .startPrice > span {
    color: #dd2b15;
  }

  .startPrice > span > em {
    font-size: 30/@r;
  }

  .address {
    display: block;
    color: #999;
    text-align: right;
    margin-top: 33/@r;
  }

  .screenBox {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fafafa;
    width: 100%;
    height: 96/@r;
    padding: 17/@r 0 12/@r 0;
  }

  .screenBox a {
    float: left;
    width: 25%;
    text-align: center;
    font-size: 23/@r;
    line-height: 33/@r;
    font-family: "微软雅黑";
    color: #b3b3b3;
  }

  .screenBox a span {
    display: block;
  }

  .screenBox a i {
    display: block;
    width: 34/@r;
    height: 34/@r;
    margin: 0 auto;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .screen i {
    background: url("../../assets/img/hotel/screen.png") no-repeat;
  }

  .positionRegion i {
    background: url("../../assets/img/hotel/position.png") no-repeat;
  }

  .priceAndStar i {
    background: url("../../assets/img/hotel/price.png") no-repeat;
  }

  .recomOrder i {
    background: url("../../assets/img/hotel/order.png") no-repeat;
  }

</style>
