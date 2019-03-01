<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
        <a href="javascript:;" class="searchIcon" @click="showSearchBox"></a>
      </div>
      <strong class="title">门票</strong>
      <div class="rightIcon">
        <a href="javascript:;" class="centerIcon" @click="UserCenter"></a>
        <!--<a href="javascript:;" class="menuIcon"></a>-->
      </div>
    </header>
    <section>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <!--<div id="wrapper">-->
        <!--<div class="content">-->
        <!--推荐图片-->
        <div class="exhibitionBox">
          <swiper auto height="100%">
            <swiper-item
              class="swiper-demo-img"
              v-for="item,index in ticketHomeImageList"
              :key="index"
              @click.native="goTicketInfoDetils(item)"
            >
              <img
                v-lazy="item.tm_tbi_Image"
                style="height: 100%;width: 100%;"
              ></swiper-item>
          </swiper>
        </div>
        <!--推荐列表-->
        <div class="recommendListBox">
          <div class="lookMore">
            <a href="javascript:;" @click="showAllRecommend">查看更多推荐&gt;</a>
          </div>

          <ul class="recommendList clearfix">
            <li v-for="item,index in hotTicketCity" @click="goTicketInfoDetils(item)">
              <img v-lazy="item.imgData[0]">
              <strong>{{item.tm_ts_Name}}</strong>
              <span><em>￥<b>{{item.tm_ts_SuggestPrice}}</b></em>起</span>
              <i>NO.{{index + 1}}</i>
            </li>
          </ul>


        </div>
        <!--当前位置精选-->
        <div class="localSelected">
          <strong>
            <span><em class="loLeft"></em>{{thisProvice}}精选<em class="loRight"></em></span>
          </strong>

          <ul class="selectedList">
            <li class="clearfix" v-for="item,index in selectedList" @click="goTicketInfoDetils(item)">
              <img v-lazy="item.imgData[0]">
              <div class="scenicAbout">
                <strong>{{item.tm_ts_Name}}</strong>
                <span class="clearfix">
                    <span>1.9万人点评</span>
                    <em></em>
                    <span>96%满意</span>
                  </span>
                <em>今日可订</em>
                <p>地址：{{item.tm_ts_Address}}</p>
              </div>
              <div class="aboutPrice">
                    <span class="price">
                      <span><em>￥<b>{{item.tm_ts_SuggestPrice}}</b></em>起</span>
                    </span>
                <!--<span class="distance clearfix">-->
                <!--<i></i>-->
                <!--<em>距1.3km</em>-->
                <!--</span>-->
              </div>
            </li>
            <li class="showLoading" v-show="showLoadingMover">{{showWords}}</li>
            <li class="showLoading" v-show="!selectedList.length">该城市暂无精选数据</li>
          </ul>

        </div>
        <!--</div>-->
        <!--</div>-->
      </mescroll-vue>
    </section>
    <popup v-model="showAll" position="right" width="50%">
      <div>
        <ul class="recommendAllList">
          <li v-for="item,index in hotTicketCity" @click="goTicketInfoDetils(item)">
            <img v-lazy="item.imgData[0]">
            <strong>{{item.tm_ts_Name}}</strong>
            <span><em>￥<b>{{item.tm_ts_SuggestPrice}}</b></em>起</span>
            <i>NO.{{index + 1}}</i>
          </li>
        </ul>
      </div>
    </popup>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Swiper, SwiperItem, Popup} from 'vux'
  //  import BScroll from 'better-scroll'
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    components: {
      Toast,
      Swiper,
      SwiperItem,
      Popup,
      MescrollVue
    },
    computed: mapGetters([
      'ticketHomeImageList',
      'hotTicketCity',
      'ticketSelectedList',
      'cityObj'
    ]),
    data() {
      return {
        thisProvice: '',
        thisProviceId: '',
        showErr: false,
        errCon: '',
        total: 1,
        rowsNum: 5,
        searchContent: '',
        showAll: false,
        showWords: '拼命加载中...',
        showLoadingMover: false,
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
          //以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 5 //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
          noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
          toTop: {
            //回到顶部按钮
            src: "https://raw.githubusercontent.com/mescroll/mescroll/master/vue-demo/static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
            offset: 1000 //列表滚动1000/@r才显示回到顶部按钮
          }
        },
        mescrollDown: {},
        mescroll: null, // mescroll实例对象
        selectedList: [],
        options: {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "cityOrContryID": '', //市或者区县ID
          "page": 1,//页码
          "rows": 5
        }
      }
    },
    created() {
      let addComp = JSON.parse(sessionStorage.getItem('addComp'));
      if (this.cityObj.sm_af_AreaName) {
        this.thisProvice = this.cityObj.sm_af_AreaName;
      }

      this.initData();
    },
    methods: {
      showSearchBox() {
        this.$router.push({name: 'SearchPage', query: {id: 2}})
      },
      //点击头像
      UserCenter() {
        this.$router.push({name: 'UserCenter'})
      },
      showAllRecommend() {
        this.showAll = true;
      },
      //初始化数据
      initData(id) {
        let getTourSitePage = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "tm_ts_ProviceID": id ? id : ''  //省编号
        };
        this.$store.commit('showLoading')
        this.$store.dispatch('initTicketHomeData', getTourSitePage)
          .then(() => {
            this.$nextTick(() => {
              this.$store.commit('hideLoading')
            })
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //去景点详情
      goTicketInfoDetils(item) {
        this.$router.push({
          name: 'TicketSearchDetails', query: {
            id: item.tm_ts_Code
          }
        })
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll;
      },
      //上拉加载
      upCallback(page, mescroll) {
        this.options.page = page.num;
        this.options.cityOrContryID = this.cityObj.sm_af_AreaID ? this.cityObj.sm_af_AreaID : '';
        this.$store.dispatch('initTicketSelected', this.options)
          .then(data => {
            // 如果是第一页需手动制空列表
            if (page.num === 1) this.selectedList = []
            // 把请求到的数据添加到列表
            this.selectedList = this.selectedList.concat(data)

            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(data.length)
            })
          }, err => {
            this.showErr = true;
            this.errCon = err;
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
    },
    mounted() {
      document.onkeydown = (e) => {
        var e = event || e;
        if (e.keyCode == 13) {
          if (this.searchContent == '') {
            this.showErr = true;
            this.errCon = '请输入景点搜索景点名称';
          } else {
            this.$router.push({name: 'SearchTicketList', query: {ticketName: this.searchContent}})
          }
        }
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  #wrapper {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    padding-bottom: 200/@r;
  }

  .mescroll {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    height: auto;
    /*overflow: auto;*/
  }

  .loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
  }

  .mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
  }

  .mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
  }

  .page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5/@r
  }

  .page-loadmore-desc:last-of-type,
  .page-loadmore-listitem {
    border-bottom: 1/@r solid #eee
  }

  .page-loadmore-listitem {
    height: 50/@r;
    line-height: 50/@r;
    text-align: center
  }

  .page-loadmore-listitem:first-child {
    border-top: 1/@r solid #eee
  }

  .page-loadmore-wrapper {
    overflow: scroll
  }

  .mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
  }

  .mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: fixed;
    top: 0;
    left: 0;
    padding: 24/@r 30/@r 23/@r 26/@r;
    z-index: 999;
    width: 100%;
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
    bottom: 0;
    right: 0;
    background-color: #fff;
    overflow: auto;
  }

  .searchBox {
    position: absolute;
    padding: 30/@r 17/@r;
    background-color: rgba(0, 0, 0, .35);
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .searchBoxCon {
    width: 100%;
    height: 56/@r;
    background-color: #fff;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  .currentPosition {
    float: left;
    margin-top: 13/@r;
    width: 141/@r;
    border-right: 1/@r solid #e6e6e6;
    font-size: 23/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    padding: 0 13/@r 0 26/@r;
  }

  .currentPosition > i {
    float: left;
    width: 22/@r;
    height: 26/@r;
    background: url("../../assets/img/ticket/locationB.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 2/@r;
    margin-right: 8/@r;
  }

  .currentPosition > span {
    float: left;
    color: #343434;
    width: 50/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .currentPosition > em {
    float: right;
    width: 17/@r;
    height: 9/@r;
    background: url("../../assets/img/ticket/down.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 11/@r;
  }

  .searchInput {
    float: left;
    width: 552/@r;
    height: 100%;
    padding-left: 8/@r;
  }

  .searchInput > i {
    float: left;
    width: 26/@r;
    height: 25/@r;
    background: url("../../assets/img/ticket/searchIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 16/@r;
  }

  .searchInput > input {
    float: left;
    border: none;
    font-size: 20/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    width: 500/@r;
    margin-left: 6/@r;
    color: #333;
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

  .recommendListBox {
    width: 100%;
    height: 305/@r;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  .recommendList {
    padding: 0 10/@r;
    height: 255/@r;
    overflow: hidden;
  }

  .recommendList img {
    width: 100%;
    height: 132/@r;
  }

  .recommendList > li {
    width: 33.333%;
    float: left;
    background-color: #f5f5f5;
    position: relative;
    overflow: hidden;
    padding: 0 10/@r;
    margin-top: 10/@r;
  }

  .recommendList > li:last-of-type {
  }

  .recommendList > li > strong {
    font-size: 25/@r;
    line-height: 63/@r;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
    padding: 0 5/@r;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #fff;
  }

  .recommendList > li > span,
  .price > span {
    font-size: 20/@r;
    line-height: 32/@r;
    font-family: "微软雅黑";
    display: block;
    text-align: center;
    color: #808080;
    background-color: #fff;
    padding-bottom: 4/@r;
  }

  .recommendList > li > span > em,
  .price em {
    color: #c9255d;
  }

  .recommendList > li em > b,
  .price b {
    font-size: 30/@r;
  }

  .recommendList > li > i {
    position: absolute;
    top: 10/@r;
    left: 10/@r;
    width: 53/@r;
    height: 26/@r;
    background: url("../../assets/img/ticket/bgIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    font-size: 14/@r;
    line-height: 26/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #fff;
  }

  .localSelected {
    border-top: 16/@r solid #f5f5f5;
    padding-top: 33/@r;
  }

  .localSelected > strong {
    position: relative;
    display: block;
    height: 40/@r;
  }

  .localSelected > strong > span {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
  }

  .loLeft {
    position: absolute;
    top: 17/@r;
    left: -168/@r;
    width: 156/@r;
    height: 6/@r;
    background: url("../../assets/img/ticket/loLeft.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .loRight {
    width: 156/@r;
    height: 6/@r;
    position: absolute;
    top: 17/@r;
    right: -168/@r;
    width: 156/@r;
    height: 6/@r;
    background: url("../../assets/img/ticket/loRight.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .selectedList li {
    border-bottom: 1/@r solid #d8d9de;
    padding: 24/@r;
  }

  .selectedList img {
    width: 209/@r;
    height: 138/@r;
    float: left;
    margin-right: 15/@r;
  }

  .scenicAbout {
    float: left;
    width: 300/@r;
  }

  .scenicAbout > strong {
    display: block;
    font-size: 28/@r;
    line-height: 34/@r;
    font-family: "微软雅黑";
    color: #000;
  }

  .scenicAbout > span {
    font-size: 20/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
    display: block;
    color: #5a5a5a;
  }

  .scenicAbout > span > * {
    float: left;
  }

  .scenicAbout > span > em {
    width: 2/@r;
    height: 19/@r;
    background-color: #4d4d4d;
    margin: 13/@r 10/@r 0;
  }

  .scenicAbout > em {
    border: 1/@r solid #117db5;
    font-size: 20/@r;
    line-height: 1.3;
    font-family: "微软雅黑";
    color: #117db5;
    padding: 0 5/@r;
  }

  .scenicAbout > p {
    margin-top: 10/@r;
    font-size: 21/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    color: #5a5a5a;
  }

  .aboutPrice {
    float: right;
  }

  .price {
    display: block;
    margin-top: 52/@r;
  }

  .distance > i {
    float: left;
    width: 14/@r;
    height: 17/@r;
    background: url("../../assets/img/ticket/locationS.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 10/@r;
    margin-right: 5/@r;
  }

  .distance {
    display: block;
    font-size: 20/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #5a5a5a;
    margin-top: 20/@r;
  }

  .distance > em {
    float: left;
  }

  .lodingSize {
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #999;
  }

  .paging {
    padding: 10/@r;
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
  }

  .paging > span {
    width: 20%;
    text-align: center;
    color: #303133;
  }

  .topPages {
    float: left;
  }

  .pagesNum {
    float: left;
    width: 60%;
    text-align: center;
  }

  .pagesNum a {
    display: inline-block;
    width: 10%;
    text-align: center;
  }

  .pagesNum a.active {
    color: #409eff;
  }

  .bottomPages {
    float: right;
  }

  .vux-slider {
    height: 100% !important;
  }

  .lookMore {
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    text-align: right;
    padding-right: 10/@r;
  }

  .lookMore > a {
    display: inline;
    color: #c9255d;
  }

  .recommendAllList {
    padding: 98/@r 10/@r 10/@r;
  }

  .recommendAllList > li {
    width: 100%;
    position: relative;
    background-color: #fff;
    margin-bottom: 20/@r;
  }

  .recommendAllList > li:last-of-type {
    margin-bottom: 0;
  }

  .recommendAllList img {
    width: 100%;
  }

  .recommendAllList strong {
    display: block;
    text-align: center;
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    color: #666;
  }

  .recommendAllList span {
    display: block;
    text-align: center;
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
  }

  .recommendAllList b {
    color: #c9255d;
    font-size: 35/@r;
  }

  .recommendAllList i {
    position: absolute;
    top: 10/@r;
    left: 0;
    width: 53/@r;
    height: 26/@r;
    background: url("../../assets/img/ticket/bgIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    font-size: 14/@r;
    line-height: 26/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #fff;
  }

  .selectedList .showLoading {
    text-align: center;
    color: #b5b5b5;
    border-bottom: none;
  }


</style>
