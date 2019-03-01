<template>
  <div>
    <header>
      <div @click="goTopPage"></div>
      <strong>填写订单</strong>
      <span @click="showOperation = true"></span>
    </header>
    <section>
      <!--订单信息-->
      <div class="contactsInfo">
        <strong>订单信息</strong>
        <div class="clearfix">
          <strong>订单名称:</strong>
          <div>
            <span>{{tourInfo.ts_pp_LineName}}</span>
          </div>
        </div>
        <div class="clearfix">
          <strong>出发城市:</strong>
          <div>
            <span>{{tourInfo.cityName}}</span>
          </div>
        </div>
        <div class="clearfix">
          <strong>出发日期:</strong>
          <div>
            <span>{{tourInfo.ts_pp_Date}}</span>
          </div>
        </div>
        <div class="clearfix" v-show="tourInfo.personNum">
          <strong>成人:</strong>
          <div>
            <span>{{tourInfo.personNum}} x ￥{{tourInfo.ts_pp_Price}}</span>
          </div>
        </div>
        <div class="clearfix" v-show="tourInfo.childNum">
          <strong>儿童:</strong>
          <div>
            <span>{{tourInfo.childNum}} x ￥{{tourInfo.ts_pp_ChildPrice}}</span>
          </div>
        </div>
      </div>
      <!--联系人信息-->
      <div class="excursionInfo">
        <strong>联系人信息</strong>
        <div class="clearfix">
          <strong>联系人 :</strong>
          <div>
            <input type="text" placeholder="请输入姓名" v-model="payName">
          </div>
        </div>
        <div class="clearfix">
          <strong>手机号 :</strong>
          <div>
            <input type="text" placeholder="请输入手机号" v-model="phone">
          </div>
        </div>
        <div class="clearfix">
          <strong>邮箱 :</strong>
          <div>
            <input type="text" placeholder="请输入邮箱" v-model="email">
          </div>
        </div>
        <div class="clearfix">
          <div>
            <textarea placeholder="请输入留言(无需必填)" v-model="message"></textarea>
          </div>
        </div>
      </div>


      <!--选择的-->
      <div class="selectedPeople" v-show="isSelect">
        <p>出游人信息:</p>
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
                    <span>{{tourInfo.ts_pp_LineName}}</span>
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
    </section>
    <!--订单费用-->
    <div class="orderMoney">
      <div @click="showMoneyDetails">
        <strong>¥<em>{{allMoney}}</em></strong>
        <span>费用明细</span>
      </div>
      <a href="javascript:;" @click="meakeTourOrder">下一步</a>
    </div>
    <div class="moneyDetails" @click="showMoneyDetails" v-show="showDetails">
      <div class="moneyDetailsBox" @click.stop="clickWhite">
        <strong>费用明细</strong>
        <div class="leagueMoney">
          <div class="leagueMoneyT clearfix">
            <strong>出团费用</strong>
            <span><em>￥</em>{{allMoney}}</span>
          </div>
          <div class="leagueMoneyB clearfix" v-show="tourInfo.personNum">
            <strong>成人X{{tourInfo.personNum}}人</strong>
            <span>¥{{tourInfo.ts_pp_Price}}/人X{{tourInfo.personNum}}</span>
          </div>
          <div class="leagueMoneyB clearfix" v-show="tourInfo.childNum">
            <strong>儿童X{{tourInfo.childNum}}人</strong>
            <span>¥{{tourInfo.ts_pp_ChildPrice}}/人X{{tourInfo.childNum}}</span>
          </div>
        </div>
        <!--<div class="leagueMoney">-->
        <!--<div class="leagueMoneyT clearfix">-->
        <!--<strong>保险费用</strong>-->
        <!--<span><em>¥</em>60</span>-->
        <!--</div>-->
        <!--<div class="leagueMoneyB clearfix">-->
        <!--<strong>新华国内旅行意外保险升级款（适用于出游2天）</strong>-->
        <!--<span>¥20X2</span>-->
        <!--</div>-->
        <!--<div class="leagueMoneyB clearfix">-->
        <!--<strong>新华国内旅行意外保险升级款（适用于出游2天）</strong>-->
        <!--<span>¥20X2</span>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <!--操作-->
    <div class="operation" v-show="showOperation" @click="showOperation = false">
      <div @click.stop="showOperation = true">
        <strong class="returnHome clearfix" @click="goHomePage"><i></i><span>返回首页</span></strong>
        <strong class="returnUserCenter clearfix" @click="goUserCenterPage"><i></i><span>个人中心</span></strong>
      </div>
    </div>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {ButtonTab, ButtonTabItem, Toast} from 'vux'
  import {isEmil, isPhoneNum, isCardNo} from '@/assets/js/public'

  export default {
    components: {
      ButtonTab,
      ButtonTabItem,
      Toast
    },
    computed: mapGetters([]),
    data() {
      return {
        sexList: [
          {
            value: 0,
            label: '男'
          },
          {
            value: 1,
            label: '女'
          }
        ],
        sexIndex: 0,
        tourInfo: {},
        ticketNum: 0,
        userInfo: {},
        phone: '',
        payName: '',
        email: '',
        message: '',
        excursionList: [],
        showDetails: false,
        showErr: false,
        errCon: '',
        allMoney: '',
        peopleList: [],
        isSelect: true,
        showOperation: false
      }
    },
    created() {
      if (sessionStorage.getItem('tourInfo')) {
        this.tourInfo = JSON.parse(sessionStorage.getItem('tourInfo'));
        this.allMoney = this.tourInfo.personNum * this.tourInfo.ts_pp_Price + this.tourInfo.childNum * this.tourInfo.ts_pp_ChildPrice
        this.ticketNum = this.tourInfo.personNum + this.tourInfo.childNum;
      }
      if (localStorage.getItem('peopleList') && JSON.parse(localStorage.getItem('peopleList')).length) {
        this.peopleList = JSON.parse(localStorage.getItem('peopleList'));
      }

      if (sessionStorage.getItem('tourInfoObj')) {
        let obj = JSON.parse(sessionStorage.getItem('tourInfoObj'));
        this.payName = obj.payName;
        this.email = obj.email;
        this.phone = obj.phone;
        this.message = obj.message;
      }
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    },
    methods: {
      goHomePage(){
        this.$router.push({name: 'Home'})
      },
      goUserCenterPage(){
        this.$router.push({name: 'UserCenter'})
      },
      //添加出有人
      goAddTopContacts() {
        let num = this.tourInfo.personNum + this.tourInfo.childNum;
        let obj = {
          payName: this.payName,
          email: this.email,
          phone: this.phone,
          message: this.message
        }
        sessionStorage.setItem('tourInfoObj', JSON.stringify(obj))
        this.$router.push({name: 'SelectTopContacts', query: {num: num}})
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
      //点击空白
      clickWhite() {
      },
      //返回上一页
      goTopPage() {
        this.$router.go(-1);
      },
      //显示隐藏订单费用明细
      showMoneyDetails() {
        this.showDetails = !this.showDetails;
      },
      //下订单
      meakeTourOrder() {
        if (!this.payName) {
          this.showErr = true;
          this.errCon = '请输入联系人姓名';
          return
        }
        if (this.email && !isEmil(this.email)) {
          this.showErr = true;
          this.errCon = '请输入正确的邮箱';
          return
        }
        if (!isPhoneNum(this.phone)) {
          this.showErr = true;
          this.errCon = '请输入正确的手机号';
          return
        }

        if ((this.tourInfo.personNum + this.tourInfo.childNum) != this.peopleList.length) {
          this.showErr = true;
          this.errCon = '请选择对应数量出游人信息';
          return
        }

        for (let i = 0; i < this.peopleList.length; i++) {
          this.excursionList.push({
            "ts_ot_Name": this.peopleList[i].ui_uc_Name,
            "ts_ot_CertNo": this.peopleList[i].ui_uc_CertNo,
            "ts_ot_Sex": ""
          })
        }
        let makeOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "fullPrice": this.tourInfo.ts_pp_Price,
          "childPrice": this.tourInfo.ts_pp_ChildPrice,
          "fullPerson": this.tourInfo.personNum,
          "childPerson": this.tourInfo.childNum,
          "productPriceID": this.tourInfo.ts_pp_ID,
          "bookUserID": this.userInfo.sm_ui_ID,
          "connectName": this.payName,
          "connectAreaCode": "",
          "connectTelephone": this.phone,
          "connectEmail": this.email,
          "leaveMessage": this.message,
          "personInfo": this.excursionList
        }

        this.$store.commit('showLoading');
        this.$store.dispatch('meakeTourOrder', makeOrder)
          .then(id => {
            this.$store.commit('hideLoading')
            this.initOrderInfo(id);
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
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
            this.$store.commit('hideLoading')
            sessionStorage.setItem('orderInfo', JSON.stringify(data[0]))
            this.$router.push({name: 'PayOrder', query: {type: data.type}})
          }, err => {
            this.showType = 'cancel';
            this.showErr = true;
            this.errCon = err;
          })
      }
    },

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

  header div {
    width: 19/@r;
    height: 35/@r;
    background: url('../../assets/img/ticket/leftIcon.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  header strong {
    font-size: 30/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #fff;
    margin-left: 10/@r;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    bottom: 98/@r;
    right: 0;
    background-color: #fff;
    overflow: auto;
  }

  .contactsInfo,
  .excursionInfo,
  .excursionLimit {
    border-bottom: 20/@r solid #ebeded;
  }

  .excursionLimit:last-of-type {
    border-bottom: none;
  }

  .contactsInfo > strong,
  .excursionInfo > strong,
  .excursionLimit > strong {
    font-size: 28/@r;
    line-height: 82/@r;
    font-family: "微软雅黑";
    color: #080707;
    display: block;
    padding-left: 30/@r;
  }

  .contactsInfo > div,
  .excursionInfo > div {
    font-size: 28/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
    margin: 0 30/@r;
  }

  .excursionInfo > div {
    border-bottom: 2/@r solid #ccc;
    padding: 10/@r 0;
  }

  .excursionInfo > div:last-of-type {
    border-bottom: none;
  }

  .contactsInfo > div > strong,
  .excursionInfo > div > strong {
    float: left;
    margin-right: 30/@r;
    color: #000;
  }

  .contactsInfo > div > div,
  .excursionInfo > div > div {
    overflow: hidden;
    padding: 13/@r 0;
  }

  .contactsInfo > div > div > span,
  .excursionInfo > div > div > input,
  .excursionInfo > div > div > textarea {
    float: left;
    width: 100%;
    font-size: 28/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #363e40;
    border: none;
  }

  .excursionInfo > div > div > textarea {
    outline: none;
    height: 200/@r;
    border: 2/@r solid #ccc;
    padding: 10/@r;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .excursionInfo > div > span {
    float: left;
    border: none;
    font-size: 25/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
    color: #b3b3b3;
  }

  .excursionInfo > p {
    font-size: 23/@r;
    line-height: 29/@r;
    font-family: "微软雅黑";
    color: #4d4d4d;
    padding: 18/@r 30/@r;
    border-top: 2/@r solid #ebeded;
  }

  .subLimit span,
  .contract > span {
    float: left;
    position: relative;
    width: 44/@r;
    height: 44/@r;
    border: 1/@r solid #4d4d4d;
    -webkit-border-radius: 3/@r;
    -moz-border-radius: 3/@r;
    border-radius: 3/@r;
    margin-right: 20/@r;
  }

  .subLimit i,
  .contract i {
    position: absolute;
    width: 70%;
    height: 35%;
    border-bottom: 1/@r solid #4d4d4d;
    border-left: 1/@r solid #4d4d4d;
    transform: rotate(-45deg);
    top: 10/@r;
    left: 5/@r;
  }

  .subLimit em {
    float: left;
  }

  .contract span {
    font-size: 31/@r;
    color: #080707;
  }

  .contract em {
    color: #117db5;
  }

  .orderMoney {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    width: 100%;
  }

  .orderMoney > div {
    float: left;
    padding-left: 70/@r;
  }

  .orderMoney strong {
    color: #dd7015;
    display: block;
    font-size: 21/@r;
    line-height: 31/@r;
    font-family: "微软雅黑";
    margin-top: 21/@r;
  }

  .orderMoney em {
    font-size: 30/@r;
  }

  .orderMoney span {
    font-size: 18/@r;
    line-height: 28/@r;
    font-family: "微软雅黑";
    color: #4d4d4d;
  }

  .orderMoney > a {
    float: right;
    font-size: 28/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    width: 33.33333%;
    text-align: center;
    color: #fff;
    background-color: #dd7015;
  }

  .moneyDetails {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 98/@r;
    background-color: rgba(0, 0, 0, .4);
  }

  .moneyDetailsBox {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fdfdfd;
    width: 100%;
  }

  .moneyDetailsBox > strong {
    font-size: 28/@r;
    line-height: 106/@r;
    font-family: "微软雅黑";
    text-align: center;
    display: block;
    color: #080707;
  }

  .leagueMoney {
    border-top: 1/@r solid #b3b3b3;
    padding: 19/@r 30/@r 13/@r;
    color: #080707;
  }

  .leagueMoneyT {
    font-size: 26/@r;
    line-height: 52/@r;
    font-family: "微软雅黑";
  }

  .leagueMoneyT strong {
    float: left;
  }

  .leagueMoneyT span {
    float: right;
    color: #dd7015;
  }

  .leagueMoneyT em {
    font-size: 18/@r;
  }

  .leagueMoneyB {
    font-size: 20/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .leagueMoneyB strong {
    float: left;
  }

  .leagueMoneyB span {
    float: right;
  }

  .userSex {
    float: left;
    font-size: 28/@r;
    line-height: 84/@r;
    font-family: "微软雅黑";
    margin-right: 50/@r;
  }

  .radioBox {
    float: left;
    width: 44/@r;
    height: 44/@r;
    border: 3/@r solid #e5e5e5;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-top: 19/@r;
  }

  .radioBox > i {
    display: block;
    width: 14/@r;
    height: 14/@r;
    background-color: #ffa948;
    margin: 12/@r auto 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    display: none;
  }

  .radioBox.active > i {
    display: block;
  }

  .userSex > span {
    float: left;
    margin-left: 15/@r;
    color: #383838;
  }

  .peopleInfoList > li {
    margin-bottom: 10/@r;
    padding: 0 30/@r;
  }

  .peopleInfoList > li > div {
    padding: 20/@r 0;
    border-bottom: 2/@r solid #ccc;
  }

  .peopleInfoList > li > div:last-of-type {
    border-bottom: none;
    padding: 10/@r 0;
  }

  .sex > strong {
    margin-top: 20/@r;
  }

  .sex > div {
    width: 210/@r;
    margin-top: 10/@r;
    margin-left: 200/@r;
  }

  .vux-button-group > a.vux-button-group-current {
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    height: 100%;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
  }

  .vux-button-group > a.vux-button-tab-item-first,
  .vux-button-group > a.vux-button-tab-item-last {
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    height: 100%;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    margin-right: 30/@r;
  }

  .vux-button-group > a.vux-button-tab-item-last:after,
  .vux-button-group > a.vux-button-tab-item-first:after {
    border: none;
  }

  .peopleInfoList > li > div > strong {
    float: left;
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .peopleInfoList > li > div > div {
    overflow: hidden;
  }

  .peopleInfoList > li > div > div > div,
  .peopleInfoList > li > div > div > input {
    float: left;
    width: 100%;
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #363e40;
    border: none;
    padding-left: 30/@r;
  }

  .selectedPeople {
    padding: 20/@r 30/@r;
    padding-bottom: 0;
  }

  .selectedPeople > p {
    font-size: 28/@r;
    line-height: 2;
    padding-bottom: 20/@r;
    font-family: "微软雅黑";
    color: #333;
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

  .operation {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .2);
  }

  .operation > div {
    float: right;
    margin-top: 90/@r;
    margin-right: 30/@r;
    background-color: #fff;
    padding: 10/@r;
  }

  .operation > div > strong {
    padding: 0 30/@r;
    display: block;
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #666;
    border-bottom: 1px solid #f0f0f0;
  }

  .operation > div > strong:last-of-type {
    border-bottom: none;
  }

  .returnHome > i {
    background: url("../../assets/img/userCenter/gohomeIcon.png") no-repeat;
  }

  .returnUserCenter > i {
    background: url("../../assets/img/userCenter/peopleIcon.png") no-repeat;
  }

  .operation strong > i {
    float: left;
    width: 30/@r;
    height: 30/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 13/@r;
    margin-right: 30/@r;
  }


</style>
