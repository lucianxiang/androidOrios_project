<template>
  <div>
    <header>
      <div class="back" @click="goBack"><i></i></div>
      <strong>{{orderName}}</strong>
      <div class="rightMenu" v-show="!hotelOrderInfoObj.ht_or_PayState">
        <i @click.stop="showMenuBtn"></i>
        <div v-show="showMenu">
          <a href="javascript:;" @click.stop="cancelHotelOrder">取消订单</a>
        </div>
      </div>
    </header>
    <section>
      <div class="orderNum clearfix" :class="{active: !hotelOrderInfoObj.ht_or_PayState}">
        <strong>订单号：{{hotelOrderInfoObj.ht_or_OrderID}}</strong>
        <span>{{hotelOrderInfoObj.ht_or_PayWay ? hotelOrderInfoObj.ht_or_PayWay : "未支付"}}</span>
      </div>
      <!--下单信息-->
      <div class="orderInfo clearfix">
        <i></i>
        <div class="orderInfoContent">
          <div>
            <strong>下单信息</strong>
            <span class="clearfix"><strong>房型：</strong><span><em>{{hotelOrderInfoObj.ht_or_GoodsListName}}</em></span></span>
            <span class="clearfix"><strong>入住日期：</strong><span><em>{{hotelOrderInfoObj.ht_or_InDate}}</em></span></span>
            <span
              class="clearfix"><strong>离店日期：</strong><span><em>{{hotelOrderInfoObj.ht_or_OutDate}}</em></span></span>
            <span
              class="clearfix"><strong>出单状态：</strong><span><em>{{hotelOrderInfoObj.ht_or_OutStatus | getOutStatus}}</em></span></span>
            <span
              class="clearfix"><strong>凭证码：</strong><span><em>{{hotelOrderInfoObj.ht_or_Password}}</em></span></span>
            <span
              class="clearfix"><strong>订单支付码：</strong><span><em>{{hotelOrderInfoObj.ht_or_PayParam}}</em></span></span>
            <span class="clearfix"><strong>订单状态：</strong><span><em>{{hotelOrderInfoObj.ht_or_PayState | getTicketStatus}}</em></span></span>
            <span class="clearfix"><strong>发起订单时间：</strong><span><em>{{hotelOrderInfoObj.ht_or_CreateTime}}</em></span></span>
            <span
              class="clearfix"><strong>订单支付时间：</strong><span><em>{{hotelOrderInfoObj.ht_or_PayTime}}</em></span></span>
            <span class="clearfix"><strong>支付方式：</strong><span><em>{{hotelOrderInfoObj.ht_or_PayWay}}</em></span></span>
            <span
              class="clearfix"><strong>总金额：</strong><span><em>{{hotelOrderInfoObj.ht_or_SumPrice}}元</em></span></span>
            <span
              class="clearfix"><strong>总的网售手续费：</strong><span><em>{{hotelOrderInfoObj.ht_or_SumService}}元</em></span></span>
            <span
              class="clearfix"><strong>总间数：</strong><span><em>{{hotelOrderInfoObj.ht_or_TicketCount}}间</em></span></span>
            <span
              class="clearfix"><strong>商户编码：</strong><span><em>{{hotelOrderInfoObj.ht_or_TouristTraderID}}</em></span></span>
            <span
              class="clearfix"><strong>商户名称：</strong><span><em>{{hotelOrderInfoObj.ht_or_TouristTraderName}}</em></span></span>
            <span class="clearfix"><strong>使用状态：</strong><span><em>{{hotelOrderInfoObj.ht_or_UseState | useStatus}}</em></span></span>
            <span class="clearfix"><strong>是否结算：</strong><span><em>{{hotelOrderInfoObj.ts_to_IsBalance | settlementState}}</em></span></span>
            <span class="clearfix"><strong>备注：</strong><span><em>{{hotelOrderInfoObj.ts_to_Remark}}</em></span></span>
            <span class="clearfix"><strong>停车位：</strong><span><em>{{hotelOrderInfoObj.ht_or_CarSeats}}位</em></span></span>
            <!--<span class="clearfix"><strong>门牌号：</strong><span><em>{{hotelOrderInfoObj.ts_to_HouseNumber | getHouseNumber}}</em></span></span>-->
          </div>
        </div>
      </div>
      <!--订单联系人-->
      <div class="orderContacts clearfix">
        <i></i>
        <div class="orderInfoContent orderContactsContent">
          <div>
            <strong>订单联系人</strong>
            <!--<span class="clearfix"><strong>用户编码：</strong><span><em>{{hotelOrderInfoObj.ht_or_UserID}}</em></span></span>-->
            <span
              class="clearfix"><strong>订单联系人姓名：</strong><span><em>{{hotelOrderInfoObj.ht_or_UserName}}</em></span></span>
            <span class="clearfix"><strong>邮箱：</strong><span><em>{{hotelOrderInfoObj.ht_od_Email}}</em></span></span>
            <span class="clearfix"><strong>手机号：</strong><span><em>{{hotelOrderInfoObj.ht_od_Phone}}</em></span></span>
          </div>
        </div>
      </div>

      <!--房间-->
      <div class="orderContacts clearfix" v-for="item,index in hotelOrderInfoObj.orderDetailList">
        <i></i>
        <div class="orderInfoContent orderContactsContent">
          <div>
            <strong>房间{{index+1}} <span style="float: right;" @click.stop="callService(item)" v-show="item.ht_od_UseStatus==3">客房服务</span></strong>
            <span
              class="clearfix"><strong>房型：</strong><span><em>{{item.ht_od_GoodsListName}}</em></span></span>
            <span class="clearfix"><strong>房间号：</strong><span><em>{{item.ht_od_BuildNo}}栋{{item.ht_od_LevelNo}}楼{{item.ht_od_RoomID}}号</em></span></span>
            <span class="clearfix"><strong>房价：</strong><span><em>{{item.ht_od_SellPrice}}元</em></span></span>
            <span class="clearfix"><strong>入住状态：</strong><span><em>{{item.ht_od_UseStatus | getUseStatus}}</em></span></span>
          </div>
        </div>
      </div>
      <!--订单总价-->
      <div class="orderAllMoney clearfix">
        <strong>订单总价</strong>
        <span>￥{{hotelOrderInfoObj.ht_or_SumPrice}}.00</span>
      </div>
      <a href="javascript:;" v-show="!hotelOrderInfoObj.ht_or_PayState" @click="goPay">去支付</a>
      <!--<a href="javascript:;" @click.stop="callService">客服服务</a>-->
    </section>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>

    <!--客房服务-->
    <div v-transfer-dom>
      <popup v-model="isReceipt" height="270px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
          <group>
            <x-input title="呼叫内容" placeholder="请输入呼叫内容" novalidate  :show-clear="false"  placeholder-align="right" v-model="callOptions.data.ht_ci_Content"></x-input>
          </group>
          <div style="padding:20px 15px;">
            <x-button type="primary" @click.native="determine">确定</x-button>
            <x-button @click.native="isReceipt = false">取消</x-button>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast,TransferDom,Popup,Group,XInput,XButton} from 'vux'

  export default {
    components: {
      Toast,
      Popup,
      Group,
      XInput,
      XButton
    },
    directives: {
      TransferDom
    },
    computed: mapGetters([
      'hotelOrderInfoObj'
    ]),
    data() {
      return {
        //用户呼叫
        callOptions:{
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ht_ci_Caller": "",//呼叫员电话号码
            "ht_ci_Content": "",//呼叫内容
            "ht_ci_HotelID": '',//酒店编码
            "ht_ci_Remark": "",//备注
          }
        },
        isReceipt:false,//客房服务
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
        this.callOptions.data.ht_ci_Caller = this.userInfo.sm_ui_Phone
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
      //呼叫确认
      determine(){
        if(this.callOptions.data.ht_ci_Content==''){
          this.showErr = true;
          this.errCon = '请输入呼叫内容!';
          return
        }
        this.$store.dispatch('callDetermine',this.callOptions)
        .then(res=>{
          this.$vux.toast.show({
            text:res
          })
          this.isReceipt = false
        },err=>{
          this.showErr = true;
          this.errCon = err;
        }).catch(err=>{
          this.showErr = true;
          this.errCon = err;
        })
      },
      //呼叫服务
      callService(obj){
        this.callOptions.data.ht_ci_HotelID = obj.ht_od_HotelID
        this.isReceipt = true;
      },
      goBack() {
        this.$router.go(-1)
      },
      initData() {
        let selectOrderDetailInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "操作员编码",
          "operateUserName": "操作员名称",
          "pcName": "",
          "ht_or_UserID": this.userInfo.sm_ui_ID,
          "ht_or_TouristTraderID": "",
          "ht_or_UseState": "",
          "ht_or_OrderID": this.orderId ? this.orderId : '',
          "token": this.userInfo.token ? this.userInfo.token : ''
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('initHotelOrderInfo', selectOrderDetailInfo)
          .then((data) => {
            this.$store.commit('hideLoading')
            if(!data.length){
              this.$router.go(-1)
            }

          }, err => {
            this.$store.commit('hideLoading')
            this.showErr = true;
            this.errCon = err;
          })
      },
      goPay() {
        this.$router.push({name: 'PayOrder', query: {type: 4}})
      },
      showMenuBtn() {
        this.showMenu = true;
      },
      cancelHotelOrder() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "ht_or_OrderID": this.orderId ? this.orderId : '',//订单ID
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('cancelHotelOrder', options)
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
  .orderInfoContent div > strong>span{
    float: right;
    cursor: pointer;
    background-color:#00c79c;
    font-size:25/@r;
    color: #ffffff;
    padding: 0 5px;
    border-radius: 5px;
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
