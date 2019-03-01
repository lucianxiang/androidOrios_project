<template>
  <div>
    <header>
      <div></div>
      <strong class="back" @click="backPage">返回</strong>
      <strong  class="order">订单详情2</strong>
      <span></span>
    </header>
    <section>
      <!--轮播图-->
      <div class="foodImageBox">
        <div class="exhibitionImage" id="exhibitionImage">
          <img  src="@/assets/img/food/dm1.jpg">
        </div>
      </div>
      <!--订单详情信息-->
      <div class="foodDetailInfo">
        <ul>
          <li>
            <div  class="foodDetailInfoLiTime">
              <span>时间</span>
              <select>
                  <option>上午</option>
                  <option>中午</option>
                   <option>下午</option>
              </select>
              <div>
                   <img  src="@/assets/img/food/rl.png">
                   05-09 <span style="margin-left:5/@r">周四</span>
              </div>
            </div>
          </li>
          <li>
            <div class="foodDetailInfoLiPerson">
              <span>人数</span>
              <div class="DetailNum">
                <div>-</div>
                <div>3</div>
                <div class="DetailAdd">+</div>
              </div>
            </div>
          </li>
          <li>
            <div class="foodDetailInfoLiCar">
              <span>车位</span>
              <div class="DetailNum">
                <div>-</div>
                <div>0</div>
                <div class="DetailAdd">+</div>
              </div>
            </div>
          </li>
          <li>
            <div class="foodDetailInfoLiHome">
              <span>房间</span>
              <div>
                <lable ><input class="btn" type="radio" name="radio2" value="radio单选项1"/><em class="btnEm1">大厅</em></lable>
                <label><input  class="btn" style="margin-left: 30/@r;" type="radio" name="radio2" value="radio单选项2"/><em class="btnEm2">包间</em></label>
              </div>
            </div>
          </li>


        </ul>

      </div>

      <!--预定-->
      <div class="foodReserve">
        <div class="foodReserveContent">
          <em >预定费</em>
          <span >方便快捷，无需等待，到店就位</span>
          <div >￥30</div>
        </div>
      </div>
      <!--优惠-->
      <div class="foodDiscount">
        <div class="foodDiscountContent">
          <span>优惠券</span>
          <div>暂无可用></div>
        </div>
        <div class="foodDiscountPrice">
          <span>实付金额</span>
          <div >￥10000元</div>
        </div>
      </div>
      <a href="javascript:;">提交订单</a>
    </section>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        showList: false
      }
    },
    methods: {
      initData() {
      },
      search() {
        this.initData()
      },
      showListBtn (){
        this.showList = !this.showList;
      },
      backPage(){
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

  header {
    position: fixed;
    height: 88/@r;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #2dbb55;
    padding: 27/@r 30/@r 26/@r 30/@r;
  }
  .back{
    margin-left: 10/@r;
    float: left;
    font-size: 30/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #fff;
  }
  header div {
    width: 19/@r;
    height: 35/@r;
    background: url('../../assets/img/ticket/leftIcon.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  .order {
    font-size: 30/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #fff;
    margin-left: 200/@r;
  }
  .foodImageBox {
    width: 100%;
    height: 328/@r;
    /*overflow: hidden;*/
  }
  .foodImageBox img{
    width: 100%;
  }
  .exhibitionImage {
    height: 100%;
    transition: .5s;
  }
  .exhibitionImage > img {
    float: left;
    height: 100%;
  }


  .foodDetailInfo{
    padding:30/@r 10/@r 0/@r 10/@r;
    background-color: #fff;
    width: 100%;
    margin-top: 20/@r;
  }
  .foodDetailInfoLiTime{
    border-bottom: 1/@r solid #dcdce1;
    padding:0/@r 0/@r 15/@r 0/@r ;
  }
  .foodDetailInfoLiTime >span{
    margin-left: 10/@r;
    font-size:30/@r;
  }
  .foodDetailInfoLiTime >select{
    font-size:30/@r;
    float: right;
    margin-right: 5/@r;
  }

  .foodDetailInfoLiTime >Div{
    font-size:30/@r;
    float: right;
    margin-right: 80/@r;
  }

  .foodDetailInfoLiTime >Div>img{
    margin-top: 5/@r;
    height: 40/@r;
    width: 40/@r;
  }
  .foodDetailInfoLiPerson{
    padding:20/@r 10/@r 20/@r 10/@r ;
    border-bottom: 1/@r solid #dcdce1;
  }
  .foodDetailInfoLiPerson>span{
    font-size:30/@r;
  }
  .DetailNum{
    font-size: 30/@r;
    float: right;
  }
  .DetailAdd{
    color: #2dbb55;
  }
  .DetailNum>div{
   line-height: 25/@r;
    float: left;
    border: 1/@r solid #dcdce1;
    height: 40/@r;
    width: 40/@r;
    padding: 8/@r 10/@r ;
  }
  .foodDetailInfoLiCar{
    padding:20/@r 10/@r 20/@r 10/@r ;
    border-bottom: 1/@r solid #dcdce1;
  }
  .foodDetailInfoLiCar>span{
    font-size:30/@r;
    color: #e0e0e4;
  }
  .foodDetailInfoLiHome{
    padding:20/@r 10/@r 20/@r 10/@r ;
    /*border-bottom: 1/@r solid #dcdce1;*/
  }
  .foodDetailInfoLiHome>span{
    font-size:30/@r;
  }
  .foodDetailInfoLiHome>Div{
    float: right;
    font-size:30/@r;
  }
  .btnEm1{

    position: relative;
    top:-10/@r ;
    margin-left: 15/@r;
  }
  .btnEm2{
    position: relative;
    top:-10/@r ;
    margin-left: 15/@r;
  }
  .btn{

     width:50/@r;height:50/@r;
  }
  /*预定*/
  .foodReserve{
    padding:20/@r;
    margin-top:20/@r;
    background-color: white;
  }
  .foodReserveContent>em{
    font-size: 30/@r;
  }
  .foodReserveContent>span{
    margin-left: 100/@r;
    font-size: 25/@r;
    color:#b2b2b2;
  }
  .foodReserveContent>div{
    float: right;
    font-size:30/@r ;
    margin-right:20/@r;
    color: #dd2b15;
  }
  /*优惠*/
  .foodDiscount{
    margin-top: 20/@r;
    background-color: #ffffff;
    padding:20/@r ;
    height: 300/@r;
  }
  .foodDiscountContent{
    border-bottom: 1/@r solid #dcdce1;
  }
 .foodDiscountContent>span{
   font-size: 30/@r;
 }
  .foodDiscountContent>Div{
    float: right;
    font-size: 25/@r;
    color:#b2b2b2;
  }
 .foodDiscountPrice>span{
   font-size: 30/@r;
 }
  .foodDiscountPrice>Div{
    float: right;
    font-size: 30/@r;
    color:#dd2b15 ;
  }


  header span {
    width: 44/@r;
    height: 10/@r;
    float: right;
    background: url("../../assets/img/order/threePir.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 13/@r;
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #dcdce1;
    overflow: auto;
    padding-bottom: 100/@r;
  }

  .payMoney {
    padding: 64/@r 0 40/@r 0;
    border-bottom: 24/@r solid #dcdce1;
  }

  .payMoney strong {
    display: block;
    text-align: center;
    font-size: 34/@r;
    line-height: 64/@r;
    font-family: "微软雅黑";
    color: #808080;
  }

  .payMoney span {
    display: block;
    text-align: center;
    font-size: 70/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    color: #dd7015;
  }

  .aboutOrder {
    border-bottom: 24/@r solid #dcdce1;
    font-size: 28/@r;
    line-height: 76/@r;
    font-family: "微软雅黑";
    color: #363636;
  }

  .aboutOrder div {
    float: left;
    width: 100%;
    padding: 0 30/@r;
  }

  .aboutOrder strong {
    float: left;
  }

  .aboutOrder span {
    float: right;
  }

  .payOrder {
    padding: 0 30/@r;
  }

  .payOrder > div {
    float: left;
    width: 100%;
    border-bottom: 1/@r solid #d2d2d8;
    height: 109/@r;
    padding: 24/@r 0;
    font-size: 30/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
  }

  .payOrder strong {
    float: left;
    margin-left: 15/@r;
  }

  .payOrder span {
    float: right;
    width: 44/@r;
    height: 44/@r;
    border: 1/@r solid #dedee3;
    margin-top: 10/@r;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }

  .payOrder .active span {
    background: url("../../assets/img/order/selection.png") no-repeat;
    border: none;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .weChart i {
    background: url("../../assets/img/order/weChart.png") no-repeat;
  }

  .alipay i{
    background: url("../../assets/img/order/alipay.png") no-repeat;
  }

  .unionPay i{
    background: url("../../assets/img/order/unionPay.png") no-repeat;
  }

  .payOrder i {
    float: left;
    width: 60/@r;
    height: 60/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
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
