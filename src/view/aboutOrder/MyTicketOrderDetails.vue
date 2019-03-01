<template>
  <div>
    <header>
      <div class="back" @click="goBack"><i></i></div>
      <strong>{{orderName}}</strong>
      <div class="rightMenu" v-show="!ticketOrderInfoObj.tm_or_PayState">
        <i @click.stop="showMenuBtn"></i>
        <div v-show="showMenu">
          <a href="javascript:;" @click.stop="cancelTicketOrder">取消订单</a>
        </div>
      </div>
    </header>
    <section>
      <div class="orderNum clearfix" :class="{active: !ticketOrderInfoObj.tm_or_PayState}">
        <strong>订单号：{{orderId}}</strong>
        <span>{{ticketOrderInfoObj.tm_or_PayWay ? ticketOrderInfoObj.tm_or_PayWay : '未支付'}}</span>
      </div>
      <!--下单信息-->
      <div class="orderInfo clearfix">
        <i></i>
        <div class="orderInfoContent">
          <div>
            <strong>订单信息</strong>
            <span class="clearfix"><strong>订单名称：</strong><span><em>{{ticketOrderInfoObj.tm_or_GoodsListName}}</em></span></span>
            <span class="clearfix"><strong>支付订单时间：</strong><span><em>{{ticketOrderInfoObj.tm_or_PayTime}}</em></span></span>
            <span class="clearfix"><strong>总的网售手续费：</strong><span><em>{{ticketOrderInfoObj.tm_or_SumService}}元</em></span></span>
            <span class="clearfix"><strong>总张数：</strong><span><em>{{ticketOrderInfoObj.tm_or_TicketCount}}张</em></span></span>
            <span class="clearfix"><strong>所属商户名称：</strong><span><em>{{ticketOrderInfoObj.tm_or_TradeInfoName}}</em></span></span>
            <span class="clearfix"><strong>游玩日期：</strong><span><em>{{ticketOrderInfoObj.tm_or_TravelDate}}</em></span></span>
            <span class="clearfix"><strong>使用状态：</strong><span><em>{{ticketOrderInfoObj.tm_or_UseState | useStatus}}</em></span></span>
            <span class="clearfix" v-show="ticketOrderInfoObj.tm_or_UseState"><strong>使用时间：</strong><span><em>{{ticketOrderInfoObj.tm_or_UseTime}}</em></span></span>
            <span class="clearfix"><strong>儿童价：</strong><span><em>{{ticketOrderInfoObj.tm_or_ChildPrice}}元</em></span></span>
            <span class="clearfix"><strong>全票价：</strong><span><em>{{ticketOrderInfoObj.tm_or_FullPrice}}元</em></span></span>
            <span class="clearfix"><strong>出票失败原因：</strong><span><em>{{ticketOrderInfoObj.tm_or_FailContent}}</em></span></span>
            <span class="clearfix"><strong>是否结算：</strong><span><em>{{ticketOrderInfoObj.tm_or_IsBalance | settlementState}}</em></span></span>
            <span class="clearfix"><strong>出票状态：</strong><span><em>{{ticketOrderInfoObj.tm_or_OutStatus | getOutStatus}}</em></span></span>
            <span class="clearfix"><strong>凭证码：</strong><span><em>{{ticketOrderInfoObj.tm_or_Password}}</em></span></span>
            <span class="clearfix"><strong>发起订单时间：</strong><span><em>{{ticketOrderInfoObj.tm_or_CreateTime}}</em></span></span>
            <span class="clearfix"><strong>备注：</strong><span><em>{{ticketOrderInfoObj.tm_or_Remark}}</em></span></span>
          </div>
        </div>
      </div>
      <!--订单联系人-->
      <div class="orderContacts clearfix">
        <i></i>
        <div class="orderInfoContent orderContactsContent">
          <div>
            <strong>订单联系人</strong>
            <span class="clearfix"><strong>订单人姓名：</strong><span><em>{{ticketOrderInfoObj.tm_or_ConnectName}}</em></span></span>
            <span class="clearfix"><strong>手机号：</strong><span><em>{{ticketOrderInfoObj.tm_or_TelePhone}}</em></span></span>
            <span class="clearfix"><strong>身份证号：</strong><span><em>{{ticketOrderInfoObj.tm_oc_CertNo}}</em></span></span>
          </div>
        </div>
      </div>
      <!--订单总价-->
      <div class="orderAllMoney clearfix">
        <strong>订单总价</strong>
        <span>￥{{ticketOrderInfoObj.tm_or_SumPrice}}.00</span>
      </div>
      <a href="javascript:;" @click="goPay" v-show="!ticketOrderInfoObj.tm_or_PayState">去支付</a>
    </section>
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
      'ticketOrderInfoObj'
    ]),
    data() {
      return {
        userInfo: {},
        orderId: '',
        orderName: '',
        showErr: false,
        errCon: '',
        showMenu: false,
      }
    },
    created() {
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      }
      if (this.$route.query.id) {
        this.orderId = this.$route.query.id;
      }
      if (this.$route.query.name) {
        this.orderName = this.$route.query.name;
      }
      this.initData()
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      initData() {
        let selectOrderDetailInfo = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "token": this.userInfo.token ? this.userInfo.token : '',
          "tm_or_UserID": this.userInfo.sm_ui_ID, //用户编码
          "tm_or_TourSiteCode": "", //景点编号
          "tm_or_TradeInfoID": "", //商户编码
          "tm_or_OrderID": this.orderId ? this.orderId : '', //订单号
          "tm_or_PayState": "", //支付状态(0未支付1已支付)
          "tm_or_IsBalance": "", //是否结算(0未结算1已结算)
          "tm_or_OutStatus": "", //出票状态(0出票中1出票成功2出票失败)
          "tm_or_UseState": "", //使用状态(0未使用1已使用2已退票)
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initTicketOrderInfo', selectOrderDetailInfo)
          .then(() => {
            console.log(this.ticketOrderInfoObj)
            this.$store.commit('hideLoading')
          }, err => {
            this.$store.commit('hideLoading')
            this.showErr = true;
            this.errCon = err;
          })
      },
      goPay() {
        this.$router.push({name: 'PayOrder', query: {type: 2}})
      },
      showMenuBtn() {
        this.showMenu = true;
      },
      cancelTicketOrder() {
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "token": this.userInfo.token ? this.userInfo.token : '',
          "orderID": this.orderId ? this.orderId : '',//订单ID
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('cancelTicketOrder', options)
          .then(() => {
            this.$store.commit('hideLoading')
            this.$router.go(-1);
          }, err => {
            this.$store.commit('hideLoading')
            this.showErr = true;
            this.errCon = err;
          })
      },
    },
    mounted() {
      document.addEventListener('click', () => {
        this.showMenu = false;
      })
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

  header {
    position: fixed;
    top: 0;
    left: 0;
    height: 88/@r;
    width: 100%;
    background-color: #f9f9f9;
    z-index: 2;
  }

  .back {
    position: absolute;
    padding: 20/@r;
    left: 10/@r;
    top: 6/@r;
  }

  .back i {
    display: block;
    background: url("../../assets/img/userCenter/leftIcon.png") no-repeat;
    width: 19/@r;
    height: 35/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  header strong {
    font-size: 30/@r;
    line-height: 88/@r;
    text-align: center;
    display: block;
    font-family: "微软雅黑";
    color: #353434;
  }

  section {
    position: fixed;
    top: 88/@r;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f9f9f9;
    padding: 4/@r 20/@r 100/@r;
  }

  section > div {
    background-color: #fff;
    padding: 20/@r 10/@r;
  }

  .orderNum > strong {
    float: left;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #b6b8b7;
  }

  .orderNum > span {
    float: right;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #b6b8b7;
  }

  .orderNum.active > strong {
    color: #333;
  }

  .orderNum.active > span {
    color: #f00;
  }

  .orderInfo {
    margin-top: 20/@r;
  }

  .orderInfo > i {
    float: left;
    width: 36/@r;
    height: 42/@r;
    background: url("../../assets/img/order/placeOrder.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 30/@r;
    margin-top: 15/@r;
  }

  .orderInfoContent {
    overflow: hidden;
  }

  .orderInfoContent > div {
    float: left;
    width: 100%;
  }

  .orderInfoContent div > strong {
    display: block;
    border-bottom: 1px dashed #cdcdcd;
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
    font-weight: bold;
    padding-bottom: 15/@r;
    margin-bottom: 15/@r;
  }

  .orderInfoContent div > span {
    display: block;
    color: #555554;
  }

  .orderInfoContent div > span > strong {
    float: left;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
  }

  .orderInfoContent div > span > span {
    overflow: hidden;
    display: block;
  }

  .orderInfoContent div > span > span > em {
    float: left;
    width: 100%;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
  }

  .orderContacts {
    margin-top: 20/@r;
  }

  .orderContacts > i {
    float: left;
    width: 32/@r;
    height: 36/@r;
    margin-right: 30/@r;
    margin-top: 15/@r;
    background: url("../../assets/img/order/peopleIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .orderAllMoney {
    margin-top: 20/@r;

  }

  .orderAllMoney > strong {
    float: left;
    font-size: 28/@r;
    line-height: 38/@r;
    font-family: "微软雅黑";
    color: #353434;
    font-weight: bold;
  }

  .orderAllMoney > span {
    float: right;
    font-size: 28/@r;
    line-height: 38/@r;
    font-family: "微软雅黑";
    color: #ff9900;
    font-weight: bold;
  }

  section > a {
    background-color: #f80;
    margin: 50/@r 20/@r 0;
    -webkit-border-radius: 20/@r;
    -moz-border-radius: 20/@r;
    border-radius: 20/@r;
    line-height: 100/@r;
    font-size: 30/@r;
    font-family: "微软雅黑";
    color: #fff;
    text-align: center;
  }

  .rightMenu {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 32/@r;
    margin-right: 30/@r;
  }

  .rightMenu i {
    display: block;
    width: 44/@r;
    height: 10/@r;
    background: url("../../assets/img/order/threePir2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .rightMenu > div {
    position: absolute;
    top: 30/@r;
    right: 0;
    width: 220/@r;
    text-align: center;
    font-size: 28/@r;
    line-height: 71/@r;
    font-family: "微软雅黑";
    background-color: #fff;
    box-shadow: 0 0 10/@r #ccc;
  }

  .rightMenu > div:before {
    content: '';
    width: 16/@r;
    height: 16/@r;
    position: absolute;
    background-color: #fff;
    top: -10/@r;
    right: 20/@r;
    border-top: 1/@r solid #ccc;
    border-right: 1/@r solid #ccc;
    transform: rotate(-45deg);
  }

  .rightMenu > div > a {
    color: #666;
  }


</style>
