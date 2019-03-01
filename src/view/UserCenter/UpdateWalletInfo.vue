<template>
  <div>
    <div id="wrap">
      <header>
        <div class="clearfix" @click="goTopPage"><i></i>返回</div>
        <strong>修改钱包信息</strong>
      </header>
      <section>
        <div class="inputBox">
          <input type="password" placeholder="输入新的支付密码" v-model="payPassword">
          <input type="password" placeholder="输入当前帐号密码" v-model="userPassword">
          <a href="javascript:;" @click="updateWalletInfo">提交</a>
        </div>
      </section>
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
        userInfo: {},
        payPassword: '',
        userPassword: '',
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
      goTopPage(){
        this.$router.go(-1)
      },
      updateWalletInfo() {
        let updateUserPot = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,//操作员编码
          "operatePassword": this.userPassword,//操作员密码
          "operateUserName": "",//
          "pcName": "",
          "token": this.userInfo.token,
          "payCode": this.payPassword,//钱包密码
          "isDelete": "0",//钱包状态  0停用 1启用
        };
        this.$store.dispatch('updateWalletInfo', updateUserPot)
          .then(suc => {
            this.showSuc = true;
            this.sucCon = suc;
            setTimeout(()=>{
              this.goTopPage();
            },200)
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
  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
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

  section {
    padding: 127/@r 60/@r 0;
  }

  .inputBox > input {
    height: 127/@r;
    border: none;
    width: 100%;
    border-bottom: 1/@r solid #dadedd;
    font-size: 28/@r;
    letter-spacing: 3/@r;
  }

  .inputBox > a {
    display: block;
    margin-top: 90/@r;
    width: 100%;
    background-color: #3cd36e;
    color: #fff;
    font-size:34/@r;
    font-family:"微软雅黑";
    line-height:96/@r;
    text-align: center;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }
</style>
