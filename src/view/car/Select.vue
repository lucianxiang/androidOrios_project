<template>
  <div>
    <header class="clearfix">
      <a href="" class="back"></a>
      <!--标题-->
      <strong class="title">筛选</strong>
    </header>
    <section>
      <!--导航-->
      <div class="nav">
        <div class="navBox">
          <a :class="{active:index==navAIndex}" href="javascript:;" v-for="item,index in navList" @click="clickNav(item,index)">{{item.name}}</a>
        </div>
      </div>
      <!--内容区域-->
      <div class="container">
        <!--内容盒子-->
        <div class="contentBox" v-for="item,index in 3">
          <!--名称-->
          <span class="contentName">不限</span>
          <!--选择图标-->
          <div class="contentSelect clearfix">
            <img v-show="isShowNoImg" src="../../assets/img/car/noSelect1.png" height="20" width="20"/>
            <img v-show="isShowYesImg" src="../../assets/img/car/yesSelect.png" height="20" width="20"/>
          </div>
        </div>
        <!--按钮-->
        <ul class="butBox">
          <li class="cansle">取消</li>
          <li class="sure">确定</li>
        </ul>
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
        isShowNoImg:false,
        isShowYesImg:true,
        navAIndex:0,
        //导航菜单
        navList:[
          {"name":"按车型"},
          {"name":"按品牌"},
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
    /*height: 2000/@r;*/
    /*background-color: #eeeeee;*/
    background-color: white;
    /*margin-top: 88/@r;*/
    margin-top: 88/@r;
    padding-bottom: 10/@r;
  }

  .nav{
    background-color: white;
    height:100/@r;
  }

  .navBox{
    margin: 0 auto;
    /*background-color: red;*/
    width: 374/@r;
  }

  .nav>.navBox>a{
    float: left;
    height:100/@r;
    width:187/@r;
    text-align: center;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    /*background-color: royalblue;*/
  }
  section>.nav>.navBox>a.active{
    color: rgb(255,164,95);
  }

  .contentBox{
    height:100/@r;
    background-color: white;
    border-bottom: 1/@r solid silver;
  }

  .carPrice>span{
    color: rgb(246,181,69);
  }

  .contentName{
    line-height: 100/@r;
    margin-left: 50/@r;
  }
  .contentSelect{
    width: 40/@r;
    height: 40/@r;
    /*background-color: red;*/
    float: right;
    margin: 25/@r 50/@r 0 0 ;
  }
  .butBox{
    position: fixed;
    bottom:0;
    width:100%;
  }
  .cansle{
    float: left;
    height: 100/@r;
    width:50%;
    text-align: center;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    color: #b1b1b1;
    border-top: 1/@r solid #dcdcdc;
    box-sizing: content-box;
  }
  .sure{
    float: left;
    height: 100/@r;
    width:50%;
    background-color: rgb(255,147,64);
    text-align: center;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    color: white;
  }


</style>
