<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
        <a href="javascript:;" class="searchIcon" @click="goSearchHotel"></a>
      </div>
      <strong class="title">酒店</strong>
      <div class="rightIcon">
        <router-link to="UserCenter" class="centerIcon"></router-link>
        <!--<a href="javascript:;" class="menuIcon"></a>-->
      </div>
    </header>
    <section>
      <div class="showImageBox">

        <!--推荐图片-->

        <div class="exhibitionBox">

          <swiper auto height="100%">
            <swiper-item
              class="swiper-demo-img"
              v-for="item,index in hotelPicList"
              :key="index"

              @click.native="changeHotel(item)"
            >
              <img
                :src="item.ht_hii_ImageUrl"
                style="height: 100%;width: 100%;"
              ></swiper-item>
          </swiper>
        </div>
        <ul class="serviceList clearfix">
          <li class="haveService">
            <i></i>
            <span>服务有保障</span>
          </li>
          <li class="havePrice">
            <i></i>
            <span>价格有保障</span>
          </li>
          <li class="haveGuarantee">
            <i></i>
            <span>入住有保障</span>
          </li>
          <li class="haveType">
            <i></i>
            <span>种类有保障</span>
          </li>
        </ul>
      </div>
      <div class="hotelSearch">
        <div class="regionType clearfix">
          <a href="javascript:;">境内</a>
          <!--<a href="javascript:;">国际/地区</a>-->
        </div>
        <!--<div class="myRegion clearfix">-->
        <!--<i></i>-->
        <!--<span>我的位置 :</span>-->
        <!--<input type="text" placeholder="输入要查找的位置" v-model="searchAddress">-->
        <!--</div>-->
        <div class="setDate clearfix">
          <div class="setInDate" @click="showDateMask">
            <span>入住日期</span>
            <p>{{inTime ? inTime : '选择日期'}}</p>
          </div>
          <div class="computedDate">
            <em>{{days}}晚</em>
            <i></i>
          </div>
          <div class="setOutDate" @click="showDateMask">
            <span>离店日期</span>
            <p>{{outTime ? outTime : '选择日期'}}</p>
          </div>
        </div>
        <div class="searchSubmit">
          <a href="javascript:;" @click="goHotelSearchDetails">查询</a>
        </div>
      </div>
    </section>
    <div class="dateWrap" @click="showDateMask" :class="{active: maskShow}">
      <div class="dateBox" @click.stop="clickWhite">
        <div class="dateTitle">
          <span @click="showDateMask">取消</span>
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
    <toast v-model="showErr" :type="showType" :text="errCon" :position="showPosition"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Swiper, SwiperItem} from 'vux'
  import {getDaysByDateString, toZear2} from '@/assets/js/public'

  export default {
    components: {
      Toast,
      Swiper,
      SwiperItem
    },
    computed: mapGetters([
      'hotelPicList',
      'hotelQueryObj'
    ]),
    data() {
      return {
        priceList: [
          {
            label: '不限',
            value: ''
          },
          {
            label: '¥150以下',
            value: 1
          },
          {
            label: '¥150-¥300',
            value: 2
          },
          {
            label: '¥301-¥450',
            value: 3
          },
          {
            label: '¥451-¥600',
            value: 4
          },
          {
            label: '¥601-¥1000',
            value: 5
          }
        ],
        starList: [
          {
            label: '不限',
            value: '0'
          },
          {
            label: '一星级/普通型',
            value: 1
          },
          {
            label: '二星级/经济型',
            value: 2
          },
          {
            label: '三星级/舒适型',
            value: 3
          },
          {
            label: '四星级/高档型',
            value: 4
          },
          {
            label: '五星级/豪华型',
            value: 5
          }

        ],
        showSelect: false,
        showErr: false,
        errCon: '',
        searchAddress: '',
        hotelType: '',
        hotelTypeId: -1,
        hotelPrice: '',
        inTime: '',
        outTime: '',
        days: 1,
        dateArr: [],
        yearNum: 0,
        changeDays: [],//入离时间数组
        todayObj: {},//今天
        dayIndex: -1,//第一次点击的index
        dayArr: [],//第一次点击的日历数组
        maskShow: false,
        hotelTypeStr: '',
        showType: 'warn',
        showPosition: 'default'
      }
    },
    created() {
      this.todayObj = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      }
      let t = new Date();
      this.inTime = t.getFullYear() + '-' + toZear2(t.getMonth() + 1) + '-' + toZear2(t.getDate());
      t.setDate(new Date().getDate() + 1);
      this.outTime = t.getFullYear() + '-' + toZear2(t.getMonth() + 1) + '-' + toZear2(t.getDate());
      this.initHotelPic();
      for (let i = 0; i < 4; i++) {
        let nt = new Date();
        nt.setMonth(nt.getMonth() + i);
        this.yearNum = nt.getFullYear();
        this.getMonth(nt.getMonth(), nt.getFullYear());
      }
      if (this.hotelQueryObj.hotelIntroduceObj) {
        this.hotelTypeStr =
          (this.hotelQueryObj.hotelIntroduceObj.ht_it_Name ? this.hotelQueryObj.hotelIntroduceObj.ht_it_Name + '/' : '') +
          (this.hotelQueryObj.hotelThemeTypeObj.ht_tt_Name ? this.hotelQueryObj.hotelThemeTypeObj.ht_tt_Name + '/' : '') +
          (this.hotelQueryObj.hotelRoomHardObj.ht_rh_Name ? this.hotelQueryObj.hotelRoomHardObj.ht_rh_Name : '')
      }
    },
    methods: {
      //选择轮播图片
      changeHotel(item) {
      },
      //
      closeSelect() {
        this.showSelect = false;
      },
      goSearchHotel() {
        this.$router.push({name: 'SearchPage', query: {id: 1}})
      },

//    --------------------------
      //点击空白
      clickWhite() {
      },
      //显示日期弹窗
      showDateMask() {
        this.maskShow = !this.maskShow;
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
          if (this.changeDays.length == 2) {
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
            this.resetInTime(item,arr,index);
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
            this.resetInTime(item,arr,index);
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
            this.resetInTime(item,arr,index);
            return
          }
        }
        item.status = true;
      },
      //计算天数
      getDays(item) {
        this.days = Math.round(getDaysByDateString(this.changeDays[0].year + '-' + this.changeDays[0].month + '-' + this.changeDays[0].day, item.year + '-' + item.month + '-' + item.day)) - 1;
        this.inTime = toZear2(this.changeDays[0].year) + '-' + toZear2(this.changeDays[0].month) + '-' + toZear2(this.changeDays[0].day);
        this.outTime = toZear2(item.year) + '-' + toZear2(item.month) + '-' + toZear2(item.day);
        this.showDateMask();
      },
      //重置入住时间
      resetInTime(item,arr,index) {
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

//      ----------------------------
      //轮播
      initHotelPic() {
        let selectHotelIndexImageInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ht_hii_Id": "",//标识
        };
        this.$store.commit('showLoading')
        this.$store.dispatch('initHotelPic', selectHotelIndexImageInfo)
          .then(() => {
            this.$nextTick(() => {
              this.$store.commit('hideLoading')
            })
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //选择酒店类型
      //酒店列表页
      goHotelSearchDetails() {
        this.$store.commit('hotelSearchObjD', {
          inTime: this.inTime,
          outTime: this.outTime,
        });
        this.$router.push({
          name: 'SearchPage',
          query: {id: 1}
        })
      },
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 24/@r 30/@r 23/@r 26/@r;
  }

  .leftIcon {
    float: left;
  }

  .homeIcon {
    float: left;
    width: 41/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/homeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 33/@r;
  }

  .searchIcon {
    float: left;
    width: 34/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/searchIcon.png") no-repeat;

    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
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

  .rightIcon {
    float: right;
  }

  .centerIcon {
    float: left;
    width: 32/@r;
    height: 37/@r;
    background: url("../../assets/img/home/userIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 2/@r;
    margin-right: 30/@r;
  }

  .menuIcon {
    float: left;
    width: 40/@r;
    height: 34/@r;
    background: url("../../assets/img/home/menuIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 3/@r;
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 130/@r;
    background-color: #fff;
    overflow: auto;
  }

  .showImageBox {
    border-bottom: 16/@r solid #f8f7f7;
    padding-bottom: 23/@r;
    background-color: #fff;
  }

  .showImageBox > img {
    display: block;
    width: 100%;
  }

  .serviceList {
    margin-top: 26/@r;
    font-size: 20/@r;
    line-height: 34/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .serviceList > li {
    float: left;
    width: 25%;
  }

  .serviceList > li > i {
    display: block;
    width: 38/@r;
    height: 38/@r;
    margin: 0 auto;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .serviceList > li > span {
    display: block;
    text-align: center;
  }

  .haveService i {
    background: url("../../assets/img/hotel/icon1.png") no-repeat;
  }

  .havePrice i {
    background: url("../../assets/img/hotel/icon2.png") no-repeat;
  }

  .haveGuarantee i {
    background: url("../../assets/img/hotel/icon3.png") no-repeat;
  }

  .haveType i {
    background: url("../../assets/img/hotel/icon4.png") no-repeat;
  }

  .hotelSearch {
    background-color: #fff;
    padding-top: 14/@r;
  }

  .regionType {
    font-size: 28/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    border-bottom: 1/@r solid #e6e6e6;
  }

  .regionType > a {
    float: left;
    width: 50%;
    text-align: center;
    border-bottom: 2/@r solid transparent;
  }

  .regionType > a.active {
    border-bottom-color: #4ece5a;
    color: #4ece5a;
  }

  .myRegion {
    margin-top: 27/@r;
    padding-left: 30/@r;
    font-size: 26/@r;
    line-height: 32/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .myRegion > i {
    float: left;
    width: 22/@r;
    height: 26/@r;
    background: url("../../assets/img/hotel/icon5.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 3/@r;
  }

  .myRegion > span {
    float: left;
    margin: 0 6/@r;
  }

  .myRegion > input {
    float: left;
    border: none;
    border-bottom: 1/@r solid #ebebeb;
    background-color: transparent;
    width: 530/@r;
    color: #333;
    font-size: 26/@r;
    line-height: 32/@r;
    font-family: "微软雅黑";
  }

  .setDate {
    width: 580/@r;
    margin: 33/@r auto 0;
    margin-bottom: 39/@r;
  }

  .setDate span {
    font-size: 23/@r;
    line-height: 77/@r;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
    color: #a5a5a5;
  }

  .setDate strong {
    font-size: 32/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
  }

  .setInDate {
    float: left;
    width: 197/@r;
    border-bottom: 1/@r solid #383838;
    font-size: 32/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #ccc;
    text-align: center;
    color: #000;
  }

  .computedDate {
    float: left;
    width: 133/@r;
    margin: 77/@r 23/@r 0;
  }

  .computedDate > em {
    font-size: 28/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    color: #333333;
    display: block;
    text-align: center;
  }

  .computedDate > i {
    width: 133/@r;
    height: 9/@r;
    background: url("../../assets/img/hotel/icon8.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    display: block;
    margin-top: -6/@r;
  }

  .setOutDate {
    float: left;
    width: 197/@r;
    border-bottom: 1/@r solid #383838;
    font-size: 32/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #000;
  }

  .searchName,
  .searchPrice {
    border-top: 1/@r solid #e6e6e6;
    padding: 0 30/@r;
    height: 78/@r;
    font-size: 26/@r;
    line-height: 78/@r;
    font-family: "微软雅黑";
  }

  .searchName > span,
  .searchPrice > span {
    float: left;
    color: #a5a5a5;
  }

  .searchName > i,
  .searchPrice > i {
    float: right;
    width: 12/@r;
    height: 22/@r;
    margin-top: 28/@r;
    background: url("../../assets/img/userCenter/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .searchSubmit {
    padding: 30/@r 0;
    padding-top: 80/@r;
    font-size: 32/@r;
    line-height: 75/@r;
    font-family: "微软雅黑";
  }

  .searchSubmit > a {
    display: block;
    width: 600/@r;
    margin: 0 auto;
    text-align: center;
    background-color: #dd7015;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
    color: #fff;
    box-shadow: 1/@r 1/@r 3/@r #000;
  }

  .selectHotelClassify {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .selectMask {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .3;
  }

  .selectContent {
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: #fff;
    padding: 30/@r 30/@r 150/@r 30/@r;
    font-size: 22/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
  }

  .selectContent strong {
    font-size: 26/@r;
    line-height: 46/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .selectPriceList > a {
    float: left;
    width: 25%;
    text-align: center;
    box-shadow: 0 0 0 1/@r #c9c9c9;
    margin-top: 16/@r;
  }

  .selectPriceList > a.active {
    background-color: #2dbb55;
    box-shadow: 0 0 0 1/@r #2dbb55;
  }

  .selectStar {
    margin-top: 30/@r;
  }

  .selectStarList > a {
    float: left;
    width: 33.33333%;
    text-align: center;
    box-shadow: 0 0 0 1/@r #c9c9c9;
    margin-top: 16/@r;
  }

  .selectStarList > a.active {
    background-color: #2dbb55;
    box-shadow: 0 0 0 1/@r #2dbb55;
  }

  .searchButton {
    width: 100%;
    margin-top: 30/@r;
  }

  .searchButton > a {
    width: 100%;
    text-align: center;
    background-color: #dd7015;
    color: #fff;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    box-shadow: 2/@r 1/@r 0/@r #ccc;
  }

  .exhibitionImage {
    height: 100%;
    transition: .5s;
  }

  .exhibitionImage > img {
    float: left;
    height: 100%;
  }

  .exhibitionBox {
    width: 100%;
    height: 328/@r;
    overflow: hidden;
  }

  .vux-slider {
    height: 100% !important;
  }

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


</style>
