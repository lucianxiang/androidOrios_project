<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
      </div>
      <div class="searchBox">
        <div class="currentLocation">
          <i></i>
          <span>四川</span>
          <em></em>
        </div>
        <div class="searchInput">
          <i></i>
          <input type="text" placeholder="搜索目的地/关键字">
        </div>
      </div>
      <div class="rightIcon">
        <a href="javascript:;" class="centerIcon"></a>
        <a href="javascript:;" class="menuIcon"></a>
      </div>
    </header>
    <section>
      <!--轮播图-->
      <div class="foodImageBox">
        <div class="exhibitionImage" id="exhibitionImage">
          <img  src="@/assets/img/food/dm1.jpg">
        </div>
      </div>
      <!--商品详情-->
      <div class="recommendBox">
         <div class="recommendBoxOne">

              <div class="recommendBoxOneName">招牌红烧鲤鱼</div>
              <div class="recommendBoxOneNum"><span>月售</span>198</div>
              <div class="recommendBoxOnePrice">￥78
                <img  src="@/assets/img/food/add.png">
              </div>

         </div>
         <div class="recommendBoxTwo">
           <div class="recommendBoxTwoName">商品详情</div>
           <div class="recommendBoxTwoContent">麻辣鲜香，正宗新鲜河鱼，一个字嫩。</div>
         </div>
      </div>
      <!--商品评价-->
      <div class="foodEvaluateInfo">
         <div class="foodEvaluateInfoEvaluate">
           <span class="foodEvaluateInfoEvaluateSpan1">商品评价</span>
           <span  class="foodEvaluateInfoEvaluateSpan2">(好评度 <span> 100%</span>）</span>
           <div>36条评论></div>
         </div>
         <div class="foodEvaluateInfoContent">
           <img  src="@/assets/img/food/ni.jpg">

              <span class="foodEvaluateInfoContentSpan">匿名用户</span><br/>
              <div class="foodEvaluateInfoContentDiv1" >2018.8.9</div>
              <div class="foodEvaluateInfoContentDiv">之前点过几次都挺好的，味道非常正宗，非常给力</div>

         </div>
      </div>
      <a href="javascript:;">确认添加</a>
    </section>
    <!--<toast v-model="showErr" type="cancel" :text="errCon"></toast>-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    components: {
      Toast
    },
    computed: mapGetters([


    ]),
     created(){

     },
    data() {
      return {


      }
    },
    methods: {



    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: relative;
    padding: 16/@r 30/@r 16/@r 26/@r;
  }

  .leftIcon {
    float: left;
  }

  .homeIcon {
    float: left;
    width: 41/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/homeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 33/@r;
    margin-top: 8/@r;
  }

  header > strong {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 33/@r;
    line-height: 41/@r;
    font-family: "微软雅黑";
    color: #efeff1;
  }

  .rightIcon {
    float: right;
    margin-top: 10/@r;
  }

  .centerIcon {
    float: left;
    width: 32/@r;
    height: 37/@r;
    background: url("../../assets/img/home/userIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 2/@r;
    margin-right: 30/@r;
  }

  .menuIcon {
    float: left;
    width: 40/@r;
    height: 34/@r;
    background: url("../../assets/img/home/menuIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 3/@r;
  }

  .searchBox {
    width: 500/@r;
    height: 56/@r;
    float: left;
    background-color: #fff;
    padding: 13/@r 26/@r;
    font-size: 22/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .currentLocation {
    float: left;
    width: 115/@r;
    border-right: 1/@r solid #e6e6e6;
  }

  .currentLocation > i {
    float: left;
    width: 22/@r;
    height: 26/@r;
    background: url("../../assets/img/ticket/locationB.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 2/@r;
    margin-right: 6/@r;
  }

  .currentLocation > span {
    float: left;
    color: #343432;
    width: 55/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .currentLocation > em {
    float: right;
    width: 17/@r;
    height: 9/@r;
    background: url("../../assets/img/ticket/down.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 11/@r 13/@r 0 0;
  }

  .searchInput {
    float: left;
    width: 333/@r;
  }

  .searchInput > i {
    float: left;
    width: 26/@r;
    height: 25/@r;
    background: url("../../assets/img/ticket/searchIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 3/@r 5/@r 0 8/@r;
  }

  .searchInput > input {
    float: left;
    width: 294/@r;
    border: none;
    font-size: 22/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    color: #a5a5a5;
  }

  section {
    background-color: #dcdce1;
    padding-bottom: 100/@r;
  }

  .foodImageBox img {
    width: 100%;
  }

  .recommendBox {
    background-color: #ffffff;
    margin-bottom: 22/@r;
    padding: 25/@r;
  }
  .recommendBoxOne{
     height: 161/@r;
     border-bottom: 1/@r solid #d8d9de;
  }
  .recommendBoxOneName{
    font-size:31/@r ;
    font-family: '微软雅黑';
  }
  .recommendBoxOneNum{
    margin-top: 10/@r;
    font-size:21/@r ;
    color: #848484;
  }
  .recommendBoxOneNum span{
    margin-right: 15/@r;
  }
  .recommendBoxOnePrice{
    color: #dd2b15;
    font-size: 30/@r;
  }
  .recommendBoxOnePrice img{
   position: relative;
    height: 40/@r;
    width: 40/@r;
    left: 550/@r;
    top: 1/@r;
  }
  .recommendBoxTwoName{
    margin-top: 20/@r;
    font-size: 30/@r;
  }
 .recommendBoxTwoContent{
   margin-top: 10/@r;
   font-size:21/@r ;
   color: #848484;
 }
  .foodEvaluateInfo{
    background-color: #ffffff;
    height: 290/@r;
    padding: 10/@r;

  }
  .foodEvaluateInfoEvaluate{
    height: 72/@r;
    border-bottom: 1/@r solid #d8d9de;
    margin-left: 10/@r;

  }
  .foodEvaluateInfoEvaluateSpan1{
    font-size: 30/@r;
    margin-right: 10/@r;
  }
  .foodEvaluateInfoEvaluateSpan2{
    font-size: 20/@r;
  }
  .foodEvaluateInfoEvaluateSpan2 span{
    color: red;
  }
  .foodEvaluateInfoEvaluate div{
    float: right;
    margin-top: 10/@r;
    margin-right: 10/@r;
    font-size:23/@r ;
    color: #848484;
  }
  .foodEvaluateInfoContent{
    padding: 10/@r;
    height: 160/@r;
    border-bottom: 1/@r solid #d8d9de;
  }
  .foodEvaluateInfoContent img{
    float: left;
    height:100/@r ;
    width:100/@r ;
    margin-top: 20/@r;
    border-radius: 50%;
  }

  .foodEvaluateInfoContentSpan{
     margin-left: 30/@r;
    font-size: 31/@r;
    font-weight: bold;
  }
  .foodEvaluateInfoContentDiv{
    width: 70%;
    margin-left: 130/@r;
    margin-top: 10/@r;
    font-size: 22/@r;
  }
  .foodEvaluateInfoContentDiv1{
    float: right;
    margin-top: -15/@r;
    font-size: 20/@r;
    color: darkgray;
  }
  .currentRecommend > strong {
    position: relative;
    display: block;
    height: 40/@r;
  }

  .currentRecommend > strong > span {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .loLeft {
    position: absolute;
    top: 17/@r;
    left: -168/@r;
    width: 156/@r;
    height: 6/@r;
    background: url("../../assets/img/ticket/loLeft.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .loRight {
    width: 156/@r;
    height: 6/@r;
    position: absolute;
    top: 17/@r;
    right: -168/@r;
    width: 156/@r;
    height: 6/@r;
    background: url("../../assets/img/ticket/loRight.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .currentRecommendList {
    padding: 9/@r 10/@r 0;
  }

  .currentRecommendList img {
    width: 209/@r;
    height: 138/@r;
    float: left;
  }

  .currentRecommendList > li {
    padding: 24/@r 20/@r 24/@r 16/@r;
    border-bottom: 1/@r solid #d8d9de;
  }

  .scenicAbout {
    float: left;
    margin-left: 16/@r;
  }

  .scenicAbout > strong {
    font-size: 28/@r;
    line-height: 34/@r;
    font-family: "微软雅黑";
    display: block;
    color: #000;
  }

  .scenicAbout > span {
    font-size: 19/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
  }

  .Popularity {
    color: #c9255d;
    float: left;
  }

  .scenicAbout em {
    float: left;
    width: 13/@r;
    height: 16/@r;
    background: url("../../assets/img/food/Popularity.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 14/@r;
    margin-right: 30/@r;
  }

  .perCapita {
    float: left;
    color: #5a5a5a;
  }

  .thisLabel {
    margin-top: 3/@r;
  }

  .thisLabel > span {
    float: left;
    margin-right: 19/@r;
    border: 1/@r solid #c2c2c2;
    color: #5a5a5a;
    padding: 0 5/@r;
    font-size: 18/@r;
    line-height: 22/@r;
    font-family: "微软雅黑";
  }

  .commentNum {
    float: right;
    font-size: 23/@r;
    line-height: 28/@r;
    font-family: "微软雅黑";
    color: #9e9e9e;
    margin-top: 3/@r;
  }

  .commentNum > span {
    float: left;
  }

  .commentNum > i {
    float: left;
    width: 10/@r;
    height: 17/@r;
    background: url("../../assets/img/userCenter/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 5/@r;
    margin-left: 3/@r;
  }
  .exhibitionImage {
    height: 100%;
    transition: .5s;
  }

  .exhibitionImage > img {
    float: left;
    height: 100%;
  }
  .foodImageBox {
    width: 100%;
    height: 328/@r;
    overflow: hidden;
  }

.aboutPrice{
  float: right;
}
  .distance > i {
    float: left;
    width: 14/@r;
    height: 17/@r;
    background: url("../../assets/img/ticket/locationS.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 10/@r;
    margin-right: 5/@r;
  }

  .distance {
    display: block;
    font-size: 20/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #5a5a5a;
    margin-top: 20/@r;
  }

  .distance > em {
    float: left;
  }
  section > a {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #dd7015;
    height: 98/@r;
    color: #fff;
    text-align: center;
    font-size: 34/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
  }
</style>
