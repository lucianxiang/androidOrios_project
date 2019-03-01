<template>
  <div>
    <div id="wrap">
      <header>
        <div class="clearfix" @click="goTopPage"><i></i>返回</div>
        <strong>充值</strong>
      </header>
      <section>
        <div class="rechargeBox">
          <div class="rechargeMoneyBox">
            <span>充值金额</span>
            <input type="text" placeholder="输入充值金额(￥)" v-model="money">
          </div>
          <div class="rechargeMoneySubmit">
            <a href="javascript:;" @click="submit">确定充值</a>
          </div>
        </div>
      </section>
      <!--<div class="payRechargeWrap">-->
        <!--<div class="payRecharge">-->
          <!--<div class="payTitle">-->
            <!--<i></i>-->
            <!--<strong>确认付款</strong>-->
          <!--</div>-->
          <!--<p class="payMoney">￥546.00</p>-->
          <!--<ul class="payTypeList">-->
            <!--<li class="weChatPay">-->
              <!--<i></i>-->
              <!--<strong>微信支付</strong>-->
              <!--<span></span>-->
            <!--</li>-->
            <!--<li class="ICBCPay">-->
              <!--<i></i>-->
              <!--<strong>工商银行支付</strong>-->
              <!--<span></span>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<a href="javascript:;">立即付款</a>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
    <toast v-model="showSuc" type="success" :text="sucCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    components: {
      Toast,
    },
    computed: mapGetters([]),
    data() {
      return {
        money:'',
        userInfo: {},
        showErr: false,
        errCon: '',
        showSuc: false,
        sucCon: '',
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    methods: {
      //确定充值
      submit(){

      },
      goTopPage() {
        this.$router.go(-1)
      },
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #f9f9f9;
    overflow: auto;
  }

  header {
    padding: 22/@r 30/@r;
    background-color: #2dbb55;
    position: relative;
    color: #fff;
  }

  header div {
    font-size:30/@r;
    font-family:"微软雅黑";
    line-height:44/@r;
  }

  header div i {
    float: left;
    width: 19/@r;
    height: 35/@r;
    background: url("../../assets/img/userCenter/walletLeftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 4/@r;
    margin-right: 10/@r;
  }

  header strong {
    position: absolute;
    top: 22/@r;
    left: 50%;
    font-size:34/@r;
    font-family:"微软雅黑";
    line-height:44/@r;
    transform: translateX(-50%);
  }

  .rechargeMoneyBox {
    padding: 90/@r 30/@r 70/@r 30/@r;
    background-color: #fff;
  }

  .rechargeMoneyBox > span {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:88/@r;
    color: #606060;
    display: block;
  }

  .rechargeMoneyBox > input {
    display: block;
    height: 100/@r;
    font-weight: bold;
    font-size: 40/@r;
    color: #606060;
    border: none;
    font-family: "宋体";
    width: 100%;
  }

  input::-webkit-input-placeholder {
    font-weight: normal;
  }

  .rechargeMoneySubmit {
    padding: 0 30/@r;
    margin-top: 70/@r;
  }

  .rechargeMoneySubmit > a {
    font-size:32/@r;
    font-family:"微软雅黑";
    line-height:96/@r;
    background-color: #54d880;
    color: #fff;
    text-align: center;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .payRechargeWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
  }

  .payRecharge {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #faf9f9;
  }

  .payTitle {
    position: relative;
    font-size:34/@r;
    font-family:"微软雅黑";
    line-height:93/@r;
    border-bottom: 1/@r solid #cccdce;
    text-align: center;
    color: #030405;
  }

  .payTitle > i {
    position: absolute;
    top: 34/@r;
    left: 30/@r;
    width: 26/@r;
    height: 26/@r;
    background: url("../../assets/img/userCenter/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .payMoney {
    margin-top: 25/@r;
    font-size:50/@r;
    font-family:"微软雅黑";
    line-height:120/@r;
    text-align: center;
    color: #030405;
  }

  .payTypeList {
    font-size:34/@r;
    font-family:"微软雅黑";
    line-height:89/@r;
    color: #030405;
  }

  .payTypeList > li {
    height: 85/@r;
    border-bottom: 1/@r solid #cccdce;
    padding: 0 40/@r;
  }



</style>
