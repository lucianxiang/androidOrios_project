<template>
<div>
  <header>
    <div></div>
    <strong class="back" @click="backPage">返回</strong>
    <strong class="order">商家信息</strong>
    <!--<img class="img1" src="@/assets/img/food/fx.png">-->
    <!--<img class="img2" src="@/assets/img/food/xx.png">-->
    <!--<img class="img3" src="@/assets/img/food/dd.png">-->
  </header>
  <section>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <!--商家信息-->
      <div class="storeInfo">
        <div class="foodImgIntr clearfix">
          <img :src="foodDetailStoreFrontList.fd_ImageURL">
          <div class="foodStoreName">
            <div class="foodStoreNameTitle">{{foodDetailStoreFrontList.fd_sf_ProductName}}</div>
            <img src="@/assets/img/food/star.png">
            <div class="foodStoreTi clearfix">
              <div>川菜</div>
              <div>老字号</div>
            </div>
            <div class="phoneBox">人均￥{{foodDetailStoreFrontList.fd_sf_AvgPrice}}元 <i @click="phoneBox"></i></div>
          </div>
        </div>

        <div class="foodStoreAddr clearfix" @click="goMap">
          <img class="foodStoreAddrImg1" src="@/assets/img/food/addr1.png">
          <div>
            <span>{{foodDetailStoreFrontList.fd_sf_Address}}</span>
          </div>
        </div>
      </div>
      <!--代金卷活动等-->
      <div class="storeActive">
        <!--<div class="Voucher">-->
        <!--</div>-->
        <div class="businessHours clearfix">
          <span>营业时间</span>
          <div>
            <span>周一至周日 <em>{{foodDetailStoreFrontList.fd_sf_OpenTime | cancelTime}}-{{foodDetailStoreFrontList.fd_sf_CloseTime | cancelTime}}</em></span>
          </div>
        </div>
      </div>
      <!--/*商家点菜方式*/-->
      <div class="foodChooseWay">
        <!--选择点菜方式-->
        <div class="chooseWayCard">
          <div class="OnlineChoose" :class="{active:isOnlineChoose}" @click="go1()">
            到店点餐
          </div>
          <div class="OnlineChoose active" @click="screenFood">筛选</div>
        </div>
        <!--菜品列表-->
        <div class="caiContent">
          <div class="foodBox clearfix" v-for="item,index in newFoodCaiList">
            <div class="imgBoxLeft clearfix">
              <img :src="item.foodImageList[0].fd_gi_GoodImage">
            </div>
            <div class="foodMiddle clearfix">
              <div style="float: left" class="foodMiddleDiv">
                <span class="foodChooseName">{{item.fd_sfp_MeatVegName}}</span>
                <div class="foodIntroduce">{{item.fd_sfp_Name}}</div>
                <span class="number">月售325
                    <!--<em>赞26</em>-->
                    <em></em>
                    <i>￥{{item.fd_sfp_Price}}元</i></span>
              </div>
              <div class="foodBoxRight clearfix">
                <div class="foodJian" @click="foodJian(item)"></div>
                <strong>{{item.num}}</strong>
                <div class="foodJia" @click="foodJia(item)"></div>
              </div>
            </div>
          </div>
          <p style="text-align: center;padding-top: 10rem;color: #666;" v-show="!newFoodCaiList.length">暂无数据~~</p>
        </div>
      </div>
    </mescroll-vue>
    <!--预定按钮-->
    <div class="footr">
      <div class="alreadyPoint" @click="detailInfo">已点{{count}}份
        <!--<em>共 ￥{{price * count}}</em>-->
        <em>共 ￥{{allPrice}}</em>
      </div>
      <div class="foodReserve" @click="reserve">立即下单</div>
    </div>
  </section>
  <popup v-model="foodOrderInfo" position="right" width="100%" style="background-color: #fff;">
    <header>
      <div></div>
      <strong class="back" @click="foodOrderInfo = false">返回</strong>
      <strong class="order">确认订单</strong>
    </header>
    <div class="foodOrderInfo">
      <div class="orderInfo clearfix">
        <div class="orderInfoIcon"></div>
        <div class="orderInfoContentBox">
          <div class="orderInfoContent">
            <strong>下单信息</strong>
            <div class="orderInfoList">
              <span>联系人：{{foodRoomInfoObj.name}}</span>
              <span>手机号：{{foodRoomInfoObj.phoneNum}}</span>
              <span>用餐日期：{{foodRoomInfoObj.eatDate}}</span>
              <span>用餐时间：{{foodRoomInfoObj.eatTime.fd_py_Name}}</span>
              <span>用餐人数：{{foodRoomInfoObj.num}}人</span>
              <span>提醒时间：{{foodRoomInfoObj.reminderTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--房间明细-->
      <div class="roomInfo clearfix">
        <div class="roomInfoIcon"></div>
        <div class="orderInfoContentBox">
          <div class="roomInfoContent orderInfoContent">
            <strong>房间明细</strong>
            <div class="roomInfoList orderInfoList" v-for="item,index in foodRoomInfoObj.roomList">
              <span class="clearfix">房间名：{{item.fd_sfr_RoomName}} x{{item.num}}</span>
              <span>最低消费: {{item.fd_sfr_LowestCost}}元</span>
              <span>房间费用: {{item.fd_sfr_RoomMoney}}元 <i style="color: #f60;margin-left: 5px">注:达到最低消费不收取</i></span>
              <span>订金: {{item.fd_sfr_BookMoney}}元</span>
            </div>
          </div>
        </div>
      </div>
      <!--菜品明细-->
      <div class="productInfo clearfix">
        <div class="productInfoIcon"></div>
        <div class="orderInfoContentBox">
          <div class="productInfoContent orderInfoContent">
            <strong>菜品明细</strong>
            <div class="productInfoList orderInfoList">
              <span class="clearfix" v-for="item,index in arr">
                  <em class="productName">{{item.fd_sfp_Name}}</em>
                  <em class="productNum">x{{item.num}}</em>
                  <em class="productMoney">￥{{item.fd_sfp_Price}}.00</em>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="immediatelyPay">
      <span>总价: {{Number(allPrice) + Number(foodRoomInfoObj.allMoney)}}元</span>
      <a href="javascript:;" @click="goPay">立即支付</a>
    </div>
  </popup>
  <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  <div class="hotelInfoWrap" v-show="isSubmitPay" @click.stop="isSubmitPay = false">
    <div class="hotelInfo" @click.stop="isSubmitPay = true">
      <strong>确认订单</strong>
      <div class="orderInfoContent">
        <div class="roomType">
          <strong>订餐人:</strong>
          <p>{{foodRoomInfoObj.name}}</p>
        </div>
        <div class="roomType">
          <strong>联系电话:</strong>
          <p>{{foodRoomInfoObj.phoneNum}}</p>
        </div>
        <div class="roomType">
          <strong>用餐人数:</strong>
          <p>{{foodRoomInfoObj.num}}人</p>
        </div>
        <div class="roomType">
          <strong>用餐日期:</strong>
          <p>{{foodRoomInfoObj.eatDate}}</p>
        </div>
        <div class="roomType">
          <strong>提醒时间:</strong>
          <p>{{foodRoomInfoObj.reminderTime}}</p>
        </div>
        <div class="roomType" v-for="item in foodRoomInfoObj.roomList">
          <strong>房间({{item.fd_sfr_RoomName}}):</strong>
          <p>价格:{{item.fd_sfr_RoomMoney}}元</p>
          <p>定金:{{item.fd_sfr_BookMoney}}元</p>
        </div>
        <div class="roomType">
          <strong>总金额:</strong>
          <p>{{foodRoomInfoObj.allMoney}}元</p>
        </div>
        <a href="javascript:;" @click="goPay">去支付</a>
      </div>
    </div>
  </div>

  <!--筛选条件-->
  <popup v-model="screenCondition" position="bottom" height="60%" style="background-color: #fff;z-index: 6000">
    <div class="screenContent">
      <dl class="clearfix">
        <dt>美食类型</dt>
        <dd v-for="item,index in screenFoodList.foodTypeList" :class="{active: index == foodTypeIndex}" @click.stop="changeFoodType(item,index)">{{item.fd_py_Name}}
        </dd>
      </dl>
      <dl class="clearfix">
        <dt>荤素类型</dt>
        <dd v-for="item,index in screenFoodList.foodMeatVeList" :class="{active: index == meatVeIndex}" @click.stop="changeMeatVe(item,index)">{{item.fd_py_Name}}
        </dd>
      </dl>
    </div>
    <div class="clearSelect">
      <a href="javascript:;" @click="clearSelect">清空选择</a>
      <a href="javascript:;" @click="screenSubmit">确定</a>
    </div>
  </popup>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import {
  deepClone
} from '@/assets/js/public'
import {
  Group,
  XNumber,
  PopupHeader,
  Popup,
  Radio,
  Selector,
  Toast
} from 'vux'
// 引入mescroll的vue组件
import MescrollVue from 'mescroll.js/mescroll.vue'

export default {
  components: {
    XNumber,
    PopupHeader,
    Popup,
    Group,
    Radio,
    Selector,
    Toast,
    MescrollVue
  },
  computed: Object.assign({
    allPrice() {
      let num = 0;
      if (this.newFoodCaiList.length) {
        for (var i = 0; i < this.newFoodCaiList.length; i++) {
          num += this.newFoodCaiList[i].num * this.newFoodCaiList[i].fd_sfp_Price;
        }
        return num;
      }
    },
    count() {
      let num = 0;
      if (this.newFoodCaiList.length) {
        for (var i = 0; i < this.newFoodCaiList.length; i++) {
          num += this.newFoodCaiList[i].num
        }
        return num
      }
    }
  }, mapGetters([
    'foodDetailStoreFrontList',
    'inFoodList', //菜品列表
    'foodCaiList', //菜品列表
    'foodRoomInfoObj',
    'screenFoodList'
  ])),
  data() {
    return {
      isOnlineChoose: true,
      isFixed: false,
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        use: false,
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.

        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 5 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        //          empty: {
        //            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
        //            warpId: "tourList", //父布局的id (1.3.5版本支持传入dom元素)
        //            tip: "暂无相关数据~" //提示
        //          }
      },
      isOff: false,
      foodNum: 0,
      value: '',
      meat: 0,
      reduce: 0,
      num: 0,
      foodOrderInfo: false,
      price: 0,
      totalprice: 0,
      id: 0,
      arr: [],
      arr1: [],
      newFoodCaiList: [],
      showErr: false,
      errCon: '',
      isSubmitPay: false, //确认订单
      options: {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "foodName": '', //菜名
        "foodType": '', //菜系名称
        "catagory": '', //美食类别  0素/1荤
        "frontID": '', //店面编码
        "page": 1,
        "rows": 5,
      },
      isState: true,
      userInfo: {},
      screenCondition: false,
      foodTypeIndex: 0,
      meatVeIndex: 0,
    }
  },
  created() {
    if (localStorage.getItem("userInfo")) {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    }
    this.initData();
    this.id = this.$route.query.id;
    this.searchFoodList()
      .then(arr => {
        this.newFoodCaiList = deepClone(arr);
      }, err => {
        this.showErr = true;
        this.errCon = err;
      })

  },
  mounted() {
    this.$nextTick(() => {
      let mescroll = document.querySelector('.mescroll')
      let chooseWayCard = document.querySelector('.chooseWayCard')
      let t;
      if (chooseWayCard && mescroll) {
        t = chooseWayCard.offsetTop;
        mescroll.addEventListener('scroll', () => {
          var scrollTop = mescroll.scrollTop;
          if (t - scrollTop < 0) {
            if (this.isState) {
              this.isFixed = true;
            }
          } else {
            this.isFixed = false;
          }
        })
      }
    })
  },
  methods: {
    //到店点餐
    go1() {
      this.isSubmitPay = true
      //        this.isOnlineChoose = true;
    },
    phoneBox() {
      if (window.plus) {
        plus.device.dial(this.foodDetailStoreFrontList.fd_sf_Phone, false);
      }
    },
    goMap() {
      this.$router.push({
        name: 'TicketMap',
        query: {
          title: this.foodDetailStoreFrontList.fd_sf_ProductName,
          address: this.foodDetailStoreFrontList.fd_sf_Address
        }
      })
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll
    },
    //上拉加载
    upCallback(page, mescroll) {
      this.options.frontID = this.$route.query.id
      this.options.page = page.num;
      this.searchFoodList()
        .then((arr) => {
          this.isLoading = false;
          //          this.newFoodCaiList = deepClone(this.foodCaiList)
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.newFoodCaiList = []
          // 把请求到的数据添加到列表
          this.newFoodCaiList = deepClone(this.newFoodCaiList.concat(arr))

          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })

        }, err => {
          this.showErr = true;
          this.errCon = err;
        }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
    },
    //初始化数据
    initData() {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "storeFrontID": this.$route.query.id, //店面编号
      };
      this.$store.commit('showLoading');
      this.$store.dispatch('initFoodDetailStoreFront', options)
        .then(() => {
          this.$nextTick(() => {
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
        })
    },
    //立即下单
    reserve() {
      this.foodOrderInfo = true;
    },
    //减
    foodJian(item) {
      if (item.num > 0) {
        item.num--;
      }
      if (item.num == 0) {
        this.arr = this.arr.filter(v => {
          if (v.num) {
            return true
          }
          return false
        })
      }
    },
    //加
    foodJia(item) {
      let name = item.fd_sfp_Name;
      let number = item.num;
      let price = item.fd_sfp_Price;
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].fd_sfp_ID == item.fd_sfp_ID) {
          this.isOff = true;
          this.arr[i].num = item.num;
        }
      }
      if (!this.isOff) {
        this.arr.push(item)
      } else {
        this.isOff = false
      }
      this.price = item.fd_sfp_Price;
      item.num++;
    },
    //查询店面菜品
    searchFoodList() {
      this.options.frontID = this.$route.query.id;
      this.isLoading = true;
      return this.$store.dispatch('searchFoodList', this.options)
    },
    backPage() {
      this.$router.go(-1);
    },
    //精选
    detailInfo() {
      this.foodOrderInfo = true
    },
    //清空菜单
    clear() {
      this.arr = [];
    },
    //支付
    goPay() {
      let productList = [];
      if (this.arr.length) {
        for (let i = 0; i < this.arr.length; i++) {
          if (this.arr[i].num) {
            productList.push({
              productID: this.arr[i].fd_sfp_ID,
              productCount: this.arr[i].num
            })
          }
        }
      }
      let roomList = [];
      for (let i = 0; i < this.foodRoomInfoObj.roomList.length; i++) {
        if (this.foodRoomInfoObj.roomList[i].num) {
          roomList.push({
            roomID: this.foodRoomInfoObj.roomList[i].fd_sfr_ID,
            tableCount: this.foodRoomInfoObj.roomList[i].num,
          })
        }
      }
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": this.userInfo.sm_ui_ID,
        "operateUserName": "",
        "pcName": "",
        "token": this.userInfo.token,
        "shopFrontID": this.id,
        "fd_or_UserID": this.userInfo.sm_ui_ID, //用户编码
        "fd_or_RoomTableInfo": roomList, //房间编码  以及桌数
        "useDate": this.foodRoomInfoObj.eatDate, //用餐日期
        "useTime": this.foodRoomInfoObj.eatTime.fd_fp_PropertyID, //用餐类型
        "carNo": this.foodRoomInfoObj.stopCar, //车位数
        "bookName": this.foodRoomInfoObj.name, //订餐人
        "fd_or_Phone": this.foodRoomInfoObj.phoneNum, //联系电话
        "fd_or_TicketCount": this.foodRoomInfoObj.num, //就餐人数
        "noticeTime": this.foodRoomInfoObj.reminderTime, //通知时间
        "bookType": 0, //点餐方式0在线点   1到店点餐
        "productInfo": productList
      }
      this.$store.commit('showLoading');
      this.$store.dispatch('initSelectChoiceList', options)
        .then(data => {
          this.initOrderInfo(data.data.tm_or_OrderID);
        }, err => {
          this.$store.commit('hideLoading');
          this.showErr = true;
          this.errCon = err;
        })
    },
    initOrderInfo(id) {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": this.userInfo.sm_ui_ID,
        "operateUserName": "",
        "pcName": "",
        "token": this.userInfo.token,
        "huiuserid": this.userInfo.sm_ui_ID,
        "orderID": id ? id : '',
      }
      this.$store.dispatch('initOrderInfo', options)
        .then(data => {
          console.log(data[0]);
          sessionStorage.setItem('orderInfo', JSON.stringify(data[0]))
          this.$router.push({
            name: 'PayOrder',
            query: {
              type: data.type
            }
          })
          this.$store.commit('hideLoading');
        }, err => {
          this.$store.commit('hideLoading');
          this.showErr = true;
          this.errCon = err;
        })
    },
    //筛选参数
    screenFood() {
      if (this.screenFoodList.catagoryList) {
        this.screenCondition = true;
        return
      }
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "token": "",
      };
      this.$store.dispatch('initScreenFood', options)
        .then(() => {}, err => {
          this.showErr = true;
          this.errCon = err;
        })
    },
    //美食类型
    changeFoodType(item, index) {
      if (index == this.foodTypeIndex) {
        this.foodTypeIndex = 0;
        this.options.foodType = "";
        return
      }
      this.options.foodType = item.fd_py_ID;
      this.foodTypeIndex = index;
    },
    //荤素类型
    changeMeatVe(item, index) {
      if (index == this.meatVeIndex) {
        this.meatVeIndex = 0;
        this.options.catagory = "";
        return
      }
      this.options.catagory = item.fd_py_ID;
      this.meatVeIndex = index;
    },
    //清空选择
    clearSelect() {
      this.foodTypeIndex = 0;
      this.options.foodType = "";
      this.meatVeIndex = 0;
      this.options.catagory = "";
    },
    //筛选提交
    screenSubmit() {
      this.searchFoodList()
        .then((arr) => {
          this.isLoading = false;
          this.newFoodCaiList = deepClone(arr);
          this.screenCondition = false;
        }, err => {
          this.showErr = true;
          this.errCon = err;
        })
    },
  }
}
</script>
<style scoped type="text/less" lang="less">
@r: 30rem;

.hotelInfoWrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
}

.hotelInfo {
    position: absolute;
    width: 600/@r;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30/@r;
}

.hotelInfo > strong {
    display: block;
    text-align: center;
    font-size: 33/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
    color: #666;
}

.hotelInfo > div {
    font-size: 28/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    padding: 10/@r 0;
    color: #999;
}

.hotelInfo > div > strong {
    float: left;
    width: 45%;
}

.hotelInfo > div > span {
    float: right;
    width: 50%;
    text-align: right;
}

.orderInfoContent > a {
    display: block;
    width: 80%;
    font-size: 28/@r;
    line-height: 3;
    font-family: "微软雅黑";
    text-align: center;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    background-color: #dd7015;
    margin: 20/@r auto 0;
    color: #fff;
}

.roomType {
    margin-top: 20/@r;
}

.roomType > strong {
    font-size: 26/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
}

.roomType > p {
    font-size: 26/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    padding-left: 30/@r;
}

header {
    position: fixed;
    height: 88/@r;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #2dbb55;
    padding: 27/@r 30/@r 26/@r;
}

.back {
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

.mescroll {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 3.3rem;
    right: 0;
    height: auto;
}

.Details {
    padding: 20/@r;
    background-color: white;
}

.foodList {
    margin-left: 20/@r;
}

.foodListConternt > li {
    padding: 20/@r;
}

.foodListConternt > li > strong {
    margin-left: 200/@r;
    margin-right: 250/@r;
}

.emptyDishes {
    float: right;
    margin-right: 20/@r;
}

.DetailInfo {
    background-color: #f2f2f2;
}

.order {
    font-size: 30/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #fff;
    margin-left: 200/@r;
}

.foodImageBox img {
    width: 100%;
}

.exhibitionImage > img {
    float: left;
    height: 100%;
}

.storeInfo {
    background-color: #fff;
}

.alreadyPoint > em {
    margin-left: 80/@r;
}

/*店面信息*/
.storeInfo {
    padding: 20/@r 20/@r 20/@r 10/@r;
}

.foodImgIntr {
    padding-left: 10/@r;
}

.foodImgIntr > img {
    float: left;
    height: 168/@r;
    width: 248/@r;
}

.foodStoreName {
    float: left;
    margin-left: 20/@r;
    margin-top: 10/@r;
}

.foodStoreNameTitle {
    font-size: 30/@r;
    font-weight: bold;
    padding-bottom: 10/@r;
}

.foodStoreName > img {
    height: 23/@r;
    width: 150/@r;
}

.foodStoreTi {
    margin-bottom: 13/@r;
}

.foodStoreTi > div {
    float: left;
    background-color: #f90;
    margin-right: 10/@r;
    font-size: 25/@r;
    line-height: 30/@r;
    padding: 0 5/@r;
    color: #fff;
}

.foodStoreTiDiv {
    margin-left: 20/@r;
}

.foodStorePrice {
    padding-top: 10/@r;
    clear: both;
    font-size: 25/@r;
    color: #595959;
}

.foodStoreAddr {
    padding: 10/@r 10/@r 10/@r 0;
    clear: both;
    font-size: 30/@r;
}

.foodStoreAddrImg1 {
    float: left;
    height: 40/@r;
    width: 40/@r;
}

.foodStoreAddr > div {
    overflow: hidden;
    margin-top: 8/@r;
}

.foodStoreAddr span {
    float: left;
    width: 100%;
    font-size: 25/@r;
    line-height: 28/@r;
    color: #595959;
}

.foodStoreAddr > span > em {
    color: #cfcfcf;
}

/*店面活动及代金卷*/
.storeActive {
    background-color: #fff;
    margin-top: 20/@r;
    padding: 20/@r;
}

.Voucher > em {
    background-color: #e8751a;
    color: white;
    font-size: 30/@r;
}

.Voucher > span {
    font-size: 30/@r;
    margin-left: 10/@r;
}

.activeContent {
    margin: 20/@r 0;
}

.activeContent > div {
    font-size: 25/@r;
}

.activeContent > div > span > em {
    color: #2dbb55;
    margin-left: 10/@r;
    margin-right: 8/@r;
}

.activeContent > div > span > i {
    color: #2dbb55;
    margin-left: 10/@r;
}

.businessHours {
    padding-top: 10/@r;
}

.businessHours > span {
    float: left;
    font-size: 30/@r;
}

.businessHours > div {
    overflow: hidden;
    font-size: 25/@r;
}

.businessHours > div > span {
    float: left;
    width: 100%;
    margin-left: 20/@r;
    margin-top: 3/@r;
}

/*商家点菜方式*/
.OnlineChoose {
    float: left;
    height: 52/@r;
    width: 205/@r;
    text-align: center;
    line-height: 50/@r;
    font-size: 25/@r;
    color: #dd7015;
    margin-left: 50/@r;
    margin-right: 100/@r;
}

.OnlineChoose.active {
    background-color: #dd7015;
    color: whitesmoke;
}

.foodChooseType > div {
    height: 30/@r;
}

.foodChooseUl > li {
    border-bottom: 1/@r solid #dcdce1;
}

.foodChooseUl > li > img {
    /*float: left;*/
    margin-left: 10/@r;
    clear: both;
    height: 112/@r;
    width: 172/@r;
    margin-bottom: 40/@r;
}

.foodChooseName {

    font-size: 30/@r;
}

.foodChooseContent > div {
    padding: 10/@r 0/@r;
    font-size: 22/@r;
    color: #5a5a5a;
}

.number {
    font-size: 21/@r;
    color: #5a5a5a;
}

.number > em {
    margin-left: 30/@r;
    margin-right: 30/@r;
}

.number > i {
    color: #dd2b15;
    font-size: 30/@r;
}

.foodChooseContent > img {
    position: relative;
    left: 150/@r;
    top: -20/@r;
}

.footr {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
}

.alreadyPoint {
    float: left;
    height: 99/@r;
    width: 70%;
    font-size: 30/@r;
    color: #dd7015;
    padding-left: 50/@r;
    line-height: 90/@r;
    border-top: 1/@r solid #dcdce1;
    background-color: #ffffff;
}

.foodReserve {
    color: #fff;
    float: left;
    height: 98/@r;
    width: 30%;
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

.businessHours {}

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

.img1 {
    height: 50/@r;
    width: 50/@r;
    margin-left: 70/@r;
}

.img2 {
    height: 50/@r;
    width: 50/@r;
    margin-left: 10/@r;
}

.img3 {
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

.foodBox {
    margin-bottom: 10/@r;
    border-bottom: 1/@r solid #d6d6d6;
}

.imgBoxLeft {
    height: 150/@r;
    width: 30%;
    float: left;
    padding: 20/@r;
}

.imgBoxLeft > img {
    width: 170/@r;
    height: 110/@r;
    margin: 0 auto;
}

.foodMiddle {
    height: 150/@r;
    width: 55%;
    float: left;
}

.foodMiddleDiv {
    margin-top: 20/@r;
}

.foodBoxRight {
    position: relative;
    top: -75/@r;
    left: 105/@r;
    float: right;
}

.foodBoxRight > strong {
    font-size: 35/@r;
    line-height: 50/@r;
    padding: 0 10/@r;
}

.foodJian {
    float: left;
    background: url("../../assets/img/food/jian.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    width: 50/@r;
    height: 50/@r;
}

.foodJia {
    width: 50/@r;
    height: 50/@r;
    float: right;
    background: url("../../assets/img/food/foodadd.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
}

.foodChooseWay {
    background-color: #fff;
    padding: 20/@r 20/@r 60/@r;
    margin: 20/@r 0 0/@r;
}

.chooseWayCard {
    background-color: #fff;
}

.chooseWayCard.active {
    position: fixed;
    top: 88/@r;
    left: 0;
    width: 100%;
    padding: 20/@r 0;
    z-index: 2;
}

.foodIntroduce {
    overflow: hidden;
    width: 350/@r;
    margin: 10/@r 0;
}

.foodStoreAddrImg2 {
    position: relative;
    top: -40/@r;
    left: 20/@r;
    height: 50/@r;
    width: 50/@r;
}

.foodStoreAddrImg3 {
    position: relative;
    top: -40/@r;
    left: 15/@r;
    height: 50/@r;
    width: 50/@r;
}

.phoneBox {
    position: relative;
}

.phoneBox > i {
    position: absolute;
    right: -120/@r;
    top: -10/@r;
    width: 40/@r;
    height: 40/@r;
    background-color: #ccc;
    background: url("../../assets/img/food/tel.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
}

.foodOrderInfo {
    padding: 20/@r;
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 88/@r;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}

.menuList {
    margin-bottom: 30/@r;
}

.menuList > strong {
    display: block;
    font-size: 33/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    color: #333;
}

.menuList > div,
.menuList ul {
    padding-left: 20/@r;
}

.menuList li strong,
.roomInfoCon > div > strong {
    float: left;
    font-size: 28/@r;
    line-height: 1.5;
    font-family: "微软雅黑";
    color: #333;
    margin-right: 20/@r;
}

.roomInfoCon > div div div span,
.roomInfoCon > div div strong {
    font-size: 20/@r;
}

.roomInfoCon > div div ul {
    padding-top: 30/@r;
}

.menuList li div,
.roomInfoCon > div > div {
    overflow: hidden;
}

.menuList li span,
.roomInfoCon > div span {
    float: left;
    font-size: 28/@r;
    line-height: 1.5;
    font-family: "微软雅黑";
    color: #333;
}

.roomInfoCon > div {
    float: left;
    width: 100%;
}

.roomInfo > li {
    margin-bottom: 20/@r;
}

.immediatelyPay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f0f0f0;
    height: 88/@r;
    padding: 0 20/@r;
}

.immediatelyPay > span {
    float: left;
    font-size: 30/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #ff8800;
    width: 70%;
}

.immediatelyPay > a {
    float: right;
    font-size: 30/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #f80;
    text-align: center;
    width: 30%;
}

.screenContent {
    padding: 10/@r 30/@r;
    overflow: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 88/@r;
    right: 0;
}

.screenContent dt {
    display: block;
    font-size: 32/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #000;
}

.screenContent dd {
    float: left;
    width: 33.333%;
    font-size: 28/@r;
    line-height: 35/@r;
    padding: 10/@r 5/@r 0 0;
    font-family: "微软雅黑";
    color: #666;
}

.screenContent dd.active {
    color: #33bd61;
}

.clearSelect {
    position: absolute;
    bottom: 0;
    height: 88/@r;
    width: 100%;
    left: 0;
}

.clearSelect > a {
    float: left;
}
.clearSelect > a:first-of-type {
    width: 33.3333%;
    background-color: #f1f1f1;
    color: #666;
    font-size: 28/@r;
    text-align: center;
    height: 100%;
    line-height: 88/@r;
}
.clearSelect > a:last-of-type {
    width: 66.6666%;
    background-color: #ff7500;
    color: #fff;
    font-size: 28/@r;
    text-align: center;
    height: 100%;
    line-height: 88/@r;
}

.orderInfoIcon {
    float: left;
    width: 36/@r;
    height: 42/@r;
    background: url("../../assets/img/order/placeOrder.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 24/@r;
}

.orderInfoContentBox {
    overflow: hidden;
}

.orderInfoContent {
    float: left;
    margin-left: 35/@r;
    width: 100%;
}

.orderInfoContent > strong {
    font-size: 30/@r;
    line-height: 78/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    color: #353434;
    display: block;
    border-bottom: 1/@r dashed #cdcdcd;
    margin-bottom: 10/@r;
}

.orderInfoList > span {
    display: block;
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    color: #555554;
    padding-right: 35/@r;
}

.roomInfoIcon {
    float: left;
    width: 43/@r;
    height: 43/@r;
    background: url("../../assets/img/order/roomIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 23/@r;
}

.roomInfoList > span > em {
    float: right;
}
.roomInfoList{
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10/@r;
  margin-bottom: 10/@r;
}

.productInfoIcon {
    float: left;
    width: 48/@r;
    height: 42/@r;
    background: url("../../assets/img/order/dishesIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 27/@r;
}

.productInfoList .productName {
    float: left;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.productInfoList .productNum {
    float: left;
    width: 20%;
    text-align: center;
}

.productInfoList .productMoney {
    float: left;
    width: 30%;
    text-align: right;
}
</style>
