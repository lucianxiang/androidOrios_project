<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>会员登录</strong>
    </header>
    <section>
      <div class="loginLogo"></div>
      <nav class="clearfix">
        <div :class="{active: index == loginTypeIndex}" v-for="item,index in loginType" @click="changeLoginType(index)">
          <a href="javascript:;">{{item}}</a>
        </div>
      </nav>
      <!--密码登录-->
      <div v-show="!loginTypeShow" class="passwodLogin">
        <div class="inputBox">
          <div class="loginAccountNumber">
            <input type="text" placeholder="请输入账号" ref="userId" v-model="userCode" @click="getUserIdFocus">
            <span @click.stop="userCode=''">x</span>
          </div>
          <div class="passwordBox" @click="getPasswordFocus">
            <input :type="isPassword" ref="userPassword" placeholder="请输入密码" v-model="userPassword">
            <i @click="clickEye" :class="{active: showEye}"></i>
            <span @click.stop="userPassword=''">x</span>
          </div>
        </div>
        <div class="otherOperation clearfix">
          <router-link to="UserRegister">未拥有账号?前往注册!!</router-link>
          <span @click="findPassword">找回密码</span>
        </div>
        <div class="loginSubmit">
          <a href="javascript:;" @click="loginSubmit">登录</a>
        </div>
        <!--<div class="otherLogin">-->
        <!--<strong><span>第三方账号登录</span></strong>-->
        <!--<div class="otherLoginIcon clearfix">-->
        <!--<span class="weChantIcon"><i></i></span>-->
        <!--<span class="QQIcon"><i></i></span>-->
        <!--<span class="microBlogIcon"><i></i></span>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <!--短信登录-->
      <div class="passwodLogin" v-show="loginTypeShow">
        <div class="inputBox">
          <div class="loginAccountNumber">
            <input type="text" placeholder="请输入已注册手机号" ref="userPhone" @click="phoneFocus" v-model="phoneCode">
            <span @click.stop="phoneCode=''">x</span>
          </div>
          <div class="messageBox clearfix">
            <input type="text" placeholder="请输入验证码" ref="userMessage" @click="messageFocus" v-model="messageCode">
            <button @click="sendMessage">{{btnInfo}}</button>
          </div>
        </div>
        <div class="loginSubmit">
          <a href="javascript:;" @click="messageLogin">登录</a>
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
        showEye: false,
        isPassword: 'password',
        userCode: '',
        userPassword: '',
        showErr: false,
        errCon: '',
        showSuc: false,
        sucCon: '',
        btnInfo: '发送短信',
        phoneCode: '',
        messageCode: '',
        num: 60,
        sendState: false,
        loginTypeShow: false,
        loginTypeIndex: 0,
        loginType: [
          '账号密码登录',
          '验证码登录'
        ],
      }
    },
    methods: {
      getUserIdFocus() {
        this.$refs.userId.focus();
      },
      getPasswordFocus() {
        this.$refs.userPassword.focus();
      },
      phoneFocus() {
        this.$refs.userPhone.focus();
      },
      messageFocus() {
        this.$refs.userMessage.focus();
      },
      goTopPage() {
        this.$router.go(-1)
      },
      clickEye() {
        if (this.showEye) {
          this.isPassword = 'password';
          this.showEye = false;
        } else {
          this.isPassword = 'text'
          this.showEye = true;
        }
      },
//      密码登录
      loginSubmit() {
        if (!this.userCode || !this.userPassword) {
          this.showErr = true;
          this.errCon = '请完整输入登录内容!!';
          return
        }
        let userLogin = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "userID": this.userCode,//用户编码
          "password": this.userPassword//密码
        };
        this.$store.dispatch('loginSubmit', userLogin)
          .then(data => {
            this.sucCon = data.resultcontent;
            this.showSuc = true;
            localStorage.setItem('userInfo', JSON.stringify(data.data));
            sessionStorage.setItem('userInfo', JSON.stringify(data.data));
            localStorage.setItem('userParams', JSON.stringify({number: this.userCode, passworld: this.userPassword}));
            this.$router.go(-1);
          }, err => {
            this.errCon = err;
            this.showErr = true;
          })
      },
//      发送短信
      sendMessage() {
        if (this.sendState) {
          return
        }
        if (!this.phoneCode) {
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
          "phone": this.phoneCode,//用户编码
          "sendType": "2",
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
//      验证码登录
      messageLogin() {
        if (!this.phoneCode) {
          this.errCon = '请输入手机号';
          this.showErr = true;
          return
        }
        if (!this.messageCode) {
          this.errCon = '请输入验证码';
          this.showErr = true;
          return
        }
        let autoPasswordLogin = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "phone": this.phoneCode,//38返回职业
          "validateNo": this.messageCode,//验证码
        }
        this.$store.dispatch('messageLogin', autoPasswordLogin)
          .then(data => {
            this.sucCon = data.resultcontent;
            this.showSuc = true;
            localStorage.setItem('userInfo', JSON.stringify(data.data));
            sessionStorage.setItem('userInfo', JSON.stringify(data.data));
            this.$router.go(-1);
          }, err => {
            this.errCon = err;
            this.showErr = true;
          })
      },
      changeLoginType(index) {
        if (index) {
          this.loginTypeShow = true;
        } else {
          this.loginTypeShow = false;
        }
        this.loginTypeIndex = index;
      },
      //找回密码
      findPassword() {
        this.$router.push({name: 'FindPassword'})
      }
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
    background-color: #f0f0f0;
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
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 38/@r;
    color: #000;
    position: absolute;
    top: 25/@r;
    left: 50%;
    transform: translateX(-50%);
  }

  section {
    position: fixed;
    top: 88/@r;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    overflow: auto;
    padding-bottom: 100/@r;
  }

  .loginLogo {
    width: 150/@r;
    height: 150/@r;
    background: url("../../assets/img/home/hlyIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin: 10/@r auto 0;
  }

  nav {
    padding: 0 60/@r;
    margin: 45/@r 0 50/@r 0;
  }

  nav > div {
    float: left;
    width: 50%;
    text-align: center;
    font-size: 34/@r;
    font-family: "微软雅黑";
    line-height: 52/@r;
    font-weight: bold;
  }

  nav > div > a {
    display: inline;
    border-bottom: 4/@r solid transparent;
    color: #050505;
  }

  nav > div.active > a {
    border-color: #ffa948;
    color: #ffa948;
  }

  .passwodLogin {
    padding: 0 60/@r;
  }

  .inputBox > div {
    position: relative;
  }

  .inputBox input {
    width: 100%;
    border: none;
    border-bottom: 2/@r solid #dadedd;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 3;
    padding-top: 20/@r;
  }

  .passwordBox > i {
    position: absolute;
    width: 46/@r;
    height: 19/@r;
    right: 0;
    top: 58/@r;
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
    padding-right: 126/@r;
  }

  .otherOperation {
    margin-top: 25/@r;
    font: 25/@r/2 "微软雅黑";
  }

  .otherOperation > a {
    float: left;
    color: #ffa948;
  }

  .otherOperation > span {
    float: right;
    color: #666666;
  }

  .loginSubmit {
    margin-top: 50/@r;
    font-size: 38/@r;
    font-family: "微软雅黑";
    line-height: 98/@r;
  }

  .loginSubmit > a {
    width: 100%;
    text-align: center;
    color: #fff;
    background-color: #ffa948;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    box-shadow: 1/@r 3/@r 5/@r #aaa;
  }

  .otherLogin {
    margin-top: 34/@r;
    padding: 0 60/@r;
  }

  .otherLogin > strong {
    font-size: 25/@r;
    font-family: "微软雅黑";
    line-height: 3;
    color: #999999;
    display: block;
    width: 284/@r;
    margin: 0 auto;
    border-bottom: 2/@r solid #f2f2f2;
    position: relative;
    padding-top: 37/@r;
  }

  .otherLogin > strong > span {
    width: 206/@r;
    background-color: #fff;
    position: absolute;
    text-align: center;
    top: 0/@r;
    left: 50%;
    transform: translateX(-50%);
  }

  .otherLoginIcon {
    margin-top: 55/@r;
  }

  .otherLoginIcon > span {
    float: left;
    width: 33.3333%;
  }

  .weChantIcon > i {
    width: 51/@r;
    height: 42/@r;
    background: url("../../assets/img/userCenter/weChantIcon.png") no-repeat;
    margin: 5/@r auto 0;
  }

  .QQIcon > i {
    width: 44/@r;
    height: 49/@r;
    background: url("../../assets/img/userCenter/qqIcon.png") no-repeat;
    margin: 0 auto;
  }

  .microBlogIcon > i {
    width: 52/@r;
    height: 45/@r;
    background: url("../../assets/img/userCenter/microBlogIcon.png") no-repeat;
    margin: 2/@r auto;
  }

  .otherLoginIcon > span > i {
    display: block;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .inputBox > .messageBox {
    border-bottom: 1/@r solid #dadedd;
  }

  .inputBox > .messageBox > input {
    float: left;
    width: 50%;
  }

  .loginAccountNumber > input {
    padding-right: 50/@r;
  }

  .loginAccountNumber > span,
  .passwordBox > span {
    position: absolute;
    right: 0;
    top: 40/@r;
    height: 40/@r;
    width: 40/@r;
    font-size: 20/@r;
    color: #fff;
    line-height: 35/@r;
    text-align: center;
    background-color: #ccc;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .passwordBox > span {
    right: 80/@r;
  }

  .inputBox > .messageBox > button {
    float: left;
    width: 50%;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 3;
    margin-top: 21/@r;
    border: none;
    background-color: #fff;
    color: #999;
  }

  .messageBox > input {
    border-bottom: none;
  }


</style>
