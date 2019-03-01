<template>
  <div>
    <header>
      <div></div>
      <strong class="back" @click="backPage">返回</strong>
      <strong  class="order">商家信息</strong>
      <!--<span></span>-->
        <img class="img1" src="@/assets/img/food/fx.png">
        <img class="img2" src="@/assets/img/food/xx.png">
        <img class="img3"src="@/assets/img/food/dd.png">
    </header>
    <section>
      <scroller
        :on-infinite="infinite"
        ref="my_scroller"
        refresh-layer-color="#4b8bf4"
        loading-layer-color="#ec4949"
      >
      <!--商家信息-->
       <div class="storeInfo">
         <div class="foodImgIntr">
           <img  src="@/assets/img/food/dm1.jpg">
           <div class="foodStoreName">
              <div class="foodStoreNameTitle">后院小厨私房菜</div>
              <img  src="@/assets/img/food/star.png">
              <div class="foodStoreTi">
                <div>川菜</div>
                <div class="foodStoreTiDiv">老字号</div>
              </div>
              <div class="foodStorePrice">人均￥78元</div>

           </div>
         </div>
         <div class="foodStoreAddr">
           <img  class="foodStoreAddrImg1" src="@/assets/img/food/addr1.png">
           <span>天河区广顺路65号实验小学旁<em>(距您1.3km)</em></span>
           <div>
             <img  class="foodStoreAddrImg2" src="@/assets/img/food/jt.png">
             <img  class="foodStoreAddrImg3" src="@/assets/img/food/tel.png">
           </div>
         </div>
       </div>
      <!--代金卷活动等-->
       <div class="storeActive">
         <div class="Voucher">
           <em>卷</em><span>代金卷</span>
         </div>
         <div class="activeContent">
          <div>
            <span>周一至周日，节假日通用 <em>￥78</em>代100元 <i>3个活动></i></span>
          </div>
         </div>
         <div class="businessHours">
           <span>营业时间</span>
           <div>
             <span>周一至周日 <em>11:00-23:00</em></span>
           </div>
         </div>
       </div>
      <!--/*商家点菜方式*/-->
      <div class="foodChooseType">
        <div>
          <div class="OnlineChoose" v-for="item,index in content"  :class="{active:index==meat}" @click="go1(index)">{{item}}</div>
        </div>
        <div class="inStoreChoose" >
           方便快捷，无需等待，到店有位置
        </div>
    </div>
      <!--预定按钮-->
      <div class="footr">
        <div class="alreadyPoint">已点 0</div>
        <div class="foodReserve" @click="reserve">预定</div>
      </div>


        <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
          <g>
            <circle cx="16" cy="32" stroke-width="0" r="3">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="32" cy="32" stroke-width="0" r="3.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="48" cy="32" stroke-width="0" r="4.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
            </circle>
          </g>
        </svg>
      </scroller>
  </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: mapGetters([]),
    data() {
      return {
        meat:1,
        content:['在线点菜','到店点菜']
      }
    },
    methods: {
      // 点菜方式
      go1(index){
        this.meat=index;
        if(index==0){
          this.$router.push({
            name: 'FoodSellerInfo', query: {
              id:'',
            }
          })
        }
      },
      initData() {
      },
      search() {
        this.initData()
      },
      showListBtn (){
        this.showList = !this.showList;
      },
      backPage(){
        this.$router.push({name: 'FoodDetails'})
      },
      //下拉加载
      infinite(done) {
        this.rowsNum += 5;
        this.initSelected(this.thisProviceId, this.rowsNum)
          .then((total) => {
            done(true)
          })
      },
      //精选
      initSelected(id, num) {
        let selectChoiceList = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "tm_ts_ProviceID": id ? id : '', //省编号
          "page": 1,//页码
          "rows": num ? num : 5//条数
        }
        this.$store.commit('showLoading')
        return this.$store.dispatch('initTicketSelected', selectChoiceList)
      },
      //预定
      reserve(){
        this.$router.push({name: 'FoodOrderDetail'})
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

 .storeInfo{
   background-color: #fff;
 }
  /*店面信息*/
  .storeInfo{
    padding: 20/@r;
  }
  .foodImgIntr>img{
    float:left ;
    height: 168/@r;
    width:248/@r;
  }
  .foodStoreName{
    float: left;
    margin-left:40/@r;
  }
  .foodStoreNameTitle{
    font-size: 30/@r;
    font-weight: bold;
    padding-bottom: 10/@r;
  }
  .foodStoreName>img{
    height: 23/@r;
    width: 150/@r;
  }
  .foodStoreTi>div{
    margin-top: 5/@r;
    padding: 0/@r 3/@r 0/@r 3/@r;
    float: left;
    border: 1/@r solid #d2d2d8;
   }
  .foodStoreTiDiv{
    margin-left: 20/@r;
  }
  .foodStorePrice{
    padding-top: 10/@r;
    clear: both;
    font-size: 25/@r;
    color: #595959;
  }
  .foodStoreAddr{
    padding:10/@r ;
    clear: both;
    font-size:30/@r;
  }

  .foodStoreAddrImg1{
    height:40/@r ;
    width: 40/@r;
  }
  .foodStoreAddr>span{
    font-size: 25/@r;
    color:#595959;
  }
  .foodStoreAddr>span>em{
    color: #cfcfcf;
  }
  /*店面活动及代金卷*/
  .storeActive{
    background-color: #fff;
    margin-top:20/@r;
    padding:20/@r 20/@r 10/@r 20/@r;
  }
  .Voucher>em{
    background-color:#e8751a;
    color:white ;
    font-size: 30/@r;
  }
  .Voucher>span{
    font-size:30/@r;
    margin-left:10/@r ;
  }
  .activeContent{
    border-bottom:1/@r solid #dcdce1;
  }
  .activeContent>div{
    margin-left:120/@r;
    font-size:25/@r;
  }
  .activeContent>div>span>em{
    color:#2dbb55 ;
    margin-left:10/@r;
    margin-right: 8/@r;
  }
  .activeContent>div>span>i{
    color:#2dbb55 ;
    margin-left:10/@r;
  }
  .businessHours{
    padding-top: 10/@r;
  }
  .businessHours>span{
    margin-left:30/@r ;
    font-size:30/@r;
  }
  .businessHours>div{
    margin-left:120/@r;
    font-size:25/@r;
  }
  /*商家点菜方式*/
.foodChooseType{
  height:790/@r ;
  background-color:#fff ;
  padding:20/@r ;
  margin-top:20/@r;
}
.OnlineChoose{
  float: left;
  height:52/@r ;
  width: 205/@r;
  padding-left: 55/@r;
  line-height:50/@r;
  font-size:25/@r ;
  color:#dd7015;
  margin-left: 50/@r;
  margin-right:100/@r ;

  }
  .OnlineChoose.active{
    background-color: #dd7015;
    color: whitesmoke;
  }
  .foodChooseUl{
   padding: 60/@r 0/@r 0/@r 0/@r;
  }
  .foodChooseType>div{
   height: 30/@r;
  }
  .inStoreChoose{
   padding-top: 50/@r;
  text-align: right;
    color: #5a5a5a ;
  }
  .foodStoreAddr>div{
    float: right;
  }
  .foodChooseUl>li{
    border-bottom:1/@r solid  #dcdce1 ;
  }
  .foodChooseUl>li>img{
    margin-left:10/@r;
    clear: both;
    height: 112/@r;
    width: 172/@r;
    margin-bottom: 40/@r;
  }
 .foodChooseContent{
   float: right;
   margin-right:150/@r;
 }
  .foodChooseName{
   font-size:30/@r ;
  }
  .foodChooseContent>div{
    padding:10/@r 0/@r 10/@r 0/@r ;
    font-size: 22/@r;
    color:#5a5a5a ;
  }
  .number{
    font-size: 21/@r;
    color:#5a5a5a ;
  }
  .number>em{
    margin-left: 30/@r;
    margin-right: 30/@r;
  }
  .number>i{
    color:#dd2b15;
    font-size: 30/@r;
  }
  .foodChooseContent>img{
    position: relative;
    left:150/@r ;
    top:-20/@r;
  }
  .footr{
    position: fixed;
    z-index: 100;
    bottom: 0;
    left: 0;
    /*background-color: #3e3f5b;*/
    width: 100%;
    height: 98/@r;

  }
  .alreadyPoint{
    float: left;
    height:99/@r ;
    width: 70%;
    font-size: 30/@r;
    color: #dcdce1 ;
    padding-left: 50/@r;
    line-height: 90/@r;
    border-top: 1/@r solid #dcdce1;
    background-color: #ffffff;
  }
  .foodReserve{
    color: #fff;
    float: left;

    height:98/@r ;
    width:30%;
    line-height: 98/@r;
    text-align: center;
    font-size: 30/@r;
    background-color: #dd7015;
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
  .businessHours{
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
.img1{
  height: 50/@r;
  width: 50/@r;
  margin-left: 70/@r;
}
 .img2{
   height: 50/@r;
   width: 50/@r;
   margin-left: 10/@r;
 }
 .img3{
   height: 50/@r;
   width: 50/@r;
   margin-left: 10/@r;
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
