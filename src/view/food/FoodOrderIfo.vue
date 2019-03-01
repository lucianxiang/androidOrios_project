<template>
<div>
  <div class="container">
    <!--头部-->
    <header>
      <div class="backUp" @click="clickBackUp"></div>
    </header>
    <!--内容区域-->
    <section>
      <!--选择用餐信息-->
      <div class="choiceIfoChar">选择用餐信息</div>
      <!--用餐日期-->
      <div class="eatTime clearfix">
        <ul class="time">
          <!--用餐日期-->
          <li class="timeBox clearfix" @click="clickEatTimeBox">
            <span class="eatDateName">用餐日期</span>
            <div class="rightTriangle"></div>
            <div class="eatDateValue">{{addOptions.useDate}}</div>
          </li>
          <!--用餐时间-->
          <li class="timeBox clearfix" @click="clickHaveTimeBox">
            <span class="eatDateName">用餐时间</span>
            <div class="rightTriangle"></div>
            <div class="eatDateValue">{{eatTimeName}}</div>
          </li>
          <!--提醒时间-->
          <li class="timeBox clearfix" @click="clickRemindTimeBox">
            <span class="eatDateName">提醒时间</span>
            <div class="rightTriangle"></div>
            <div class="eatDateValue">{{addOptions.noticeTime}}</div>
          </li>
        </ul>
        <!--房间类型-->
        <ul class="roomType clearfix">
          <li v-for="item,index in foodOrderChoseRoomList" :class="{active:roomTypeActiveIndex==index}" @click="changeRoomType(item,index)">
            {{item.fd_py_Name}}
          </li>
        </ul>
        <!--图片-->
        <ul class="images clearfix">
          <li v-for="item,index in imgBoxList" @click="clickImage(item,index)">
            <div class="roomTypePic" :class="{active:item.isTrue}" v-show="imgBoxList.length">
              <img v-lazy="item.oneImg" :key="item.oneImg" height="50" width="70" />
            </div>
            <div class="imagesName" :class="{active:item.isTrue}">{{item.fd_sfr_RoomName}}</div>
          </li>
        </ul>
      </div>
      <!--订单人-->
      <div class="order">
        <div class="orderBot clearfix">
          <div class="orderPeople blodClass">订单人</div>
          <div class="takeTickPeople">取票人</div>
        </div>
        <!--停车位-->
        <div class="orderBot">
          <span class="blodClass">停车位</span>
          <img @click="clickSub" class="foodadd" src="../../assets/img/food/jian.png" height="20" width="20" />
          <strong>{{ parkingSpace }}</strong>
          <img @click="clickAdd" class="foodjian" src="../../assets/img/food/foodadd.png" height="20" width="20" />
          <div class="restLast">剩余{{maxNum}}</div>
        </div>
        <div class="orderBot clearfix">
          <span class="blodClass">用餐人数</span>
          <div>
            <input class="peopleName" type="number" placeholder="请填写用餐人数" v-model="eatNum">
          </div>
        </div>
        <div class="orderBot clearfix">
          <span class="blodClass">订餐人</span>
          <div>
            <input class="peopleName" type="text" placeholder="请填写订餐人姓名" v-model="addOptions.bookName">
          </div>
        </div>
        <div class="orderBot clearfix">
          <span class="blodClass">手机号码</span>
          <div>
            <input class="peopleName" type="text" placeholder="请填写订餐人姓名" v-model="addOptions.fd_or_Phone">
          </div>
        </div>
      </div>
      <!--餐厅信息-->
      <div class="diningIfo" v-show="NewroomType.length">
        <div class="diningName blodClass">房间信息</div>
        <!--房间列表-->
        <div :class="[{diningRoomList:true},{clearfix:true}]" v-for="item,index in NewroomType">
          <!--<i class="diningRoomI" :class="{active: item.roomIsTrue==true}"></i>-->
          <div v-show="item.imageList.length">
            <img class="diningPic diningRoomPic" :key="item.oneImg" v-lazy="item.oneImg" />
          </div>

          <div class="roomInfomation">
            <span class="dating">{{item.fd_sfr_RoomName}}</span>
            <div class="datingPrice"><em style="color: #f80;">定金:</em> ¥{{item.fd_sfr_BookMoney * item.num}}.00</div>
            <div class="datingPrice"><em style="color: #f80;">房间费用:</em> ¥{{item.fd_sfr_RoomMoney * item.num}}.00
            </div>
            <div class="addOrSub">
              <img @click.stop="clickRoomTalbelSub(item,index)" class="foodRoomTalbelAdd" src="../../assets/img/food/jian.png" height="20" width="20" /> {{ item.num }}
              <img @click.stop="clickRoomTalbelAdd(item,index)" class="foodRoomTalbelJian" src="../../assets/img/food/foodadd.png" height="20" width="20" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--底部-->
    <footer>
      <div class="footPrice">¥{{roomTotalPrice}}.00</div>
      <div class="sureCharge" @click="goOrderImmediately">立即点菜</div>
    </footer>
  </div>
  <!--用餐日期Box-->
  <div class="eatTimeContainer" v-show="eatTimeContainerIsShow">
    <div class="opDiv" @click="eatTimeContainerIsShow=false"></div>
    <ul class="eatTimeContent">
      <li @click="clickEatTime(item,index)" v-for="item,index in foodOrderChoseDateList">{{item.date}}</li>
    </ul>
  </div>
  <!--用餐时间Box-->
  <div class="haveTimeContainer" v-show="haveTimeContainerIsShow">
    <div class="opDiv" @click="haveTimeContainerIsShow=false"></div>
    <ul class="haveTimeContent">
      <li @click="clickHaveTime(item,index)" v-for="item,index in foodOrderChoseTimeList">{{item.fd_py_Name}}</li>
    </ul>
  </div>
  <!--提醒时间Box-->
  <div class="haveTimeContainer" v-show="remindTimeContainerIsShow">
    <div class="opDiv" @click="remindTimeContainerIsShow=false"></div>
    <ul class="haveTimeContent">
      <li @click="clickRemindTime(item,index)" v-for="item,index in reamindTimeList">{{item}}</li>
    </ul>
  </div>
  <toast v-model="showErr" type="cancel" :text="errCon"></toast>
</div>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import {
  deepClone,
  isPhoneNum
} from '@/assets/js/public'
import {
  Group,
  XNumber,
  PopupHeader,
  Popup,
  Radio,
  Selector,
  Datetime,
  XButton,
  PopupRadio,
  XInput,
  Cell,
  Alert,
  Toast,
} from 'vux'

export default {
  components: {
    XNumber,
    PopupHeader,
    Popup,
    Group,
    Radio,
    Selector,
    Datetime,
    XButton,
    PopupRadio,
    Cell,
    XInput,
    Alert,
    Toast
  },
  computed: Object.assign({
    roomTotalPrice() {
      let num = 0
      for (var i = 0; i < this.NewroomType.length; i++) {
//        (this.NewroomType[i].fd_sfr_RoomMoney * this.NewroomType[i].num)
        num += (this.NewroomType[i].fd_sfr_BookMoney * this.NewroomType[i].num) ;
      }
      return num;
    },
  }, mapGetters([
    'foodOrderChoseDateList',
    'foodOrderStopCarList',
    'foodOrderChoseTimeList',
    'foodOrderChoseRoomList',
    'foodModel',
  ])),
  watch:{
    parkingSpace(){
      this.maxNum = this.maxNewNum-this.parkingSpace
    }
  },
  data() {
    return {
      options2: [],
      showErr: false,
      maxNewNum:0,
      eatTimeContainerIsShow: false,
      haveTimeContainerIsShow: false,
      remindTimeContainerIsShow: false,
      errCon: '',
      roomTypeActiveIndex: -1,
      parkingSpace: 0,
      activeIndex: -1,
      roomTypeIndex: -1,
      addOptions: {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "token": "",
        "shopFrontID": '', //店面编码
        "fd_or_UserID": '', //用户编码
        "fd_or_RoomTableInfo": [], //房间编码  以及桌数
        "useDate": "", //用餐日期
        "useTime": "", //用餐时间
        "carNo": "", //车位数
        "bookName": "", //订餐人
        "fd_or_Phone": "", //联系电话
        "noticeTime": "", //通知时间
        "bookType": 0, //点餐方式0在线点   1到店点餐
        "productInfo": [] //产品列表
      },
      imgBoxList: [],
      maxNum: 0,
      pickerOptions: {},
      newFoodOrderChoseRoomList: [],
      reamindTimeList: [],
      breakfastList: ['05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00'],
      noonList: ['09:00', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
      dinnerList: ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'],
      freeLoading: false,
      roomList: [],
      eatTimeName: '',
      foodOrderList: [],
      foodCaiList: [],
      orderArr: [],
      NewroomType: [],
      eatTimeObj: {},
      eatNum: "",
      user: {}
    }
  },
  created() {
    document.title = '选择用餐信息'
    //获取用户信息
    let user = JSON.parse(sessionStorage.getItem('userInfo'))
    if (user) {
      this.user = user
      this.addOptions.bookName = user.sm_ui_Name
      this.addOptions.fd_or_Phone = user.sm_ui_Phone
    }
    //获取菜品信息
    if (sessionStorage.getItem('foodLists')) {
      this.foodCaiList = JSON.parse(sessionStorage.getItem('foodLists'))
    }
    if (this.foodModel) {
      this.initData()
        .then((foodOrderList) => {
          this.$nextTick(() => {
            this.addOptions.useDate = this.foodOrderChoseDateList[0].date;
            console.log(this.foodOrderChoseTimeList)

            let obj = this.getFoodOrderChoseTimeObj(this.foodOrderChoseTimeList)
            console.log(obj)
            this.clickHaveTime(obj);
          })
          //          用餐时间
          for (let i in this.foodOrderChoseTimeList) {
            let eatObj = {};
            eatObj.key = this.foodOrderChoseTimeList[i].fd_fp_PropertyID;
            eatObj.value = this.foodOrderChoseTimeList[i].fd_py_Name;
            this.options2.push(eatObj)
          }
          this.foodOrderList = foodOrderList;
        }, err => {
          this.showErr = true;
          this.errCon = err;
        })
    }
    //初始化用餐类型
//    this.getEatTimeName()
  },
  methods: {
    //获取用餐类型对应信息
    getFoodOrderChoseTimeObj(arr) {
      return arr.filter(item => {
        if (item.fd_py_Name == this.getEatTimeName()) {
          return true
        }
        return false;
      })[0]
    },
    getEatTimeName() {
      let date = new Date()
      let h = date.getHours();
      if (h < 10) {
        return '早餐'
      }
      if (h >= 10 && h <= 15) {
        return '中餐'
      }
      if (h > 15) {
        return '晚餐'
      }
    },
    //     点击图片
    clickImage(item, index) {
      switch (this.roomTypeIndex) {
        case 0:
          item.isTrue = !item.isTrue;
          break;
        case 1:
          item.isTrue = !item.isTrue;
          break;
        case 2:
          item.isTrue = !item.isTrue;
          break;
      }

      if (item.isTrue == true) {
        let itemObj = deepClone(item);
        itemObj.num = 1;
        this.NewroomType.push(itemObj);
      } else {
        this.NewroomType = this.NewroomType.filter((i) => {
          if (item.fd_sfr_ID == i.fd_sfr_ID) {
            return false
          }
          return true
        })
      }

    },
    clickRoomTalbelAdd(item, index) {
      item.num++;
      if (item.num > item.fd_sfr_TablesCount) {
        item.num = item.fd_sfr_TablesCount;
      }
    },
    clickRoomTalbelSub(item, index) {
      item.num--;
      if (item.num < 1) {
        item.num = 1;
      }
    },
    //选中包间或者大厅
    changeRoomType(item, index) {
      this.roomTypeIndex = index;
      //房间清空
      this.activeIndex = -1;
      this.roomTypeActiveIndex = index;
      this.imgBoxList = item.choseRoomList;
    },
    //立即点菜
    goOrderImmediately() {
      if (!this.addOptions.useDate) {
        this.showErr = true;
        this.errCon = '请选择用餐日期';
        return
      }
      if (!this.eatTimeName) {
        this.showErr = true;
        this.errCon = '请选择用餐时间';
        return
      }
      if (!this.addOptions.noticeTime) {
        this.showErr = true;
        this.errCon = '请选择提醒时间';
        return
      }
      if (!this.NewroomType.length) {
        this.showErr = true;
        this.errCon = '请选择房间';
        return
      }

      if (!this.eatNum) {
        this.showErr = true;
        this.errCon = '请填写用餐人数';
        return
      }
      if (!this.addOptions.bookName.trim()) {
        this.showErr = true;
        this.errCon = '请填写预定人';
        return
      }
      if (!isPhoneNum(this.addOptions.fd_or_Phone)) {
        this.showErr = true;
        this.errCon = '请填写正确的手机号';
        return
      }
      let obj = {
        eatDate: this.addOptions.useDate,
        eatTime: this.eatTimeObj,
        reminderTime: this.addOptions.noticeTime,
        roomList: this.NewroomType,
        stopCar: this.parkingSpace,
        name: this.addOptions.bookName,
        phoneNum: this.addOptions.fd_or_Phone,
        allMoney: this.roomTotalPrice,
        num: this.eatNum,
      }
      this.$store.commit('foodRoomInfo', obj);
      this.$router.push({
        name: 'FoodSellerInfo',
        query: {
          id: this.$route.query.id
        }
      })
    },
    //选中用餐日期
    changeNewUseTime(num) {

      switch (num) {
        case 87:
          //早餐
          this.pickerOptions.start = '05:00';
          this.pickerOptions.end = '09:00';
          break;
        case 88:
          //中餐
          this.pickerOptions.start = '10:00';
          this.pickerOptions.end = '14:00';
          break;
        case 89:
          //晚餐
          this.pickerOptions.start = '16:00';
          this.pickerOptions.end = '20:00';
          break;
      }
      this.changeUseTime()
        .then(data => {
          this.$nextTick(() => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].choseRoomList.length) {
                this.changeRoomType(data[i], i);
                break;
              }
            }
          })
          //初始化房间类型
          if (this.foodOrderChoseRoomList.length) {
            this.roomType = this.foodOrderChoseRoomList[0].fd_py_ID
            //初始化房间
            this.newFoodOrderChoseRoomList = this.foodOrderChoseRoomList[0].choseRoomList;
            for (var i = 0; i < this.foodOrderChoseRoomList[0].choseRoomList.length; i++) {
              //                this.activeArr.push(false)
            }
            for (var i = 0; i < this.foodOrderChoseRoomList.length; i++) {
              //                this.orderArr.push(false)
            }
          }
          this.freeLoading = false;
        }, err => {
          this.showErr = true;
          this.errCon = err;
        })
      //获取停车位个数
    },
    changeUseTime() {
      if (!this.addOptions.useDate) {
        this.$vux.alert.show({
          content: '亲,请先选择用餐日期!',
        });
        return;
      }
      this.freeLoading = true;
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "shopID": this.$route.query.id,
        "bookDate": this.addOptions.useDate,
        "bookTime": this.addOptions.useTime
      };
      return this.$store.dispatch('GetCanSellTableCount', options)
    },
    initData() {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "storeFrontID": this.$route.query.id
      };
      return this.$store.dispatch('initFoodOrder', options)
    },
    //      获取等待车数量
    getWaitCarCount(timeType) {
      let options = {
        "loginUserID": "huileyou",
        "loginUserPass": "123",
        "operateUserID": "",
        "operateUserName": "",
        "pcName": "",
        "shopID": this.$route.query.id,
        "bookDate": this.addOptions.useDate,
        "bookTime": timeType,
      }
      this.$store.dispatch('getWaitCarCount', options)
        .then(num => {
          this.maxNum = num
          this.maxNewNum = num
        }, err => {
          this.showErr = true;
          this.errCon = err;
        })
    },
    //      点击返回
    clickBackUp() {
      this.$router.go(-1);
    },
    //      点击停车位加
    clickAdd() {
      this.parkingSpace++;
      if (this.parkingSpace > this.maxNewNum) {
        this.parkingSpace = this.maxNewNum;
      }
    },
    //      点击停车位减
    clickSub() {
      this.parkingSpace--;
      if (this.parkingSpace < 0) {
        this.parkingSpace = 0;
      }
    },
    //     点击订餐日期
    clickEatTimeBox() {
      this.eatTimeContainerIsShow = true;
    },
    //     点击订餐时间
    clickHaveTimeBox() {

      this.haveTimeContainerIsShow = true;
      this.imgBoxList = [];
    },
    //     提醒时间
    clickRemindTimeBox() {
      this.remindTimeContainerIsShow = true;
    },
    clickEatTime(item, index) {
      this.imgBoxList = []
      this.NewroomType = []
      this.eatTimeName = '请选择'
      this.eatTimeContainerIsShow = false
      this.addOptions.useDate = item.date;
    },
    clickHaveTime(item, index) {
      this.eatTimeObj = item;
      this.haveTimeContainerIsShow = false;
      this.eatTimeName = item.fd_py_Name;
      this.addOptions.useTime = item.fd_fp_PropertyID;

      if (item.fd_fp_PropertyID == '87') {
        this.reamindTimeList = this.breakfastList;
        this.addOptions.noticeTime = this.breakfastList[0];
      }
      if (item.fd_fp_PropertyID == '88') {
        this.reamindTimeList = this.noonList;
        this.addOptions.noticeTime = this.noonList[0];
      }
      if (item.fd_fp_PropertyID == '89') {
        this.reamindTimeList = this.dinnerList;
        this.addOptions.noticeTime = this.dinnerList[0];
      }
      this.changeNewUseTime(item.fd_fp_PropertyID);
      this.getWaitCarCount(item.fd_fp_PropertyID);
    },
    //     点击提醒时间
    clickRemindTime(item, index) {
      this.remindTimeContainerIsShow = false;
      this.addOptions.noticeTime = item;
    },
  }
}
</script>
<style scoped type="text/less" lang="less">
@r: 30rem;
.container {
    width: 100%;
    background: linear-gradient(#3d3d3d, white);
    padding-top: 30/@r;
    padding-bottom: 200/@r;
}

.backUp {
    width: 20/@r;
    height: 20/@r;
    border-left: 1/@r solid white;
    border-bottom: 1/@r solid white;
    transform: rotate(45deg);
    margin: 0 0 0 40/@r;
}

.choiceIfoChar {
    color: white;
    height: 50/@r;
    font-size: 35/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    padding: 0/@r;
    margin: 50/@r 0/@r 25/@r 40/@r;
}

.eatTime {
    background-color: white;
    color: rgb(81, 81, 81);
    margin: 0 20/@r 20/@r;
    padding: 20/@r 30/@r 0;
    font-size: 30/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    box-shadow: 0/@r 2/@r 5/@r #b0b0b0;
}

.time {}

.timeBox {
    margin-bottom: 20/@r;
    font-size: 30/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
}

.timeTime {
    float: right;
    margin-right: 5/@r;
    /*border: none;*/
}

.rightTriangle {
    float: right;
    width: 18/@r;
    height: 18/@r;
    border-top: 1/@r solid silver;
    border-right: 1/@r solid silver;
    transform: rotate(45deg);
    margin: 20/@r 20/@r 0 5/@r;
}

.roomType {
    padding-left: 60/@r;
    /*background-color: royalblue;*/

}

.roomType > li {
    float: left;
    /*margin-right: 142/@r;*/
    margin-right: 90/@r;
    /*background-color: rebeccapurple;*/
}
.roomType > li.active:before {
    content: '';
    width: 12/@r;
    height: 12/@r;
    /*background-color: royalblue;*/
    display: block;
    border-radius: 45/@r;
    border: 9/@r solid rgb(255, 185, 46);
    /*border: 9/@r solid black;*/
    position: absolute;
    margin: 10/@r 0 0 -40/@r;
}

.roomType > li.active {
    color: rgb(255, 185, 46);
}
.roomType > li:before {
    border-radius: 45/@r;
    border: 2/@r solid silver;
    width: 25/@r;
    height: 25/@r;
    content: '';
    display: block;
    position: absolute;
    margin: 10/@r 0 0 -40/@r;
}

.images {
    margin-top: 20/@r;
    padding-left: 10/@r;
}

.images > li {
    float: left;
    /*margin-right: 67/@r;*/
    margin-right: 45/@r;
}

.imagesName {
    text-align: center;
    font-size: 22/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    color: rgb(167, 166, 181);
}

.imagesName.active {
    color: rgb(255, 185, 46);
}

.order {
    background-color: white;
    color: rgb(81, 81, 81);
    margin: 0 20/@r 20/@r;
    padding: 20/@r 30/@r;
    font-size: 30/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    box-shadow: 0/@r 2/@r 5/@r #b0b0b0;
}

.orderPeople {
    font-size: 30/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    float: left;
    font-weight: bold;
}

.takeTickPeople {
    color: white;
    background-color: rgb(255, 136, 136);
    float: left;
    border-radius: 10/@r;
    padding: 3/@r 20/@r;
    font-size: 12/@r;
    line-height: 30/@r;
    margin: 7/@r 0 0 20/@r;
}

.order {
    padding-bottom: -20/@r;
}

.order > div {
    /*margin-bottom: 40/@r;*/
}

.restLast {
    float: right;
    color: rgb(255, 136, 136);
}

.foodadd {}

.foodjian {}

.peopleName {
    float: left;
    width: 100%;
    margin-left: 50/@r;
    border: none;
}

section {
    margin-bottom: 120/@r;
}

section > .order > .phoneBox {
    /*padding-bottom: -40/@r;*/
}

.orderBot {
    padding-bottom: 40/@r;
}

.diningIfo {
    background-color: white;
    color: rgb(81, 81, 81);
    margin: 0 20/@r 20/@r;
    padding: 20/@r 30/@r;
    font-size: 30/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    box-shadow: 0/@r 2/@r 5/@r #b0b0b0;
}

.diningName {
    margin-bottom: 30/@r;
    font-weight: bold;
}

.dating {
    font-size: 22/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    margin-left: 10/@r;
}

.datingNumber {
    font-size: 22/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    text-align: center;
    margin-left: 40/@r;
}

.datingPrice {
    font-size: 22/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    float: right;
}

.foodListBox {
    margin-bottom: 20/@r;
}

footer {
    height: 100/@r;
    position: fixed;
    bottom: 0;
    width: 100%;
}

.footPrice {
    width: 65%;
    float: left;
    background-color: rgb(61, 61, 61);
    font-size: 34/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    color: white;
    padding-left: 30/@r;
}

.sureCharge {
    float: right;
    text-align: center;
    color: white;
    width: 35%;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    background-color: rgb(252, 195, 81);
}

.roomTypePic {
    padding: 10/@r;
    /*background-color: rgb(252,195,81);*/
    border: 1/@r solid white;
}

.roomTypePic.active {
    border: 1/@r solid rgb(252, 195, 81);
}

datetime {
    font-size: 35/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
}

.phoneNumberInput {
    margin-left: -15/@r;
    margin-top: -20/@r;
    border: none;
}

.diningRoomList {
    margin-bottom: 20/@r;
    position: relative;
}

.diningRoomI {
    width: 25/@r;
    height: 25/@r;
    display: block;
    border-radius: 45/@r;
    border: 2/@r solid silver;
    float: left;
    margin: 60/@r 10/@r 0 -30/@r;
}

.diningRoomI.active {
    border: 9/@r solid rgb(255, 185, 46);
}

.eatTimeContainer {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

.eatTimeContent {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    max-height: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
}

.eatTimeContent > li {
    height: 100/@r;
    background-color: #fff;
    padding: 10/@r 20/@r;
    font-size: 35/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
}
.eatTimeContent > li:active {
    background-color: #f1f1f1;
}

.opDiv {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
}

.eatDateName {
    margin-left: 15/@r;
}

.eatDateValue {
    float: right;
    color: #989898;
}

.haveTimeContainer {
    position: fixed;
    /*background-color: black;*/
    /*opacity: 0.3;*/
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

.haveTimeContent {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    max-height: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
}

.haveTimeContent > li {
    height: 100/@r;
    background-color: #fff;
    padding: 10/@r 20/@r;
    font-size: 35/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
}
.haveTimeContent > li:active {
    background-color: #f1f1f1;
}

.addOrSub {
    position: absolute;
    bottom: 15/@r;
    right: 0;
    font-size: 30/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
}

.addOrSub > img {
    width: 40/@r;
    height: 40/@r;
}

.orderBot .blodClass {
    float: left;
}

.orderBot div {
    overflow: hidden;
}

.orderBot input {
    overflow: hidden;
    font-size: 30/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
}

.roomInfomation {
    float: left;
    padding-left: 20/@r;
}

.roomInfomation > span {
    display: block;
    font-size: 30/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
}

.roomInfomation .datingPrice {
    font-size: 28/@r;
    line-height: 45/@r;
    display: block;
    float: none;
}

.diningRoomList .diningPic {
    float: left;
    width: 200/@r;
    height: 150/@r;
}
</style>
