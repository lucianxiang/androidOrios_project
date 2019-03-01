<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>酒店详情</strong>
    </header>
    <section>
      <div class="aboutHotel clearfix">
        <div>
          <strong>{{hotelDetails.ht_ht_HotelName}}</strong>
          <span @click="goMap"><i></i>{{hotelDetails.ht_ht_HotelAddress}}</span>
          <em>{{hotelDetails.ht_ht_Stars | getStars}}</em>
          <div class="hotelFraction clearfix">
            <span>{{hotelDetails.ht_ht_Stars}}星级</span>
            <em @click="goComment"><i></i>{{$route.query.comment}}条点评</em>
            <a href="javascript:;" @click="showHotelInfo = true">酒店介绍&gt;&gt;</a>
          </div>
        </div>
        <img v-lazy="hotelShowImg.oneImg" alt="" @click="openImagePriview">
      </div>
      <div class="hotelScreen clearfix">
        <div class="selectDay" @click="showDateMask">
          <div class="screenTime">
            <span>入{{roomOptions.inDate}}</span>
            <span>离{{roomOptions.outDate}}</span>
          </div>
          <div class="liveNight">{{days}}晚<i></i></div>
        </div>
        <div class="screenCondition">
          <!--<a href="javascript:;" class="canOrder">可订</a>-->
          <a href="javascript:;" class="screenBtn" @click="screenCondition = true">筛选<i></i></a>
        </div>
      </div>
      <ul class="hotelRoomList">
        <li v-for="item,index in hotelSearchRoomInfoList">
          <div class="roomBox clearfix">
            <img alt="" v-lazy="item.RoomInfo.ht_bt_OneImg" @click="goRoomInfo(item)">
            <div class="roomDetails">
              <strong class="clearfix">{{item.RoomInfo.ht_bt_RoomName}}</strong>
              <span class="clearfix">
                <em>{{item.RoomInfo.ht_bt_Area}}㎡</em>
                <em>{{item.RoomInfo.ht_bt_BedType}}</em>
              </span>
              <div class="clearfix">
                <em>促</em>
              </div>
            </div>
            <div class="priceInfo">
              <strong><i>￥</i><span>{{item.RoomProductPriceList[0].ht_rpp_ProductPrice}}</span><em>起</em></strong>
              <div @click="showRoomList(index)">
                <i></i>
              </div>
            </div>
          </div>
          <ul class="roomTypeList" v-show="index == activeIndex">
            <li class="clearfix" v-for="ite,indexC in item.RoomProductPriceList">
              <div class="roomInfo">
                <strong>{{ite.ht_rpp_Name}}</strong>
                <span>{{ite.ht_rpp_BreakfastType + ' ' + ite.ht_rpp_BedType + ' ' + ite.ht_rpp_WafiType}}</span>
                <em>超值价</em>
              </div>
              <div class="roomPriceWrap">
                <div class="roomPrice clearfix">
                  <span @click="goFillOrder(item,ite,index,indexC)">
                    <strong :class="{active: ite.orderState}">{{ite.orderState ? '订完' : '订'}}</strong>
                    <span>在线付</span>
                  </span>
                  <strong>
                    <span>￥ <em>{{ite.ht_rpp_ProductPrice}}</em></span>
                    起
                  </strong>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li style="border: none;color: #999;text-align: center; padding-top: 20px;"
            v-show="!hotelSearchRoomInfoList.length">暂无对应房间
        </li>
      </ul>
    </section>
    <!--选择日期-->
    <div class="dateWrap" @click="maskShow = false" :class="{active: maskShow}">
      <div class="dateBox" @click.stop="clickWhite">
        <div class="dateTitle">
          <span @click="maskShow = false">取消</span>
          <strong>选择日期</strong>
        </div>
        <ul class="weekList clearfix">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
        <ul class="monthList">
          <li v-for="item,index in dateArr">
            <strong>{{item.yearMonth}}</strong>
            <ul class="dayList clearfix">
              <!--空白-->
              <li v-for="ite,index in item.blankArr" v-show="item.blankArr.length"></li>
              <!--当月已过-->
              <li v-for="ite,index in item.passedArr" class="passActive" v-show="item.passedArr.length">{{ite}}</li>
              <!--当月未过-->
              <li
                v-for="ite,index in item.notOverArr"
                :class="[{weekActive: ite.week === 0 || ite.week == 6},{active: ite.status},{dayActive: ite.isDayActive}]"
                @click="changeDay(ite,index,item.notOverArr)"
              >
                <strong>{{ite.year == todayObj.year && ite.month == (todayObj.month + 1) && ite.day == todayObj.day ? '今天' : ite.day}}</strong>
                <span v-if="changeDays[0] && ite.month == changeDays[0].month && ite.day == changeDays[0].day">入住</span>
                <span v-if="changeDays[1] && ite.month == changeDays[1].month && ite.day == changeDays[1].day">离店</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <ImageList v-model="showImageList" :data="HotelImage"></ImageList>
    <!--酒店信息-->
    <popup v-model="showHotelInfo" style="background-color: #fff;" position="right" height="100%" width="100%">
      <div class="closeInfo" @click="showHotelInfo = false"><i></i></div>
      <div class="hotelInfoWrap">
        <!--酒店简介-->
        <div class="hotelIntroduce">
          <strong>酒店简介</strong>
          <ul class="hotelThemeList clearfix">
            <li v-for="item,index in HotelTheme">{{item.ht_tt_Name}}</li>
          </ul>
          <p v-html="HotelModel.ht_ht_Details"></p>
          <div class="contactType clearfix">
            <strong>酒店咨询电话:</strong>
            <div>
              <p>{{HotelModel.ht_ht_TelePhone}}</p>
            </div>
          </div>
          <div class="contactType clearfix" style="margin-top: 0;">
            <strong>手机号码:</strong>
            <div>
              <p>{{HotelModel.ht_ht_Phone}}</p>
            </div>
          </div>
        </div>
        <!--酒店政策-->
        <div class="hotelPolicy">
          <strong>酒店政策</strong>
          <div class="contactType clearfix">
            <strong>入住和离店:</strong>
            <div>
              <p>{{HotelPolicy.ht_hp_InOut ? HotelPolicy.ht_hp_InOut : '暂无数据'}}</p>
            </div>
          </div>
          <div class="contactType clearfix">
            <strong>取消政策:</strong>
            <div>
              <p>{{HotelPolicy.ht_hp_CancelRule ? HotelPolicy.ht_hp_CancelRule : '暂无数据'}}</p>
            </div>
          </div>
          <div class="contactType clearfix">
            <strong>入住手续:</strong>
            <div>
              <p>{{HotelPolicy.ht_hp_BookRule ? HotelPolicy.ht_hp_BookRule : '暂无数据'}}</p>
            </div>
          </div>
          <div class="contactType clearfix">
            <strong>携带宠物:</strong>
            <div>
              <p>{{HotelPolicy.ht_hp_TakePeg ? HotelPolicy.ht_hp_TakePeg : '暂无数据'}}</p>
            </div>
          </div>
        </div>
        <!--设施服务-->
        <div class="facilitiesServices">
          <strong>设施服务</strong>
          <div class="contactType clearfix">
            <strong>基本信息:</strong>
            <div>
              <p>{{HardService.ht_hs_BasicInfo ? HardService.ht_hs_BasicInfo : '暂无数据'}}</p>
            </div>
          </div>
          <div class="contactType clearfix">
            <strong>酒店特色:</strong>
            <div>
              <p>{{HardService.ht_hs_HotelSpecial ? HardService.ht_hs_HotelSpecial : '暂无数据'}}</p>
            </div>
          </div>
          <div class="contactType clearfix">
            <strong>停车服务:</strong>
            <div>
              <p>{{HardService.ht_hs_StopService ? HardService.ht_hs_StopService : '暂无停车服务'}}</p>
            </div>
          </div>
          <div class="contactType2" v-for="item,index in HardServiceHard">
            <strong>{{item.ht_ht_HardTypeName}}</strong>
            <ul class="clearfix" :class="{active: index == openIndex}">
              <li v-for="ite,index in item.SubArray"><i></i><span>{{ite.ht_hd_HardName}}</span></li>
            </ul>
            <p v-show="!item.SubArray.length">暂无数据</p>
            <div class="clearfix">
              <a href="javascript:;"
                 v-show="item.SubArray.length"
                 @click="controlOpen(index)"
              >
                {{index == openIndex ? '收起' : '展开'}}
              </a>
            </div>
          </div>
        </div>
      </div>
    </popup>
    <!--筛选条件-->
    <popup v-model="screenCondition" position="bottom" height="60%" style="background-color: #fff;">
      <div class="screenContent">
        <dl class="clearfix">
          <dt>床型</dt>
          <dd v-for="item,index in BedType" @click="changeBed(item,index)" :class="{active:index == bedIndex}">
            {{item.Name}}
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>早餐</dt>
          <dd v-for="item,index in BreakfastType" @click="changeBreakfast(item,index)"
              :class="{active: index == breakfastIndex}">{{item.Name}}
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>宽带</dt>
          <dd v-for="item,index in WafiType" @click="changeWIFI(item,index)" :class="{active: index == wifiIndex}">
            {{item.Name}}
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>取消政策</dt>
          <dd v-for="item,index in CancelType" @click="changeCancel(item,index)"
              :class="{active: index == cancelIndex}">{{item.Name}}
          </dd>
        </dl>
      </div>
      <div class="clearSelect">
        <a href="javascript:;" @click="cancelSearchCondition">清空选择</a>
        <a href="javascript:;" @click="searchRoomInfoSub">确定</a>
      </div>
    </popup>
    <toast v-model="showErr" :type="showType" :text="errCon" :position="showPosition"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Popup} from 'vux'
  import {getDaysByDateString, toZear2} from '@/assets/js/public'
  import ImageList from '@/components/ImagePreview/ImageList'

  export default {
    computed: mapGetters([
      'hotelDetails',
      'hotelSearchRoomInfoList',
      'hotelShowImg',
      'hotelShowImgList',
      'hotelSearchObjD',
      'roomInfo',
      'HardService',
      'HardServiceHard',
      'HotelIco',
      'HotelImage',
      'HotelIntroduce',
      'HotelMinPrice',
      'HotelModel',
      'HotelPolicy',
      'HotelTheme',
      'BedType',
      'BreakfastType',
      'CancelType',
      'WafiType',
    ]),
    components: {
      Toast,
      ImageList,
      Popup
    },
    data() {
      return {
        screenCondition: false,
        showRoomInfo: false,
        showImageList: false,
        hotelId: '',
        showHotelInfo: false,
        roomOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_bt_HotelID": "",
          "inDate": "",
          "outDate": "",
          "ht_rpp_BedType": "",
          "ht_rpp_BreakfastType": "",
          "ht_rpp_WafiType": "",
          "ht_rpp_CancelType": ""
        },
        showErr: false,
        errCon: '',
        days: 0,
        dateArr: [],
        yearNum: 0,
        changeDays: [],//入离时间数组
        todayObj: {},//今天
        dayIndex: -1,//第一次点击的index
        dayArr: [],//第一次点击的日历数组
        maskShow: false,
        inTime: {},
        outTime: {},
        activeIndex: -1,
        userInfo: '',
        bedIndex: -1,
        breakfastIndex: -1,
        wifiIndex: -1,
        cancelIndex: -1,
        showType: 'warn',
        showPosition: 'default',
        openIndex: -1,
        stopCarNum: 0,
      }
    },
    created() {
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
      this.todayObj = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      }
      this.hotelId = this.$route.query.id;
      if (this.hotelSearchObjD.inTime) {
        this.roomOptions.inDate = this.hotelSearchObjD.inTime;
        this.roomOptions.outDate = this.hotelSearchObjD.outTime;
        this.days = Math.round(getDaysByDateString(this.roomOptions.inDate, this.roomOptions.outDate)) - 1;
        this.inTime = {
          day: this.hotelSearchObjD.inTime.split('-')[2],
          month: this.hotelSearchObjD.inTime.split('-')[1],
          year: this.hotelSearchObjD.inTime.split('-')[0],
          week: this.getWeek(this.hotelSearchObjD.inTime.split('-')[0], this.hotelSearchObjD.inTime.split('-')[1], this.hotelSearchObjD.inTime.split('-')[2]),
          status: false,
          isDayActive: false
        }
        this.outTime = {
          day: this.hotelSearchObjD.outTime.split('-')[2],
          month: this.hotelSearchObjD.outTime.split('-')[1],
          year: this.hotelSearchObjD.outTime.split('-')[0],
          week: this.getWeek(this.hotelSearchObjD.outTime.split('-')[0], this.hotelSearchObjD.outTime.split('-')[1], this.hotelSearchObjD.outTime.split('-')[2]),
          status: false,
          isDayActive: false
        }
      }
      if (this.hotelId) {
        this.initHotelDetails(this.hotelId)
          .then(total => {
            this.SearchRoomInfo();
          }, err => {
            this.showErr = true;
            this.errCon = err;
          });
        this.initHotelShowImg(this.hotelId);
      }
//      生成日历
      for (let i = 0; i < 4; i++) {
        let nt = new Date();
        nt.setMonth(nt.getMonth() + i);
        this.yearNum = nt.getFullYear();
        this.getMonth(nt.getMonth(), nt.getFullYear());
      }
      this.initHotelInfo();
      this.hotelRoomCondition();
    },
    methods: {
      initCarNum() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "HotelID": this.hotelId,//酒店编码
          "UseDate": this.roomOptions.inDate,
        }
        this.$store.dispatch('initCarNum', options)
          .then(num => {
            this.stopCarNum = num;
          }, err => {

          })
      },
      controlOpen(index) {
        if (this.openIndex == index) {
          this.openIndex = -1;
        } else {
          this.openIndex = index;
        }
      },
      goComment() {
        this.$router.push({name: 'HotelCommentInfo', query: {id: this.hotelId}})
      },
      //床型
      changeBed(item, index) {
        if (this.bedIndex == index) {
          this.bedIndex = -1;
          this.roomOptions.ht_rpp_BedType = "";
          return
        }
        this.bedIndex = index;
        this.roomOptions.ht_rpp_BedType = item.ht_rpp_BedType;
      },
      //早餐
      changeBreakfast(item, index) {
        if (this.breakfastIndex == index) {
          this.breakfastIndex = -1;
          this.roomOptions.ht_rpp_BreakfastType = "";
          return
        }
        this.roomOptions.ht_rpp_BreakfastType = item.ht_rpp_BreakfastType;
        this.breakfastIndex = index;
      },
      //宽带
      changeWIFI(item, index) {
        if (this.wifiIndex == index) {
          this.wifiIndex = -1;
          this.roomOptions.ht_rpp_WafiType = "";
          return
        }
        this.roomOptions.ht_rpp_WafiType = item.ht_rpp_WafiType;
        this.wifiIndex = index;
      },
      //取消政策
      changeCancel(item, index) {
        if (this.cancelIndex == index) {
          this.cancelIndex = -1;
          this.roomOptions.ht_rpp_CancelType = "";
          return
        }
        this.roomOptions.ht_rpp_CancelType = item.ht_rpp_CancelType;
        this.cancelIndex = index;
      },

      //筛选提交
      searchRoomInfoSub() {
        this.SearchRoomInfo();
        this.screenCondition = false;
      },

      //清空筛选条件
      cancelSearchCondition() {
        this.roomOptions.ht_rpp_BedType = this.roomOptions.ht_rpp_BreakfastType
          = this.roomOptions.ht_rpp_WafiType = this.roomOptions.ht_rpp_CancelType = "";
        this.bedIndex = this.breakfastIndex = this.wifiIndex = this.cancelIndex = -1;
      },


//      筛选条件
      hotelRoomCondition() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
        }
        this.$store.dispatch('initHotelRoomCondition', options)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //地图
      goMap() {
        this.$router.push({
          name: 'TicketMap',
          query: {
            title: this.hotelDetails.ht_ht_HotelName,
            address: this.hotelDetails.ht_ht_HotelAddress,
            longitude: this.hotelDetails.ht_ht_Longitude,
            latitude: this.hotelDetails.ht_ht_Latitude
          }
        })
      },
      //酒店详情
      initHotelInfo() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ht_ht_hotelID": this.hotelId,//供应商ID   二选一  优先使用酒店ID
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initHotelInfo', options)
          .then(() => {
            sessionStorage.setItem('hotelN', this.hotelDetails.ht_ht_HotelName);
            this.$store.commit('hideLoading');
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.$store.commit('hideLoading');
          })
      },
      openImagePriview() {
        this.showImageList = true;
      },
      goRoomInfo(item) {
        item.hotelInfo = this.hotelDetails;
        item.days = this.days;
        item.inTime = this.roomOptions.inDate;
        item.outTime = this.roomOptions.outDate;
        item.RoomInfo.imgList = item.RoomInfo.ht_bt_ImagePath.split(',');
        this.$store.commit('roomInfo', item)
        this.$router.push({name: 'HotelRoomInfo'})
      },
      SearchRoomInfo() {
        this.initCarNum();
        this.roomOptions.ht_bt_HotelID = this.hotelId;
        this.$store.dispatch('initHotelSearchRoomInfo', this.roomOptions)
          .then((total) => {
            this.$store.commit('hideLoading');
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.$store.commit('hideLoading');
          })
      },
      //下拉加载
      infinite() {
        this.rowsNum += 5;
        this.SearchRoomInfo()
          .then((total) => {
            this.$store.commit('hideLoading');
            done(true)
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      goTopPage() {
        this.$router.go(-1)
      },
      goFillOrder(item, ite, index, indexC) {
        if (!this.userInfo) {
          this.$router.push({name: 'UserLogin'})
          return
        }
        if (!this.days) {
          this.showErr = true;
          this.errCon = '请选择入离时间';
          return
        }
        if (ite.orderState) {
          return
        }
        let obj = {
          hotelInfo: this.hotelDetails,
          roomType: item.RoomInfo,
          roomInfo: ite,
          inTime: this.roomOptions.inDate,
          outTime: this.roomOptions.outDate,
          days: this.days,
          stopCarNum: this.stopCarNum
        }
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "ht_rpp_ID": ite.ht_rpp_ID,
          "inDate": this.roomOptions.inDate,
          "outDate": this.roomOptions.outDate
        }
        this.$store.dispatch('initHotelRoomNum', options)
          .then(num => {
            if (num <= 0) {
              this.$store.commit('UpdateRoomProductPrice', {index, indexC})
            } else {
              this.$store.commit('hotelOrderInfo', obj)
              this.$router.push({path: '/hotelFillOrder'})
            }
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //酒店详情
      initHotelDetails(id) {
        let selectHotelInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ht_ht_hotelID": id,//
        }
        this.$store.commit('showLoading');
        return this.$store.dispatch('initHotelDetails', selectHotelInfo);
      },
      //酒店图片
      initHotelShowImg(id) {
        let selectHotelImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ht_hi_ID": "",
          "ht_hi_HotelID": id ? id : '',
          "ht_hi_ImageTypeID": 10
        };
        this.$store.dispatch('initHotelShowImg', selectHotelImageInfo)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
//      日历------------------------------------

      //点击空白
      clickWhite() {
      },
      //显示日期弹窗
      showDateMask() {
        this.maskShow = true;

      },
//      获取月
      getMonth(m, year) {
        let t = new Date();
        let n = new Date();
        let nextM = new Date();
        n.setFullYear(this.yearNum);
        t.setFullYear(this.yearNum);
        t.setMonth(m);
        nextM.setMonth(m + 1);
        nextM.setDate(0);
        n.setMonth(m);
        n.setDate(0);
        let blankArr = [];
        let passedArr = [];
        let notOverArr = [];
        for (let i = 0; i < n.getDay() + 1; i++) {
          blankArr.push('');
        }
        for (let i = 1; i < t.getDate(); i++) {
          if (t.getMonth() == new Date().getMonth() && t.getFullYear() == new Date().getFullYear()) {
            passedArr.push(i);
          } else {
            notOverArr.push(
              {
                day: i,
                month: t.getMonth() + 1,
                year: t.getFullYear(),
                week: this.getWeek(t.getFullYear(), t.getMonth() + 1, i),
                status: false,
                isDayActive: false
              }
            )
          }
        }
        for (let i = t.getDate(); i < nextM.getDate() + 1; i++) {
          notOverArr.push(
            {
              day: i,
              month: t.getMonth() + 1,
              year: t.getFullYear(),
              week: this.getWeek(t.getFullYear(), t.getMonth() + 1, i),
              status: false,
              isDayActive: false
            }
          )
        }
        this.dateArr.push(
          {
            yearMonth: year + '年' + toZear2(t.getMonth() + 1) + '月',
            blankArr: blankArr,
            passedArr: passedArr,
            notOverArr: notOverArr
          }
        )
      },
      //获取星期
      getWeek(y, m, d) {
        return new Date(y + '-' + m + '-' + d).getDay();
      },
      changeDay(item, index, arr) {
        //入住时间
        if (!this.changeDays.length) {
          this.dayIndex = index;
          this.dayArr = arr;
          this.changeDays.push(item)
          this.showErr = true;
          this.errCon = '请选择离店日期';
          this.showType = 'text';
          this.showPosition = 'bottom';
        } else {
          //当length长度等于2的时候
          if (this.changeDays.length >= 2) {
            for (let i = 0; i < this.changeDays.length; i++) {
              this.changeDays[i].status = false;
            }
            this.changeDays = [];
            this.changeDays.push(item);
            this.showErr = true;
            this.errCon = '请选择离店日期';
            this.showType = 'text';
            this.showPosition = 'bottom';
            this.dayArr = arr;
            this.dayIndex = index;
            for (let i = 0; i < this.dateArr.length; i++) {
              for (let j = 0; j < this.dateArr[i].notOverArr.length; j++) {
                this.dateArr[i].notOverArr[j].isDayActive = false;
              }
            }
            item.status = true;
            return
          }
          //限制天数
          if (getDaysByDateString(this.changeDays[0].year + '-' + this.changeDays[0].month + '-' + this.changeDays[0].day, item.year + '-' + item.month + '-' + item.day) > 29) {
            this.showErr = true;
            this.errCon = '入住时间不能超过28天';
            return
          }
          //是否选择在同一个月
          if (this.changeDays[0].year == item.year && this.changeDays[0].month == item.month && this.changeDays[0].day < item.day) {
            this.changeDays.push(item);
            this.showErr = true;
            this.errCon = '请选择离店日期';
            this.showType = 'text';
            this.showPosition = 'bottom';
            this.getDays(item);
            //判断是否为本月
            if (item.month == (new Date().getMonth() + 1)) {
              for (let i = this.dayIndex + 1; i < index; i++) {
                arr[i].isDayActive = true;
              }
            } else {
//             不是本月
              for (let i = this.changeDays[0].day; i < this.changeDays[1].day - 1; i++) {
                arr[i].isDayActive = true;
              }
            }
            item.status = true;
          }
          if (this.changeDays[0].year == item.year && this.changeDays[0].month == item.month && this.changeDays[0].day > item.day) {
            this.resetInTime(item, arr, index);
            return
          }
          //选择月份不一样
          if (this.changeDays[0].year == item.year && this.changeDays[0].month < item.month) {
            this.changeDays.push(item)
            this.showErr = true;
            this.errCon = '请选择离店日期';
            this.showType = 'text';
            this.showPosition = 'bottom';

            this.getDays(item);

            for (let i = this.dayIndex + 1; i < this.dayArr.length; i++) {
              this.dayArr[i].isDayActive = true;
            }
            for (let i = 0; i < index; i++) {
              arr[i].isDayActive = true;
            }
          }
          if (this.changeDays[0].year == item.year && this.changeDays[0].month > item.month) {
            this.resetInTime(item, arr, index);
            return
          }
          //年不相同
          if (this.changeDays[0].year < item.year) {
            this.changeDays.push(item);
            this.showErr = true;
            this.errCon = '请选择离店日期';
            this.showType = 'text';
            this.showPosition = 'bottom';

            this.getDays(item);

            for (let i = this.dayIndex + 1; i < this.dayArr.length; i++) {
              this.dayArr[i].isDayActive = true;
            }
            for (let i = 0; i < index; i++) {
              arr[i].isDayActive = true;
            }
          }
          if (this.changeDays[0].year > item.year) {
            this.resetInTime(item, arr, index);
            return
          }
        }
        item.status = true;
      },
      //计算天数
      getDays(item) {
        this.days = Math.round(getDaysByDateString(this.changeDays[0].year + '-' + this.changeDays[0].month + '-' + this.changeDays[0].day, item.year + '-' + item.month + '-' + item.day)) - 1;
        this.roomOptions.inDate = toZear2(this.changeDays[0].year) + '-' + toZear2(this.changeDays[0].month) + '-' + toZear2(this.changeDays[0].day);
        this.roomOptions.outDate = toZear2(item.year) + '-' + toZear2(item.month) + '-' + toZear2(item.day);
        this.maskShow = false;
        this.SearchRoomInfo();
      },
      //重置入住时间
      resetInTime(item, arr, index) {
        for (let i = 0; i < this.changeDays.length; i++) {
          this.changeDays[i].status = false;
        }
        this.changeDays = [];
        item.status = true;
        this.changeDays.push(item);
        this.showErr = true;
        this.errCon = '请选择离店日期';
        this.showType = 'text';
        this.showPosition = 'bottom';
        this.dayArr = arr;
        this.dayIndex = index;
      },


//      --------------------------------------

      //显示房间列表
      showRoomList(index) {
        if (this.activeIndex == index) {
          this.activeIndex = -1;
          return
        }
        this.activeIndex = index;
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
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
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #fff;
  }

  .aboutHotel {
    padding: 6/@r 30/@r 12/@r;
    border-bottom: 15/@r solid #f0f0f0;
  }

  .aboutHotel > div {
    float: left;
    width: 463/@r;
  }

  .aboutHotel > img {
    float: right;
    width: 164/@r;
    margin-top: 26/@r;
  }

  .aboutHotel strong {
    font-size: 32/@r;
    line-height: 82/@r;
    font-family: "微软雅黑";
    display: block;
    color: #000;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .aboutHotel > div > span {
    padding-left: 30/@r;
    font-size: 25/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    color: #999;
    display: block;
    position: relative;
    padding-top: 10/@r;
  }

  .aboutHotel > div > span i {
    position: absolute;
    width: 22/@r;
    height: 26/@r;
    top: 11/@r;
    left: 1/@r;
    background: url("../../assets/img/ticket/locationB.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .aboutHotel > div > em {
    font-size: 23/@r;
    line-height: 47/@r;
    font-family: "微软雅黑";
    color: #999999;
  }

  .hotelFraction {
    font-size: 23/@r;
    line-height: 47/@r;
    font-family: "微软雅黑";
    color: #117db5;
  }

  .hotelFraction > span {
    float: left;
    margin-right: 60/@r;
  }

  .hotelFraction i {
    float: left;
    width: 24/@r;
    height: 22/@r;
    background: url("../../assets/img/hotel/recommendIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 14/@r 5/@r 0 0;
  }

  .hotelFraction a {
    float: right;
    color: #dd2b15;
  }

  .hotelScreen {
    border: 1/@r solid #dcdcdc;
    border-top: none;
  }

  .selectDay {
    float: left;
    width: 40%;
    border-right: 1/@r solid #dcdcdc;
    padding: 16/@r 10/@r 16/@r 30/@r;
    height: 100%;
  }

  .screenTime {
    font-size: 22/@r;
    line-height: 26/@r;
    font-family: "微软雅黑";
    color: #333333;
    float: left;
  }

  .screenTime > span {
    display: block;
  }

  .liveNight {
    float: right;
    font-size: 22/@r;
    line-height: 52/@r;
    font-family: "微软雅黑";
    color: #33bd61;
  }

  .liveNight > i {
    float: right;
    width: 16/@r;
    height: 9/@r;
    background: url("../../assets/img/hotel/bottomIcon1.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 23/@r 0 0 3/@r;
  }

  .screenCondition {
    float: left;
    width: 60%;
    padding: 19/@r 30/@r 19/@r 14/@r;
    font-size: 22/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
  }

  .screenCondition > a {
    padding: 0 12/@r;
    border: 1/@r solid #dcdcdc;
    color: #000;
  }

  .canOrder {
    float: left;
  }

  .screenBtn {
    float: right;
  }

  .screenBtn > i {
    float: right;
    width: 15/@r;
    height: 9/@r;
    margin: 13/@r 0 0 8/@r;
    background: url("../../assets/img/hotel/bottomIcon2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .hotelRoomList > li {
    padding-top: 24/@r;
    border-bottom: 1/@r solid #ccc;
  }

  .roomBox {
    padding: 0 10/@r 24/@r 30/@r;
  }

  .roomBox > img {
    width: 200/@r;
    height: 150/@r;
    float: left;
  }

  .roomDetails {
    float: left;
    margin-left: 24/@r;
    width: 240/@r;
  }

  .roomDetails > strong {
    display: block;
    font-size: 28/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #333333;
  }

  .roomDetails > span {
    display: block;
    font-size: 24/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    color: #333333;
  }

  .roomDetails > span > em {
    display: block;
    margin-right: 20/@r;
  }

  .roomDetails > div {
    margin-top: 12/@r;
  }

  .roomDetails > div > em {
    float: left;
    color: #117db5;
    font-size: 20/@r;
    line-height: 1;
    font-family: "微软雅黑";
    border: 1/@r solid #117db5;
    padding: 0 5/@r;
    margin-right: 10/@r;
  }

  .priceInfo {
    float: right;
  }

  .priceInfo > strong {
    float: left;
    font-size: 22/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    color: #000;
  }

  .priceInfo > strong > em {
    float: left;
  }

  .priceInfo > strong > i {
    float: left;
    color: #dd2b15;
  }

  .priceInfo > strong > span {
    float: left;
    color: #dd2b15;
    font-size: 30/@r;
  }

  .priceInfo > div > i {
    display: block;
    width: 30/@r;
    height: 15/@r;
    background: url("../../assets/img/hotel/detailsIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .priceInfo > div {
    float: left;
    padding: 20/@r;
    margin-top: 2/@r;
  }

  /*日历*/

  .dateWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    opacity: 0;
    z-index: -2;
    transition: .5s;
  }

  .dateBox {
    position: absolute;
    height: 90%;
    background-color: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
  }

  .dateTitle {
    position: relative;
  }

  .dateTitle > strong {
    text-align: center;
    display: block;
    font-size: 30/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
    color: #333;
  }

  .dateTitle > span {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 25/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
    color: #666;
    padding: 0 30/@r;
  }

  .weekList {
    background-color: #f0f0f0;
  }

  .weekList li {
    float: left;
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    width: 14.2%;
    text-align: center;
  }

  .monthList {
    position: absolute;
    top: 131/@r;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .monthList > li {
    margin-top: 20/@r;
  }

  .monthList > li:first-of-type {
    margin-top: 0;
  }

  .monthList strong {
    font-size: 28/@r;
    line-height: 3;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
    color: #333;
  }

  .dayList > li.passActive {
    color: #999;
  }

  .dayList > li {
    float: left;
    width: 14.2%;
    height: 100/@r;
    text-align: center;
    padding: 10/@r 0;
    -webkit-border-radius: 8/@r;
    -moz-border-radius: 8/@r;
    border-radius: 8/@r;
    border: 1/@r solid #fff;
    font-size: 28/@r;
    line-height: 1.5;
    font-family: "微软雅黑";
  }

  .dayList > li.active {
    background-color: #2dbb55;;
  }

  .dayList > li strong {
    font-size: 28/@r;
    line-height: 1.5;
    font-family: "微软雅黑";
    color: #333;
  }

  .dayList > li span {
    font-size: 25/@r;
    line-height: 1.5;
    font-family: "微软雅黑";
    color: #333;
  }

  .dayList > li.weekActive strong {
    color: #f80;
  }

  .dayList > li.active strong,
  .dayList > li.active span {
    color: #fff;
  }

  .dayList > li.dayActive {
    background-color: #91d4ba;
  }

  .dayList > li.dayActive strong {
    color: #fff;
  }

  .dateWrap.active {
    opacity: 1;
    z-index: 999;
  }

  .dateWrap.active .dateBox {
    animation: showDate .5s linear forwards;
    -webkit-animation: showDate .5s linear forwards;
  }

  @keyframes showDate {
    50% {
      transform: translateY(50%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  .roomTypeList {
    background-color: #f7f5f5;
  }

  .roomTypeList > li {
    padding: 20/@r 30/@r;
    border-bottom: 1/@r solid #e3e1e1;
  }

  .roomTypeList > li:last-of-type {
    border-bottom: none;
  }

  .roomInfo {
    float: left;
    width: 60%;
  }

  .roomInfo strong {
    display: block;
    font-size: 32/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #000000;
  }

  .roomInfo span {
    display: block;
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    color: #6b6b6b;
  }

  .roomInfo em {
    margin-top: 10/@r;
    font-size: 23/@r;
    line-height: 28/@r;
    font-family: "微软雅黑";
    background-color: #fb6a64;
    color: #fff;
    padding: 0 5/@r;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .roomPriceWrap {
    overflow: hidden;
  }

  .roomPrice {
    float: left;
    width: 100%;
    text-align: right;
  }

  .roomPrice > span > strong {
    display: block;
    font-size: 28/@r;
    line-height: 54/@r;
    font-family: "微软雅黑";
    background-color: #fb6a64;
    color: #fff;
    text-align: center;
  }

  .roomPrice > span {
    width: 85/@r;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    display: inline-block;
    overflow: hidden;
    background-color: #fff;
  }

  .roomPrice > span > span {
    font-size: 25/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #fb6a64;
    display: block;
  }

  .roomPrice > strong {
    display: block;
    width: 100%;
  }

  .roomPrice > strong > span {
    color: #dd2b15;
  }

  .roomPrice > strong em {
    font-size: 33/@r;
  }

  .roomPrice .active {
    background-color: #ccc;
    color: #fff;
  }

  .hotelInfoWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 30/@r;
  }

  .hotelInfoWrap > div {
    margin-top: 30/@r;
  }

  .hotelInfoWrap > div:first-of-type {
    margin-top: 0;
  }

  .hotelInfoWrap > div > strong {
    font-size: 35/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    display: block;
  }

  .hotelThemeList > li {
    float: left;
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    margin-right: 30/@r;
    border: 1px solid #f80;
    color: #f80;
    -webkit-border-radius: 28/@r;
    -moz-border-radius: 28/@r;
    border-radius: 28/@r;
    padding: 0 30/@r;
    margin-top: 20/@r;
  }

  .hotelIntroduce > p {
    font: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    text-indent: 2em;
    margin-top: 20/@r;
    color: #666;
  }

  .contactType {
    margin-top: 20/@r;
  }

  .contactType > strong {
    float: left;
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #666;
  }

  .contactType div {
    overflow: hidden;
    margin-left: 10/@r;
  }

  .contactType p {
    float: left;
    padding: 10/@r 0 0 20/@r;
    font-size: 25/@r;
    line-height: 1.5;
    font-family: "微软雅黑";
    color: #666;
  }

  .contactType2 ul {
    padding-top: 20/@r;
    max-height: 132/@r;
    overflow: hidden;
  }

  .contactType2 ul.active {
    max-height: 100%;
  }

  .contactType2 li {
    float: left;
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    margin-right: 30/@r;
    padding-left: 20/@r;
  }

  .contactType2 i {
    float: left;
    margin-right: 5/@r;
    width: 20/@r;
    height: 12/@r;
    border-left: 1px solid #0bb20c;
    border-bottom: 1px solid #0bb20c;
    transform: rotate(-45deg);
    margin-top: 20/@r;
  }

  .contactType2 span {
    float: left;
    color: #333;
  }

  .contactType2 strong {
    display: block;
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    background-color: #ccc;
    color: #fff;
    padding-left: 30/@r;
  }

  .contactType2 {
    margin-top: 20/@r;
  }

  .contactType2 > div {
    display: block;
  }

  .contactType2 > div > a {
    float: right;
    padding: 0 20/@r;
    font-size: 25/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #fff;
    background-color: #0bb20c;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .closeInfo {
    position: fixed;
    right: 30/@r;
    top: 30/@r;
    width: 50/@r;
    height: 50/@r;
    padding: 10/@r;
    background-color: #ccc;
    z-index: 3;
  }

  .closeInfo i {
    display: block;
    width: 30/@r;
    height: 30/@r;
    background: url("../../assets/img/home/closeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
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

</style>
