<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>{{type}}</strong>
    </header>
    <section>
      <div class="inputBox">
        <div class="clearfix">
          <strong>姓名</strong>
          <div>
            <input type="text" placeholder="出游人姓名" v-model="addOptions.ui_uc_Name">
          </div>
        </div>
        <div class="clearfix">
          <strong>身份证</strong>
          <div>
            <input type="text" placeholder="与出游人证件一致" v-model="addOptions.ui_uc_CertNo">
          </div>
        </div>
        <div class="clearfix">
          <strong>手机号</strong>
          <div>
            <input type="text" placeholder="用于接受旅程通知" v-model="addOptions.ui_uc_Phone">
          </div>
        </div>
        <div class="clearfix">
          <strong>备注</strong>
          <div>
            <input type="text" placeholder="选填" v-model="addOptions.ui_uc_Remark">
          </div>
        </div>
      </div>
      <a href="javascript:;" @click="addSubmit">确定</a>
    </section>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
    <toast v-model="showSuc" type="success" :text="sucCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'
  import {isPhoneNum, isCardNo} from '@/assets/js/public'

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
        addOptions: {
          "ui_uc_UserInfoID": "",//
          "ui_uc_Name": "",//常用联系人名称
          "ui_uc_Phone": "",//电话号码
          "ui_uc_CertNo": "",//身份证号
          "ui_uc_Remark": "",//备注
        },
        type: '',
        peopleList: [],
      }
    },
    created() {
      if (localStorage.getItem('peopleList')) {
        this.peopleList = JSON.parse(localStorage.getItem('peopleList'));
      }
      var updateTopContacts = {};
      if (sessionStorage.getItem('updateTopContacts')) {
        updateTopContacts = JSON.parse(sessionStorage.getItem('updateTopContacts'));
      }
      if (updateTopContacts) {
        if (updateTopContacts.ui_uc_ID && this.$route.query.id) {
          this.addOptions = JSON.parse(sessionStorage.getItem('updateTopContacts'));
          this.type = '修改出游人';
        } else {
          this.type = '添加出游人';
        }
      }
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if (!userInfo) {
        this.showErr = true;
        this.errCon = '请先登录'
        this.$router.push({name: 'UserLogin'})
        return
      } else {
        this.userInfo = userInfo;
        this.addOptions.ui_uc_UserInfoID = this.userInfo.sm_ui_ID;
      }
    },
    methods: {
      goTopPage() {
        this.$router.go(-1)
      },
      addSubmit() {
        if (!this.addOptions.ui_uc_Name) {
          this.showErr = true;
          this.errCon = "请输入姓名";
          return
        }
        if (!isCardNo(this.addOptions.ui_uc_CertNo)) {
          this.showErr = true;
          this.errCon = "请输入正确的身份证号";
          return
        }
        if (!isPhoneNum(this.addOptions.ui_uc_Phone)) {
          this.showErr = true;
          this.errCon = "请输入正确的手机号";
          return
        }
        if (!this.$route.query.id) {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "token": this.userInfo.token,
            "data": this.addOptions
          }
          this.$store.dispatch('addTopContacts', options)
            .then(suc => {
              this.showSuc = true;
              this.sucCon = suc;
              setTimeout(() => {
                this.$router.go(-1);
              }, 500)
            }, err => {
              this.showErr = true;
              this.errCon = err;
            })
        } else {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "token": this.userInfo.token,
            "data": this.addOptions
          }
          this.$store.dispatch('updateTopContacts', options)
            .then(suc => {
              this.showSuc = true;
              this.sucCon = suc;
              this.peopleList = this.peopleList.filter(item => {
                if (this.addOptions.ui_uc_ID == item.ui_uc_ID) {
                  return false
                }
                return true
              })
              this.peopleList.push(this.addOptions)
              localStorage.setItem('peopleList', JSON.stringify(this.peopleList))
              setTimeout(() => {
                this.$router.go(-1);
              }, 500)
            }, err => {
              this.showErr = true;
              this.errCon = err;
            })
        }

      },

    },
  }
</script>
<style scoped type="text/less" lang="less">

  @r: 30rem;

  input {
    border: none;
    background-color: transparent;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffa948;
    height: 88/@r;
    z-index: 2;
    box-shadow: 0 0 30/@r #999;
  }

  header > .leftIcon {
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/food/shouye_09.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 25/@r 0 0 30/@r;
  }

  header > strong {
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 38/@r;
    color: #fff;
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
    background-color: #f8f7f7;
    overflow: auto;
  }

  .inputBox {
    padding: 10/@r 30/@r 0;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 48/@r;
  }

  .inputBox > div {
    border-bottom: 1/@r solid #eaeaea;
    padding: 27/@r 0;
  }

  .inputBox strong {
    float: left;
    color: #5c5c5c;
    margin-right: 30/@r;
  }

  .inputBox > div > div {
    overflow: hidden;
  }

  .inputBox input {
    float: left;
    width: 100%;
    font-size: 28/@r;
    line-height: 48/@r;
    font-family: "微软雅黑";
    padding: 0 10/@r;
    color: #5c5c5c;
  }

  section > a {
    width: 616/@r;
    display: block;
    background-color: #ffa948;
    color: #ffffff;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 90/@r;
    margin: 90/@r auto 0;
    -webkit-border-radius: 45/@r;
    -moz-border-radius: 45/@r;
    border-radius: 45/@r;
    text-align: center;
    box-shadow: 0 0 30/@r #ffa948;
    letter-spacing: 10/@r;
  }


</style>
