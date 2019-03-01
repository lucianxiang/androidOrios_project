<template>
  <div>
    <div id="wrap">
      <header>
        <div class="walletTitle clearfix">
          <div class="leftIcon" @click="goTopPage"><i></i>返回</div>
          <strong>我的钱包</strong>
        </div>
        <div class="moneyBox">
          <i></i>
          <span>余额</span>
          <strong>￥ {{moneyNum}}.00</strong>
        </div>
      </header>
      <section>
        <div class="walletOperation">
          <div class="rechargeMoney clearfix" @click="goRechargeMoney">
            <i></i>
            <strong>余额充值</strong>
            <span></span>
          </div>
          <div class="updateWalletInfo clearfix" @click="goUpdateWalletInfo">
            <i></i>
            <strong>修改钱包信息</strong>
            <span></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        userInfo:{},
        moneyNum: '',
      }
    },
    created(){
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initMoneyDetails();
    },
    methods: {
      //返回上一页
      goTopPage(){
        this.$router.go(-1);
      },
      //初始化钱包金额
      initMoneyDetails(){
        let selectUserPot = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "huileyou",//操作员编码
          "operatePassword": "123",//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "token": this.userInfo.token,
          "sm_up_ID": this.userInfo.sm_ui_ID,//钱包编码=用户编码
        };
        this.$store.dispatch('initUserMoney',selectUserPot)
          .then(data=>{
            this.moneyNum = data.sm_up_Money;
          },err=>{

          })
      },
      //充值余额
      goRechargeMoney(){
        this.$router.push({name: 'RechargeMoney'})
      },
      //修改钱包信息
      goUpdateWalletInfo(){
        this.$router.push({name: 'UpdateWalletInfo'})
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
    overflow: auto;
    background-color: #f5f5f5;
  }

  header {
    height: 423/@r;
    width: 100%;
    background: url("../../assets/img/userCenter/walletBg.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    padding: 22/@r 30/@r 0;
  }

  .walletTitle {
    color: #fff;
    position: relative;
  }

  .leftIcon {
    float: left;
    font-size:30/@r;
    font-family:"微软雅黑";
    line-height:45/@r;
  }

  .leftIcon > i {
    float: left;
    width: 19/@r;
    height: 35/@r;
    margin-top: 4/@r;
    background: url("../../assets/img/userCenter/walletLeftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 10/@r;
  }

  .walletTitle > strong {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size:35/@r;
    font-family:"微软雅黑";
    line-height:45/@r;
  }

  .moneyBox {
    margin-top: 110/@r;
  }

  .moneyBox > i {
    display: block;
    width: 80/@r;
    height: 90/@r;
    background: url("../../assets/img/userCenter/walletIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .moneyBox > span {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 6/@r;
    font-size:30/@r;
    font-family:"微软雅黑";
    line-height:50/@r;
  }

  .moneyBox > strong {
    display: block;
    color: #fff;
    text-align: center;
    font-size:27/@r;
    font-family:"微软雅黑";
    line-height:37/@r;
  }

  section {
    margin-top: 17/@r;
  }

  .walletOperation {
    background-color: #fff;
    padding: 0 30/@r;
  }

  .walletOperation > div {
    padding: 0 2/@r 0 5/@r;
    border-bottom: 1/@r solid #e0e0e0;
    color: #555;
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:100/@r;
  }

  .walletOperation > div:last-of-type {
    border-bottom: none;
  }

  .rechargeMoney > i {
    background: url("../../assets/img/userCenter/moneyIcon.png") no-repeat;
  }

  .updateWalletInfo > i {
    background: url("../../assets/img/userCenter/updateMoney.png") no-repeat;
  }

  .walletOperation > div > i {
    float: left;
    width: 46/@r;
    height: 46/@r;
    margin-right: 30/@r;
    margin-top: 27/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .walletOperation > div > span {
    float: right;
    width: 15/@r;
    height: 24/@r;
    background: url("../../assets/img/userCenter/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 39/@r;
  }


</style>
