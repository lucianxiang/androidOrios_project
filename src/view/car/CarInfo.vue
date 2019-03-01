<template>
  <div>
    <header class="clearfix">
      <a href="" class="back"></a>
      <!--标题-->
      <strong class="title">车辆详情</strong>
    </header>
    <section>
      <!--图片盒子-->
      <div class="imgBox">
        <img src="../../assets/img/car/detailCar.png" height="120/@r" width="340/@r"/>
      </div>
      <!--内容详情-->
      <div class="detail">
        <div class="explain">系统所选车型号以及颜色仅供参考</div>
        <ul class="other">
          <li>三车厢</li>
          <li>1.6L</li>
          <li>自动挡</li>
          <li>准乘5人</li>
        </ul>
        <div class="price">
          ￥300/ 日均
        </div>
      </div>
      <!--联系-->
      <div class="relation">
        <div class="boxLeft">
          <div class="leftTop">
            <span class="store">江阳区店</span>
          </div>
          <div class="leftBotton">
            江阳区长江大桥北
          </div>
        </div>
        <div class="boxMiddle"></div>
        <div class="boxRight">
          <div class="boxRightImg">
            <!--<img src="../../assets/img/car/phone.png" height="51" width="64"/>-->
          </div>
          <span>0830-226556568</span>
        </div>
      </div>
      <!--预定-->
      <div class="reserve">
        <div class="reserveBox">立即预定</div>
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

      }
    },
    created() {

    },
    methods: {

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
    background-color: rgb(247,247,248);
    /*margin-top: 88/@r;*/
    margin-top: 88/@r;
    padding-bottom: 10/@r;
  }
  .imgBox{
    margin:0 20/@r;
    height:250/@r;
  }
  .detail{
    height:250/@r;
    /*background-color: royalblue;*/
  }
  .explain{
    height:75/@r;
    letter-spacing: 2/@r;
    font-size: 30/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
    /*background-color: red;*/
    border-bottom:1/@r solid silver;
    padding-left: 40/@r;
    margin:0 20/@r;
    color: #636363;
  }
  .other{
    padding-left: -40/@r;
    height:75/@r;
    /*background-color: rosybrown;*/
  }
  .other>li{
    float: left;
    font-size: 25/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
    color: #636363;
    /*list-style: image(../../assets/img/car/dian.png);*/
    /*list-style-image: url("../../assets/img/car/dian.png");*/
  }
  .other>li:before{
    float: left;
    content: '';
    display: block;
    width: 18/@r;
    height: 18/@r;
    background-color: #757575;
    margin: 28/@r 10/@r 0 50/@r ;
    border-radius: 50%;
  }
  .price{
    height:100/@r;
    /*background-color: rebeccapurple;*/
    font-size: 25/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    text-align: right;
    padding-right: 50/@r;
  }
  .relation{
    height: 200/@r;
    /*background-color: rebeccapurple;*/
    margin: 20/@r 20/@r 0 20/@r;
  }
  .boxLeft{
    height: 200/@r;
    width: 60%;
    /*background-color: red;*/
    float: left;
  }
  .leftTop{
    height:100/@r;
    /*background-color: royalblue;*/
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
  }
  .store{
    /*font-size: 50/@r;*/
  }
  .store:before{
    content: '';
    float: left;
    display: block;
    width: 30/@r;
    height: 30/@r;
    /*background-color: red;*/
    background-image: url('../../assets/img/car/location.png');
    background-size:30/@r 30/@r;
    margin: 35/@r 10/@r 0 20/@r ;
  }
  .leftBotton{
    height:100/@r;
    /*background-color: yellow;*/
    font-size: 30/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
    padding-left: 20/@r;
  }
  .boxMiddle{
    float: left;
    border-left:1/@r solid #7d7d7d;
    height:100/@r;
    margin-top: 50/@r;
  }
  .boxRight{
    float: right;
    height: 200/@r;
    width: 250/@r;
  }
  .boxRightImg{
    width: 250/@r;
    height: 100/@r;
    background: url("../../assets/img/car/phone.png") no-repeat;
    background-position: 70/@r 45/@r;
    background-size: 70/@r ;
  }
  .reserve{
    height: 150/@r;
    /*background-color: red;*/
    position: fixed;
    bottom:0;
    width:100%;
  }
  .reserveBox{
    height: 80/@r;
    width: 300/@r;
    background-color: rgb(255,147,64);
    float: right;
    text-align: center;
    line-height: 80/@r;
    margin: 30/@r 50/@r 0 0 ;
    border-radius: 10/@r;
  }
</style>
