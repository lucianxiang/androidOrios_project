<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>找回密码</strong>
    </header>
    <section>
      <div class="inputBox">
        <input type="text" placeholder="请输入手机号码" v-model="phoneNum">
        <div class="messageBox clearfix">
          <input type="text" placeholder="请输入验证码" v-model="messageCode">
          <button @click="sendMessage">{{btnInfo}}</button>
        </div>
        <input type="password" placeholder="请输入新密码" v-model="newPassword">
        <input type="password" placeholder="确认新密码" v-model="repeatNewPassword">
        <div class="registerSubmit">
          <a href="javascript:;" @click="findSubmit">确定</a>
        </div>
      </div>
    </section>
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
        phoneNum: '',
        newPassword: '',
        repeatNewPassword: '',
        messageCode: '',
        btnInfo: '发送短信',
        sendState: false,
        errCon: '',
        showErr: false,
        num: 60,
        sucCon: '',
        showSuc: false,
      }
    },
    methods: {
      goTopPage() {
        this.$router.go(-1)
      },
//      发送短信
      sendMessage() {
        if (this.sendState) {
          return
        }
        if (!this.phoneNum) {
          this.errCon = '请输入手机号';
          this.showErr = true;
          return
        }
        this.sendState = true;
        let timer = setInterval(() => {
          this.num--;
          if (this.num < 0) {
            this.btnInfo = "重新发送";
            clearInterval(timer)
            return
          }
          this.btnInfo = this.num + "s后重新发送"
        }, 1000)
        let autoPasswordLogin = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "phone": this.phoneNum,//用户编码
          "sendType": "1",
        };
        this.$store.dispatch('sendMessage', autoPasswordLogin)
          .then(suc => {
            this.sucCon = suc;
            this.showSuc = true;
          }, err => {
            this.errCon = err;
            this.showErr = true;
            this.sendState = false;
            this.btnInfo = "重新发送";
            clearInterval(timer)
          })
      },
      findSubmit() {
        if (!this.phoneNum) {
          this.errCon = '请输入手机号!!';
          this.showErr = true;
          return
        }
        if (!this.messageCode) {
          this.errCon = '请输入验证码!!';
          this.showErr = true;
          return
        }
        if (!this.newPassword) {
          this.showErr = true;
          this.errCon = '请输入新密码';
          return
        }
        if (!this.repeatNewPassword) {
          this.showErr = true;
          this.errCon = '请确认新密码';
          return
        }
        if (this.newPassword != this.repeatNewPassword) {
          this.errCon = '两次密码输入不一致!!';
          this.showErr = true;
          return
        }
        let forgetPassword = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "phone": this.phoneNum,//38返回职业
          "validateNo": this.messageCode,//验证码
          "password": this.newPassword,//新密码
        }
        this.$store.dispatch('findPasswordSubmit', forgetPassword)
          .then(suc => {
            this.sucCon = suc;
            this.showSuc = true;
            this.$router.push({name: 'UserLogin'})
          }, err => {
            this.errCon = err;
            this.showErr = true;
          })
      },
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 88/@r;
  }

  header > .leftIcon {
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/userCenter/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 25/@r 0 0 30/@r;
  }

  header > strong {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:38/@r;
    color: #000;
    position: absolute;
    top: 25/@r;
    left: 50%;
    transform: translateX(-50%);
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    overflow: auto;
  }

  .inputBox {
    margin-top: 60/@r;
    padding: 0 60/@r;
  }

  .inputBox input {
    width: 100%;
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:124/@r;
    border: none;
    border-bottom: 1/@r solid #dadedd;
  }

  .passwordBox {
    position: relative;
  }

  .passwordBox > i {
    position: absolute;
    width: 46/@r;
    height: 19/@r;
    right: 0;
    top: 50/@r;
    background: url("../../assets/img/userCenter/eyeIcon2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .passwordBox > i.active {
    background: url("../../assets/img/userCenter/eyeIcon1.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .passwordBox > input {
    padding-right: 46/@r;
  }

  .registerSubmit {
    margin-top: 100/@r;
  }

  .registerSubmit > a {
    width: 100%;
    display: block;
    font-size:98/@r;
    font-family:"微软雅黑";
    line-height:34/@r;
    background-color: #ffa948;
    color: #fff;
    text-align: center;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    box-shadow: 1/@r 2/@r 5/@r #a9a9a9;
  }

  .haveCode > a {
    float: left;
    color: #f80;
  }

  .haveCode > span {
    float: right;
    color: #666;
  }

  .inputBox > .messageBox {
    border-bottom: 1/@r solid #dadedd;
  }

  .inputBox > .messageBox > input {
    float: left;
    width: 50%;
    border-bottom: none;
  }

  .inputBox > .messageBox > button {
    float: left;
    width: 50%;
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:124/@r;
    border: none;
    background-color: #fff;
    color: #ffa948;
  }
</style>
