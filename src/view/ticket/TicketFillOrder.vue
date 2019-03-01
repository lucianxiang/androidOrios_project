<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>订单填写</strong>
    </header>
    <section>
      <div class="aboutTicket">
        <div class="ticketTitle clearfix">
          <strong>{{ticketName}}</strong>
        </div>
        <div class="reserveDate">
          <strong>
            <span class="topMonth" @click="showLastMonth"><i></i></span>
            选择预定时间(当前: {{currentMonth}})
            <span class="nextMonth" @click="showNextMonth"><i></i></span>
          </strong>
          <div class="reserveDateBox">
            <div class="weekDayList clearfix">
              <span>日</span>
              <span>一</span>
              <span>二</span>
              <span>三</span>
              <span>四</span>
              <span>五</span>
              <span>六</span>
            </div>
            <ul class="monthDayList clearfix" ref="monthDayList">

              <li v-for="item,index in lastDateArr" style="color: #ccc;">{{item}}</li>
              <li v-for="item,index in monthArr"
                  :class="{active: index == (playTimeObj.index?playTimeObj.index:ticketIndex)}"
                  @click="changePayTicket(item,index)">
                <strong>{{item.day ? item.day : item}}</strong>
                <span v-show="item.tm_tp_RealPrice">￥{{item.tm_tp_RealPrice ? item.tm_tp_RealPrice : ''}}起</span>
              </li>
              <li v-for="item,index in nextDateArr" style="color: #ccc;">{{item}}</li>

            </ul>
          </div>
        </div>


        <div class="ticketNum clearfix" v-show="ticketObj.tm_tp_Limit">
          <strong>购票数量(剩余{{ticketObj.tm_tp_Limit}}张)</strong>
          <div class="selectTicketNum">
            <a href="javascript:;" @click="reduceTicketNum">--</a>
            <input type="text" v-model="ticketNum" disabled="disabled">
            <a href="javascript:;" @click="addTicketNum">+</a>
          </div>
        </div>
      </div>
      <div class="outTicketInfo">
        <div class="ticketInfo clearfix">
          <strong>取票信息:</strong>
        </div>
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
                      <span>{{ticketName}}</span>
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
      </div>
    </section>
    <div class="goPayBox">
      <div>
        <strong>应付总额 <span>￥<em>{{ticketAllPrice}}</em></span></strong>
        <span @click="showPriceDetails">查看明细</span>
      </div>
      <a href="javascript:;" @click="addTicketOrder">去支付</a>
    </div>
    <!--查看明细-->
    <div class="priceDetails" v-show="showDetails">
      <div class="priceDetailsBox">
        <strong>订单明细</strong>
        <ul>
          <li class="clearfix">
            <strong>{{ticketName}}</strong>
            <span>{{'x' + ticketNum}} ￥{{ ticketAllPrice}}</span>
          </li>
        </ul>
        <a href="JavaScript:;" @click="showPriceDetails">确定</a>
      </div>
    </div>
    <toast v-model="showErr" :type="showType" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'
  import {toZear2, isPhoneNum, isCardNo} from '@/assets/js/public'

  export default {
    components: {
      Toast
    },
    computed: Object.assign({
      ticketAllPrice() {
        return (this.ticketObj.tm_tp_RealPrice ? this.ticketObj.tm_tp_RealPrice : 0) * this.ticketNum;
      }
    }, mapGetters([])),
    data() {
      return {
        userInfo: {},
        ticketTypeId: '',
        ticketName: '',
        lastDateArr: [],
        monthArr: [],
        nextDateArr: [],
        dateStr: '',
        yearStr: '',
        monthStr: '',
        currentMonth: '',
        showErr: false,
        errCon: '',
        showType: 'cancel',
        ticketIndex: 50,
        ticketObj: {},
        ticketNum: 0,
        touristInfo: [],
        showDetails: false,
        ticketDetails: {},
        showTicketExplain: false,
        agentID: '',
        peopleList: [],
        isSelect: false,
        playTimeObj: {},
      }
    },
    watch: {
      ticketNum(val) {
        if (val) {
          this.isSelect = true;
        } else {
          this.isSelect = false;
        }
      },
    },
    created() {
      this.$store.commit('showLoading');
      if (sessionStorage.getItem('ticketDetails')) {
        this.ticketDetails = JSON.parse(sessionStorage.getItem('ticketDetails'))
      }
      if (sessionStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      }
      if (sessionStorage.getItem('playTimeObj')) {
        this.playTimeObj = JSON.parse(sessionStorage.getItem('playTimeObj'));
        this.ticketObj = this.playTimeObj;
        this.ticketIndex = this.playTimeObj.index;
      }
      if (localStorage.getItem('peopleList') && JSON.parse(localStorage.getItem('peopleList')).length) {
        this.peopleList = JSON.parse(localStorage.getItem('peopleList'));
      }
      if (this.$route.query.id) {
        this.ticketTypeId = this.$route.query.id;
      }
      if (this.$route.query.name) {
        this.ticketName = this.$route.query.name;
      }
      if (this.$route.query.num) {
        this.ticketNum = this.$route.query.num;
      }
      this.yearStr = new Date().getFullYear();
      this.monthStr = new Date().getMonth();
      this.dateStr = this.yearStr + '-' + this.monthStr + '-01';
      this.currentMonth = this.yearStr + '-' + toZear2(Number(this.monthStr) + 1);
      this.initData();
    },
    methods: {
      clickWhite() {
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
      //添加出有人
      goAddTopContacts() {
        this.$router.push({
          name: 'TicketFillOrder',
          query: {id: this.ticketTypeId, name: this.ticketName, num: this.ticketNum}
        })
        this.$router.push({name: 'SelectTopContacts', query: {num: this.ticketNum}})
      },
//      初始化日历
      initData(date) {
        let getTicketTypePriceList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "tm_tt_ID": this.ticketTypeId ? this.ticketTypeId : '',//商户票种编号
          "dateFrom": date ? date : ""
        };
        this.$store.commit('showLoading');
        this.$store.dispatch('initTicketData', getTicketTypePriceList)
          .then(data => {
            this.agentID = data.agentID;
            this.ticketIndex = 50;
            this.$nextTick(() => {
              this.$store.commit('hideLoading')
              this.get(this.yearStr, this.monthStr, data.data);
            })
          }, err => {
            this.$store.commit('hideLoading')
            this.showErr = true;
            this.errCon = err;
          })
      },
//      返回上一页
      goTopPage() {
        this.$router.go(-1);
      },
      //获取周数
      getWeek(year, month) {
        return new Date(year, month, 1, 0, 0, 0).getDay();
      },
      //获取一个月中的所有天数
      getDates(year, month) {
        return new Date(year, month + 1, 1, -1, 0, 0).getDate();
      },
//      生成日历
      get(year, month, data) {
        for (var n = 0; n < data.length; n++) {
          data[n].day = Number(data[n].tm_tp_Date.split('-')[2])
        }
        let newArr = [];
        let today = 0;
        let s = 0;
        for (var i = 1; i <= 42; i++) {
          var v = i - this.getWeek(year, month);
          if (v < 1) {
//            上个月天数
            var topMonth = this.getDates(year, month - 1);
            this.lastDateArr.push(topMonth - (this.getWeek(year, month) - i))
          } else if (v > this.getDates(year, month)) {
//            下个月
            let value = v - this.getDates(year, month)
            this.nextDateArr.push(value)
          } else {
            newArr.push(v)
          }
        }
        for (var i = 0; i < newArr.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if (newArr[i] == data[j].day) {
              newArr[i] = data[j]
            }
          }
        }
        for (var i = 0; i < newArr.length; i++) {
          if (newArr[i].day == new Date().getDate() && month == (new Date().getMonth()) && year == new Date().getFullYear()) {
            newArr[i].day = '今天'
          } else {
            newArr[i] = newArr[i]
          }
          if (newArr[i] == new Date().getDate() && month == (new Date().getMonth()) && year == new Date().getFullYear()) {
            newArr[i] = '今天'
          } else {
            newArr[i] = newArr[i]
          }
        }
        this.monthArr = newArr;
        this.$vux.loading.hide();

      },
//      上个月
      showLastMonth() {
        this.monthStr--;
        if (this.monthStr < new Date().getMonth() && this.yearStr == new Date().getFullYear()) {
          this.monthStr = new Date().getMonth();
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '不能再点了!!';
          return
        }
        this.lastDateArr = [];
        this.monthArr = [];
        this.nextDateArr = [];
        if (this.monthStr < 0) {
          this.monthStr = 11;
          this.yearStr--;
        }
        this.dateStr = this.yearStr + '-' + toZear2(this.monthStr + 1) + '-01';
        this.currentMonth = this.yearStr + '-' + toZear2(this.monthStr + 1);
        this.initData(this.dateStr)
      },
//      下个月
      showNextMonth() {
        this.monthStr++;
        this.lastDateArr = [];
        this.monthArr = [];
        this.nextDateArr = [];
        if (this.monthStr > 11) {
          this.monthStr = 0;
          this.yearStr++;
        }
        this.dateStr = this.yearStr + '-' + toZear2(this.monthStr + 1) + '-01';
        this.currentMonth = this.yearStr + '-' + toZear2(this.monthStr + 1);
        this.initData(this.dateStr)
      },
      //  选择购票日期
      changePayTicket(item, index) {
        if (
          item < new Date().getDate() ||
          item.day < new Date().getDate() &&
          this.monthStr == new Date().getMonth() &&
          this.yearStr == new Date().getFullYear()
        ) {
          return
        }
        if (!item.tm_tp_Date) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '只能选择有价格的日期!!';
          return
        }
        item.index = index;
        sessionStorage.setItem('playTimeObj', JSON.stringify(item))
        this.ticketObj = item;
        if( this.playTimeObj.index ){
          this.playTimeObj.index = index;
        }else{
          this.ticketIndex = index;
        }
      },
      // 门票数量--
      reduceTicketNum() {
        this.ticketNum--;
        if (this.ticketNum < 1) {
          this.ticketNum = 1;
          return
        }
      },
      //门票
      // 查看明细数量++
      addTicketNum() {
        this.ticketNum++;
        if (this.ticketNum > this.ticketObj.tm_tp_Limit) {
          this.ticketNum = this.ticketObj.tm_tp_Limit;
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '没有更多票了!!';
          return
        }
        if (this.ticketNum > 10) {
          this.ticketNum = 10;
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '一次性最多可购买10张!!';
          return
        }
      },
      showPriceDetails() {
        this.showDetails = !this.showDetails;
      },
      // 添加订单
      addTicketOrder() {
        if (!this.ticketObj.tm_tp_Date) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '请选择游玩日期!!';
          return
        }
        if (!this.ticketNum) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '请选择购票数量!!';
          return
        }
        if (this.peopleList.length != this.ticketNum) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '请选择对应数量的出游人!!';
          return
        }

        for (let i = 0; i < this.peopleList.length; i++) {
          this.touristInfo.push({
            "tm_oc_UserName": this.peopleList[i].ui_uc_Name,//用户名称
            "tm_oc_Phone": this.peopleList[i].ui_uc_Phone,//手机号
            "tm_oc_CertNo": this.peopleList[i].ui_uc_CertNo, //身份证号码
          })
        }

        this.$store.commit('showLoading');
        let insertOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "2",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {
            "tm_or_TourSiteCode": this.ticketDetails.tm_ts_Code ? this.ticketDetails.tm_ts_Code : '',//景点编号
            "tm_or_TicketTypeID": this.ticketObj.tm_tt_ID ? this.ticketObj.tm_tt_ID : '',//商户票种编号
            "tm_or_UserID": this.userInfo ? this.userInfo.sm_ui_ID : '',//用户编码
            "tm_or_TradeInfoID": this.agentID ? this.agentID : '',//供应商商家编码
            "tm_or_TicketCount": this.ticketNum,//总张数
            "tm_or_SumPrice": this.ticketAllPrice,//总金额
            "tm_or_SumService": "0",//总网售手续费
            "tm_oc_PlayDate": this.ticketObj.tm_tp_Date,
          },
          "personInfo": this.touristInfo
        }
        this.$store.dispatch('addTicketOrder', insertOrder)
          .then(data => {
            this.$store.commit('hideLoading')
            this.showType = 'success';
            this.showErr = true;
            this.errCon = data.resultcontent;
            this.initOrderInfo(data.data.tm_or_OrderID);
          }, err => {
            this.$store.commit('hideLoading')
            this.showType = 'cancel';
            this.showErr = true;
            this.errCon = err;
          })
      },
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
        this.$store.dispatch('initOrderInfo', getUserOrderDetail)
          .then(data => {
            this.$store.commit('hideLoading')
            sessionStorage.setItem('orderInfo', JSON.stringify(data[0]))
            this.$router.push({name: 'TicketFillOrder', query: {id: this.ticketTypeId, name: this.ticketName}})
            this.$router.push({name: 'PayOrder', query: {type: data.type}})
          }, err => {
            this.$store.commit('hideLoading')
            this.showType = 'cancel';
            this.showErr = true;
            this.errCon = err;
          })
      }
    },
    mounted() {
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

  header > .leftIcon {
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/hotel/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 25/@r 0 0 30/@r;
  }

  header > strong {
    font-size: 28/@r;
    line-height: 38/@r;
    font-family: "微软雅黑";
    color: #000;
    position: absolute;
    top: 25/@r;
    left: 50%;
    transform: translateX(-50%);
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 98/@r;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .aboutTicket {
    background-color: #fff;
    padding-bottom: 20/@r;
  }

  .ticketTitle {
    padding: 0 30/@r;
    border-bottom: 1/@r solid #f0f0f0;
  }

  .ticketTitle > strong {
    float: left;
    color: #333;
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    width: 78%;
    padding: 26/@r 0;
  }

  .ticketTitle > span {
    float: right;
    color: #33bd61;
    width: 22%;
    text-align: right;
    font-size: 23/@r;
    line-height: 92/@r;
    font-family: "微软雅黑";
  }

  .ticketTitle > span > i {
    float: right;
    width: 11/@r;
    height: 19/@r;
    background: url("../../assets/img/ticket/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 34/@r 0 0 15/@r;
  }

  .reserveDate > strong {
    font-size: 28/@r;
    line-height: 3;
    font-family: "微软雅黑";
    color: #333;
    display: block;
    text-align: center;
    position: relative;
  }

  .nextMonth {
    padding: 20/@r;
    float: right;
    margin: 1/@r 10/@r 0 0;
  }

  .nextMonth > i {
    display: block;
    background-color: #ccc;
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/hotel/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .topMonth {
    padding: 20/@r;
    float: left;
    margin: 1/@r 0 0 10/@r;
  }

  .topMonth > i {
    display: block;
    background-color: #ccc;
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/ticket/leftIcon2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .weekDayList {
    width: 100%;
    background-color: #777892;
    font-size: 22/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #fff;
  }

  .weekDayList > span {
    float: left;
    width: 14.2222%;
    text-align: center;
  }

  .monthDayList > li {
    float: left;
    padding: 8/@r 0;
    width: 14.2222%;
    height: 90/@r;
    text-align: center;
    border-bottom: 2/@r solid #ebeded;
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .monthDayList > li.active {
    background-color: #ffa948;
  }

  .monthDayList > li.active > strong,
  .monthDayList > li.active > span {
    color: #fff;
  }

  .monthDayList strong {
    display: block;
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #000;
  }

  .monthDayList span {
    display: block;
    font-size: 20/@r;
    line-height: 32/@r;
    font-family: "微软雅黑";
    color: #dd7015;
  }

  .ticketNum {
    padding: 0 30/@r;
  }

  .ticketNum > strong {
    font-size: 24/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    float: left;
  }

  .selectTicketNum {
    float: right;
    width: 154/@r;
    height: 44/@r;
    font-size: 24/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    margin-top: 24/@r;
  }

  .selectTicketNum > a {
    float: left;
    text-align: center;
    width: 44/@r;
    border: 2/@r solid #e5e5e5;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    color: #757575;
  }

  .selectTicketNum > input {
    float: left;
    border: none;
    width: 65/@r;
    font-size: 24/@r;
    line-height: 41/@r;
    font-family: "微软雅黑";
    text-align: center;
  }

  .outTicketInfo {
    margin-top: 16/@r;
    background-color: #fff;
  }

  .ticketInfo {
    padding: 0 30/@r;
    border-bottom: 1/@r solid #f0f0f0;
  }

  .ticketInfo > strong {
    float: left;
    font-size: 24/@r;
    line-height: 77/@r;
    font-family: "微软雅黑";
    color: #333333;
  }

  .ticketInfo > span {
    float: right;
    font-size: 24/@r;
    line-height: 37/@r;
    font-family: "微软雅黑";
    margin-top: 20/@r;
    border: 1px solid #333;
    padding: 0 10/@r;
    color: #333;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .peopleName,
  .peopleNum,
  .peopleIdCard {
    padding: 0 30/@r;
    border-bottom: 1/@r solid #f0f0f0;
  }

  .peopleIdCard {
    border: none;
  }

  .peopleName > strong,
  .peopleNum > strong,
  .peopleIdCard > strong {
    float: left;
    font-size: 24/@r;
    line-height: 77/@r;
    font-family: "微软雅黑";
    color: #333333;
    width: 30%;
  }

  .peopleName > input,
  .peopleNum > input,
  .peopleIdCard > input {
    float: left;
    width: 70%;
    border: none;
    font-size: 24/@r;
    line-height: 77/@r;
    font-family: "微软雅黑";
    background-color: transparent;
    color: #333;
  }

  .userInfoList > li {
    border-bottom: 10/@r solid #f0f0f0;
  }

  .userInfoList > li:last-of-type {
    border: none;
  }

  .goPayBox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    height: 98/@r;
    border-top: 1/@r solid #ccc;
  }

  .goPayBox div {
    float: left;
    width: 66.666%;
    padding-left: 30/@r;
    font-size: 25/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #333333;
    padding-top: 15/@r;
  }

  .goPayBox strong {
    display: block;
  }

  .goPayBox strong > span {
    font-size: 18/@r;
    color: #dd2b15;
  }

  .goPayBox strong > span > em {
    font-size: 25/@r;
  }

  .goPayBox > div > span {
    color: #33bd61;
    margin-left: 20/@r;
  }

  .goPayBox > a {
    float: right;
    width: 33.3333%;
    background-color: #dd7015;
    font-size: 30/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #fff;
  }

  .priceDetails,
  .ticketExplain {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    overflow: auto;
    padding: 30/@r 0;
  }

  .priceDetailsBox {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    transform: translate(-50%, -50%);
    padding: 10/@r 0;
  }

  .priceDetailsBox > strong {
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
    color: #666;
    border-bottom: 1/@r solid #f0f0f0;
  }

  .priceDetailsBox > ul {
    padding: 10/@r 30/@r;
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
  }

  .priceDetailsBox > ul strong {
    float: left;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
  }

  .priceDetailsBox > ul span {
    float: right;
    width: 50%;
    text-align: right;
    color: #f80;
  }

  .priceDetailsBox > a {
    display: block;
    border-top: 1/@r solid #f0f0f0;
    text-align: center;
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    color: #333;
  }

  .ticketExplainBox {
    width: 70%;
    margin: 30/@r auto;
    background-color: #fff;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    padding: 10/@r 0;
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
  }

  .ticketExplainBox > div {
    padding: 0 30/@r;
  }

  .ticketExplainBox strong {
    color: #666;
    display: block;
  }

  .ticketExplainBox p {
    padding-left: 30/@r;
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .ticketExplainBox a {
    display: block;
    border-top: 1/@r solid #f0f0f0;
    text-align: center;
    color: #333;
    margin-top: 30/@r;
    line-height: 3;
  }

  .selectedPeople {
    padding: 20/@r 30/@r;
  }

  .selectedList {
    border-bottom: 1px solid #efeded;
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
    padding: 10/@r 20/@r 10/@r 0;

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

</style>
