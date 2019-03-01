<template>
  <div>
    <header>
      <div></div>
      <strong class="back" @click="backPage">返回</strong>
      <strong  class="order">订单详情</strong>
      <span></span>
    </header>
    <section>

      <div class="touMing">
        餐厅图样
      </div>
      <!--轮播图-->
      <div class="foodImageBox">
        <div class="exhibitionImage" id="exhibitionImage">
          <!--<img  :src="introduceInfo.fd_ImageURL">-->
          <swiper :aspect-ratio="300/600" v-model="swiperItemIndex">
            <swiper-item class="swiper-demo-img" v-for="item,index in array" :key="index">
              <img :src="item"  class="pageLogoImg" >
              <div class="imgNum">
                <!--<img src="@/assets/img/food/tupian.png" alt="">-->
                <strong>{{index+1}}/{{array.length}}</strong>
              </div>
            </swiper-item>
          </swiper>
        </div>
      </div>

      <!--订单详情信息-->

      <div class="foodDetailInfo">
        <div  >
          <group  >
            <selector title="用餐日期:"   @on-change="fShow" :options="contennt" v-model="foodDate"></selector>
          </group>
        </div>
        <group>
          <selector @on-change="tShow" title="用餐时间:"  :options="timeContennt" v-model="foodTime"></selector>
        </group>
        <group>
          <selector  title="提醒时间:"  :options="remindTime" v-model="remindTimeModel"></selector>
        </group>
        <!--位置-->
        <tab v-show="foodPosition">
          <tab-item :selected="demo1 === item.fd_py_Name" v-for="item,index in foodOrderChoseRoomList" @on-item-click="onItemClick(item,index)" :key="index">{{item.fd_py_Name}}</tab-item>
          <!--<tab-item @on-item-click="onItemClick">流水</tab-item>-->
          <!--<tab-item @on-item-click="onItemClick">包间</tab-item>-->
        </tab>
      </div>


      <!--视频预览图片-->
       <!--大厅-->
      <div class="lookVideo" v-show="imgshow">
        <div class="videoLists">
          <ul class="clearfix">
            <li >
              <div  :class="{active:meat1}">
                <img @click="choose1()" :src=src />
                <p> {{rome}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--包间-->

      <div class="lookVideo" v-show="privateRoomShow">
        <div class="videoLists">
          <ul class="clearfix">
            <li >
              <div  :class="{active:meat2}">
                <img @click="choose2()" :src=src />
                <p> {{rome}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--流水-->

      <div class="lookVideo" v-show="flowRoomShow">
        <div class="videoLists">
          <ul class="clearfix">
            <li >
              <div  :class="{active:meat3}">
                <img @click="choose3()"  v-for="item in src" :src=item />
                <p> {{rome}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--详细信息-->

      <div class="ditalInf" v-show="foodInfo">
        <div class="ditalInfoD" :class="{active: showList}">
          <div class="title">
            <span>菜品信息</span>
            <strong>份数</strong>
            <em>价格</em>
          </div>
          <ul>
            <li @click="goFoodOrderDetailTwo" v-for="item,index in foodLists">
              <span>{{item.fd_sfp_Name}}</span>
              <strong>x{{item.num}}</strong>
              <em>￥{{item.num*item.fd_sfp_Price}}</em>
            </li>
          </ul>
        </div>

         <!--总价-->
        <div class="footerT">
          <div class="totalPrice">菜品总价: ￥{{totalPrices}}</div>
        </div>
      </div>

      <!--选中的图片-->
      <div  class="selectDiv" v-show="imageShow">
         <div class="selectTitle">
           <span>订单信息</span>
           <strong>房间费用(元)</strong>
           <em>桌数</em>
         </div>
      <div>
        <ul>
          <li class="zhanShi" >
            <div class="zhanShiImg">
              <!--<img  src="@/assets/img/food/shouye_14.png"><br/>-->
              <img  :src="src"><br/>
              <em>{{rome}}</em>
              <span class="zhanShiPrice">
               {{bookMoney}}
             </span>
              <div class="zhanShiNum">
                <div class="parkingSpaceNum">
                  <div class="parkingJian" @click="parkingJian">-</div>
                  <div class="parking">
                    <input class="inputParking" type="text" style="padding-left:15/@r" v-model="this.num"/>
                  </div>
                  <div class="parkingJia" @click="parkingJia">+</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      </div>

      <!--用户信息-->

      <div class="userInfo">
        <div class="carPark">
          <strong class="userInfoPerson">订餐人</strong>
          <span class="uperson">取票人</span>
        </div>

        <div class="carPark" >
          <strong class="parkingSpace">停车位</strong>
          <img src="@/assets/img/food/foodIcon4.png" alt=""/>
          <x-number class="xnum" v-model="value" ></x-number>
          <div class="carNum" v-show="WaitCarCount-this.value">剩余{{WaitCarCount-this.value}}个车位</div>
        </div>
        <div class="orderDinnerDiv">
          <strong class="orderDinnerPerson">订餐人</strong>
          <input type="text" />
          <div></div>
        </div>

        <div class="orderDinnerPhoneNum">
          <strong class="orderDinnerPerson">手机号</strong>
          <input type="text" v-model="phoneNum"/>
          <div></div>
        </div>
      </div>

      <a href="javascript:;" @click="payOrder">提交订单</a>
    </section>
  </div>
</template>
<script>
  import {Selector,Swiper ,Datetime,SwiperItem,XNumber,Group,Tab,TabItem} from 'vux'
  import {mapGetters} from 'vuex'
  import Radio from "vux/src/components/radio/index";
  import {isPhoneNum} from  '@/assets/js/public';
  export default {
    components: {Radio,Datetime,Swiper,SwiperItem,XNumber,Group,Selector,Tab,TabItem},
    computed: mapGetters([
      'foodCaiList',
      'foodDetailStoreFrontList',
      'foodOrderChoseRoomList',
    ]),
    data(){
      return {
        value:0,
        value1:'',
        foodDate:'',
        foodTime:'',
        demo1:'大厅',
        meat1:false,
        meat2:false,
        meat3:false,
        imageShow:false,
        optionsModle:'',
        remindTimeModel:'',
        foodPosition:false,
        arrayRoom:[],
        WaitCarCount:0,
        remindTime:['12:00:00','12:00:00','12:00:00','12:00:00','12:00:00','12:00:00','12:00:00'],
        options: [ '大厅', '流水','包间'],
        peopleNumber:0,//人数
        carNumber:0,//车数
        showList: false,
        bookMoney:'',
        timeShow:false,
        imgshow:false,
        privateRoomShow:false,
        flowRoomShow:false,
        oneShow:false,
        twoShow:false,
        foodInfo:false,
        numberP:'',
        src:[],
        srcImg:'',
        rome:'',
        totalPrices:0,
        swiperItemIndex:0,
        phoneNum:'',
        timeType:'',
        inTime:'',
        introduceInfo:{},
        array:[],
        foodLists:[],
        num:0,
        foodType: '',
        contennt:['2018-9-1','2018-9-2','2018-9-3','2018-9-4','2018-9-5','2018-9-6','2018-9-7'],
        timeContennt:['12:00:00','12:00:00','12:00:00','12:00:00','12:00:00','12:00:00','12:00:00'],
        foodShow:false,
        // logoSrc:['@/assets/img/food/dm1.jpg','@/assets/img/food/dm1.jpg','@/assets/img/food/dm1.jpg']
      }
    },
    created(){
         this.introduceInfo=JSON.parse(sessionStorage.getItem('introduceInfo'))

          if( sessionStorage.getItem('foodLists')==[]){
            this.foodInfo=false
          }else{
             this.foodLists=JSON.parse(sessionStorage.getItem('foodLists'))
             this.foodInfo=true
          }

         this.totalPrices= sessionStorage.getItem('totalPrices')
         this.array=this.introduceInfo.fd_ImageURL.split(',')
         // this.detailsPay()
    },
    methods: {
      //初始化菜品信息
      initData(foodName,foodType,catagory,page) {
        return new Promise((relove, reject) => {
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "pcName": "",
            "foodName": foodName?foodName:'',//菜名
            "foodType": foodType?foodType:'',   //菜系名称
            "catagory": catagory?catagory:'',    //美食类别  0素/1荤
            "frontID": this.$route.query.id,    //店面编码
            "page": page?page:1,
            "rows": 10,
          };
          this.$store.commit('showLoading')
          // this.$vux.loading.show({
          //   text: '拼命加载中'
          // })
          this.isLoading = true;
          this.$store.dispatch('initFoodCaiList',options)
            .then(total=>{
              this.total = total
              this.isLoading = false;
              relove()
              this.$nextTick(()=>{
                // this.$vux.loading.hide()
                this.$store.commit('hideLoading')
              })
            },err=>{
              reject(err)
            })
        })
      },
      //点击人数加
      clickPeopleAdd(){
        this.peopleNumber=this.peopleNumber+1;
        if(this.peopleNumber<=0){
          this.peopleNumber = 0;
        }
      },
      //点击人数减
      clickPeopleSub(){
        this.peopleNumber=this.peopleNumber-1;
        if(this.peopleNumber<=0){
          this.peopleNumber = 0;
        }
      },
      //点击车添加
      clickCarAdd(){
        this.carNumber=this.carNumber+1;
        if(this.carNumber<=0){
          this.carNumber = 0;
        }
      },
      //点击车减少
      clickCarSub(){
        this.carNumber=this.carNumber-1;
        if(this.carNumber<=0){
          this.carNumber = 0;
        }
      },
      goFoodOrderDetailTwo(){
        this.$router.push({
          name: 'FoodOrderDetailTwo', query: {
            id:'',
          }
        })
      },
      search() {
        this.initData()
      },
      //美食支付
      payOrder(){
        if( isPhoneNum(this.phoneNum)){
          const href = this.$router.push(
            {
              name:'PayOrder',
              query:''
            }
          )
        }
      },
      showListBtn (){
        this.showList = !this.showList;
      },
      backPage(){
        this.$router.push({
          name: 'FoodSellerInfo', query: {
            id:this.$route.query.id,
          }
        })
      },

      fShow(){
        this.getWaitCarCount()
        this.oneShow=true
      },
      choose1(){
        this.imageShow=!this.imageShow
        this.meat1=!this.meat1
      },
      choose2(){
        this.imageShow=!this.imageShow
        this.meat2=!this.meat2
      },
      choose3(){
        this.imageShow=!this.imageShow
        this.meat3=!this.meat3
      },
      tShow(){



        this.GetCanSellTableCount()
          .then(()=>{
            this.onItemClick(this.foodOrderChoseRoomList[0],0)
          })
        this.twoShow=true

        if(this.oneShow==true&& this.twoShow==true){
          this.foodPosition=true

        }
      },
      onItemClick (item,index){
         if(index==0){
           this.meat2=false
           this.meat3=false
           this.imageShow=false
           this.privateRoomShow=false
           this.flowRoomShow=false
           this.src=item.choseRoomList[0].imageList[0].fd_ri_Image.split(',')
           this.rome=item.choseRoomList[0].fd_sfr_RoomName
           this.bookMoney=item.choseRoomList[0].fd_sfr_BookMoney
           if(this.oneShow==true&& this.twoShow==true){
             this.imgshow=true
           }
        }else if(index==1){
           this.imageShow=false
           this.meat1=false
           this.meat3=false
           this.imgshow=false
           this.privateRoomShow=true
           this.flowRoomShow=false
           this.src=item.choseRoomList[0].imageList[0].fd_ri_Image.split(',')
           this.rome=item.choseRoomList[0].fd_sfr_RoomName
           this.bookMoney=item.choseRoomList[0].fd_sfr_BookMoney
         }else if(index==2){
           this.imageShow=false
           this.meat1=false
           this.meat2=false
           this.imgshow=false
           this.privateRoomShow=false
           this.flowRoomShow=true
           this.src=item.choseRoomList[0].imageList[0].fd_ri_Image.split(',')
           this.rome=item.choseRoomList[0].fd_sfr_RoomName
           this.bookMoney=item.choseRoomList[0].fd_sfr_BookMoney
         }
      },
      //生成订单号
      detailsPay(){
        let user = JSON.parse(sessionStorage.getItem('userInfo'))


        let selectChoiceList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": user.token,
          "shopFrontID": this.$route.query.id,
          "fd_or_UserID": user.sm_ui_ID,
          // "fd_or_RoomTableInfo": [
          //   {
          //     "roomID": 15,
          //     "tableCount": 1
          //   }
          // ],
          "useDate": "2018-08-31",
          "useTime": 88,
          "carNo": 0,
          "bookName": user.sm_ui_Name,
          "fd_or_Phone": "",
          "noticeTime": "",
          "bookType": 0,
          "productInfo": [
            {
              "productID": "",
              "productCount": ""
            }
          ]
        }
        return this.$store.dispatch('initSelectChoiceList', selectChoiceList)
        // const href = this.$router.push(
        //   {
        //     name: 'PayOrder',
        //     query: ''
        //   }
        // )
      },






      //位置
      GetCanSellTableCount(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "storeFrontID": this.$route.query.id,
          "date":"2019-10-31",
          "time": 88
        };
        return this.$store.dispatch('GetCanSellTableCount', options)
      },
      changeInDate(){
      },
      parkingJian(){
        this.num--
      },
      parkingJia(){
        this.num++
      },
      //获取车位
      getWaitCarCount(){
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "shopID": this.$route.query.id,
          "bookDate": this.foodDate,
        }
        this.$store.dispatch('getWaitCarCount',options)
          .then(num=>{
            // console.log(num)
            this.WaitCarCount = num
          },err=>{
            console.log(err)
          })
      },
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    position: fixed;
    height:88/@r;
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
  .touMing{
    text-align: center;

    height: 38/@r;
    width:120/@r ;
    background-color:grey;
    z-index:1;
    color: #fff;
    position: absolute;
    top:280/@r;
    left: 50/@r;
    opacity:0.6;
  }
  .selectDiv{
    /*padding: 20/@r;*/
    margin-top: 20/@r;
    /*height: 400/@r;*/
    background-color:#fff;
  }
  .selectTitle{
    padding: 20/@r;
    font-size: 30/@r;
    color: #fff;
    height: 90/@r;
    background-color: orange;

  }
  .selectTitle>span{
    margin-right: 150/@r;
  }
  .selectTitle>strong{
    margin-right: 150/@r;
  }
  .zhanShi{
    padding: 40/@r 0/@r 0/@r 30/@r;
  }
  .zhanShiImg{
    border-bottom: 1/@r solid darkgray;
    margin-right: 10/@r;
    padding-bottom: 10/@r;
  }
  .zhanShiImg>img{
    height: 180/@r;
    width: 180/@r;
  }
  .zhanShiImg>em{
    font-size: 30/@r;
    margin: 10/@r 0/@r 0/@r 50/@r;
  }
  .zhanShiPrice{
    position: relative;
    left: 200/@r;
    top:-120/@r;
    font-size: 30/@r;
  }
  .zhanShiNum{
    float: right;
    height: 250/@r;
    width: 300/@r;
    /*background-color: red;*/
    position: relative;
    top:-200/@r;
  }
  .zhanshidiv{
     border-top: 1/@r solid darkgray;
     height: 10/@r;
     position: relative;
     top:-25/@r;
     margin-right: 10/@r;
   }

  .foodDate{
    height: 42/@r;
    border-bottom:1/@r solid darkgray;
    float: right;
    width: 80%;
    margin-right:20/@r ;
  }
  .foodRemind{
    height: 42/@r;
    border-bottom:1/@r solid darkgray;
    float: right;
    width: 80%;
    margin-right:20/@r ;
  }
  .imgNum{
    /*height: 40/@r;*/
    width:120/@r ;
    z-index:2;
    color: #fff;
    position: absolute;
    top:320/@r;
    left: 80%;
  }
  .imgNum>img{
    opacity:0.7;
    height: 30/@r;
    width: 30/@r;
  }
  .imgNum>strong{
    color: #fff;
  }
  .foodDateType{
    border: 1/@r solid grey;
    background-color: #fff;
    position: relative;
    width: 400/@r;
    top:10/@r;
    z-index: 10;
    overflow: auto;
    padding: 10/@r 15/@r 10/@r 30/@r;
  }
  .foodTimeType{
    border: 1/@r solid grey;
    background-color: #fff;
    position: relative;
    width: 400/@r;
    top:10/@r;
    z-index: 12;
    overflow: auto;
    padding: 10/@r 15/@r 10/@r 30/@r;
  }
  .title{
    height: 80/@r;
    background-color: orange;
    /*text-align: center;*/
    font-size: 30/@r;
    color: #fff;
    line-height: 80/@r;
  }
  .title>span{
    margin-left: 20/@r;
  }
  .title>strong{
    margin-left: 110/@r;
  }
  .title>em{
    margin-left: 200/@r;
  }
  .totalPrice{
    float: right;
    margin-right: 20/@r;
    font-size: 30/@r;
  }
  .footerT{
    height: 50/@r;
    padding-top: 20/@r;
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
  .orderDinnerDiv{
    padding:20/@r 10/@r 10/@r 0/@r;
  }
  .orderDinnerDiv>strong{
    font-size: 30/@r;
    margin-right:10/@r;
    font-weight: bold;
  }
  .orderDinnerDiv>input{
    height:50/@r;
    width:350/@r;
    margin-left: 20/@r;
    border: none;
  }
  .orderDinnerDiv>div{
    margin-top: 18/@r;
    border-top: 1/@r solid darkgray;
    width:400/@r;
    height: 2/@r;
    margin-left: 120/@r;
  }
  .orderDinnerPhoneNum{
    padding:20/@r 10/@r 10/@r 0/@r;
  }
  .orderDinnerPhoneNum>strong{
    font-size: 30/@r;
    margin-right:10/@r;
    font-weight: bold;
  }
  .orderDinnerPhoneNum>input{
    height:50/@r;
    width:350/@r;
    margin-left: 20/@r;
    border: none;
  }
  .orderDinnerPhoneNum>div{
    /*margin-top: 130/@r;*/
    border-top: 1/@r solid darkgray;
    width:400/@r;
    height: 100/@r;
    position: relative;
    top: 10/@r;
    left:120/@r;
    /*margin-left: 120/@r;*/
  }
  .foodDetailInfo{
    padding:25/@r 10/@r 0/@r 10/@r;
    background-color: #fff;
    width: 100%;
    margin-top: 10/@r;
  }
  .foodDetailInfo>ul>li{
    padding: 20/@r ;
  }
  .foodDetailInfoLiHome{
    padding-left:42/@r;
  }
  .foodDetailInfoLiHome>input{
    margin-left: 20/@r;
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
  .parkingSpaceNum{
    float: left;
    margin: 80/@r 0/@r 0/@r 100/@r;
    padding: 1/@r;
    border: 1/@r solid darkgray;

  }
  .xnum{
    float: right;
    margin-right: 250/@r;
    border: 1/@r solid #dcdce1;
  }
  .carNum{
    float: right;
    position: relative;
    top: -50/@r;
    margin-right: 30/@r;
    font-size: 30/@r;
  }
  .parkingJian{
    height: 55/@r;
    width: 45/@r;
    float: left;
    text-align: center;
    line-height: 50/@r;
    border-right: 1/@r solid darkgray;
  }
  .parking{
    width:80/@r;
    height: 50/@r;
    float: left;

  }
  .inputParking{
    width: 90/@r;
    height:51/@r;
    border: none;
  }
  .parkingJia{
    height: 55/@r;
    width: 45/@r;
    float: right;
    text-align: center;
    line-height: 50/@r;
    border-left: 1/@r solid darkgray;
  }
  .parkingSpaceContent>strong{
    font-size: 30/@r;
    margin-right:20/@r;
    margin-left: 130/@r;
  }
  .foodDetailInfoLiPerson>span{
    font-size:30/@r;
  }
  .DetailNum>div{
    line-height: 25/@r;
    float: left;
    border: 1/@r solid #dcdce1;
    height: 40/@r;
    width: 40/@r;
    padding: 8/@r 10/@r ;
  }
  .foodDetailInfoLiCar>span{
    font-size:30/@r;
    color: #e0e0e4;
  }
  .carPark{
    padding-bottom: 20/@r;
  }
  .userInfo{
    background-color: #fff;
    height: 500/@r;
    margin-top: 20/@r;
    padding: 20/@r;
  }
  .userInfoPerson{
    font-size: 30/@r;
    font-weight: bold;
  }
  .parkingSpace{
    font-size: 30/@r;
    font-weight: bold;
  }
  /*.parkingSpaceContent{*/
  /*margin-top: 10/@r;*/
  /*float: right;*/
  /*!*margin-right: 135/@r;*!*/
  /*}*/
  .parkingSpaceContent>img{
    height:40/@r;
    width:40/@r;
    float:left;
    margin-right:10/@r;
  }

  .carPakeJian{
    padding: 0/@r 20/@r 0/@r 20/@r;
    margin-left: 20/@r;
    font-size:40/@r;
    background-color: orange;
    color: #fbf9fe;
  }
  .uperson{
    margin-left: 10/@r;
    padding: 5/@r 10/@r 5/@r 10/@r;
    border-radius: 5/@r;
    background-color:rgb(255, 136, 136);
    color: #fff;
    font-size: 16/@r;
    line-height: 20/@r;
    font-family: "微软雅黑";
  }
  .recommendBoxDiv1 span{
    font-size: 30/@r;
    line-height: 80/@r;
  }
  .recommendBoxDiv1 select{
    margin-top: 20/@r;
    font-size: 30/@r;
    float:right ;
  }
  .recommendBoxDiv1 div{
    line-height: 80/@r;
    float: right;
    margin-right: 80/@r;
    font-size: 28/@r;
    color: #2dbb55;
  }
  .recommendBoxDiv1 img{
    margin-top: 20/@r;
    height: 40/@r;
    width: 40/@r;
  }
  .recommendBoxDiv2 span{
    font-size: 30/@r;
    line-height: 80/@r;
  }
  .recommendBoxDivNum div{
    float: left;
    border: 1/@r solid #dcdce1;
    height: 40/@r;
    width: 40/@r;
    margin-top: 20/@r;
    padding: 8/@r;
  }

  .recommendBoxDiv3 span{
    color:#dcdce1 ;
    font-size: 30/@r;
    line-height: 80/@r;
  }
  .recommendBoxDiv4{
    height: 85/@r;
    padding-top: 20/@r;
  }
  .recommendBoxDiv4 span{
    font-size: 30/@r;
  }
  .recommendBoxDiv4 div{
    font-size: 30/@r;
    float: right;
  }
  .lookVideo{
    height: 400/@r;
    margin-bottom: 20/@r;
    background-color: #fff;
    padding-top: 60/@r;
  }
  .videoLists{
    padding: 20/@r 10/@r 0/@r 1/@r;
    height: 320/@r;
    /*background-color:  #dcdce1;*/
    overflow:auto;
  }
  /*.videoLists>img{*/
  /*height: 150/@r;*/
  /*width: 270/@r;*/
  /*}*/
  .videoLists>ul {
    width:  3000/@r;
  }
  .videoLists>ul>li{
    float: left;
  }
  .videoLists>ul>li>div>img{

    height: 160/@r;
    width: 160/@r;

  }
  .videoLists>ul>li>div>p{
    text-align: center;
    margin-top: 10/@r;
  }
  .videoLists>ul>li>div{
    margin-left: 40/@r;
  }
  .videoLists>ul>li>div.active{
    border: 1/@r solid red;
     padding: 10/@r;
  }


  .videoListsContent{
    padding: 15/@r 0/@r 0/@r 20/@r;
    font-size: 28/@r;
    color:#5c5857 ;
  }


  .buttonStoreName{
    text-align: center;
    line-height:40/@r;
    float: right;
    height: 40/@r;
    width: 120/@r;
    border-bottom:1/@r solid #dcdce1;
    border-right:1/@r solid #dcdce1;
    background-color:#eeeef1 ;
  }
  .ditalInf{
    margin-top:20/@r ;
    background-color: #ffffff;
    padding:20/@r 10/@r 50/@r 10/@r;
  }
  .ditalInfoD{
    /*height:223/@r;*/
    overflow: hidden;
    margin-bottom: 20/@r;
  }
  .ditalInfoD.active {
    height: 100%;
  }
  .ditalInfoD>ul>li{
    padding:20/@r;
    font-size: 30/@r;

  }
  .ditalInfoD>ul>li>strong{
    margin-left: 100/@r;
    margin-right: 200/@r;
  }


  .ditalInfoBu{
    float: right;
  }
  .ditalInfoBu img{
    position: relative;
    top:7/@r;
    right: 15/@r;
    height: 25/@r;
    width: 30/@r;
  }
  .ditalInfoBu img:active{
    max-height: 100%;

  }
  .footDivT{
    margin-top: 10/@r;
  }
  .footDiv{
    margin-top: 20/@r;
    background-color: #ffffff;
    padding:20/@r ;
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
  .payOrder{
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
  .swiper-demo-img img {
    width: 100%;
    height: 100%;
  }
  .vux-selector.weui-cell_select-after {
    padding: 9/@r 10/@r 16/@r 19/@r;
  }
  .vux-tab .vux-tab-item {
    line-height: 84/@r;
    font-size:30/@r ;
  }

</style>
