<template>
  <div>
    <header class="clearfix">
      <a href="" class="back"></a>
      <strong class="title">选择车型</strong>
    </header>
    <section>
      <!--导航条-->
      <div class="nav">
        <a :class="{active:index==navAIndex}" href="javascript:;" v-for="item,index in navList" @click="clickNav(item,index)">{{item.name}}</a>
        <a class="selectA" href="javascript:;"><em class="navImg"></em>筛选</a>
      </div>
      <!--内容-->
      <div class="container">
        <div class="contentBox" v-for="item,index in 3">
          <img class="contentBoxLeftImg" src="../../assets/img/car/car1.png" height="200" width="200"/>
          <div class="contentBoxRight">
              <h1 class="carName">起亚 K4</h1>
              <div class="carDetail">三厢|1.6自动|乘坐 5 人</div>
              <div class="carPrice"><span >￥300</span>/日均</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapGetters } from 'vuex'
  import {Toast,Datetime,Group} from 'vux'

  export default {
    components: {

    },
    computed: mapGetters([

    ]),
    data() {
      return {
        navAIndex:0,
        //导航菜单
        navList:[
          {"name":"全部"},
          {"name":"手动挡"},
          {"name":"自动挡"},
//          {"name":"筛选"},
        ],
      }
    },
    created() {
    },
    methods: {
      clickNav(item,index){
        console.log(item,index)
        //改变css
        this.navAIndex=index;
      },
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .back{
    display: block;
    float: left;
    border-left:1/@r solid white;
    border-bottom:1/@r solid white;
    width:30/@r;
    height: 30/@r;
    transform: rotate(45deg);
  }
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 24/@r 30/@r 23/@r 26/@r;
    z-index: 2;
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

  .title{
    line-height:88/@r;
    float: left;
    height:88/@r;
    margin-top: -25/@r;
  }

  section {
    background-color: rgb(247,247,248);
    margin-top: 88/@r;
    padding-bottom: 500/@r;
  }

  .nav{
    margin-bottom: 20/@r;
    background-color: white;
    height:100/@r;
  }

  .nav>a{
    float: left;
    height:100/@r;
    width:187/@r;
    text-align: center;
    font-size: 35/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    /*color: #6f6f6f;*/
  }
  section>.nav>a.active{
    color: rgb(255,164,95);
  }

  .navImg{
    float: left;
    /*background-color: red;*/
    display: block;
    width: 35/@r;
    height: 35/@r;
    margin: 30/@r 0 0 20/@r;
    background: url("../../assets/img/car/loudou.png") no-repeat ;
    background-size: 35/@r 35/@r;
  }

  .selectA{
    /*background-color: tomato;*/
    padding-right:40/@r;
  }

  .contentBox{
    height:210/@r;
    background-color: #fff;
    margin-bottom:20/@r;
  }
  .contentBoxLeftImg{
    display: block;
    float: left;
    width: 200/@r;
    height: 200/@r;
    /*background-color: red;*/
  }
  .contentBoxRight{
    height:210/@r;
    margin-left:200/@r;
  }
  .carName{
    height:66/@r;
    /*background-color: rosybrown;*/
    text-align: left;
    /*margin-top:10/@r;*/
    line-height:96/@r;
    font-weight: 700;
  }
  .carDetail{
    height:66/@r;
    /*background-color: rebeccapurple;*/
    border-bottom:2/@r solid #e2e2e2;
    text-align: left;
    line-height:66/@r;
  }
  .carPrice{
    height:66/@r;
    /*background-color: royalblue;*/
    text-align: left;
    line-height:66/@r;
  }
  .carPrice>span{
    color: rgb(246,181,69);
  }


</style>
