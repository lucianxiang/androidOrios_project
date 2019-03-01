<template>
  <div>

    <div class="hotelScreen clearfix">
      <div class="selectDay" @click="maskShow = true">
        <div class="screenTime">
          <span>入 {{options.inDate}}</span>
          <span>离 {{options.outDate}}</span>
        </div>
        <div class="liveNight">{{days}}晚<i></i></div>
      </div>
      <div class="screenCondition">
        <!--<a href="javascript:;" class="canOrder">可订</a>-->
        <a href="javascript:;" class="screenBtn" @click="screenCondition = true">筛选<i></i></a>
      </div>
    </div>

    <!--内容-->
    <section>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <!--详细内容-->
        <div class="container" id="container">
          <div class="contentBox clearfix" :class="{active: item.activeState}" v-for="item,index in hotelList"
               @click="goHotelDetails(item,index)">
            <div class="contentLeftBox">
              <img v-lazy="item.showImage" alt="" :key="item.showImage">
            </div>
            <div class="contentRight">
              <div class="contentRightBox">
                <h1 class="hotelName">{{item.ht_ht_HotelName}}</h1>
                <div class="hotelAddress">{{item.ht_ht_HotelAddress}}</div>
                <div class="hotelBot">
                  <strong>￥<i>{{item.ht_ht_RecommendPrice}}</i>起</strong>
                  <i>{{item.comment}}条</i>
                  评论 |
                  <i>{{item.Percentage}}</i>/5分
                </div>
              </div>
            </div>
          </div>
          <p v-show="!hotelList.length">暂无相关数据~</p>
        </div>
      </mescroll-vue>
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

    <!--筛选条件-->
    <popup v-model="screenCondition" position="bottom" height="60%" style="background-color: #fff;z-index: 6000">
      <div class="screenContent">
        <dl class="clearfix" v-show="starList.length">
          <dt>档次</dt>
          <dd
            v-for="item,index in starList"
            @click="changeHotelStar(item,index)"
            :class="{active: index == startIndex}"
          >{{item.label}}
          </dd>
        </dl>
        <dl class="clearfix" v-show="seasonPlayNum">
          <dt>{{seasonPlay.ht_it_Name}}</dt>
          <dd
            v-for="item,index in seasonPlay.SubArray"
            @click="changeSwasonPlay(item,index)"
            :class="{active: index == swasonPlayIndex}"
          >{{item.ht_it_Name}}
          </dd>
        </dl>
        <dl class="clearfix" v-show="featureRecommendNum">
          <dt>{{featureRecommend.ht_it_Name}}</dt>
          <dd
            v-for="item,index in featureRecommend.SubArray"
            @click="changeFeatureRecommend(item,index)"
            :class="{active: index == featureRecommendIndex}">
            {{item.ht_it_Name}}
          </dd>
        </dl>
        <dl class="clearfix" v-show="chainHotelNum">
          <dt>{{chainHotel.ht_it_Name}}</dt>
          <dd
            v-for="item,index in chainHotel.SubArray"
            @click="changeChainHotel(item,index)"
            :class="{active: index == chainHotelIndex}"
          >{{item.ht_it_Name}}
          </dd>
        </dl>
        <dl class="clearfix" v-show="RoomHardNum">
          <dt>房间设施</dt>
          <dd
            v-for="item,index in RoomHard"
            @click="changeRoomHard(item,index)"
            :class="{active: index == roomHardIndex}"
          >{{item.ht_rh_Name}}
          </dd>
        </dl>
        <dl class="clearfix" v-show="ThemeTypeNum">
          <dt>主题</dt>
          <dd
            v-for="item,index in ThemeType"
            @click="changeThemeType(item,index)"
            :class="{active: index == themeTypeIndex}"
          >{{item.ht_tt_Name}}
          </dd>
        </dl>
      </div>
      <div class="clearSelect">
        <a href="javascript:;" @click="clearSelect">清空选择</a>
        <a href="javascript:;" @click="screenSubmit">确定</a>
      </div>
    </popup>

    <toast v-model="showErr" :type="showType" :text="errCon" :position="showPosition"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Popup} from 'vux'
  import {getDaysByDateString, toZear2, deepClone} from '@/assets/js/public'
  // 引入mescroll的vue组件
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    components: {
      Toast,
      MescrollVue,
      Popup
    },
    computed: mapGetters([
      'hotelQueryObj',
      'cityObj',
      'hotelSearchObjD',
      'seasonPlay',
      'featureRecommend',
      'chainHotel',
      'RoomHard',
      'ThemeType',
      'hotelScrollTop',
    ]),
    data() {
      return {
        hotelList: [],
        mescroll: null, // mescroll实例对象
        mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          toTop: {
            //回到顶部按钮
            src: "https://raw.githubusercontent.com/mescroll/mescroll/master/vue-demo/static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
            offset: 1000 //列表滚动1000/@r才显示回到顶部按钮
          },
        },
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ht_it_ID": "",//推荐类型
          "ht_tt_ID": "",//主题
          "ht_hd_ID": "",//设施
          "ht_rh_ID": "",//房间设施
          "ht_ht_HotelName": '',//模糊搜索酒店名称
          "ht_ht_HotelAddress": '',//模糊搜索酒店地址
          "ht_ht_Stars": "",//酒店星级
          "sm_af_AreaID": "", //城市
          "page": "1", //页面编号  默认为 1
          "rows": 10,//单页显示数据数量
          "inDate": "",
          "outDate": "",
        },
        rowsNum: 10,
        showData: false,
        showErr: false,
        errCon: '',
        timeObj: {},
        hotelSearchObj: {},
        hotelName: '',
        navIndex: 2,
        selectIndex: 2,
        priceIndex: 0,
        activeIndex: 0,
        selectActiveIndex: -1,
        botClass: -1,
        koubeiIsShow: false,
        nowIsShow: false,
        priceIsShow: false,
        allIsShow: false,
        imgIndex: 5,
        days: 1,
        screenCondition: false,
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
        dateArr: [],
        yearNum: 0,
        changeDays: [],//入离时间数组
        todayObj: {},//今天
        dayIndex: -1,//第一次点击的index
        dayArr: [],//第一次点击的日历数组
        maskShow: false,
        inTime: {},
        outTime: {},
        seasonPlayNum: 0,
        featureRecommendNum: 0,
        chainHotelNum: 0,
        RoomHardNum: 0,
        ThemeTypeNum: 0,
        startIndex: -1,
        swasonPlayIndex: -1,
        featureRecommendIndex: -1,
        chainHotelIndex: -1,
        roomHardIndex: -1,
        themeTypeIndex: -1,
        swasonPlayId: "",
        featureRecommendId: "",
        chainHotelId: "",
        searchObj: {},
        showType: 'warn',
        showPosition: 'default'
      }
    },
    props: ['keyword', 'keyNum'],
    watch: {
      keyword() {
        if (this.keyNum == 1) {
          this.initData()
            .then((data) => {
              this.hotelList = data;
              this.$store.commit('hideLoading');
            }, err => {
              this.showErr = true;
              this.errCon = err;
              this.$store.commit('hideLoading');
            })
        }
      },
      keyNum() {
        if (this.keyNum == 1) {
          this.initData()
            .then((data) => {
              this.hotelList = data;
              this.$store.commit('hideLoading');
            }, err => {
              this.showErr = true;
              this.errCon = err;
              this.$store.commit('hideLoading');
            })
        }
      }
    },
    created() {

      this.searchObj = deepClone(this.hotelSearchObjD);
      if (this.$route.query.id == 1 && this.searchObj.inTime) {
        this.options.inDate = this.searchObj.inTime;
        this.options.outDate = this.searchObj.outTime;
        this.options.ht_ht_Stars = this.searchObj.hotelStar;
        this.options.ht_it_ID = this.hotelQueryObj.hotelIntroduceObj ? this.hotelQueryObj.hotelIntroduceObj.ht_it_ID : '';
        this.options.ht_rh_ID = this.hotelQueryObj.hotelRoomHardObj ? this.hotelQueryObj.hotelRoomHardObj.ht_rh_ID : '';
        this.options.ht_tt_ID = this.hotelQueryObj.hotelThemeTypeObj ? this.hotelQueryObj.hotelThemeTypeObj.ht_tt_ThemeID : '';
      } else {
        let t = new Date();
        this.options.inDate = t.getFullYear() + '-' + toZear2(t.getMonth() + 1) + '-' + toZear2(t.getDate());
        t.setDate(t.getDate() + 1);
        this.options.outDate = t.getFullYear() + '-' + toZear2(t.getMonth() + 1) + '-' + toZear2(t.getDate());
        this.searchObj.inTime = this.options.inDate;
        this.searchObj.outTime = this.options.outDate;
        this.hotelQueryObj.hotelIntroduceObj = {};
        this.hotelQueryObj.hotelRoomHardObj = {};
        this.hotelQueryObj.hotelThemeTypeObj = {};
        this.$store.commit('hotelSearchObjD', this.searchObj)
      }
      if (sessionStorage.getItem('hotelSearchObj')) {
        this.hotelSearchObj = JSON.parse(sessionStorage.getItem('hotelSearchObj'));
      }
      if (sessionStorage.getItem('timeObj')) {
        this.timeObj = JSON.parse(sessionStorage.getItem('timeObj'));
      }

      this.$nextTick(() => {
        if (this.hotelScrollTop && this.hotelScrollTop.page) {
          this.mescroll.setPageNum(this.hotelScrollTop.page);
        }
      })
      this.todayObj = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      }

//      生成日历
      for (let i = 0; i < 4; i++) {
        let nt = new Date();
        nt.setMonth(nt.getMonth() + i);
        this.yearNum = nt.getFullYear();
        this.getMonth(nt.getMonth(), nt.getFullYear());
      }
      this.hotelScreenCondition();
    },
    methods: {
      //筛选提交
      screenSubmit() {
        let arr = [
          this.swasonPlayId,
          this.featureRecommendId,
          this.chainHotelId
        ];
        this.options.ht_it_ID = arr.join(',');
        this.initData()
          .then(data => {
            this.hotelList = data;
            this.screenCondition = false;
            this.$store.commit('hideLoading');
          }, err => {
            this.showErr = true;
            tbhis.errCon = err;
            this.screenCondition = false;
            this.$store.commit('hideLoading');
          })
      },
      //清空
      clearSelect() {
        this.swasonPlayId = this.featureRecommendId = this.chainHotelId
          = this.options.ht_tt_ID = this.options.ht_ht_Stars = this.options.ht_rh_ID
          = this.options.ht_tt_ID = '';
        this.startIndex = this.swasonPlayIndex = this.featureRecommendIndex
          = this.chainHotelIndex = this.roomHardIndex = this.themeTypeIndex = -1;
      },
      //档次
      changeHotelStar(item, index) {
        if (index == this.startIndex) {
          this.startIndex = -1;
          this.options.ht_ht_Stars = '';
          return
        }
        this.startIndex = index;
        this.options.ht_ht_Stars = item.value;
      },
      //当季游玩
      changeSwasonPlay(item, index) {
        if (index == this.swasonPlayIndex) {
          this.swasonPlayIndex = -1;
          this.swasonPlayId = "";
          return
        }
        this.swasonPlayId = item.ht_it_ID
        this.swasonPlayIndex = index;
      },
      //特色推荐
      changeFeatureRecommend(item, index) {
        if (index == this.featureRecommendIndex) {
          this.featureRecommendIndex = -1;
          this.featureRecommendId = "";
          return
        }
        this.featureRecommendId = item.ht_it_ID;
        this.featureRecommendIndex = index;
      },
      //连锁酒店
      changeChainHotel(item, index) {
        if (index == this.chainHotelIndex) {
          this.chainHotelIndex = -1;
          this.chainHotelId = "";
          return
        }
        this.chainHotelId = item.ht_it_ID;
        this.chainHotelIndex = index;
      },
      //房间设施
      changeRoomHard(item, index) {
        if (index == this.roomHardIndex) {
          this.roomHardIndex = -1;
          this.options.ht_rh_ID = "";
          return
        }
        this.options.ht_rh_ID = item.ht_rh_ID
        this.roomHardIndex = index;
      },
      //主题
      changeThemeType(item, index) {
        if (index == this.themeTypeIndex) {
          this.themeTypeIndex = -1;
          this.options.ht_tt_ID = "";
          return
        }
        this.options.ht_tt_ID = item.ht_tt_ThemeID;
        this.themeTypeIndex = index;
      },


      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.$emit('getHotelMescroll', mescroll)
        this.mescroll = mescroll
      },
      //上拉加载
      upCallback(page, mescroll) {
        this.options.page = page.num;
        this.options.rows = page.size;
        this.options.ht_ht_HotelName = this.keyword ? this.keyword : ''
        this.options.sm_af_AreaID = this.cityObj.sm_af_AreaID;
        if (this.keyword) {
          this.options.sm_af_AreaID = "";
        }
        this.$store.dispatch('initHotelList', this.options)
          .then((arr) => {
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.hotelList = []
            // 把请求到的数据添加到列表
            this.hotelList = this.hotelList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              if (this.hotelScrollTop && this.hotelScrollTop.page) {
                let i = this.getIndex(this.hotelList) % 10;
                let ul = document.querySelector('#container');
                let lis = ul.children;
                if (lis[i] && lis[i].offsetTop) {
                  mescroll.scrollTo(lis[i].offsetTop, 0);
                  this.$store.commit('clearHotelScrollTop');
                }
              }
              mescroll.endSuccess(arr.length);
            })
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      getIndex(arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].ht_ht_hotelID == this.hotelScrollTop.id) {
            return i
          }
        }
      },
//      酒店详情
      goHotelDetails(obj, index) {
        if (this.options.inDate) {
          this.searchObj.inTime = this.options.inDate;
        }
        if (this.options.outDate) {
          this.searchObj.outTime = this.options.outDate;
        }
        if (this.options.ht_ht_Stars) {
          this.searchObj.hotelStar = this.options.ht_ht_Stars;
        }
        if (this.options.ht_it_ID) {
          this.hotelQueryObj.hotelIntroduceObj.ht_it_ID = this.options.ht_it_ID;
        }
        if (this.options.ht_rh_ID) {
          this.hotelQueryObj.hotelRoomHardObj.ht_rh_ID = this.options.ht_rh_ID;
        }
        if (this.options.ht_tt_ID) {
          this.hotelQueryObj.hotelThemeTypeObj.ht_tt_ThemeID = this.options.ht_tt_ID;
        }
        this.$store.commit('hotelQueryObj', this.hotelQueryObj);
        this.$store.commit('hotelScrollTop', {
          id: obj.ht_ht_hotelID,
          page: obj.page,
          rows: this.options.rows
        });
        this.$router.push({
          name: 'HotelDetails',
          query: {
            id: obj.ht_ht_hotelID,
            comment: obj.comment
          }
        })
      },
//      返回
      back() {
        this.$router.go(-1);
      },
//      初始化数据
      initData(keyword, num) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ht_it_ID": this.options.ht_it_ID,//推荐类型
          "ht_tt_ID": this.options.ht_tt_ID,//主题
          "ht_hd_ID": this.options.ht_hd_ID,//设施
          "ht_rh_ID": this.options.ht_rh_ID,//房间设施
          "ht_ht_HotelName": this.keyword ? this.keyword : '',//模糊搜索酒店名称
          "ht_ht_HotelAddress": '',//模糊搜索酒店地址
          "ht_ht_Stars": this.options.ht_ht_Stars,//酒店星级
          "sm_af_AreaID": this.keyword ? "" : this.cityObj.sm_af_AreaID, //城市
          "page": "1", //页面编号  默认为 1
          "rows": 10,//单页显示数据数量
          "inDate": this.options.inDate,
          "outDate": this.options.outDate,
        }
        this.$store.commit('showLoading');
        return this.$store.dispatch('initHotelList', options)
      },

//      筛选条件
      hotelScreenCondition() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initHotelScreenCondition', options)
          .then(() => {
            this.seasonPlayNum = this.seasonPlay.SubArray.length;
            this.featureRecommendNum = this.featureRecommend.SubArray.length;
            this.chainHotelNum = this.chainHotel.SubArray.length;
            this.RoomHardNum = this.RoomHard.length;
            this.ThemeTypeNum = this.ThemeType.length;
            this.$store.commit('hideLoading');
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.$store.commit('hideLoading');
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
        this.options.inDate = toZear2(this.changeDays[0].year) + '-' + toZear2(this.changeDays[0].month) + '-' + toZear2(this.changeDays[0].day);
        this.options.outDate = toZear2(item.year) + '-' + toZear2(item.month) + '-' + toZear2(item.day);
        this.maskShow = false;
        this.initData()
          .then(() => {
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.$store.commit('hideLoading')
          })
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
    },
    mounted() {
      document.addEventListener('click', () => {
        this.koubeiIsShow = false;
        this.priceIsShow = false;
        this.allIsShow = false;
      })
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  section {
    background-color: #fff;
    position: fixed;
    z-index: 490;
    top: 260/@r;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
  }

  header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
  }

  .searchContainer {
    width: 100%;
    height: 88/@r;
    background-color: #2dbb55;
    padding: 10/@r 0;
  }

  .backBox {
    width: 10%;
    height: 88/@r;
    float: left;
  }

  .selectCss.active {
    color: #2dbb55;
  }

  .back {
    display: block;
    float: left;
    border-left: 1/@r solid white;
    border-bottom: 1/@r solid white;
    width: 30/@r;
    height: 30/@r;
    transform: rotate(45deg);
    margin: 15/@r 0 0 25/@r;
  }

  .searchBox {
    height: 68/@r;
    background-color: #eeeeee;
    width: 75%;
    float: left;
    border-radius: 50/@r;
  }

  .other {
    height: 88/@r;
    width: 15%;
    float: left;

    padding: 25/@r 0 0 20/@r;
  }

  .navList {
    height: 80/@r;
    width: 100%;
    float: left;
    background-color: white;
  }

  .select {
    width: 100%;
    background-color: white;
    position: fixed;
    top: 180/@r;
  }

  .select > li {
    float: left;
    width: 25%;
    height: 80/@r;
    text-align: center;
    font-size: 20/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
  }

  .selectName {
    float: left;
    text-align: center;
    margin-left: 20/@r;
  }

  .selectName:after {
    content: '';
    display: block;
    width: 50/@r;
    height: 50/@r;
    float: right;
    margin-top: 5/@r;
    background-image: url(../../assets/img/hotel/xiaImg.png);
    background-repeat: no-repeat;
    background-size: 20/@r;
    background-position: 10/@r 20/@r;
  }

  .selectName.active:after {
    background: url(../../assets/img/hotel/shang.png) no-repeat 10/@r 20/@r;
    background-repeat: no-repeat;
    background-size: 20/@r;
  }

  .selectName.selectAfter:after {
    background-color: #fff;
  }

  .selectName.active {
    color: rgb(51, 189, 97);
  }

  .searchImgBox {
    height: 68/@r;
    width: 10%;
    float: left;
  }

  .searchImgBox > img {
    margin: 10/@r 0 0 10/@r;
  }

  .searchName {
    height: 88/@r;
    max-width: 30%;
    overflow: hidden;
    float: left;
    text-align: center;
    font-size: 30/@r;
    line-height: 68/@r;
    font-family: "微软雅黑";
  }

  .searchContent {
    width: 70%;
    float: left;
  }

  .searchInput {
    height: 68/@r;
    width: 100%;
    border: none;
    float: left;
    background-color: #eeeeee;
  }

  .navList > li {
    float: left;
    width: 20%;
    height: 80/@r;
    text-align: center;
    font-size: 30/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
  }

  .navList > li.active {
    color: rgb(51, 189, 97);
  }

  .clickSpan {
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
  }

  .select > li {
    float: left;
    width: 25%;
    height: 50/@r;
    text-align: center;
    font-size: 20/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
  }

  .select > li.active {
    color: rgb(51, 189, 97);
  }

  .selectName {
    float: left;
    text-align: center;
    margin-left: 20/@r;
  }

  .selectName:after {
    content: '';
    display: block;
    width: 50/@r;
    height: 50/@r;
    float: right;
    background-image: url(../../assets/img/hotel/xiaImg.png);
    background-repeat: no-repeat;
    background-size: 20/@r;
    background-position: 10/@r 20/@r;
  }

  .selectName.active:after {
    background: url(../../assets/img/hotel/shang.png) no-repeat 10/@r 20/@r;
    background-repeat: no-repeat;
    background-size: 20/@r;
  }

  .selectName.selectAfter:after {
    background-color: #fff;
  }

  .selectName > .active {
    color: rgb(51, 189, 97);
  }

  .contentBox {
    padding: 10/@r 20/@r;
  }

  .contentLeftBox {
    float: left;
    width: 160/@r;
    height: 200/@r;
  }

  .contentLeftBox > img {
    width: 100%;
    height: 100%;
  }

  .contentRight {
    overflow: hidden;
    padding-left: 20/@r;
  }

  .contentRightBox {
    float: left;
    width: 100%;
  }

  .hotelName {
    font-size: 30/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: left;
    color: #333;
  }

  .hotelAddress {
    text-align: left;
    color: #666;
    padding: 10/@r 0;
    font-size: 25/@r;
  }

  .hotelBot {
    font-size: 30/@r;
    color: #333;
  }

  .hotelBot > strong i {
    font-size: 40/@r;
  }

  i {
    color: #f80;
  }

  .koubei {
    height: 200/@r;
    width: 100%;
    position: fixed;
    background-color: white;
    top: 240/@r;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1001;
  }

  .koubei > div {
    border-top: 1/@r solid silver;
    height: 100/@r;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    text-align: left;
    padding-left: 20/@r;
  }

  .price {
    height: 500/@r;
    width: 100%;
    position: relative;
    z-index: 1000;
    background-color: white;
    top: -10/@r;
  }

  .selectPrice {
    height: 100/@r;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    padding-left: 30/@r;
  }

  .qujianjia {
    height: 200/@r;
  }

  .qujianjia > ul > li {
    background-color: #fff;
    height: 80/@r;
    width: 220/@r;
    float: left;
    margin: 19/@r 0 0 20/@r;
    font-size: 25/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    text-align: center;
    border-radius: 10/@r;
  }

  .qujianjia > ul > li.priceIndex {
    color: rgb(51, 189, 97);
    border: 2/@r solid rgb(51, 189, 97);
  }

  .best {
    height: 200/@r;
    padding: 0 20/@r;
  }

  .xia {
    width: 25/@r;
    height: 25/@r;
    border-left: 1/@r solid silver;
    border-bottom: 1/@r solid silver;
    margin: 30/@r 40/@r 0 0;
    float: right;
    transform: rotate(-45deg);
  }

  .zuiDi {
    width: 150/@r;
    height: 50/@r;
    background-color: #f0f0f0;
    border-radius: 10/@r;
    float: left;
    margin-top: 100/@r;
    text-align: center;
    color: #a8a8a8;
    margin-left: 300/@r;
  }

  .middleLine {

  }

  .zuiGao {
    width: 150/@r;
    height: 50/@r;
    background-color: #f0f0f0;
    border-radius: 10/@r;
    float: left;
    margin-top: 100/@r;
    color: #a8a8a8;
    text-align: center;
  }

  .middleLine {
    width: 50/@r;
    height: 50/@r;
    float: left;
    margin: 75/@r 20/@r 0;
    border-bottom: 1/@r solid #dddddd;
  }

  .allSelect {
    height: 1000/@r;
    background-color: rosybrown;
    width: 100%;
    position: relative;
    top: -10/@r;
  }

  .allLeft {
    height: 1000/@r;
    width: 30%;
    background-color: #f5f5f5;
    float: left;
  }

  .allLeft > .allLeftTop > ul > li {
    height: 100/@r;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    text-align: center;
  }

  .allLeft > .allLeftTop > ul > li > span {
    height: 100/@r;
    position: relative;
  }

  .allLeft > .allLeftTop > ul > li > span:before {
    content: '';
    width: 15/@r;
    height: 15/@r;
    background-color: #f80;
    position: absolute;
    border-radius: 50%;
    top: 15/@r;
    left: -25/@r;
  }

  .allRight {
    height: 1000/@r;
    width: 70%;
    background-color: white;
    float: left;
  }

  .allRight > .allRightTop {
    padding: 0 30/@r;
  }

  .allRight > .allRightTop > ul > li {

    height: 100/@r;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    text-align: left;
    border-bottom: 1/@r solid #e1e1e1;
  }

  .allTypeRightTop {
    margin: -100/@r 100/@r 0 0;
    position: absolute;
    width: 70%;
    height: 500/@r;
    background-color: red;
    right: 0;
  }

  .allTypeRightTop > ul > li {
    height: 100/@r;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    text-align: center;
    border-bottom: 1/@r solid #e1e1e1;
  }

  .allLeftBot {
    position: absolute;
    height: 100/@r;
    width: 30%;
    float: left;
    bottom: 0;
    margin-bottom: 0;
    border-top: 1/@r solid #f8f8f8;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    text-align: center;
  }

  .allRightBot {
    position: absolute;
    height: 100/@r;
    width: 70%;
    float: left;
    bottom: 0;
    margin-bottom: 0;
    font-size: 30/@r;
    line-height: 100/@r;
    font-family: "微软雅黑";
    text-align: center;
  }

  .reset {
    float: left;
    height: 100/@r;
    width: 30%;
    text-align: center;
    border-top: 1/@r solid #e1e1e1;
  }

  .sure {
    float: left;
    height: 100/@r;
    width: 70%;
    text-align: center;
    background-color: #f80;
    color: white;
  }

  .selectRightBox {
    width: 40/@r;
    height: 40/@r;
    background-image: url(../../assets/img/hotel/quan.png);
    background-repeat: no-repeat;
    background-size: 40/@r 40/@r;
    float: right;
    margin: 30/@r 15/@r 0 0;
  }

  .selectRightBox.active {
    width: 40/@r;
    height: 40/@r;
    background-image: url(../../assets/img/hotel/selectRight.png);
    background-repeat: no-repeat;
    background-size: 40/@r 40/@r;
    float: right;
    margin: 30/@r 15/@r 0 0;
  }

  .botClass {

  }

  .clickSpan.active {
    display: inline-block;
    height: 80/@r;
    box-sizing: content-box;
    border-bottom: 4/@r solid rgb(51, 189, 97);
  }

  .screemKoubei {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 250/@r;
    z-index: 1000;
  }

  .screnmtPrice {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 250/@r;
    z-index: 1000;
  }

  .screemAll {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 250/@r;
    z-index: 1000;
  }

  .container > .showData {
    font-size: 30/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
    color: #fc7b69;
    text-align: center;
    border-bottom: none;
  }

  .container > .contentBox.active {
    background-color: #f1f1f1;
  }

  .container > .contentBox.active .contentRightBox > h1 {
    color: red;
  }

  .hotelScreen {
    border-bottom: 1/@r solid #dcdcdc;
    border-top: none;
    position: fixed;
    top: 170/@r;
    width: 100%;
    z-index: 491;
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
    margin: 18/@r 0 0 8/@r;
    background: url("../../assets/img/hotel/bottomIcon2.png") no-repeat;
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
    height: 70%;
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

  .container > p {
    color: #999;
    text-align: center;
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
  }


</style>
