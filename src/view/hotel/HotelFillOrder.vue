<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>填写订单</strong>
    </header>
    <section>
      <div class="roomInfo">
        <strong>{{hotelOrderInfo.hotelInfo.ht_ht_HotelName}}</strong>
        <span>{{hotelOrderInfo.roomType.ht_bt_RoomName}} {{hotelOrderInfo.roomInfo.ht_rpp_BedType}}房</span>
        <div class="liveInfo clearfix">
          <span>入住：{{hotelOrderInfo.inTime}}</span>
          <span>离店：{{hotelOrderInfo.outTime}}</span>
          <span>{{hotelOrderInfo.days}}晚</span>
        </div>
        <div class="breakfastInfo clearfix">
          <span>早餐：{{hotelOrderInfo.roomInfo.ht_rpp_BreakfastType}}</span>
          <!--<a href="javascript:;">每日明细<i></i></a>-->
        </div>
      </div>
      <p class="reserveRule"><i></i>完成预定后，20分钟内为您反馈确认结果</p>
      <!--选择房间门牌号-->
      <div class="changeRoom clearfix" @click="showRoomSelect = true">
        <strong>{{selectList.length ? '已选择:' + text : text}}</strong>
        <i></i>
      </div>
      <div class="changeRoom clearfix">
        <strong>选择停车位<span>(剩余: {{hotelOrderInfo.stopCarNum}}位)</span></strong>
        <div>
          <div class="reduceNum" @click.stop="reduceCarNum">
            <i></i>
          </div>
          <span>{{carNum}}</span>
          <div class="addNum" @click.stop="addCarNum">
            <i></i>
          </div>
        </div>
      </div>


      <div class="reserveList clearfix">
        <!--<div class="reserveNum clearfix">-->
        <!--<strong>房间数<em style="color: #dd7015;">(剩余{{surplusRoom}}间)</em></strong>-->
        <!--<div>-->
        <!--<div>-->
        <!--<span @click="reduceNum">-</span>-->
        <!--<em>{{roomNum}}间</em>-->
        <!--<span @click="addNum">+</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

        <!--选择的-->
        <div class="selectedPeople" v-show="isSelect">
          <ul class="selectedList clearfix">
            <li v-for="item,index in peopleList">
              <strong>{{item.ui_uc_Name}}</strong>
              <i></i>
            </li>
            <li class="clearfix" @click="goAddTopContacts"><i></i><strong>添加</strong></li>
          </ul>
          <ul class="selectedInfoList">
            <li class="clearfix" v-for="item,index in peopleList" @click="updateTopContacts(item)">
              <i @click.stop="cancelPeople(item)"></i>
              <div>
                <div class="peopleInfo">
                  <div class="peopleInfoCon clearfix">
                    <strong>{{item.ui_uc_Name}}</strong>
                    <div>
                      <span>{{hotelOrderInfo.hotelInfo.ht_ht_HotelName}}</span>
                    </div>
                  </div>
                  <div class="peopleInfoCon clearfix">
                    <strong>手机号</strong>
                    <div>
                      <span>{{item.ui_uc_Phone}}</span>
                    </div>
                  </div>
                  <div class="peopleInfoCon clearfix">
                    <strong>身份证号</strong>
                    <div>
                      <span>{{item.ui_uc_CertNo}}</span>
                    </div>
                  </div>
                  <i></i>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!--<div class="reservePhone">-->
        <!--<div>-->
        <!--<strong>预定人手机</strong>-->
        <!--<div>-->
        <!--<input type="text" v-model="phoneNum" placeholder="必填,预定人手机号">-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <!--<div class="reserveInvoice clearfix">-->
      <!--<strong>发票<i></i></strong>-->
      <!--<span>未开具</span>-->
      <!--<i></i>-->
      <!--</div>-->
      <div class="reminder">
        <strong>温馨提示</strong>
        <span>加床：请提前咨询酒店前台</span>
        <p>取消规则：订单提交需支付全部房费，如订单不确认将全额退款至您的付款账户。订单确认后不可取消修改，如未入住或取消修改及提前离店</p>
      </div>
      <div class="reminder">
        <strong>到店须知</strong>
        <p>订单一经确认，不可更改或添加入住人姓名。 </p>
      </div>
      <div class="hotelPredeterminedInstructions clearfix">
        <div class="selectOk"><i></i></div>
        <strong>我已阅读并接受</strong>
        <span @click="showAll = true">《酒店预定须知》</span>
      </div>
    </section>
    <div class="orderDetails">
      <div>
        <strong @click="showMask">
          <span>应付总额</span>
          <em>¥{{allMoney}}</em>
        </strong>
        <span @click="showMask">查看明细</span>
      </div>
      <a href="javascript:;" @click="orderNext">下订单</a>
    </div>
    <div class="hotelInfoWrap" @click="showMask" v-show="maskState">
      <div class="hotelInfo" @click.stop="clickWhite">
        <strong>确认订单</strong>
        <div class="orderInfoContent">
          <div class="roomType">
            <strong>已选择房间:</strong>
            <p>{{selectList.length ? text : '暂未选择'}}</p>
          </div>
          <div class="roomType">
            <strong>房间类型:</strong>
            <p>{{hotelOrderInfo.roomType.ht_bt_RoomName}} {{hotelOrderInfo.roomInfo.ht_rpp_BedType}}房</p>
          </div>
          <div class="roomType">
            <strong>入离时间:</strong>
            <p>{{hotelOrderInfo.inTime}} 到 {{hotelOrderInfo.outTime}}</p>
          </div>
          <div class="roomType">
            <strong>预定人手机号:</strong>
            <p>{{phoneNum}}</p>
          </div>
          <div class="roomType">
            <strong>选择的停车位数量:</strong>
            <p>{{carNum}}位</p>
          </div>
          <div class="roomType">
            <strong>总价明细:</strong>
            <p>￥{{hotelOrderInfo.roomInfo.ht_rpp_ProductPrice}}x{{hotelOrderInfo.days}}晚x{{selectList.length}}间房</p>
          </div>
          <a href="javascript:;" @click="hotelOrder">去支付</a>
        </div>
      </div>
    </div>
    <!--酒店预定须知-->
    <popup v-model="showAll" position="right" width="100%" style="background-color: #fff;">
      <div class="hotelReserve">
        <h2>1.预订</h2>
        <p></p>
        <p>1.1&nbsp;&nbsp;&nbsp;在线预订</p>
        <p>为确保您的行程，在您填写预订单时，务必留下准确入住人姓名（请确保与所使用的有效证件上的姓名一致）及联系人手机号码。</p>
        <p>1.2&nbsp;&nbsp;&nbsp;最晚修改及取消时间</p>
        <p>预付及担保订单有规定的最晚修改及取消时间，超过最晚修改及取消时间将可能给您造成损失，具体以酒店取消规则为准。</p>
        <p>1.3&nbsp;&nbsp;&nbsp;当您需要预订多间客房时，须提供不少于所预订客房数量的实际入住人的信息，入住人姓名需要不同，以方便预订确认。</p>
        <p></p>
        <h2>2.费用说明</h2>
        <p></p>
        <p>2.1&nbsp;&nbsp;&nbsp;网站前台呈现的酒店价格为酒店房费，不包含酒店其他费用及税收。</p>
        <p>2.2&nbsp;&nbsp;&nbsp;网站价格可能因为酒店原因会有所变更，请以最终确认为准。</p>
        <p>2.3&nbsp;&nbsp;&nbsp;您入住酒店的早餐与加床价格视各酒店规定有所不同。</p>
        <p></p>
        <h2>3.入住、延住与离店</h2>
        <p></p>
        <p>3.1&nbsp;&nbsp;&nbsp;通常情况下，酒店的最早入住时间为&nbsp;14：&nbsp;00，最晚离店时间为正午&nbsp;12：&nbsp;00。</p>
        <p>3.1.1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;若您提前入住，请与酒店协商，可能会遇到无空房的情况，需要您等待。</p>
        <p>3.1.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;若您推迟离店，需与酒店协商，酒店一般会加收一定的费用。</p>
        <p>3.2&nbsp;&nbsp;&nbsp;请您在预订填写订单信息时注明的最晚到店时间前到达酒店，如未能如期到达请及时与酒店联系，否则酒店将会取消您的订单。</p>
        <p>3.3&nbsp;&nbsp;&nbsp;产品均为即时计价，请以我方最终确认价格为准。</p>
        <p></p>
        <h2>4.您的权利和责任</h2>
        <p></p>
        <p>4.1&nbsp;&nbsp;&nbsp;若订单已确认，您可如期入住所预订的酒店。<strong></strong></p>
        <p>4.2&nbsp;&nbsp;&nbsp;若订单已确认，您在约定时间至预订酒店前台发现无房，请立即拨打电话通知惠乐游，以便我们尽快帮您协调解决。<strong></strong></p>
        <p>
          4.3&nbsp;&nbsp;&nbsp;您对您的订房亦负有相应的承诺，如由于您已预付房款后而未入住所造成的损失亦将由您承担。如您在酒店入住时遇到困难，请致电惠乐游，惠乐游将为您提供必要的帮助。<strong></strong>
        </p>
        <p></p>
        <h2>5.关于信用卡担保</h2>
        <p></p>
        <p>5.1&nbsp;&nbsp;&nbsp;当旅游旺季、节假日期间或举办大型会展期间酒店房间紧张等情况下，部分酒店需要您提供信用卡担保。<strong></strong></p>
        <p>5.2&nbsp;&nbsp;&nbsp;信用卡担保所支持的卡种以系统提示为准，并请您提供正确的信用卡信息，如信息不正确或通不过系统审核，则您将无法预订需要担保的酒店。</p>
        <p>5.3&nbsp;&nbsp;&nbsp;需要信用卡担保的酒店，订单一经确认将不可取消或修改。因此请在填写担保订单前请慎重考虑您是否会修改行程，以免给您造成不必要的损失。</p>
        <p>5.4&nbsp;&nbsp;&nbsp;如您未按订单时间或房间数量入住，酒店将按国际惯例扣除相应的房费。</p>
        <p></p>
        <h2>6.免责条款</h2>
        <p></p>
        <p>6.1&nbsp;&nbsp;&nbsp;惠乐游旅游网酒店产品页显示特定地点的酒店信息，但不代表建议去这些地方旅行或认为没有风险， 对于去这些地方旅行造成的损害或损失惠乐游旅游网不承担任何责任。</p>
        <p>6.2&nbsp;&nbsp;&nbsp;惠乐游旅游网对您入住酒店期间发生的意外不承担任何责任。建议您查看将要去旅行的国家政府发布的相关旅行公告，并采取必要的预防措施。 同时建议您购买个人旅行保险。</p>
        <p>6.3&nbsp;&nbsp;&nbsp;如您被法院列入全国失信被执行人名单，您可能无法正常出游，您可以于预订前自行核实，避免不必要的损失。</p>
      </div>
      <div class="closeIcon" @click="showAll = false">
        <i></i>
      </div>
    </popup>


    <popup position="right" width="100%" v-model="showRoomSelect" style="background-color: #fff;">
      <div class="selectBox">
        <strong><em @click="showRoomSelect = false">取消</em><span>选择房间门牌号</span><a href="JavaScript:;"
                                                                                  @click="sure">确定</a></strong>
        <div class="selectRoomDoorNum">
          <!--栋-->
          <!--<div class="houseNum">-->
          <!--<a href="javascript:;" :class="{active:n==index}" v-for="item,index in hotelRoomNumList"-->
          <!--@click="changeHotelRoomNumList(item,index)">{{item.Tung}}栋 <i v-show="item.num">{{item.num}}</i></a>-->
          <!--</div>-->
          <!--层-->
          <!--<div class="layerNum" v-show="isLayerNum">-->
          <!--<a href="javascript:;" v-for="item,index in hotelRoomOneList" :class="{active:m==index}"-->
          <!--@click="changeRoomNum(item,index)">{{item.Layer}}楼</a>-->
          <!--</div>-->
          <!--房间-->
          <div class="roomNum" v-show="hotelRoomNumList">
            <a href="javascript:;" v-for="item,index in hotelRoomNumList" :class="{active:item.isOff}"
               @click="changeHotelRoomOneRoomList(item,index)">{{item.HouseNumber}}号</a>
            <x-button type="primary" @click.native="sure" style="margin-top: 20px">确定</x-button>
          </div>

        </div>

      </div>
    </popup>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Popup, Cell, Group, Actionsheet, XNumber, XButton} from 'vux'
  import {isPhoneNum, getHouseNumber} from '@/assets/js/public'

  export default {
    components: {
      Toast,
      Popup,
      Cell,
      Group,
      Actionsheet,
      XNumber,
      XButton
    },
    computed: Object.assign({
      allMoney() {
        return this.hotelOrderInfo.roomInfo.ht_rpp_ProductPrice * this.selectList.length * this.hotelOrderInfo.days;
      }
    }, mapGetters([
      'hotelOrderInfo',
      'hotelRoomNumList',
      'hotelRoomOneList',
      'hotelRoomOneRoomList',
      'hotelSelectRoomList'
    ])),
    data() {
      return {
        text: '选择房间门牌号',
        s: 0,
        isRoomNum: false,
        isLayerNum: false,
        showAll: false,
        showErr: false,
        errCon: '',
        userInfo: {},
        n: -1,
        m: 0,
        surplusRoom: 0,
        personInfo: [],
        obj: {},
        maskState: false,
        isSelect: true,
        peopleList: [],
        showRoomSelect: false,
        selectList: [],
        menu7: [],
        hideMenu: false,
        phoneNum: '',
        carNum: 0,
      }
    },
    watch: {},
    beforeRouteLeave(to, from, next) {
      this.$store.commit('clearHotel');
      this.text = '选择房间门牌号';
      this.selectList = [];

      if (to.name == "HotelDetails") {
        this.$store.commit('hotelSelectRoomList', []);
      }


      next();
    },
    created() {
      if (this.hotelSelectRoomList.length) {
        this.selectList = [];
        let arr = [];
        for (var i = 0; i < this.hotelSelectRoomList.length; i++) {
          arr.push(this.hotelSelectRoomList[i].HouseNumber)
          this.selectList.push(this.hotelSelectRoomList[i].Id)
        }
        this.text = arr.join(',');
      }
      if (localStorage.getItem('peopleList') && JSON.parse(localStorage.getItem('peopleList')).length) {
        this.peopleList = JSON.parse(localStorage.getItem('peopleList'));
      }
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
      this.initRoomNum();
    },
    methods: {
      //点击确定
      sure() {
        this.selectList = []
        let arr = []
        for (var i = 0; i < this.hotelRoomNumList.length; i++) {
          if (this.hotelRoomNumList[i].isOff) {
            arr.push(this.hotelRoomNumList[i].HouseNumber)
            this.selectList.push(this.hotelRoomNumList[i].Id)
          }
        }
        let newArr = [];
        newArr = this.hotelRoomNumList.filter(item => {
          if (item.isOff) {
            return true;
          }
          return false;
        })
        this.$store.commit('hotelSelectRoomList', newArr)
        this.text = arr.join(',')
        this.showRoomSelect = false
      },
      changeHotelRoomOneRoomList(item, index) {
        this.obj.s = index;
        this.$store.commit('setHotelRoomOneNewRoomList', this.obj)
      },
      changeHotelRoomNumList(item, index) {
        this.obj.i = index;
        this.isLayerNum = true;
        this.n = index;
        this.m = -1;
        this.$store.commit('setHotelRoomOneList', this.obj)
      },
      changeRoomNum(item, index) {
        this.s = index;
        this.obj.s = index;
        this.isRoomNum = true;
        this.m = index;
        this.$store.commit('setHotelRoomOneRoomList', index)
      },
      //添加出有人
      goAddTopContacts() {
        this.$router.push({
          name: 'HotelFillOrder',
          query: {num: this.roomNum}
        })
        this.$router.push({name: 'SelectTopContacts', query: {num: this.roomNum}})
      },
      showMask() {
        this.maskState = !this.maskState;
        if (this.maskState) {
          this.orderNext();
        }
      },
      //点击空白
      clickWhite() {
      },
      goTopPage() {
        this.$router.go(-1)
      },
      //房间数量
      initRoomNum() {
        let GetUseNumberInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "ht_rpp_ID": this.hotelOrderInfo.roomInfo.ht_rpp_ID,
          "inDate": this.hotelOrderInfo.inTime,
          "outDate": this.hotelOrderInfo.outTime,
          "rows": 10,
        };
        this.$store.dispatch('initHotelRoomNum', GetUseNumberInfo)
          .then(data => {
            if (this.hotelSelectRoomList.length) {
              this.$store.commit('updateRoomState')
            }
          }, err => {
            this.showErr = true
            this.errCon = err;
          })
      },
      //下订单
      orderNext() {
        this.maskState = true;
        if (this.peopleList.length) {
          this.phoneNum = this.peopleList[0].ui_uc_Phone;
        }
      },
      //添加订单
      hotelOrder() {
        if (!this.selectList.length) {
          this.showErr = true
          this.errCon = '请选择房间门牌号';
          return
        }
        if (!this.peopleList.length) {
          this.showErr = true;
          this.errCon = '至少选择一位入住人';
          return
        }
        for (let i = 0; i < this.peopleList.length; i++) {
          this.personInfo.push({"ht_od_UserName": this.peopleList[i].ui_uc_Name})
        }
        let HotelMakeOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token ? this.userInfo.token : '',
          "carSeats": this.carNum,//车位数
          "data": {
            "RoomIds": this.selectList.join(','),
            "ht_or_OrderID": "",
            "ht_or_RoomProductID": this.hotelOrderInfo.roomInfo.ht_rpp_ID,
            "ht_or_UserID": this.userInfo.sm_ui_ID,
            "ht_or_UserName": this.userInfo.sm_ui_Name,
            "ht_or_TouristTraderID": this.hotelOrderInfo.hotelInfo.sm_ai_AgentInfoID,
            "ht_or_TouristTraderName": "",
            "ht_or_SumPrice": this.allMoney,
            "ht_or_SumService": "0",
            "ht_or_FullPrice": this.hotelOrderInfo.roomInfo.ht_rpp_ProductPrice,
            "ht_or_InDate": this.hotelOrderInfo.inTime,
            "ht_or_OutDate": this.hotelOrderInfo.outTime,
            "ht_or_PayWay": "",
            "ts_to_Remark": "",
            "oi_MerchantName": sessionStorage.getItem('hotelN'),    //酒店名称
            "ht_od_Email": this.userInfo.sm_ui_Email,
            "ht_od_Phone": this.phoneNum,
            ht_or_OtaType: 1
          },
          "personInfo": this.personInfo
        }

        this.$store.dispatch('makeHotelOrder', HotelMakeOrder)
          .then(id => {
            this.initOrderInfo(id);
          }, err => {
            this.showErr = true
            this.errCon = err;
          })
      },
      //取消
      cancelPeople(item) {
        this.peopleList = this.peopleList.filter(obj => {
          if (obj.ui_uc_ID == item.ui_uc_ID) {
            return false
          }
          return true;
        })
        localStorage.setItem('peopleList', JSON.stringify(this.peopleList))
      },
      //修改
      updateTopContacts(item) {
        this.$router.push({name: 'AddTopContacts', query: {id: 1}})
        sessionStorage.setItem('updateTopContacts', JSON.stringify(item))
      },
      //查询订单
      initOrderInfo(id) {
        let getUserOrderDetail = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "huiuserid": this.userInfo.sm_ui_ID,
          "orderID": id ? id : '',
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('initOrderInfo', getUserOrderDetail)
          .then(data => {
            this.$store.commit('hideLoading');
            this.$store.commit('hotelSelectRoomList', []);
            sessionStorage.setItem('orderInfo', JSON.stringify(data[0]))
            this.$router.push({name: 'PayOrder', query: {type: data[0].oi_OrderTypeID}})
          }, err => {
            this.showType = 'cancel';
            this.showErr = true;
            this.errCon = err;
          })
      },
      //carNum--;
      reduceCarNum() {
        if (this.carNum > 0) {
          this.carNum--;
        }
      },
      //carNum++;
      addCarNum() {
        if (this.hotelOrderInfo.stopCarNum) {
          this.carNum++;
          if (this.carNum > this.hotelOrderInfo.stopCarNum) {
            this.carNum = this.hotelOrderInfo.stopCarNum;
          }
        }
      },
    },
  }
</script>
<style scoped type="text/less" lang="less">
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  @r: 30rem;
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f0f0f0;
    height: 88/@r;
  }

  .leftIcon {
    float: left;
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/hotel/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 25/@r 0 0 30/@r;
  }

  header > strong {
    position: absolute;
    top: 22/@r;
    font-size: 34/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    color: #000;
    left: 50%;
    transform: translateX(-50%);
  }

  section {
    position: fixed;
    top: 88/@r;
    right: 0;
    bottom: 98/@r;
    left: 0;
    background-color: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 100/@r;
  }

  .roomInfo {
    padding: 19/@r 30/@r 18/@r 30/@r;
    border-bottom: 16/@r solid #f0f0f0;
  }

  .roomInfo > strong {
    font-size: 30/@r;
    line-height: 56/@r;
    font-weight: bold;
    font-family: "微软雅黑";
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .roomInfo > span {
    font-size: 23/@r;
    line-height: 49/@r;
    font-family: "微软雅黑";
    color: #999;
  }

  .liveInfo > span {
    float: left;
    margin-right: 20/@r;
    font-size: 23/@r;
    line-height: 47/@r;
    font-family: "微软雅黑";
    color: #333333;
  }

  .breakfastInfo {
    font-size: 23/@r;
    line-height: 51/@r;
    font-family: "微软雅黑";
    color: #333333;
  }

  .breakfastInfo > span {
    float: left;
    margin-right: 70/@r;
  }

  .breakfastInfo > a {
    float: left;
    color: #33bd61;
    position: relative;
    padding-right: 20/@r;
  }

  .breakfastInfo > a:before {
    content: '';
    position: absolute;
    right: 0;
    top: 16/@r;
    width: 11/@r;
    height: 19/@r;
    background: url("../../assets/img/hotel/rightIcon2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .reserveRule {
    font-size: 23/@r;
    line-height: 55/@r;
    font-family: "微软雅黑";
    border-bottom: 16/@r solid #f0f0f0;
    padding: 0 30/@r;
    color: #dd7015;
  }

  .reserveRule > i {
    float: left;
    width: 30/@r;
    height: 30/@r;
    margin: 13/@r 15/@r 0 0;
    background: url("../../assets/img/hotel/reserveIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .reserveList {
    border-bottom: 15/@r solid #f0f0f0;
    font-size: 25/@r;
    line-height: 77/@r;
    font-family: "微软雅黑";
  }

  .reserveList > div {
    border-bottom: 1/@r solid #f0f0f0;
  }

  .reserveList input {
    float: left;
    border: none;
    font-size: 25/@r;
    line-height: 77/@r;
    font-family: "微软雅黑";
    background-color: transparent;
    width: 100%;
  }

  .reserveNum {
    padding: 0 30/@r
  }

  .reserveNum > strong {
    float: left;
    margin-right: 30/@r;
  }

  .reserveNum > div {
    overflow: hidden;
  }

  .reserveNum > div > div {
    float: left;
    width: 100%;
  }

  .reserveNum > div > div > em {
    float: left;
    width: 100/@r;
    text-align: center;
    font-size: 25/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    margin-top: 20/@r;
  }

  .reserveNum > div > div > span {
    float: left;
    font-size: 25/@r;
    line-height: 37/@r;
    font-family: "微软雅黑";
    width: 40/@r;
    height: 40/@r;
    text-align: center;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1/@r solid #333;
    color: #000;
    margin-top: 20/@r;
  }

  .reserveInvoice {
    border-bottom: 16/@r solid #f0f0f0;
    padding: 0 30/@r;
    font-size: 24/@r;
    line-height: 55/@r;
    font-family: "微软雅黑";
    position: relative;
  }

  .reserveInvoice > strong {
    width: 33.3333%;
    float: left;
    position: relative;
  }

  .reserveInvoice > strong > i {
    position: absolute;
    width: 22/@r;
    height: 22/@r;
    background: url("../../assets/img/hotel/notesIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    top: 15/@r;
    left: 64/@r;
  }

  .reserveInvoice > span {
    float: left;
    width: 66.6666%;
  }

  .reserveInvoice > i {
    position: absolute;
    width: 14/@r;
    height: 25/@r;
    background: url("../../assets/img/hotel/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    top: 15/@r;
    right: 30/@r;
  }

  .reminder {
    border-bottom: 16/@r solid #f0f0f0;
    padding: 13/@r 30/@r 17/@r;
  }

  .reminder > strong {
    font-size: 25/@r;
    line-height: 51/@r;
    font-family: "微软雅黑";
    color: #333333;
    display: block;
  }

  .reminder > span {
    font-size: 23/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    color: #333;
  }

  .reminder > p {
    font-size: 23/@r;
    line-height: 41/@r;
    font-family: "微软雅黑";
    color: #dd7015;
  }

  .hotelPredeterminedInstructions {
    padding: 23/@r 30/@r;
    font-size: 23/@r;
    line-height: 29/@r;
    font-family: "微软雅黑";
  }

  .selectOk {
    width: 29/@r;
    height: 29/@r;
    border: 1/@r solid #4ece5a;
    float: left;
    -webkit-border-radius: 2/@r;
    -moz-border-radius: 2/@r;
    border-radius: 2/@r;
    position: relative;
    margin-right: 10/@r;
  }

  .selectOk > i {
    position: absolute;
    top: 6/@r;
    left: 4/@r;
    width: 20/@r;
    height: 10/@r;
    border-bottom: 1/@r solid #4ece5a;
    border-left: 1/@r solid #4ece5a;
    transform: rotateZ(-45deg);
  }

  .hotelPredeterminedInstructions > strong {
    color: #080707;
    float: left;
    margin-right: 10/@r;
  }

  .hotelPredeterminedInstructions > span {
    color: #33bd61;
    float: left;
  }

  .orderDetails {
    height: 98/@r;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-top: 1/@r solid #dcdcdc;
  }

  .orderDetails > div {
    width: 66.6666%;
    float: left;
    padding: 11/@r 0 0 30/@r;
  }

  .orderDetails > div > strong {
    font-size: 25/@r;
    line-height: 41/@r;
    font-family: "微软雅黑";
    color: #333;
    display: block;
  }

  .orderDetails > div > strong > em {
    color: #dd2b15;
  }

  .orderDetails > div > span {
    color: #33bd61;
    display: block;
    font-size: 23/@r;
    line-height: 39/@r;
    font-family: "微软雅黑";
    margin-left: 30/@r;
  }

  .orderDetails > a {
    float: left;
    width: 33.3333%;
    text-align: center;
    background-color: #dd7015;
    color: #fff;
    font-size: 28/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
  }

  .reservePhone {
    padding: 0 30/@r;
  }

  .reservePhone > div > strong {
    float: left;
    margin-right: 30/@r;
  }

  .inPeople > div > div,
  .reservePhone > div > div {
    overflow: hidden;
  }

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

  .hotelReserve {
    padding: 30/@r;
    font-family: "微软雅黑";
  }

  .hotelReserve h2 {
    font-weight: normal;
    font-size: 35/@r;
    color: #666;
  }

  .hotelReserve p {
    font-size: 28/@r;
    margin-bottom: 20/@r;
    line-height: 33/@r;
    color: #666;
  }

  .hotelReserve div {
    font-size: 30/@r;
    line-height: 2;
    background-color: #52a6d0;
    text-align: center;
    color: #fff;
    -webkit-border-radius: 30/@r;
    -moz-border-radius: 30/@r;
    border-radius: 30/@r;
  }

  .closeIcon {
    position: fixed;
    top: 30/@r;
    right: 30/@r;
    background-color: #ccc;
    padding: 10/@r;
  }

  .closeIcon > i {
    width: 30/@r;
    height: 30/@r;
    display: block;
    background: url("../../assets/img/home/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .selectedPeople {
    padding: 20/@r 30/@r;
    padding-bottom: 0;
  }

  .selectedList > li {
    float: left;
    width: 30%;
    margin-right: 5%;
    border: 1px solid #ffa948;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    font-size: 28/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
    color: #2e2e2e;
    text-align: center;
    margin-bottom: 20/@r;
    position: relative;
  }

  .selectedList > li:nth-of-type(3n) {
    margin-right: 0;
  }

  .selectedList > li > i {
    position: absolute;
    width: 51/@r;
    height: 47/@r;
    background: url("../../assets/img/ticket/changedIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    bottom: -1/@r;
    right: -1/@r;
  }

  .selectedList > li:last-of-type {
    border-style: dashed;
    border-color: #cdcdcd;
    color: #ffa948;
    padding: 0 20/@r;
  }

  .selectedList > li:last-of-type i {
    float: left;
    position: static;
    width: 35/@r;
    height: 35/@r;
    background: url("../../assets/img/ticket/addIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 17/@r 0 0 20/@r;
  }

  .selectedList > li:last-of-type strong {
    float: right;
    margin-right: 20/@r;
  }

  .selectedInfoList {
    padding: 10/@r 20/@r 0 0;

  }

  .selectedInfoList > li {
    position: relative;
    padding-top: 10/@r;
  }

  .selectedInfoList > li > i {
    position: absolute;
    width: 34/@r;
    height: 34/@r;
    background: url("../../assets/img/ticket/cancelIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    top: 50%;
    margin-top: -17/@r;
    left: 0;
  }

  .selectedInfoList > li > div {
    padding-left: 70/@r;
  }

  .peopleInfo {
    border-bottom: 1px solid #efeded;
    font-size: 25/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    padding-bottom: 10/@r;
  }

  .peopleInfoCon > strong {
    float: left;
    width: 130/@r;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 10/@r;
    color: #2e2e2e;
  }

  .peopleInfoCon > div {
    overflow: hidden;
  }

  .peopleInfoCon span {
    float: left;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 40/@r;
    color: #adaaaa;
  }

  .peopleInfo > i {
    width: 16/@r;
    height: 16/@r;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -8/@r;
    border-right: 1px solid #939394;
    border-bottom: 1px solid #939394;
    transform: rotate(-45deg);
  }

  .changeRoom {
    padding: 20/@r 30/@r;
    border-bottom: 16/@r solid #f0f0f0;
  }

  .changeRoom > strong {
    float: left;
    font-size: 28/@r;
    line-height: 1.5;
    font-family: "微软雅黑";
    color: #666;
    width: 95%;
  }

  .changeRoom > strong > span {
    margin-left: 20/@r;
    color: #f80;
  }

  .changeRoom:nth-of-type(3) > strong {
    width: 70%;
    line-height: 60/@r;
  }

  .changeRoom > i {
    float: right;
    width: 18/@r;
    height: 18/@r;
    border-top: 2px solid #ccc;
    border-right: 2px solid #ccc;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-top: 12/@r;
  }

  .changeRoom > div {
    float: right;
  }

  .changeRoom > div > .reduceNum {
    float: left;
    padding: 10/@r;
  }

  .changeRoom > div > .reduceNum > i {
    display: block;
    width: 40/@r;
    height: 40/@r;
    background: url("../../assets/img/food/jian.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .changeRoom > div > .addNum {
    float: left;
    padding: 10/@r;
  }

  .changeRoom > div > .addNum > i {
    display: block;
    width: 40/@r;
    height: 40/@r;
    background: url("../../assets/img/food/foodadd.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .changeRoom > div > span {
    float: left;
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
    width: 80/@r;
    text-align: center;
    color: #333;
  }

  .selectBox > strong {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 34/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #999;
    background-color: #f0f0f0;
  }

  .selectBox > strong > em {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 25/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #999;
    padding: 0 30/@r;
  }

  .selectBox > strong > a {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 25/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #999;
    padding: 0 30/@r;
  }

  .selectRoomDoorNum {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
  }

  .selectRoomDoorNum > div {
    height: 100%;
    float: left;
    width: 100%;
    padding: 0 0 30/@r 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border-right: 1px solid #f1f1f1;
  }

  .selectRoomDoorNum > div:last-of-type {
    border-right: none;
  }

  .selectRoomDoorNum > div a {
    display: block;
    font-size: 28/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    padding: 24/@r 30/@r 24/@r 20/@r;
    border-bottom: 1px solid #f1f1f1;
  }

  .houseNum a.active,
  .layerNum a.active {
    background-color: #239cb9;
    color: #fff;
    position: relative;
  }

  .roomNum a {
    position: relative;

  }

  .roomNum a.active {
    color: #409EFF;
  }

  .roomNum > .active:before {
    content: '';
    position: absolute;
    width: 30/@r;
    height: 15/@r;
    border-bottom: 1px solid #409EFF;
    border-left: 1px solid #409EFF;
    right: 20/@r;
    top: 25/@r;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .houseNum i {
    float: right;
    color: #fff;
    font-size: 28/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    background-color: rgba(255, 0, 0, .7);
    padding: 0 10/@r;
    -webkit-border-radius: 18/@r;
    -moz-border-radius: 18/@r;
    border-radius: 18/@r;
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


</style>
