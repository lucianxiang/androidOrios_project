<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>修改密码</strong>
    </header>
    <section>
      <div class="inputBox">
        <input type="password" placeholder="请输入旧密码" v-model="oldPassword">
        <input type="password" placeholder="请输入新密码" v-model="newPassword">
        <input type="password" placeholder="请确认新密码" v-model="repeatNewPassword">
        <div class="registerSubmit">
          <a href="javascript:;" @click="updateSubmit">提交</a>
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
        errCon: '',
        showErr: false,
        sucCon: '',
        showSuc: false,
        userInfo: {},
        accountNumber: '',
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    methods: {
      goTopPage() {
        this.$router.go(-1);
      },
      updateSubmit() {
        this.accountNumber = this.userInfo.sm_ui_UserCode;
        if (!this.oldPassword) {
          this.showErr = true;
          this.errCon = '请输入旧密码';
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
        if(this.repeatNewPassword != this.newPassword){
          this.showErr = true;
          this.errCon = '两次输入的密码不一致';
          return
        }
        let UpdatePassword = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "userCode": this.accountNumber,//当前用户的账号
          "oldPassword": this.oldPassword,//原来密码
          "newPassword": this.newPassword,//新密码
        };
        this.$store.dispatch('updatePassword',UpdatePassword)
          .then(suc=>{
            this.showSuc = true;
            this.sucCon = suc;
            setTimeout(()=>{
              sessionStorage.removeItem('userInfo')
              this.$router.push({name: 'UserLogin'})

            },300)
          },err=>{
            this.showErr = true;
            this.errCon = err;
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

  .passwordBox > input {
    padding-right: 46/@r;
  }

  .registerSubmit {
    margin-top: 100/@r;
  }

  .registerSubmit > a {
    width: 100%;
    display: block;
    font-size:34/@r;
    font-family:"微软雅黑";
    line-height:98/@r;
    background-color: #ffa948;
    color: #fff;
    text-align: center;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    box-shadow: 1/@r 2/@r 5/@r #a9a9a9;
  }

</style>
