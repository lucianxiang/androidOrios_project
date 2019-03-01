<template>
  <div>
    <div id="wrap">
      <header>
        <div class="headerTop clearfix">
          <router-link to="Home"></router-link>
          <strong>会员中心</strong>
          <div class="rightMenu" v-show="userInfo.sm_ui_Name">
            <i @click.stop="showMenu"></i>
            <div class="rightMenuList" v-show="showMenuList">
              <router-link to="UserInfo" class="editingInfo"><i></i><span>编辑资料</span></router-link>
              <router-link to="UpdatePassword" class="updatePassword"><i></i><span>修改密码</span></router-link>
              <a href="javascript:;"
                 @click.stop="outLogin"
                 class="outLogin"
                 v-show="userInfo.sm_ui_Name"
              ><i></i><span>退出登录</span></a>
              <!--<a href="javascript:;" class="setting" @click="goSetting"><i></i><span>设置</span></a>-->
            </div>
          </div>
        </div>
        <div class="userInfo clearfix">
          <div class="headImg">
            <img v-show="userInfo.sm_ui_HeadImage" :src="userInfo.sm_ui_HeadImage">
          </div>
          <div class="loginAndRegister">
            <router-link to="UserInfo" v-show="userInfo.sm_ui_Name">{{userInfo.sm_ui_Name}}</router-link>
            <router-link to="UserLogin" v-show="!userInfo.sm_ui_Name">登录</router-link>
            <span v-show="!userInfo.sm_ui_Name">/</span>
            <router-link to="UserRegister" v-show="!userInfo.sm_ui_Name">注册</router-link>
          </div>
        </div>
      </header>
      <section>
        <div class="myOrder">
          <strong class="clearfix"><em></em><span>我的订单</span></strong>
          <div class="clearfix">
            <a
              href="javascript:;"
              v-for="item,index in orderTypeList"
              :class="item.classN"
              @click="goOrderDetails(item,index)"
            >
              <i></i>
              <span>{{item.name}}</span>
              <em></em>
            </a>
          </div>
        </div>
        <div class="myWallet clearfix" @click="goMyWallet"><strong><em></em><span>我的钱包</span></strong><i></i></div>
        <div class="myCollection clearfix"><strong><em></em><span>我的收藏</span></strong><i></i></div>
        <div class="commonlyUsedInfo">
          <strong class="clearfix"><em></em><span>常用信息</span></strong>
          <div class="infoTop clearfix">
            <!--<a href="jaascript:;" class="myReview"><i></i><span>我的点评</span></a>-->
            <!--<a href="jaascript:;" class="travelRecord"><i></i><span>出行记录</span></a>-->
            <!--<a href="jaascript:;" class="myShare"><i></i><span>分享</span></a>-->
            <!--<a href="jaascript:;" class="myPoints"><i></i><span>我的积分</span></a>-->
          </div>
          <div class="infoBottom clearfix">
            <!--<a href="jaascript:;" class="collection"><i></i><span>我的收藏</span></a>-->
            <!--<a href="jaascript:;" class="visaProgress"><i></i><span>签证进度</span></a>-->
            <a href="jaascript:;" class="community" @click="goTopContacts"><i></i><span>常用联系人</span></a>
            <!--<a href="jaascript:;" class="more"><i></i><span>更多</span></a>-->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'userInfoObj',
      'userInfo'
    ]),
    data() {
      return {
        loginInfo:{},
        showMenuList: false,
        orderTypeList: [
          {
            classN: 'pendingPayment',
            name: '待付款'
          },
          {
            classN: 'waitTrip',
            name: '待出行'
          },
          {
            classN: 'toReview',
            name: '待点评'
          },
          {
            classN: 'allOrder',
            name: '全部订单'
          },
        ]
      }
    },
    created() {
      document.title = "个人中心";
      if (localStorage.getItem('userInfo')) {
        this.$store.commit('setUserInfo',JSON.parse(localStorage.getItem('userInfo')))
        if (!this.userInfo.sm_ui_Name) {
          this.initData(this.userInfo.sm_ui_ID);
        }
      }
    },
    methods: {
      //点击设置
      goSetting(){
        this.$router.push({name:'Setting'})
      },
//      退出登录
      outLogin() {
        sessionStorage.removeItem('userInfo');
        if (localStorage.getItem('userInfo')) {
          localStorage.removeItem('userInfo');
          localStorage.removeItem('userParams');
          this.$router.push({name:'Home'})
          this.$store.commit('setUserInfo',{})
//          setTimeout(()=>{
//            window.location.reload();
//          },100)
        }
      },
//      初始化用户信息
      initData(sm_ui_ID) {
        let selectUser = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "sm_ui_ID": sm_ui_ID ? sm_ui_ID : '',//标识
        };
        this.$store.dispatch('initUserInfo', selectUser)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
//      登录后得菜单栏
      showMenu() {
        this.showMenuList = !this.showMenuList;
      },
//      去订单详情页
      goOrderDetails(item, index) {
        if (!localStorage.getItem('userInfo')) {
          this.$router.push({name: 'UserLogin'})
        } else {
          this.$router.push({name: 'MyOrderDetails', query: {id: index}})
        }
      },
//      前往我的钱包
      goMyWallet() {
        if (!localStorage.getItem('userInfo')) {
          this.$router.push({name: 'UserLogin'})
        } else {
          this.$router.push({name: 'MyWallet'})
        }

      },
      //常用联系人
      goTopContacts() {
        if( !sessionStorage.getItem('userInfo') || !localStorage.getItem('userInfo') ){
          this.$router.push({name: 'UserLogin'})
        }else {
          this.$router.push({name: 'TopContacts'})
        }
      },
      //      登录
      loginSubmit() {

        let obj = JSON.parse(localStorage.getItem('userParams'))
        let userLogin = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "userID":obj.number ,//用户编码
          "password": obj.passworld//密码
        };
        this.$store.dispatch('loginSubmit', userLogin)
        .then(data => {
          sessionStorage.setItem('userInfo', JSON.stringify(data.data));
          this.$store.commit('setUserInfo',data.data)
          localStorage.setItem('userInfo', JSON.stringify(data.data));
//          this.initData( this.userInfo.sm_ui_ID);
        }, err => {
          this.errCon = err;
          this.showErr = true;
        })
      },
    },
    mounted() {
      document.addEventListener('click', () => {
        this.showMenuList = false;
      })
      let userInfo = localStorage.getItem('userInfo')
      if (localStorage.getItem('userParams') && !sessionStorage.getItem('userInfo')) {
        this.loginInfo = JSON.parse(localStorage.getItem('userParams'));
      }
      let fingerprint= Number(localStorage.getItem('fingerprint'))
      if(fingerprint&&!userInfo){
        var _this = this;
        let str = ''
//        mui.plusReady(function () {
//          plus.fingerprint.authenticate(function () {
//            _this.$vux.alert.hide()
//            _this.$vux.alert.show({
//              title: '请验证指纹',
//              buttonText:'取消',
//              content: '指纹识别成功',
//              onShow () {
//                console.log('Plugin: I\'m showing')
//              },
//              onHide () {
//                console.log('Plugin: I\'m hiding')
//              }
//            })
//            setTimeout(()=>{
//              _this.$vux.alert.hide()
//            },1000)
////            plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
//            _this.loginSubmit()
//          }, function (e) {
//            switch (e.code) {
//              case e.AUTHENTICATE_MISMATCH:
//                plus.nativeUI.toast('指纹匹配失败，请重新输入');
//                break;
//              case e.AUTHENTICATE_OVERLIMIT:
//                plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
//                plus.nativeUI.alert('指纹识别失败次数超出限制，请使用其它方式进行认证');
//                break;
//              default:
//                plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
//                plus.nativeUI.alert('指纹识别失败(' + e.code + ')，请重试');
//                break;
//            }
//          });
//          // Android平台弹出等待提示框
//          if ('Android' == plus.os.name) {
//            _this.$vux.alert.show({
//              title: '请验证指纹',
//              buttonText:'取消',
//              content: '请将手指放于指纹传感器上',
//              onShow () {
//                console.log('Plugin: I\'m showing')
//              },
//              onHide () {
//                console.log('Plugin: I\'m hiding')
//              }
//            })
////            plus.nativeUI.showWaiting('指纹识别中...');
//          }
//        })
      }

    }
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
    background-color: #ffa948;
  }

  .headerTop {
    height: 89/@r;
    border-bottom: 2/@r solid #ff9824;
    position: relative;
  }

  .headerTop > a {
    width: 41/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/homeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 24/@r 0 0 26/@r;
  }

  .headerTop > strong {
    position: absolute;
    font-size:29/@r;
    font-family:"微软雅黑";
    line-height:87/@r;
    color: #fff;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .rightMenu {
    float: right;
    width: 40/@r;
    height: 34/@r;
    position: relative;
    margin-right: 30/@r;
    margin-top: 27/@r;
  }

  .rightMenu > i {
    display: block;
    width: 40/@r;
    height: 34/@r;
    background: url("../../assets/img/home/menuIcon.png") no-repeat;
    -webkit-background-size: 40/@r 34/@r;
    background-size: 40/@r 34/@r;
    margin-right: 30/@r;
  }

  .rightMenuList {
    position: absolute;
    width: 300/@r;
    background-color: #fff;
    right: -10/@r;
    top: 60/@r;
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:2;
    padding: 10/@r 0;
    box-shadow: 0 0 5/@r #ccc;
    z-index: 3;
  }

  .rightMenuList:before {
    position: absolute;
    content: '';
    width: 20/@r;
    height: 20/@r;
    background-color: #fff;
    top: -18/@r;
    right: 20/@r;
    clip-path: polygon(50% 30%, 90% 100%, 10% 100%);
  }

  .rightMenuList > a {
    float: left;
    width: 100%;
    color: #999;
    border-bottom: 2/@r solid #ccc;
    position: relative;
    padding: 10/@r 0;
  }

  .rightMenuList > a:last-of-type {
    border: none;
  }

  .rightMenuList span {
    float: right;
    left: 30/@r;
    width: 70%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .outLogin i {
    background: url("../../assets/img/userCenter/peopleIcon.png") no-repeat;
  }

  .rightMenuList i {
    position: absolute;
    width: 45/@r;
    height: 45/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    left: 50/@r;
    top: 15/@r;
  }

  .editingInfo i {
    background: url("../../assets/img/userCenter/editingInfoIcon.png") no-repeat;
    width: 50/@r;
    height: 50/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .updatePassword i {
    background: url("../../assets/img/userCenter/passwordIcon.png") no-repeat;
    width: 50/@r;
    height: 50/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }


  .setting > i {
    background: url("../../assets/img/userCenter/setting.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .userInfo {
    height: 216/@r;
    padding: 72/@r 0 0 43/@r;
  }

  .headImg {
    float: left;
    margin-right: 20/@r;
    width: 86/@r;
    height: 86/@r;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #c5c5c5;
    overflow: hidden;
    background: url("../../assets/img/home/hlyIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headImg > img {
    width: 100%;
    height: 100%;
  }

  .loginAndRegister {
    float: left;
    font-size:34/@r;
    font-family:"微软雅黑";
    line-height:52/@r;
    margin-top: 34/@r;
  }

  .loginAndRegister > * {
    float: left;
    color: #fff;
  }

  .loginAndRegister > span {
    margin: 0 10/@r;
  }

  /*我的订单*/

  section {
    padding-bottom: 300/@r;
    background-color: #fff;
  }

  section > div {
    background-color: #fff;
  }

  section > div > strong {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:80/@r;
    color: #383838;
    display: block;
  }

  section > div > strong > em {
    float: left;
    width: 4/@r;
    height: 25/@r;
    margin: 27/@r 10/@r 0;
  }

  section > div > strong > span {
    float: left;
  }

  .myOrder {
    padding-bottom: 17/@r;
    border-bottom: 16/@r solid #e6e6e6;
  }

  .myOrder > strong > em {
    background-color: #117db5;
  }

  .myOrder > div {
    font-size:25/@r;
    font-family:"微软雅黑";
    line-height:43/@r;
    margin-top: 13/@r;
  }

  .myOrder > div > a {
    float: left;
    width: 25%;
    color: #4d4d4d;
    position: relative;
  }

  .myOrder > div > a > i {
    height: 50/@r;
    display: block;
    margin: 0 auto;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;

  }

  .myOrder > div > a > span {
    display: block;
    text-align: center;
  }

  .myOrder > div > a > em {
    width: 3/@r;
    height: 24/@r;
    background-color: #ebebeb;
    position: absolute;
    top: 13/@r;
    right: 0;
  }

  .pendingPayment > i {
    width: 56/@r;
    background: url("../../assets/img/userCenter/pendingPayment.png") no-repeat;
  }

  .waitTrip > i {
    width: 49/@r;
    background: url("../../assets/img/userCenter/waitTrip.png") no-repeat;
  }

  .toReview > i {
    width: 50/@r;
    background: url("../../assets/img/userCenter/review.png") no-repeat;
  }

  .allOrder > i {
    width: 37/@r;
    background: url("../../assets/img/userCenter/allOrder.png") no-repeat;
  }

  .myWallet,
  .myCollection {
    border-bottom: 16/@r solid #e6e6e6;
  }

  .myWallet > strong {
    float: left;
  }

  .myWallet > strong > em {
    background-color: #c9255d;
  }

  .myWallet > i,
  .myCollection > i {
    float: right;
    width: 13/@r;
    height: 23/@r;
    background: url("../../assets/img/userCenter/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 28/@r 30/@r 0 0;
  }

  .myCollection > strong > em {
    background-color: #2dbb55;
  }

  .commonlyUsedInfo > div {
    font-size:24/@r;
    font-family:"微软雅黑";
    line-height:58/@r;
  }

  .commonlyUsedInfo > strong > em {
    background-color: #dd7015;
  }

  .commonlyUsedInfo > div > a {
    float: left;
    width: 25%;
  }

  .commonlyUsedInfo > div > a > span {
    display: block;
    text-align: center;
  }

  .commonlyUsedInfo > div > a > i {
    height: 38/@r;
    display: block;
    margin: 0 auto;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .infoTop {
    padding: 14/@r 30/@r 13/@r;
    border-bottom: 1/@r solid #dadedd;
  }

  .myReview > i {
    width: 44/@r;
    background: url("../../assets/img/userCenter/myComment.png") no-repeat;
  }

  .travelRecord > i {
    width: 47/@r;
    background: url("../../assets/img/userCenter/travelRecord.png") no-repeat;
  }

  .myShare > i {
    width: 41/@r;
    background: url("../../assets/img/userCenter/share.png") no-repeat;
  }

  .myPoints > i {
    width: 32/@r;
    background: url("../../assets/img/userCenter/integral.png") no-repeat;
  }

  .infoBottom {
    margin-top: 30/@r;
    padding: 0 30/@r;
  }

  .collection > i {
    width: 40/@r;
    background: url("../../assets/img/userCenter/myCollection.png") no-repeat;
  }

  .visaProgress > i {
    width: 39/@r;
    background: url("../../assets/img/userCenter/visaProgress.png") no-repeat;
  }

  .community > i {
    width: 45/@r;
    background: url("../../assets/img/userCenter/community.png") no-repeat;
  }

  .more > i {
    width: 39/@r;
    background: url("../../assets/img/userCenter/more.png") no-repeat;
  }

  .more > span {
    color: #ffb362;
  }


</style>
