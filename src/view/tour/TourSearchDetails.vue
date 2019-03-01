<template>
  <div>
    <div id="wrap">
      <div class="condition">
        <strong>当前出发城市：{{outCity}}</strong>
        <span @click="screenCondition = true">筛选</span>
      </div>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <ul class="tourList" id="tourList">
          <li class="clearfix"
              v-for="item,index in tourSearchList"
              @click="goTourDetails(item,index)"
              :class="{active: item.activeState}"
          >
            <div class="imgCase">
              <img v-lazy="item.showImage" alt="" :key="item.showImage">
              <i>{{item.ts_tg_Type | getHeelType}}</i>
            </div>
            <div class="tourIntroduce">
              <div class="tourIntroduceBox">
                <strong >{{item.ta_tg_Title}}</strong>
                <span>出发日期: {{item.ts_tg_DepartDate}}</span>
                <span>供应商: {{item.ta_tg_TradeName}}</span>
                <div class="priceBox clearfix">
                  <span class="price">￥<em>{{item.ts_tg_lowestPrice}}</em><i>起</i></span>
                  <span class="satisfaction">{{item.Percentage}}%满意 |<em> {{item.comment}}条</em>评论</span>
                </div>
              </div>
            </div>
          </li>
          <li v-show="!tourSearchList.length">暂无相关数据~</li>
        </ul>

      </mescroll-vue>
      <!--<section>-->
      <!--<scroller-->
      <!--:on-infinite="infinite"-->
      <!--ref="my_scroller"-->
      <!--refresh-layer-color="#4b8bf4"-->
      <!--loading-layer-color="#ec4949"-->
      <!--&gt;-->
      <!---->
      <!--</scroller>-->
      <!--</section>-->
    </div>
    <!--筛选条件-->
    <popup v-model="screenCondition" position="bottom" height="60%" style="background-color: #fff;z-index: 2000">
      <div class="screenContent">
        <dl class="clearfix">
          <dt>出发城市</dt>
          <dd
            @click="changeOutCity(item,index)"
            v-for="item,index in tourCityList"
            :class="{active: index == outCityIndex}"
          >{{item.sm_af_AreaName}}
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>行程天数</dt>
          <dd
            @click="changePlayDay(item,index)"
            v-for="item,index in dayArr"
            :class="{active: index == dayIndex}"
          >{{item}}天
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>推荐景点</dt>
          <dd
            @click="changeTourSite(item,index)"
            v-for="item,index in tourSiteList"
            :class="{active: index == recommendIndex}"
          >
            {{item.tm_ts_Name}}
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>成团地点</dt>
          <dd
            @click="changeTourGroupCity(item,index)"
            v-for="item,index in tourGroupCityList"
            :class="{active: index == addressIndex}"
          >{{item.sm_af_AreaName}}
          </dd>
        </dl>
      </div>
      <div class="clearSelect">
        <a href="javascript:;" @click="clearSelect">清空选择</a>
        <a href="javascript:;" @click="screenSubmit">确定</a>
      </div>
    </popup>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Popup} from 'vux'
  // 引入mescroll的vue组件
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    computed: mapGetters([
      'cityObj',
      'tourCityList',
      'tourGroupCityList',
      'tourSiteList',
      'tourScrollTop'
    ]),
    components: {
      MescrollVue,
      Toast,
      Popup
    },
    props: ['keyword', 'keyNum'],
    data() {
      return {
        page:'',
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
          }
        },
        tourSearchList: [], // 列表数据
        showErr: false,
        errCon: '',
        tourId: '',
        rowsNum: 5,
        showData: false,
        options: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "keycode": '',//关键字
          "tourdays": "",//行程天数
          "groupCity": "",//成团地点
          "topTourSite": "",//推荐景点
          "departCity": "",//出发城市
          "page": "1",
          "rows": 10
        },
        dayArr: [],
        screenCondition: false,
        outCityIndex: -1,
        dayIndex: -1,
        recommendIndex: -1,
        addressIndex: -1,
        outCity: "全国",
        changeCity: ""
      }
    },
    mounted() {
    },
    created() {
      for (let i = 1; i < 19; i++) {
        this.dayArr.push(i);
      }
      this.tourQueryCondition();
      this.$nextTick(() => {
        if (this.tourScrollTop.page) {
          this.mescroll.setPageNum(this.tourScrollTop.page);
        }
      })
    },
    watch: {
      keyword() {
        if (this.keyword) {
          this.clearSelect();
        }
        if (this.keyNum == 0) {
          this.initData()
            .then(data => {
              this.tourSearchList = data;
              this.$store.commit('hideLoading');
            }, err => {
              this.$store.commit('hideLoading');
              this.showErr = true;
              this.errCon = err;
            })
        }
      },
      keyNum() {
        if (this.keyNum == 0) {
          this.rowsNum = 5;
          this.initData()
            .then(data => {
              this.tourSearchList = data;
              this.$store.commit('hideLoading');
            }, err => {
              this.$store.commit('hideLoading');
              this.showErr = true;
              this.errCon = err;
            })
        }
      },
    },
    methods: {
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll;
        this.$emit('getMescroll', mescroll)
      },
      //上拉加载
      upCallback(page, mescroll) {
        this.page = page.num
        this.options.page = page.num;
        this.options.keycode = this.keyword;
        this.options.departCity = this.options.departCity ? this.options.departCity : this.cityObj.sm_af_AreaName;
        this.outCity = this.options.departCity ? this.options.departCity : this.cityObj.sm_af_AreaName
        if (this.keyword) {
          this.options.departCity = "";
          this.outCity = "全国";
        }
        this.$store.dispatch('initTourSearchList', this.options)
        .then((arr) => {
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.tourSearchList = []
          // 把请求到的数据添加到列表
          this.tourSearchList = this.tourSearchList.concat(arr)

          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            let i = this.getIndex(this.tourSearchList)%10
            let ul = document.querySelector('#tourList');
            let lis  = ul.querySelectorAll('li');
            if(lis[i]&&lis[i].offsetTop){
              mescroll.scrollTo( lis[i].offsetTop,0 );
              this.$store.commit('clearTourScrollTop');
            }
            mescroll.endSuccess(arr.length);
          })
        }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      getIndex(arr){
        for(var i=0;i<arr.length;i++){
          if(arr[i].ta_tg_ID==this.tourScrollTop.id){
            return i
          }
        }
      },
      //清空筛选
      clearSelect() {
        this.outCityIndex = this.dayIndex = this.recommendIndex = this.addressIndex = -1;
        this.options.departCity = this.options.tourdays = this.options.topTourSite = this.options.groupCity = "";
        this.outCity = "全国";
        this.screenSubmit();
      },
      //选择提交
      screenSubmit() {
        this.outCity = this.changeCity ? this.changeCity : "";
        this.options.departCity = this.changeCity ? this.changeCity : "";
        this.initData(this.keyword, this.options.departCity)
          .then(data => {
            this.tourSearchList = data;
            this.screenCondition = false;
            this.$store.commit('hideLoading');
          }, err => {
            this.screenCondition = false;
            this.$store.commit('hideLoading');
            this.showErr = true;
            this.errCon = err;
          })
      },
      //出发城市
      changeOutCity(item, index) {
        if (index == this.outCityIndex) {
          this.outCityIndex = -1;
          this.changeCity = "";
          return
        }
        this.changeCity = item.sm_af_AreaName;
        this.outCityIndex = index;
      },
      //行程天数
      changePlayDay(item, index) {
        if (index == this.dayIndex) {
          this.dayIndex = -1;
          this.options.tourdays = "";
          return
        }
        this.options.tourdays = item;
        this.dayIndex = index;
      },
      //推荐景点
      changeTourSite(item, index) {
        if (index == this.recommendIndex) {
          this.recommendIndex = -1;
          this.options.topTourSite = "";
          return
        }
        this.options.topTourSite = item.tm_ts_Code;
        this.recommendIndex = index;
      },
      //成团地点
      changeTourGroupCity(item, index) {
        if (index == this.addressIndex) {
          this.addressIndex = -1;
          this.options.groupCity = "";
          return
        }
        this.options.groupCity = item.sm_af_AreaName;
        this.addressIndex = index;
      },
      //筛选条件
      tourQueryCondition() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
        }
        this.$store.dispatch('initTourQueryCondition', options)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },

      //初始化数据
      initData(keyword, cityName) {
        let tourSearchInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "keycode": this.keyword ? this.keyword : '',//关键字
          "tourdays": this.options.tourdays ? this.options.tourdays : '',//行程天数
          "groupCity": this.options.groupCity ? this.options.groupCity : '',//成团地点
          "topTourSite": this.options.topTourSite ? this.options.topTourSite : '',//推荐景点
          "departCity": cityName ? cityName : this.cityObj.sm_af_AreaName,//出发城市
          "page": "1",
          "rows": this.rowsNum
        }
        this.outCity = cityName ? cityName : this.cityObj.sm_af_AreaName;
        if (this.keyword.trim()) {
          tourSearchInfo.groupCity = tourSearchInfo.departCity = "";
          this.outCity = "全国";
        }
        this.$store.commit('showLoading');
        return this.$store.dispatch('initTourSearchList', tourSearchInfo)
      },
//      跳转
      goTourDetails(item, index) {
        this.$store.commit('tourScrollTop', {
          page: item.page,
          id: item.ta_tg_ID,
        })
        this.$router.push({name: 'ProductChara', params: {id: item.ta_tg_ID}});
      },
    },

  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

  .condition {
    position: fixed;
    top: 180/@r;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    height: 80/@r;
  }

  .condition > strong {
    float: left;
    line-height: 48/@r;
    margin-top: 13/@r;
    font-family: "微软雅黑";
    font-size: 28/@r;
    margin-left: 30/@r;
    color: #666;
  }

  .condition > span {
    float: right;
    line-height: 48/@r;
    margin-top: 13/@r;
    font-family: "微软雅黑";
    font-size: 28/@r;
    margin-right: 30/@r;
    position: relative;
    border: 1px solid #dcdcdc;
    padding: 0 40/@r 0 10/@r;
    color: #666;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .condition > span:before {
    content: '';
    position: absolute;
    top: 15/@r;
    right: 15/@r;
    width: 10/@r;
    height: 10/@r;
    border-bottom: 1px solid #666;
    border-left: 1px solid #666;
    transform: rotate(-45deg);
  }

  .mescroll {
    position: fixed;
    top: 260/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    height: auto;
    /*overflow: auto;*/
  }

  .tourList > li {
    border-bottom: 1/@r solid #ccc;
    padding: 10/@r 30/@r;
  }

  .tourList > li.active {
    background-color: #f1f1f1;
  }

  .tourList > li.active .tourIntroduceBox > strong {
    color: red;
  }

  .tourList > li:last-of-type {
    border: none;
    color: #666;
    text-align: center;
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
  }

  .imgCase {
    float: left;
    position: relative;
  }

  .imgCase > img {
    width: 160/@r;
    height: 200/@r;
  }

  .imgCase > i {
    position: absolute;
    top: 9/@r;
    left: 0;
    font: 25/@r/35/@r "微软雅黑";
    background-color: #53b27c;
    color: #fff;
    padding: 0 5/@r;
  }

  .tourIntroduce {
    overflow: hidden;
    padding-left: 20/@r;
  }

  .tourIntroduceBox {
    float: left;
    width: 100%;
  }

  .tourIntroduceBox > strong {
    font-size: 30/@r;
    font-family: "微软雅黑";
    line-height: 38/@r;
    color: #333;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  }

  .tourIntroduceBox > span {
    display: block;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 40/@r;
    color: #666;
  }

  .priceBox {
    padding-top: 10/@r;
    font-size: 25/@r;
    font-family: "微软雅黑";
    line-height: 45/@r;
  }

  .priceBox > .price {
    float: left;
    color: #f80;
  }

  .priceBox > .price > em {
    font-size: 40/@r;
  }

  .priceBox > .satisfaction {
    float: left;
    margin-left: 20/@r;
    color: #666;
  }

  .priceBox > .satisfaction > em {
    color: #f80;
  }

  ul > .showData {
    font-size: 30/@r;
    font-family: "微软雅黑";
    line-height: 2;
    color: #fc7b69;
    text-align: center;
    border-bottom: none;
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
    padding: 10/@r 10/@r 0 0;
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
