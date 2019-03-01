<template>
  <div>
    <header>
      <div class="back" @click="goBack"><i></i></div>
      <strong>评论</strong>
      <span>发表评论</span>
    </header>
    <p class="commentLength">评论{{commentNum}}条</p>
    <section>
      <ul class="commitList">
        <li v-for="item,index in 0">
          <div class="headPortrait clearfix">
            <img src="../../assets/img/home/hlyIcon.png" alt="">
            <div>
              <strong>一个世界两个人</strong>
              <span>11-06 11:12</span>
            </div>
          </div>
          <div class="commentInfo">
            <p>这个酒店住着非常舒服，环境非常优美，挨着 海边，服务人员态度非常和善。这个酒店住着 非常舒服，环境非常优美，挨着海边，服务人</p>
            <ul class="commentImgList clearfix">
              <li v-for="item,index in 4"><img src="../../assets/img/home/hlyIcon.png" alt=""></li>
            </ul>
            <div class="fabulousNum clearfix" v-show="false">
              <a href="javascript:;"><i></i><em>20</em></a>
            </div>
          </div>
        </li>
        <li v-show="!commentNum" style="border-bottom: none;text-align: center;color: #999;padding-top: 50px;">暂无评论</li>
      </ul>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        hotelId: '',
        commentNum: 0,
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ID": "",       //产品评论编码
          "UserInfoID": "",  // 用户信息编码
          "GoodID": "",       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "4",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
          "page": 1,
          "rows": 5,
        }
      }
    },
    created(){

    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ID": "",       //产品评论编码
          "UserInfoID": "",  // 用户信息编码
          "GoodID": "",       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "2",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
          "page": 1,
          "rows": 10,
        }
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
    height: 88/@r;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #cdcdcd;
  }

  .back {
    position: absolute;
    padding: 20/@r;
    left: 10/@r;
    top: 6/@r;
  }

  .back i {
    display: block;
    background: url("../../assets/img/userCenter/leftIcon.png") no-repeat;
    width: 19/@r;
    height: 35/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  header strong {
    font-size: 30/@r;
    line-height: 88/@r;
    text-align: center;
    display: block;
    font-family: "微软雅黑";
    color: #656464;
  }

  header span {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 28/@r;
    line-height: 88/@r;
    padding: 0 30/@r;
    color: #ffa837;

  }

  .commentLength {
    height: 83/@r;
    border-bottom: 1px solid #cdcdcd;
    position: fixed;
    top: 88/@r;
    left: 0;
    width: 100%;
    font-size: 28/@r;
    line-height: 83/@r;
    font-weight: bold;
    font-family: "微软雅黑";
    padding-left: 50/@r;
    color: #292929;
  }

  section {
    position: fixed;
    top: 171/@r;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .commitList > li {
    border-bottom: 20/@r solid #e6e6e6;
    padding: 20/@r 30/@r 20/@r 50/@r;
  }

  .headPortrait > img {
    width: 68/@r;
    height: 68/@r;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    float: left;
  }

  .headPortrait > div {
    float: left;
    padding: 18/@r 0 0 20/@r;
  }

  .headPortrait strong {
    display: block;
    font-size: 26/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    color: #ffa837;
  }

  .headPortrait span {
    display: block;
    font-size: 26/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    color: #9e9c9c;
  }

  .commentInfo {
    padding-top: 14/@r;
  }

  .commentInfo > p {
    font-size: 26/@r;
    line-height: 48/@r;
    font-family: "微软雅黑";
    color: #585858;
  }

  .commentImgList > li {
    float: left;
    margin: 10/@r 10/@r 0 0;
  }

  .commentImgList > li:nth-of-type(3n) {
    margin-right: 0;
  }

  .commentImgList img {
    width: 215/@r;
    height: 190/@r;
  }

  .fabulousNum {
    padding-top: 23/@r;
  }

  .fabulousNum > a {
    float: right;
    margin-top: 23/@r;
  }

  .fabulousNum i {
    float: left;
    width: 30/@r;
    height: 30/@r;
    background: url("../../assets/img/hotel/fabulousIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .fabulousNum em {
    float: left;
    font-size: 24/@r;
    color: #9e9c9c;
    margin: 7/@r 0 0 5/@r;
    line-height: 1;
    font-family: "微软雅黑";
  }


</style>
