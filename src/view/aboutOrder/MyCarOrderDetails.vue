<template>
  <div>
    <div id="wrap">
      <header>
        <div class="leftIcon" @click="goTopPage"></div>
        <strong>{{orderName ? orderName : ''}}</strong>
        <div class="rightMenu">
          <i @click.stop="showMenuBtn"></i>
          <div v-show="showMenu">
            <a href="javascript:;" @click.stop="cancelFoodOrder">取消订单</a>
          </div>
        </div>
      </header>
      <section>
        <div class="orderId clearfix">
          <strong>订单号：{{orderId}}</strong>
          <span>{{carOrderDetailsObj.cr_cro_PlayType ? carOrderDetailsObj.cr_cro_PlayType : '未支付'}}</span>
        </div>
        <!--下单信息-->
        <div class="orderInfo clearfix">
          <div class="orderInfoIcon"></div>
          <div class="orderInfoContentBox">
            <div class="orderInfoContent">
              <strong>下单信息</strong>
              <div class="orderInfoList">
                <span>下单时间：{{carOrderDetailsObj.cr_cro_CreateTime}}</span>
                <span>车辆租凭价格：￥{{carOrderDetailsObj.cr_cro_CarRentalFee}}</span>
                <span>免赔险：￥{{carOrderDetailsObj.cr_cro_DeductibleInsurance}}</span>
                <span>第三方责任险：￥{{carOrderDetailsObj.cr_cro_ThirdPartyInsurance}}</span>
                <span>手续费：￥{{carOrderDetailsObj.cr_cro_ServiceCharge}}</span>
                <span>保险费：￥{{carOrderDetailsObj.cr_cro_Insurance}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--订单联系人-->
        <div class="orderInfo clearfix">
          <div class="orderPeopleIcon"></div>
          <div class="orderInfoContentBox">
            <div class="orderInfoContent">
              <strong>订单联系人</strong>
              <div class="orderInfoList">
                <span>联系人：{{carOrderDetailsObj.cr_cro_DriverName}}</span>
                <span>手机号：{{carOrderDetailsObj.cr_cro_Phone}}</span>
                <span>身份证号：{{carOrderDetailsObj.cr_cro_IDCode}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--订单总价-->
        <div class="orderAllMoney clearfix">
          <strong>订单总价</strong>
          <span>￥{{carOrderDetailsObj.cr_cro_TotalPrice}}.00</span>
        </div>
        <a href="javascript:;"
           v-show="carOrderDetailsObj.cr_cro_PlayStatus === 0"
           @click="goPayOrder"
        >立即支付</a>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'carOrderDetailsObj'
    ]),
    data() {
      return {
        orderId: '',
        userInfo: {},
        orderName: '',
        showMenu: false,
      }
    },
    created() {
      if (this.$route.query.id) {
        this.orderId = this.$route.query.id;
      }
      if (this.$route.query.name) {
        this.orderName = this.$route.query.name;
      }
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initData();

    },
    methods: {
      //返回上一页
      goTopPage() {
        this.$router.go(-1)
      },
      showMenuBtn() {
        this.showMenu = true;
      },
      //初始化订单详情
      initData() {
        let CarRentalSelectOrderInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          //"cr_cro_Id": "1",//订单编号
          "cr_cro_OrderId": this.orderId,//订单号
          //"cr_cro_UserCode": "1",//用户编号
          //"cr_cro_PassWord": "1",//凭证码
          //"cr_cro_AgentId": "1",//供应商编号
        }
        this.$store.dispatch('initCarOrderDetails', CarRentalSelectOrderInfo)
          .then(() => {
          }, err => {

          })

      },
      //取消订单
      cancelFoodOrder() {

      },
      //去支付订单
      goPayOrder(){
        this.$router.push({name: 'PayOrder',query:{type: 5}})
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
    width: 100%;
    height: 92/@r;
    background-color: #f9f9f9;
    z-index: 2;
  }

  header .leftIcon {
    float: left;
    width: 19/@r;
    height: 35/@r;
    background: url('../../assets/img/ticket/leftIcon2.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 30/@r 0 0 30/@r;
  }

  header strong {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
    font-size: 30/@r;
    line-height: 92/@r;
    font-family: "微软雅黑";
    color: #353434;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .rightMenu {
    float: right;
    position: relative;
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

  section {
    position: fixed;
    top: 92/@r;
    left: 0;
    right: 0;
    bottom: 88/@r;
    overflow: auto;
    background-color: #f9f9f9;
    padding: 0 20/@r 20/@r;
  }

  section > div {
    background-color: #fff;
    margin-bottom: 20/@r;
    padding: 6/@r 20/@r 16/@r;
  }

  section > div:last-of-type,
  section > div:first-of-type {
    padding-bottom: 0;
  }

  .orderId {
    font-size: 28/@r;
    line-height: 67/@r;
    font-family: "微软雅黑";
    color: #b6b8b7;
  }

  .orderId strong {
    float: left;
  }

  .orderId span {
    float: right;
  }

  .orderInfoIcon {
    float: left;
    width: 36/@r;
    height: 42/@r;
    background: url("../../assets/img/order/placeOrder.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 24/@r;
  }

  .orderInfoContentBox {
    overflow: hidden;
  }

  .orderInfoContent {
    float: left;
    margin-left: 35/@r;
    width: 100%;
  }

  .orderInfoContent > strong {
    font-size: 30/@r;
    line-height: 78/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    color: #353434;
    display: block;
    border-bottom: 1/@r dashed #cdcdcd;
    margin-bottom: 10/@r;
  }

  .orderInfoList > span {
    display: block;
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    color: #555554;
    padding-right: 35/@r;
  }

  .roomInfoIcon {
    float: left;
    width: 43/@r;
    height: 43/@r;
    background: url("../../assets/img/order/roomIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 23/@r;
  }

  .roomInfoList > span > em {
    float: right;
  }

  .productInfoIcon {
    float: left;
    width: 48/@r;
    height: 42/@r;
    background: url("../../assets/img/order/dishesIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 27/@r;
  }

  .productInfoList .productName {
    float: left;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .productInfoList .productNum {
    float: left;
    width: 20%;
    text-align: center;
  }

  .productInfoList .productMoney {
    float: left;
    width: 30%;
    text-align: right;
  }

  .orderAllMoney {
    font-size: 30/@r;
    line-height: 3;
    font-family: "微软雅黑";
    font-weight: bold;
  }

  .orderAllMoney strong {
    float: left;
    color: #353434;
  }

  .orderAllMoney span {
    float: right;
    color: #ff9900;
  }

  section > a {
    position: fixed;
    bottom: 0;
    left: 30/@r;
    right: 30/@r;
    background-color: #f90;
    font-size: 32/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #fff;
    text-align: center;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
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

  .orderPeopleIcon {
    float: left;
    width: 32/@r;
    height: 36/@r;
    background: url("../../assets/img/order/carPeopleIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 22/@r;
  }

</style>
