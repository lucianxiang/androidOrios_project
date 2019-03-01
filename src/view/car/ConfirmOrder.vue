<template>
  <div>
    <!--标题-->
    <header class="clearfix">
      <a href="" class="back"></a>
      <strong class="title">确认订单</strong>
    </header>
    <!--内容区块-->
    <section>
      <!--车的详情-->
      <div class="carDetail">
        <!--车主要信息-->
        <div class="carMain">
          <div class="carDetailLeft">
            <img src="../../assets/img/car/car1.png" height="70" width="115"/></div>
          <div class="carDetailRight">
            <div class="carName">起亚K4</div>
            <div class="carDetailIfo">三箱|1.6自动|乘坐5人</div>
          </div>
        </div>
        <!--选择车辆信息-->
        <div class="selectCarIfo">
          <!--导航线-->
          <div class="navLine">
            <div class="firstC"></div>
            <div class="line"></div>
            <div class="secendC"></div>
          </div>
          <!--详情信息-->
          <div class="detailIfo">
            <div class="detailIfoTop">
              <h1>09 月 07 到店取车</h1>
              <h1>周四 19:00 成都 - 双流机场T2航站楼</h1>
            </div>
            <div class="detailIfoBot">
              <h1>09 月 07 到店取车</h1>
              <h1>周四 19:00 成都 - 双流机场T2航站楼</h1>
            </div>
          </div>
        </div>
      </div>
      <!--驾驶信息-->
      <div class="driverIfo">
        <div class="writeDriverName">填写驾驶员信息</div>
        <div class="DriverName">
          <span>姓名</span>
          <input type="text" placeholder="请填写出租车人姓名">
        </div>
        <div class="idCard">
          <span>证件号</span>
          <input type="text" placeholder="与身份证一致">
        </div>
        <div class="phoneNumber">
          <span>手机号</span>
          <input type="text" placeholder="可联系手机号">
        </div>
      </div>
      <!--添加服务-->
      <div class="addService">
        <div class="addServiceName">添加服务</div>
        <div class="addServiceContent">
          <div v-for="item,index in 4">
            <div class="selectBox"></div>
            基本保险费
            <span class="selectBoxPrice">¥100.00</span>
            /全程
          </div>
        </div>
      </div>
      <!--支付-->
      <div class="chargeBox">
        <!--可享受优惠-->
        <div class="discountBox">
          <span class="discount">可享受优惠</span>
          <span class="discountDetail">暂无任何优惠</span>
        </div>
        <!--支付方式-->
        <div class="chargeWayBox">
          <span class="chargeWay">支付方式</span>
          在线支付
          <span class="priceRed">¥100.00</span>
          <div class="selectStates">
            <img src="../../assets/img/car/yesSelect.png" width="20" height="20" alt="">
          </div>
        </div>
        <!--到店支付盒子-->
        <div class="chargeWayBotBox">
          到店支付
          <span class="priceRed">¥100.00</span>
          <div class="selectStates">
            <img src="../../assets/img/car/noSelect1.png" alt="" width="20" height="20">
          </div>
        </div>
      </div>
      <!--租车需知-->
      <div class="rentCar">
        <!--需知标题-->
        <div class="rentCarTitle">租车需知</div>
        <!--需知盒子-->
        <div class="rentCarContent">
          <!--小盒子-->
          <div class="needBox">
            <!--图标-->
            <div class="needBoxImg"></div>
            <!--内容详情-->
            <div class="needBoxContent">
              <h1>取车凭证:身份证+驾驶证</h1>
              <h1>身份证有效期需1个月以上,驾驶证有效期2个月以上</h1>
            </div>
          </div>
          <div class="needBox">
            <!--图标-->
            <div class="needBoxImg"></div>
            <!--内容详情-->
            <div class="needBoxContent">
              <h1>取消规则</h1>
              <h1>取车前可免费取消</h1>
            </div>
          </div>
          <div class="needBox">
            <!--图标-->
            <div class="needBoxImg"></div>
            <!--内容详情-->
            <div class="needBoxContent">
              <h1>押金预授权</h1>
<!--              <p class="needBoxP">
                取车时冻结¥6000元作为租车押金,还车时解冻,还车时
                冻结¥2000元违章押金,还车后30天内无违章,解冻该笔押金
              </p>-->
            </div>
          </div>
          <div class="needBox">
            <!--图标-->
            <div class="needBoxImg"></div>
            <!--内容详情-->
            <div class="needBoxContent">
              <h1>发票</h1>
              <h1>订单详情开具</h1>
            </div>
          </div>
        </div>
      </div>

      <!--已阅读-->
      <div class="readBox">
        <div class="selectRead"></div>
        已阅仔细阅读并同意
        <span class="orderExplain">订单说明</span>
      </div>
    </section>

    <!--提交订单-->
    <div class="order">
      <div class="orderBox">提交订单</div>
    </div>
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
  section{
    /*height: 900/@r;*/
    width:100%;
    background-color: #f4f4f4;
    /*background-color: rosybrown;*/
    /*padding-top: 20/@r;*/
    /*margin: 100/@r 80/@r 0 20/@r ;*/
    padding: 100/@r 20/@r 150/@r 20/@r;
  }
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

/*  section {
    !*background-color: rgb(247,247,248);*!
    !*background-color: rgb(243,243,246);*!
    !*background-color: #f6f6f6;*!
    !*margin: 88/@r 20/@r 0 20/@r;*!
  }*/
  .carDetail{
    padding-left: 30/@r;
    /*margin-top: 128/@r;*/
    height: 430/@r;
    background-color: white;
  }
  .carMain{
    height:150/@r;
    /*background-color: rosybrown;*/
    border-bottom: 1/@r solid silver;
  }
  .selectCarIfo {
    height: 280/@r;
    /*background-color: goldenrod;*/
  }
  .navLine{
    float: left;
    height: 280/@r;
    width: 50/@r;
    /*background-color: red;*/
    padding-top: 55/@r;
    padding-left: 15/@r;
  }
  .firstC{
    width: 20/@r;
    height: 20/@r;
    background-color: #4f4f4f;
    border-radius: 50%;
    /*margin: 50/@r 0 0 10/@r;*/
  }
  .line{
    height:130/@r;
    border-left: 1/@r solid #585858;
    margin-left: 8/@r;
  }
  .secendC{
    width: 20/@r;
    height: 20/@r;
    background-color: rgb(255,179,64);
    border-radius: 50%;
  }
  .detailIfo{
    float: left;
    height: 280/@r;
    /*background-color: rosybrown;*/
  }
  .detailIfoTop{
    height: 140/@r;
    /*background-color: honeydew;*/
    padding-bottom: 20/@r;
    padding-top:20/@r;
  }
  .detailIfoTop>h1{
    margin-bottom:10/@r;
  }
  .detailIfoBot{
    height: 140/@r;
    /*background-color: khaki;*/
    padding-bottom: 20/@r;
    padding-top:20/@r;
  }
  .detailIfoBot>h1{
    margin-bottom:10/@r;
  }
  .carDetailLeft{
    /*margin-left:20/@r;*/
    height: 150/@r;
    float: left;
    width: 240/@r;
    /*background-color: royalblue;*/
  }
  .carDetailRight{
    height: 150/@r;
    float: left;
    /*width:100%;*/
    /*background-color: rebeccapurple;*/
  }
  .carName{
    /*float: left;*/
    text-align: left;
    line-height: 75/@r;
    height: 75/@r;
    /*background-color: cornflowerblue;*/
  }
  .carDetailIfo{
    /*float: left;*/
    height: 75/@r;
    /*background-color: cadetblue;*/
  }
  .driverIfo{
    margin-top: 20/@r;
    /*height: 400/@r;*/
    background-color: white;
  }
  .writeDriverName{
    height: 110/@r;
    /*background-color: red;*/
    border-bottom: 1/@r solid #dadada;
    font-size: 30/@r;
    line-height: 110/@r;
    font-family: "微软雅黑";
    padding-left: 40/@r;
  }
  .DriverName{
    height: 90/@r;
    /*background-color: rebeccapurple;*/
    border-bottom: 1/@r solid #dadada;
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
  }
  .DriverName>span{
    margin-left: 45/@r;
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
  }
  .DriverName>input{
    width: 450/@r;
    /*background-color: royalblue;*/
    border: none;
    float: right;
    display: inline;
    line-height: 88/@r;
  }
  .idCard{
    height: 90/@r;
    /*background-color: rosybrown;*/
    border-bottom: 1/@r solid #dadada;
  }
  .idCard>span{
    margin-left: 45/@r;
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
  }
  .idCard>input{
    width: 450/@r;
    border: none;
    /*background-color: royalblue;*/
    float: right;
    display: inline;
    line-height: 88/@r;
  }
  .phoneNumber{
    height: 90/@r;
    /*background-color: royalblue;*/
  }
  .phoneNumber>span{
    margin-left: 45/@r;
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
  }
  .phoneNumber>input{
    width: 450/@r;
    border: none;
    /*background-color: royalblue;*/
    float: right;
    display: inline;
    line-height: 88/@r;
  }
  .addService{
    margin-top: 20/@r;
    background-color: white;
  }
  .addServiceName{
    height: 110/@r;
    /*background-color: rosybrown;*/
    font-size: 30/@r;
    line-height: 110/@r;
    font-family: "微软雅黑";
    padding-left: 40/@r;
    border-bottom: 1/@r solid #dadada;
  }
  .addServiceContent{
    /*height: 200/@r;*/
    /*background-color: royalblue;*/
  }
  .addServiceContent>div{
    padding-left: 40/@r;
    height: 90/@r;
    line-height: 90/@r;
    /*background-color: royalblue;*/
  }
  .selectBox{
    height: 40/@r;
    width: 40/@r;
    /*background-color: red;*/
    float: left;
    margin-top: 25/@r;
    margin-right: 10/@r;
    /*background: image('../../assets/img/car/yesSelect.png');*/
    background-image: url(../../assets/img/car/yesSelect.png);
    background-size: 40/@r 40/@r;
    background-repeat: no-repeat;
  }
  .selectBoxPrice{
    color: rgb(255,179,64);
  }
  .order{
    height: 150/@r;
    /*background-color: red;*/
    position: fixed;
    bottom:0;
    width:100%;
    margin-left: -20/@r;
    padding:20/@r 50/@r;
  }
  .orderBox{
    height: 100/@r;
    width: 100%;
    background-color: rgb(255,179,64);
    float: right;
    color: white;
    font-size: 40/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    font-weight: 500;
    text-align: center;
    /*margin: 30/@r 20/@r 20/@r 150/@r;*/
    border-radius: 10/@r;
  }
  .chargeBox{
    /*height: 100/@r;*/
    background-color: white;
    margin-top: 20/@r;
  }
  .discount{
    height: 110/@r;
    font-size: 30/@r;
    line-height: 110/@r;
    font-family: "微软雅黑";
    margin-left: 40/@r;
  }
  .discountDetail{
    height: 110/@r;
    font-size: 30/@r;
    line-height: 110/@r;
    font-family: "微软雅黑";
    color: silver;
    margin-left: 40/@r;
  }
  .chargeWayBox{
    height: 90/@r;
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    padding-left: 40/@r;
    /*background-color: cadetblue;*/
  }
  .chargeWayBotBox{
    height: 90/@r;
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    padding-left: 240/@r;
    /*background-color: red;*/
  }
  .chargeWay{
    margin-right: 70/@r;
  }
  .priceRed{
    color: red;
  }
  .selectStates{
    width: 40/@r;
    height: 40/@r;
    /*background-color: royalblue;*/
    margin-top: 20/@r;
    margin-right: 50/@r;
    float: right;
  }
  .rentCar{
    margin-top: 20/@r;
    background-color: white;
    /*background-color: coral;*/
  }
  .rentCarTitle{
    height: 110/@r;
    font-size: 30/@r;
    line-height: 110/@r;
    font-family: "微软雅黑";
    padding-left: 40/@r;
    border-bottom: 1/@r solid #dadada;
  }
  .discountBox{
    border-bottom: 1/@r solid #dadada;
  }
  .chargeWayBox{
    border-bottom: 1/@r solid #dadada;
  }
  .rentCarContent{
    border-bottom: 1/@r solid #dadada;
  }
  .needBox{
    height: 110/@r;
  }
  .needBoxImg{
    height: 110/@r;
    /*background-color: red;*/
    width: 110/@r;
    float: left;
  }
  .needBoxContent{
    height: 110/@r;
    /*background-color: teal;*/
    /*width: 110/@r;*/
    float: left;
  }
  .needBoxContent>h1{
    height: 55/@r;
    line-height: 55/@r;
  }
  .needBoxP{

  }
  .orderExplain{
    color: rgb(130,173,232);
  }
  .readBox{
    margin-top: 20/@r;
  }
</style>
