<template>
  <div>
    <header>
      <div @click="goTopPage"></div>
      <strong>成都出发</strong>
    </header>
    <section>
      <div class="dateList clearfix">
        <a href="javascript:;"
           v-for="item,index in content"
           :class="{active:index==meat}"
           @click="gol(item,index)"
        >
          <span>{{item.month}}月<em>¥{{monthPrice}}</em>起</span>
        </a>
      </div>
      <div class="dateContent">
        <div class="weekList clearfix">
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
          <li v-for="item,index in monthArr" :class="{active: index == ticketIndex}"
              @click="changePayTicket(item,index)">
            <strong>{{item.day ? item.day : item}}</strong>
            <span v-show="item.ts_pp_Price">￥{{item.ts_pp_Price ? item.ts_pp_Price : ''}}起</span>
          </li>
          <li v-for="item,index in nextDateArr" style="color: #ccc;">{{item}}</li>
        </ul>
        <p>
          ·日历价格为当日最低优惠价，您可以选择享用的最大优惠
        </p>
      </div>
      <div class="haveDiscount clearfix">
        <strong>可选优惠</strong>
        <span>暂无可用</span>
      </div>
      <div class="selectTicketType">
        <div class="adultTicket">
          <span>成人 <span style="color: #f60;" v-show="showNum">(剩余{{personTicket}})</span></span>
          <div class="seleteNum">
            <strong>¥{{adultMoney}}</strong>
            <a href="javascript:;" @click="personNumReduce">-</a>
            <span>{{personNum}}</span>
            <a href="javascript:;" @click="personNumAdd">+</a>
          </div>
        </div>
        <div class="childrenTicket">
          <span>儿童 <span style="color: #f60;" v-show="showNum">(剩余{{childTicket}})</span></span>
          <i @click="showInfoBtn"></i>
          <div class="seleteNum">
            <strong>¥{{childrenMoney}}</strong>
            <a href="javascript:;" @click="childNumReduce">-</a>
            <span>{{childNum}}</span>
            <a href="javascript:;" @click="childNumAdd">+</a>
          </div>
        </div>
        <a href="javascript:;" class="nextStep">
          <strong @click="goFillOrder">下一步</strong>
        </a>
      </div>
      <div class="childrenTicketInfo" v-show="showInfo">
        <div class="childrenInfoCon">
          <strong>儿童价格说明</strong>
          <p>年龄2-12周岁（不含），不占床，仅包含成都到峨眉山旅游大巴车车位，正常半餐和导服，其余费用产生自理</p>
          <a href="javascript:;" @click="showInfoBtn">确定</a>
        </div>
      </div>
      <toast v-model="showErr" :type="showType" :text="errCon"></toast>
    </section>
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
      adultMoney() {
        return this.personNum * this.personPrice
      },
      childrenMoney() {
        return this.childNum * this.childPrice
      }
    }, mapGetters([])),
    data() {
      return {
        showInfo: false,
        meat: 0,
        content: [],
        lastDateArr: [],
        monthArr: [],
        nextDateArr: [],
        ticketIndex: 50,
        dateStr: '',
        yearStr: '',
        monthStr: '',
        personNum: 0,
        childNum: 0,
        showErr: false,
        errCon: '',
        showType: 'cancel',
        cityId: '',
        lineId: '',
        dateString: '',
        childPrice: 0,
        personPrice: 0,
        childTicket: 0,
        personTicket: 0,
        showNum: false,
        monthPrice: 0,
      }
    },
    created() {
      let month = new Date().getMonth();
      for (let i = 0; i < 3; i++) {
        month++;
        if (month > 12) {
          month = 1;
          this.content.push({
            date: (new Date().getFullYear() + 1) + '-' + toZear2(month) + '-01',
            month: toZear2(month)
          })
        } else {
          this.content.push({
            date: new Date().getFullYear() + '-' + toZear2(month) + '-01',
            month: toZear2(month)
          })
        }
      }
      this.dateString = new Date().getFullYear() + '-' + toZear2(new Date().getMonth() + 1) + '-01';
      if (this.$route.query.cityId) {
        this.cityId = this.$route.query.cityId;
      }
      if (this.$route.query.lineId) {
        this.lineId = this.$route.query.lineId;
      }
      this.yearStr = new Date().getFullYear();
      this.monthStr = new Date().getMonth();
      this.dateStr = this.yearStr + '-' + this.monthStr + '-01';
      this.currentMonth = this.yearStr + '-' + toZear2(Number(this.monthStr) + 1);
      this.initData();
    },
    methods: {
      // 初始化日历
      initData(date) {
        let getTypePriceList = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "lineID": this.lineId,
          "city": this.cityId,
          "monthChose": date ? date : this.dateString
        };
        this.$store.commit('showLoading')
        this.$store.dispatch('initProductLinePrice', getTypePriceList)
          .then(data => {
            this.$nextTick(() => {
              this.get(this.yearStr, this.monthStr, data);
            })
          }, err => {
            this.$store.commit('hideLoading')
            this.showErr = true;
            this.errCon = err;
          })
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
          data[n].day = Number(data[n].ts_pp_Date.split('-')[2])
        }
        if (month == (new Date().getMonth()) && year == new Date().getFullYear()) {
          data = data.filter(item => {
            if (item.day >= new Date().getDate()) {
              return true
            }
            return false
          })
          this.monthPrice = data[0] ? data[0].ts_pp_Price : 0
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
        this.$store.commit('hideLoading')
        this.$nextTick(() => {
          if (sessionStorage.getItem('orderObj')) {
            this.ticketObj = JSON.parse(sessionStorage.getItem('orderObj'))
            this.searchTourTicket(this.ticketObj.ts_pp_ID)
              .then(data => {
                this.showNum = true;
                this.personTicket = data.fullNo;
                this.childTicket = data.childNo;
                this.$store.commit('hideLoading')
              }, err => {
                this.showType = 'warn';
                this.showErr = true;
                this.errCon = err;
              })
          }
          if (this.$route.query.day && month == (new Date().getMonth()) && year == new Date().getFullYear()) {
            this.ticketIndex = this.$route.query.day - 1;
          }
        })
      },
//      选择购票日期
      changePayTicket(item, index) {
        if (
          item < new Date().getDate() ||
          item.day < new Date().getDate() &&
          this.monthStr == new Date().getMonth() &&
          this.yearStr == new Date().getFullYear()
        ) {
          return
        }
        if (!item.ts_pp_Price) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '只能选择有价格的日期!!';
          return
        }
        this.searchTourTicket(item.ts_pp_ID)
          .then(data => {
            this.showNum = true;
            this.personTicket = data.fullNo;
            this.childTicket = data.childNo;
            this.$store.commit('hideLoading')
          }, err => {
            this.$store.commit('hideLoading')
            this.showType = 'warn';
            this.showErr = true;
            this.errCon = err;
          })
        this.personPrice = item.ts_pp_Price;
        this.childPrice = item.ts_pp_ChildPrice;
        this.personNum = 0;
        this.childNum = 0;
        this.ticketObj = item;
        this.ticketIndex = index;
      },
      //查询票
      searchTourTicket(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "productPriceID": id ? id : ''
        }
        this.$store.commit('showLoading')
        return this.$store.dispatch('searchTourTicket', options)
      },
      // 成人数量--
      personNumReduce() {
        this.personNum--;
        if (this.personNum < 0) {
          this.personNum = 0
        }
      },
      // 查看明细数量++
      personNumAdd() {
        if (!this.personTicket && this.showNum) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '票已售完';
          return
        }
        if (!this.showNum) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '请选择出游日期';
          return
        }
        this.personNum++;
        if (this.personNum > this.personTicket) {
          this.personNum = this.personTicket;
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '已达最大值';
          return
        }
        if (this.personNum > 10) {
          this.personNum = 10
        }
      },
      //儿童人数--
      childNumReduce() {
        this.childNum--;
        if (this.childNum < 0) {
          this.childNum = 0
        }
      },
      //儿童人数++
      childNumAdd() {
        if (!this.childTicket && this.showNum) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '票已售完';
          return
        }
        if (!this.showNum) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '请选择出游日期';
          return
        }
        this.childNum++;
        if (this.childNum > this.childTicket) {
          this.childNum = this.childTicket;
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '已达最大值';
          return
        }
        if (this.childNum > 10) {
          this.childNum = 10
        }
      },
      //日历导航
      gol(item, index) {
        this.ticketIndex = 50;
        this.lastDateArr = [];
        this.monthArr = [];
        this.nextDateArr = [];
        this.yearStr = item.date.split('-')[0];
        this.monthStr = item.date.split('-')[1] - 1;
        this.initData(item.date);
        this.meat = index;
      },
      //儿童票解释
      showInfoBtn() {
        this.showInfo = !this.showInfo;
      },
      //返回上一页
      goTopPage() {
        this.$router.go(-1)
      },
      //去填订单
      goFillOrder() {
        if (!this.personNum && !this.childNum) {
          this.showType = 'warn';
          this.showErr = true;
          this.errCon = '请选择购票数量';
          return
        }
        this.ticketObj.personNum = this.personNum;
        this.ticketObj.childNum = this.childNum;
        sessionStorage.setItem('tourInfo', JSON.stringify(this.ticketObj))
        this.$router.push({name: 'FillOrder'})
      }
    },
    mounted() {

    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    position: relative;
    height: 88/@r;
    background-color: #2dbb55;
    padding: 27/@r 30/@r 26/@r 30/@r;
  }

  header div {
    width: 19/@r;
    height: 35/@r;
    background: url('../../assets/img/ticket/leftIcon.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  header strong {
    position: absolute;
    left: 50%;
    top: 0;
    font-size: 34/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #fff;
    transform: translateX(-50%);
  }

  .dateList {
    width: 100%;
    background-color: #fff;
  }

  .dateList a {
    float: left;
    font-size: 25/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
    width: 33.3333%;
    text-align: center;
    color: #595959;
    position: relative;
  }

  .dateList a.active {
    color: #fff;
    background-color: #ffa948;
  }

  .dateList .active:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    border-bottom: 14/@r solid #777892;
    border-top: 14/@r solid transparent;
    border-left: 7/@r solid transparent;
    border-right: 7/@r solid transparent;
    transform: translateX(-50%);
  }

  .dateList a.active em {
    color: #fff;
  }

  .dateList em {
    color: #dd7015;
  }

  .weekList {
    background-color: #777892;
    font-size: 24/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .monthDayList > li {
    float: left;
    padding: 8/@r 0;
    width: 14.2222%;
    height: 90/@r;
    text-align: center;
    border-bottom: 2/@r solid #ebeded;
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

  .weekList > span {
    float: left;
    width: 14.2222%;
    text-align: center;
    color: #fff;
  }

  .calendarList {
    background-color: #fff;
  }

  .calendarList > li {
    float: left;
    width: 14.2222%;
    height: 91/@r;
    border-bottom: 2/@r solid #ebeded;
  }

  .calendarList .active {
    background-color: #ffa948;
  }

  .calendarList .active em,
  .calendarList .active span {
    color: #fff;
  }

  .calendarList em {
    display: block;
    text-align: center;
    color: #000;
    margin-top: 4/@r;
    font-size: 28/@r;
    line-height: 42/@r;
    font-family: "微软雅黑";
  }

  .calendarList span {
    display: block;
    text-align: center;
    color: #dd7015;
    font-size: 19/@r;
    line-height: 33/@r;
    font-family: "微软雅黑";
  }

  .calendarList .thisDay {
    color: #dd7015;
  }

  .dateContent p {
    background-color: #ebeded;
    font-size: 24/@r;
    line-height: 74/@r;
    font-family: "微软雅黑";
    color: #808080;
    padding-left: 40/@r;
  }

  .haveDiscount {
    padding: 14/@r 30/@r;
  }

  .haveDiscount > strong {
    float: left;
    width: 40%;
    color: #3a3939;
    font-size: 28/@r;
    line-height: 48/@r;
    font-family: "微软雅黑";
  }

  .haveDiscount > span {
    float: left;
    width: 60%;
    color: #9e9e9e;
    font-size: 28/@r;
    line-height: 48/@r;
    font-family: "微软雅黑";
  }

  .selectTicketType {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }

  .adultTicket,
  .childrenTicket {
    height: 78/@r;
    padding: 15/@r 30/@r 17/@r 30/@r;
    border-top: 2/@r solid #ebeded;
    font-size: 28/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
  }

  .adultTicket > span,
  .childrenTicket > span {
    float: left;
  }

  .seleteNum {
    float: right;
  }

  .seleteNum > * {
    float: left;
    margin-right: 20/@r;
  }

  .seleteNum a {
    width: 44/@r;
    height: 44/@r;
    color: #fff;
    background-color: #2dbb55;
    text-align: center;
    font-weight: bold;
  }

  .seleteNum strong {
    color: #dd7015;
  }

  .seleteNum span {
    color: #4d4d4d;
  }

  .childrenTicket i {
    float: left;
    width: 34/@r;
    height: 34/@r;
    background: url("../../assets/img/productChara/children？.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-left: 10/@r;
    margin-top: 6/@r;
  }

  .nextStep {
    display: block;
    height: 98/@r;
    background-color: #dd7015;
    width: 100%;
    color: #fff;
  }

  .nextStep > strong {
    display: block;
    text-align: center;
    font-size: 30/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
  }

  .childrenTicketInfo {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .34);
  }

  .childrenInfoCon {
    position: absolute;
    width: 557/@r;
    background-color: #fff;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-top: 3/@r;
    color: #595959;
  }

  .childrenInfoCon > strong {
    font-size: 28/@r;
    line-height: 94/@r;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
  }

  .childrenInfoCon > p {
    padding: 0 45/@r 50/@r;
    border-bottom: 1/@r solid #e7e6e6;
    font-size: 25/@r;
    line-height: 39/@r;
    font-family: "微软雅黑";
  }

  .childrenInfoCon a {
    display: block;
    font-size: 34/@r;
    line-height: 118/@r;
    font-family: "微软雅黑";
    color: #117db5;
    text-align: center;
  }

</style>
