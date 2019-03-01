<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>景点列表</strong>
    </header>
    <section>
      <scroller
        :on-infinite="infinite"
        ref="my_scroller"
        refresh-layer-color="#4b8bf4"
        loading-layer-color="#ec4949"
      >
        <!--当前搜索数据-->
        <ul class="selectedList">
          <li class="clearfix" v-for="item,index in ticketListPageList" @click="goTicketInfoDetils(item)">
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
              <span class="distance clearfix">
                <i></i>
                <em>距1.3km</em>
              </span>
            </div>
          </li>
        </ul>
        <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
          <g>
            <circle cx="16" cy="32" stroke-width="0" r="3">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="32" cy="32" stroke-width="0" r="3.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
            </circle>
            <circle cx="48" cy="32" stroke-width="0" r="4.09351">
              <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                       repeatCount="indefinite"></animate>
              <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
            </circle>
          </g>
        </svg>
      </scroller>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'ticketListPageList'
    ]),
    data() {
      return {
        ticketName: '',
        rowsNum: 10,
      }
    },
    created() {

      if (this.$route.query.ticketName) {
        this.ticketName = this.$route.query.ticketName;
      }
      this.initData()
        .then(() => {
          this.$store.commit('hideLoading');
        }, err => {
        })

    },
    methods: {
      initData(num) {
        this.$store.commit('showLoading');
        let getTourSiteList = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "token": "",
          "tm_ts_Name": this.ticketName ? this.ticketName : '',//景点名称中的关键字
          "tm_ts_ThemeTypeID": "",//主题编码
          "tm_ts_ProviceID": "",//省编码
          "tm_ts_CityID": "",//市编码
          "page": 1,  //页码
          "rows": num ? num : 10  //条数
        };
        this.$store.commit('showLoading')
        return this.$store.dispatch('initTicketListPage', getTourSiteList)
      },
      //下拉加载
      infinite(done) {
        this.rowsNum += 5;
        this.initData(this.rowsNum)
          .then((total) => {
            this.$store.commit('hideLoading');
            done(true)
          })
      },
      goTopPage() {
        this.$router.go(-1);
      },
      goTicketInfoDetils(item) {
        this.$router.push({
          name: 'TicketSearchDetails', query: {
            id: item.tm_ts_Code
          }
        })
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

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
    bottom: 0;
    background-color: #fff;
    overflow: auto;
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
    font-size: 20/@r;
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

  .price em {
    color: #c9255d;
  }

  .price b {
    font-size: 30/@r;
  }
</style>
