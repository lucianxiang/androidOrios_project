<template>
  <div>
    <header>
      <div class="goBack" @click="goBack"><i></i><span>返回</span></div>
      <strong>扫描结果</strong>
    </header>
    <section>
      <div>
        <img src="../../assets/img/home/hlyIcon.png" alt="" v-show="!userInfo.sm_ui_HeadImage">
        <img v-lazy="userInfo.sm_ui_HeadImage" v-show="userInfo.sm_ui_HeadImage" alt="">
        <strong>{{userInfo.sm_ui_Name}}</strong>
        <a href="javascript:;" @click="submit">允许登录惠乐游</a>
      </div>
    </section>
    <toast v-model="showSuc" :type="type" :text="sucCon"></toast>
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
        type:'success',
        sucCon:'登录成功',
        showSuc:false,
        barcodeID:''
      }
    },
    created(){
      if( localStorage.getItem('userInfo') ){
        this.barcodeID = this.$route.query.barcodeID
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.userParams = JSON.parse(localStorage.getItem('userParams'))
      }else{
        this.$router.push({name:'UserLogin'})
        return
      }
    },
    methods: {
      //允许登录
      submit(){
        console.log(this.barcodeID)
        console.log(this.userParams.number)
        console.log(this.userParams.passworld)
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "ts_vc_Verification":  this.barcodeID,//扫描二维码获得的值
          "sm_ui_UserCode": this.userParams.number,  //账号
          "sm_ui_Password": this.userParams.passworld,  //密码
        }
        this.$store.dispatch('SweepCodeSubmit',options)
        .then((res)=>{
          this.sucCon = res;
          this.showSuc = true;
          this.$router.push({name:'Home'})
        },err=>{
          this.type='warn';
          this.sucCon = err;
          this.showSuc = true;
        })
      },
      goBack(){
        this.$router.push({name:'Home'})
//        this.$router.go(-1);
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
    background-color: #429ffe;
    height: 88/@r;
    padding: 14/@r 0;
    width: 100%;
  }

  header strong {
    display: block;
    font-size: 30/@r;
    line-height: 2;
    text-align: center;
    font-family: "微软雅黑";
    color: #fff;
  }

  .goBack {
    position: absolute;
    top: 14/@r;
    left: 30/@r;
  }

  .goBack > i {
    float: left;
    width: 20/@r;
    height: 40/@r;
    margin-top: 10/@r;
    background: url("../../assets/img/userCenter/walletLeftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .goBack > span {
    float: left;
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #fff;
    margin-left: 5/@r;
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
  }

  section > div {
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    padding: 0 30/@r;
  }

  section img {
    display: block;
    width: 150/@r;
    height: 150/@r;
    margin: 0 auto;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  section strong {
    display: block;
    font-size: 28/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    margin-top: 20/@r;
    text-align: center;
    color: #333;
  }

  section a {
    display: block;
    margin-top: 100/@r;
    font-size: 28/@r;
    line-height: 2.5;
    font-family: "微软雅黑";
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    text-align: center;
    color: #fff;
    background-color: #1eb9f2;
  }


</style>
