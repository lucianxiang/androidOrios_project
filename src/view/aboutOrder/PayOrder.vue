<template>
  <div>
    <header>
      <div @click="goTopPage">
        <div></div>
        <strong>支付订单</strong>
      </div>
      <!--<span></span>-->
    </header>
    <section>
      <div class="payMoney">
        <strong>支付金额</strong>
        <span>¥ {{orderInfo.oi_SellMoney}}</span>
      </div>
      <div class="aboutOrder clearfix">
        <div>
          <strong>订单名：</strong>
          <div class="business">
            <span>{{orderInfo.oi_OrderName}}</span>
          </div>
        </div>
        <div>
          <strong>订单编号：</strong>
          <span>{{orderInfo.oi_OrderID}}</span>
        </div>
      </div>
      <div class="payOrder clearfix">
        <div
          v-for="item,index in payMode"
          :class="[
            index == payIndex ? 'active' : '',
            item.classN
          ]" @click="changePayMode(index)">
          <i></i>
          <strong>{{item.typeName}}</strong>
          <span></span>
        </div>
      </div>
      <a href="javascript:;" @click="payConfirm">确认支付</a>
    </section>
    <!--钱包支付-->
    <div class="walletPayWrap" v-show="showWallet">
      <div class="walletPay">
        <div class="closeBtn" @click="closeWalletPayBox">X</div>
        <strong>请输入支付密码</strong>
        <div class="walletP">
          <span>钱包支付</span>
          <strong>¥ {{orderInfo.oi_SellMoney}}.00</strong>
        </div>
        <div class="passwordBox clearfix">
          <div v-for="item,index in passworldArr"><i v-show="item !== ''"></i></div>
        </div>
      </div>
      <div class="changePasswordNum clearfix">
        <span
          v-for="item,index in passworldNum"
          @touchstart="changeBg(item,index)"
          @touchend="changeLBg(item,index)"
          :class="{active: index == Aindex}"
        >{{item}}</span>
      </div>
    </div>

    <!--微信支付-->
    <div class="weChat" v-show="showWeChat">
      <i @click="closeWeChat">x</i>
      <div class="weChatBox">
        <strong>长按识别二维码并支付</strong>
        <div class="qrCodeBox">
          <qrcode :value="qrCodeUrl" type="img" :size="200"></qrcode>
        </div>
      </div>
    </div>

    <toast v-model="showErr" :type="showType" :text="errCon"></toast>
    <div v-html="htmlV" style="position: relative;z-index: 1000"></div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Qrcode} from 'vux'
  import {isWeiXin} from '@/assets/js/public'

  export default {
    components: {
      Toast,
      Qrcode
    },
    computed: mapGetters([]),
    data() {
      return {
        orderInfo: {},
        billType: '',
        htmlV: '',
        payMode: [
          {
            classN: 'wallet',
            typeName: '钱包支付'
          },
          {
            classN: 'weChart',
            typeName: '微信支付'
          },
//          {
//            classN: 'alipay',
//            typeName: '支付宝支付'
//          },
//          {
//            classN: 'unionPay',
//            typeName: '银联支付'
//          },
        ],
        payIndex: 0,
        payPassword: '',
        userInfo: {},
        showErr: false,
        errCon: '',
        showType: 'cancel',
        passworldArr: ['', '', '', '', '', ''],
        passworldNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''],
        Aindex: 999,
        showWallet: false,
        qrCodeUrl: '',
        showWeChat: false,
        isLoad: 0,
      }
    },
    created() {
      if (sessionStorage.getItem('orderInfo')) {
        this.orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
      }
      if (this.$route.query.type) {
        this.billType = this.$route.query.type;
      }
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
    },
    methods: {
      goTopPage() {
        this.$router.go(-1);
      },
      //选择支付方式
      changePayMode(index) {
        this.payIndex = index;
      },
      //确认支付
      payConfirm() {
//        钱包支付
        if (this.payIndex === 0) {
          this.showWallet = true;
        }
        var payChanel;
        //微信支付
        if (this.payIndex === 1) {
          var _this = this;
          mui.plusReady(function () {
            _this.$vux.loading.show({
              text: '加载中'
            })
            //设备信息加载完成，先获取微信的支付通道
            plus.payment.getChannels(function (channels) {
              for (var i in channels) {
                if (channels[i].id == "wxpay") {
                  payChanel = channels[i];
                }
              }
              axios.post('http://icbcinterface.1000da.com.cn/Home/AppSign', JSON.stringify({
                "out_trade_no": _this.orderInfo.oi_OrderID,//订单号
                "order_amt": _this.orderInfo.oi_SellMoney*100,//订单金额_this.orderInfo.oi_SellMoney
                "notify_url": "http://icbc.1000da.com.cn/notify.aspx",//支付成功回调地址
                "order_des": _this.orderInfo.oi_OrderName,//用户编码
              }), {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(data => {
                var res = data.data;
                let v = JSON.parse(res.data)
                console.log(JSON.stringify(v))
                if(Number(res.resultcode)==200){
                  v.retcode = 0;
                  v.retmsg = "ok";
                  plus.payment.request(payChanel, v, function (result) {
                    //        旅行社订单
                    if (Number(_this.orderInfo.oi_OrderTypeID) === 0) {
                      let payOrderObj = {
                        "loginUserID": "huileyou",
                        "loginUserPass": "123",
                        "operateUserID": "2",
                        "operateUserName": "",
                        "pcName": "",
                        "token": _this.userInfo.token ? _this.userInfo.token : '',
                        "orderID": _this.orderInfo.oi_OrderID ? _this.orderInfo.oi_OrderID : '',
                        "payWay": "余额支付",
                      };
                      _this.$store.dispatch('payTourOrder', payOrderObj)
                      .then(suc => {
                        _this.showErr = true;
                        _this.errCon = suc;
                        _this.showType = 'success';
                        _this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 0}})
//                      _this.$store.commit('hideLoading')
                        _this.$vux.loading.hide()
                      }, err => {
                        _this.showErr = true;
                        _this.errCon = err;
                        _this.showType = 'cancel';
//                      _this.$store.commit('hideLoading')
                        _this.$vux.loading.hide()
                      })
                    }
//        门票订单
                    if (Number(_this.orderInfo.oi_OrderTypeID) === 2) {
                      let payOrderObj = {
                        "loginUserID": "huileyou",  //惠乐游用户ID
                        "loginUserPass": "123",  //惠乐游用户密码
                        "operateUserID": 2,  //操作员编码
                        "operateUserName": "",  //操作员名称
                        "pcName": "",  //机器码
                        "token": _this.userInfo.token ? _this.userInfo.token : '',
                        "orderID": _this.orderInfo.oi_OrderID ? _this.orderInfo.oi_OrderID : '',
                        "payWay": "余额支付"
                      };
                      _this.$store.dispatch('payTickeOrder', payOrderObj)
                      .then(suc => {
                        _this.showErr = true;
                        _this.errCon = suc;
                        _this.showType = 'success';
//                      _this.$store.commit('hideLoading')
                        _this.$vux.loading.hide()
                        _this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 2}})
                      }, err => {
                        _this.showErr = true;
                        _this.errCon = err;
                        _this.showType = 'cancel';
//                      _this.$store.commit('hideLoading')
                        _this.$vux.loading.hide()
                      })
                    }
//        美食订单
                    if (Number(_this.orderInfo.oi_OrderTypeID) === 3) {
                      let payOrderObj = {
                        "loginUserID": "huileyou",
                        "loginUserPass": "123",
                        "operateUserID": "2",
                        "operateUserName": "",
                        "pcName": "",
                        "token": _this.userInfo.token ? _this.userInfo.token : '',
                        "fd_or_OrderID": _this.orderInfo.oi_OrderID ? _this.orderInfo.oi_OrderID : '',
                        "fd_or_PayWay": "余额支付"
                      };
                      _this.$store.dispatch('payFoodOrder', payOrderObj)
                      .then(suc => {
                        _this.showErr = true;
                        _this.errCon = suc;
                        _this.showType = 'success';
//                      _this.$store.commit('hideLoading')
                        _this.$vux.loading.hide()
                        _this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 3}})
                      }, err => {
                        _this.showErr = true;
                        _this.errCon = err;
                        _this.showType = 'cancel';
                        _this.$vux.loading.hide()
//                      _this.$store.commit('hideLoading')
                      })
                    }
//        酒店订单
                    if (Number(_this.orderInfo.oi_OrderTypeID) === 4) {
                      let HotelPayOrder = {
                        "loginUserID": "huileyou",
                        "loginUserPass": "123",
                        "operateUserID": 9,
                        "operateUserName": "",
                        "pcName": "",
                        "token": _this.userInfo.token ? _this.userInfo.token : '',
                        "ht_or_OrderID": _this.orderInfo.oi_OrderID ? _this.orderInfo.oi_OrderID : '',
                        "ht_or_PayWay": "余额支付"
                      };
                      _this.$store.dispatch('payHotelOrder', HotelPayOrder)
                      .then(suc => {
                        _this.showErr = true;
                        _this.errCon = suc;
                        _this.showType = 'success';
//                      _this.$store.commit('hideLoading')
                        _this.$vux.loading.hide()
                        _this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 4}})
                      }, err => {
                        _this.showErr = true;
                        _this.errCon = err;
                        _this.showType = 'cancel';
//                      _this.$store.commit('hideLoading')
                        _this.$vux.loading.hide()
                      })
                    }

//                  alert(JSON.stringify(result));
//                  alert("付费成功");
//                  setTimeout(()=>{
//                    _this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: Number(_this.orderInfo.oi_OrderTypeID)}})
//                  },200)
                  }, function (e) {
//                  alert(JSON.stringify(e));
                    alert("付费失败");
                    _this.$vux.loading.hide()
                  });
                }else{
                  _this.showErr = true;
                  _this.errCon = res.resultcontent;
                  _this.showType = 'cancel';
//                      _this.$store.commit('hideLoading')
                  _this.$vux.loading.hide()
                }
              }, err => {
                alert(JSON.stringify(err))
                _this.$vux.toast.show({
                  text: err,
                  type: 'warn'
                })
                _this.$vux.loading.hide()
              }).catch(err=>{
                _this.showErr = true;
                _this.errCon = '操作失败,稍后重试!';
                _this.showType = 'warn';
//                      _this.$store.commit('hideLoading')
                _this.$vux.loading.hide()
              })
            }, function (e) {
              alert("获取支付通道失败：" + e.message);
            });
          })
        }
      },
      //按下
      changeBg(item, index) {
        this.Aindex = index;
      },
      //抬起
      changeLBg(item, index) {
        this.Aindex = 999;
        if (index == 9) {
          return
        }
        if (index == 11) {
          for (let i = this.passworldArr.length - 1; i >= 0; i--) {
            if (this.passworldArr[i] !== '') {
              this.passworldArr[i] = '';
              break
            }
          }
          return
        }

        for (let i = 0; i < this.passworldArr.length; i++) {
          if (this.passworldArr[i] === '') {
            this.passworldArr[i] = item;
            break
          }
        }

        if (this.passworldArr.length == 6 && this.passworldArr[5]) {
          this.walletPay(this.passworldArr.join(''));
        }
      },
      //钱包支付
      walletPay(passworld) {
        let minusMoney = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//操作员姓名
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "orderNo": this.orderInfo.oi_OrderID ? this.orderInfo.oi_OrderID : '',//订单号
          "payCode": passworld ? passworld : ''//钱包支付码
        }
        this.$store.dispatch('payWallet', minusMoney)
        .then(suc => {
          this.payOrder();
        }, err => {
          this.showErr = true;
          this.errCon = err;
          this.showType = 'cancel';
          this.closeWalletPayBox();
        })
      },
      //关闭钱包支付窗口
      closeWalletPayBox() {
        this.showWallet = false;
        this.passworldArr = ['', '', '', '', '', ''];
      },
      //关闭微信支付窗口
      closeWeChat() {
        this.showWeChat = false;
      },
      //支付
      payOrder() {
        this.$store.commit('showLoading')
//        旅行社订单
        if (Number(this.orderInfo.oi_OrderTypeID) === 0) {
          let payOrderObj = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "2",
            "operateUserName": "",
            "pcName": "",
            "token": this.userInfo.token ? this.userInfo.token : '',
            "orderID": this.orderInfo.oi_OrderID ? this.orderInfo.oi_OrderID : '',
            "payWay": "余额支付",
          };
          this.$store.dispatch('payTourOrder', payOrderObj)
          .then(suc => {
            this.showErr = true;
            this.errCon = suc;
            this.showType = 'success';
            this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 0}})
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.showType = 'cancel';
            this.$store.commit('hideLoading')
          })
        }
//        门票订单
        if (Number(this.orderInfo.oi_OrderTypeID) === 2) {
          let payOrderObj = {
            "loginUserID": "huileyou",  //惠乐游用户ID
            "loginUserPass": "123",  //惠乐游用户密码
            "operateUserID": 2,  //操作员编码
            "operateUserName": "",  //操作员名称
            "pcName": "",  //机器码
            "token": this.userInfo.token ? this.userInfo.token : '',
            "orderID": this.orderInfo.oi_OrderID ? this.orderInfo.oi_OrderID : '',
            "payWay": "余额支付"
          };
          this.$store.dispatch('payTickeOrder', payOrderObj)
          .then(suc => {
            this.showErr = true;
            this.errCon = suc;
            this.showType = 'success';
            this.$store.commit('hideLoading')
            this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 2}})
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.showType = 'cancel';
            this.$store.commit('hideLoading')
          })
        }
//        美食订单
        if (Number(this.orderInfo.oi_OrderTypeID) === 3) {
          let payOrderObj = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "2",
            "operateUserName": "",
            "pcName": "",
            "token": this.userInfo.token ? this.userInfo.token : '',
            "fd_or_OrderID": this.orderInfo.oi_OrderID ? this.orderInfo.oi_OrderID : '',
            "fd_or_PayWay": "余额支付"
          };
          this.$store.dispatch('payFoodOrder', payOrderObj)
          .then(suc => {
            this.showErr = true;
            this.errCon = suc;
            this.showType = 'success';
            this.$store.commit('hideLoading')
            this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 3}})
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.showType = 'cancel';
            this.$store.commit('hideLoading')
          })
        }
//        酒店订单
        if (Number(this.orderInfo.oi_OrderTypeID) === 4) {
          let HotelPayOrder = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": 9,
            "operateUserName": "",
            "pcName": "",
            "token": this.userInfo.token ? this.userInfo.token : '',
            "ht_or_OrderID": this.orderInfo.oi_OrderID ? this.orderInfo.oi_OrderID : '',
            "ht_or_PayWay": "余额支付"
          };
          this.$store.dispatch('payHotelOrder', HotelPayOrder)
          .then(suc => {
            this.showErr = true;
            this.errCon = suc;
            this.showType = 'success';
            this.$store.commit('hideLoading')
            this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 4}})
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.showType = 'cancel';
            this.$store.commit('hideLoading')
          })
        }
//        租车订单
        if (Number(this.orderInfo.oi_OrderTypeID) === 5) {
          let CarRentalPayOrderInfo = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "3",
            "operateUserName": "",
            "pcName": "",
            "token": this.userInfo.token ? this.userInfo.token : '',
            "OrderId": this.orderInfo.oi_OrderID ? this.orderInfo.oi_OrderID : '',
            "ht_or_PayWay": "余额支付",
          };
          this.$store.dispatch('payCarOrder', CarRentalPayOrderInfo)
          .then(suc => {
            this.showErr = true;
            this.errCon = suc;
            this.showType = 'success';
            this.$store.commit('hideLoading')
            this.$router.push({name: 'MyOrderDetails', query: {id: 3, typeId: 5}})
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.showType = 'cancel';
            this.$store.commit('hideLoading')
          })
        }
      },

    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    position: fixed;
    height: 88/@r;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #2dbb55;
    padding: 27/@r 30/@r 26/@r 30/@r;
  }

  header > div {
    float: left;
  }

  header > div > div {
    width: 19/@r;
    height: 35/@r;
    background: url('../../assets/img/ticket/leftIcon.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  header strong {
    float: left;
    font-size: 30/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #fff;
    margin-left: 10/@r;
  }

  header span {
    width: 44/@r;
    height: 10/@r;
    float: right;
    background: url("../../assets/img/order/threePir.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 13/@r;
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    overflow: auto;
    padding-bottom: 150/@r;
  }

  .payMoney {
    padding: 64/@r 0 40/@r 0;
    border-bottom: 24/@r solid #dcdce1;
  }

  .payMoney strong {
    display: block;
    text-align: center;
    font-size: 34/@r;
    line-height: 64/@r;
    font-family: "微软雅黑";
    color: #808080;
  }

  .payMoney span {
    display: block;
    text-align: center;
    font-size: 70/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    color: #dd7015;
  }

  .aboutOrder {
    border-bottom: 24/@r solid #dcdce1;
    font-size: 28/@r;
    line-height: 76/@r;
    font-family: "微软雅黑";
    color: #363636;
  }

  .aboutOrder > div {
    float: left;
    width: 100%;
    padding: 0 30/@r;
  }

  .business {
    overflow: hidden;
  }

  .business > span {
    float: left;
    width: 100%;
    line-height: 40/@r;
    padding-top: 20/@r;
  }

  .aboutOrder strong {
    float: left;
  }

  .payOrder {
    padding: 0 30/@r;
  }

  .payOrder > div {
    float: left;
    width: 100%;
    border-bottom: 1/@r solid #d2d2d8;
    height: 109/@r;
    padding: 24/@r 0;
    font-size: 30/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
  }

  .payOrder strong {
    float: left;
    margin-left: 15/@r;
  }

  .payOrder span {
    float: right;
    width: 44/@r;
    height: 44/@r;
    border: 1/@r solid #dedee3;
    margin-top: 10/@r;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .payOrder .active span {
    background: url("../../assets/img/order/selection.png") no-repeat;
    border: none;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .wallet i {
    background: url("../../assets/img/order/wallet.png") no-repeat;
  }

  .weChart i {
    background: url("../../assets/img/order/weChart.png") no-repeat;
  }

  .alipay i {
    background: url("../../assets/img/order/alipay.png") no-repeat;
  }

  .unionPay i {
    background: url("../../assets/img/order/unionPay.png") no-repeat;
  }

  .payOrder i {
    float: left;
    width: 60/@r;
    height: 60/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  section > a {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #dd7015;
    height: 98/@r;
    color: #fff;
    text-align: center;
    font-size: 34/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
  }

  .walletPayWrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
  }

  .walletPay {
    width: 90%;
    background-color: #fff;
    margin: 120/@r auto 0;
    padding: 30/@r;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    position: relative;
  }

  .walletPay > strong {
    font-size: 38/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #333;
    display: block;
    border-bottom: 1/@r solid #ccc2c9;
    margin-bottom: 20/@r;
  }

  .walletP {
    padding-bottom: 30/@r;
  }

  .walletP > span {
    font-size: 35/@r;
    line-height: 2;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
    color: #333;
  }

  .walletP > strong {
    font-size: 60/@r;
    line-height: 2;
    font-family: "微软雅黑";
    font-weight: bold;
    text-align: center;
    display: block;
    color: #f80;
  }

  .passwordBox {
    width: 540/@r;
    margin: 0 auto;
  }

  .passwordBox i {
    width: 20/@r;
    height: 20/@r;
    background-color: #000;
    margin: 35/@r auto 0;
    display: block;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .passwordBox > div {
    float: left;
    width: 90/@r;
    height: 90/@r;
    border: 1/@r solid #ccc;
    border-right: none;
  }

  .passwordBox > div:last-of-type {
    border-right: 1/@r solid #ccc;
  }

  .changePasswordNum {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }

  .changePasswordNum > span {
    float: left;
    width: 33.333%;
    height: 100/@r;
    text-align: center;
    font-size: 35/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    box-shadow: 0 0 2/@r #ccc;
    color: #666;
    position: relative;
  }

  .changePasswordNum .active {
    background-color: #f3f3f3;
  }

  .changePasswordNum > span:last-of-type,
  .changePasswordNum > span:nth-of-type(10) {
    background-color: #f3f3f3;
  }

  .changePasswordNum > span:last-of-type:before {
    position: absolute;
    content: '';
    width: 100/@r;
    height: 46/@r;
    background: url("../../assets/img/order/deleteIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .closeBtn {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 30/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
    padding: 0 20/@r;
  }

  .weChat {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
  }

  .weChatBox {
    text-align: center;
    padding: 0 100/@r;
    margin: 300/@r auto 0;
  }

  .qrCodeBox {
    margin: 0 auto;
  }

  .weChatBox > strong {
    color: #fff;
    font-size: 30/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    display: block;
    margin-bottom: 50/@r;
  }

  .weChat i {
    position: absolute;
    color: #fff;
    font-size: 40/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    padding: 0 20/@r;
    right: 30/@r;
    top: 30/@r;
    color: #f60;
  }
</style>
