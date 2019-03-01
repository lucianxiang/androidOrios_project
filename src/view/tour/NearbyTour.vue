<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
        <a href="javascript:;" class="searchIcon" @click="showSearchBox"></a>
      </div>
      <strong class="title">{{title}}</strong>
      <div class="rightIcon">
        <router-link to="UserCenter" class="centerIcon"></router-link>
        <!--<a href="javascript:;" class="menuIcon"></a>-->
      </div>
    </header>
    <section>
      <scroller
        :on-infinite="infinite"
        ref="my_scroller"
        refresh-layer-color="#4b8bf4"
        loading-layer-color="#ec4949"
      >
        <!--热门目的地-->
        <div class="hotPlace">
          <strong class="clearfix">
            <em></em>
            <span>热门目的地</span>
          </strong>
          <div class="hotPlaceList clearfix">
            <a href="javascript:;" :class="{active:index==meat}" v-for="item,index in place"
               @click="goPlace(index,item)">{{item.ts_ss_Key}}</a>
          </div>
        </div>
        <!--热门推荐-->
        <div class="hotRecomment">
          <strong class="clearfix">
            <em></em>
            <span>热门推荐</span>
          </strong>
          <ul class="hotRecommendList">
            <li v-for="item,index in lists" @click="toProductChara(item)">
              <div class="imgBox">
                <img :src="item.ta_tg_ShowImage">
                <div class="aboutBox clearfix">
                  <strong><span>{{item.ts_tg_LongOutName}}</span><em>|</em><span>{{item.ts_tg_GroupSite}}成团</span></strong>
                  <span><em>{{item.comment}}人评论</em><em>{{item.Percentage}}%满意</em></span>
                </div>
              </div>
              <div class="introduceBox">
                <strong class="clearfix">
                  <span class="title">{{item.ta_tg_Title}}</span>
                  <span class="price">
                  <span>￥</span><em>{{item.ts_tg_lowestPrice ? item.ts_tg_lowestPrice : 0}}</em><i>起</i>
                </span>
                </strong>
                <p>{{item.ta_tg_Describe}}</p>
              </div>
            </li>
          </ul>
        </div>
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
      'tradeGoodInfoList',
      'tradeLists'
    ]),
    data() {
      return {
        title: '跟团游',
        thisProvice: '',
        meat: 0,
        searchContent: '',
        thisProviceId: '',
        total: 1,
        rowsNum: 0,
        lists: [],
        place: [],
        addComp: {},
        id: '',
        themePlayList: [
          {
            backgroundImg: require('@/assets/img/nearby/rizZoawdIcon.png'),
            name: '乐园'
          },
          {
            backgroundImg: require('@/assets/img/nearby/oldTownIcon.png'),
            name: '古镇'
          },
          {
            backgroundImg: require('@/assets/img/nearby/landscapeIcon.png'),
            name: '山水'
          },
          {
            backgroundImg: require('@/assets/img/nearby/cityIcon.png'),
            name: '城市'
          },
        ]
      }
    },
    created() {
      sessionStorage.setItem('tourQueery', JSON.stringify(this.$route.query))
      this.addComp = JSON.parse(sessionStorage.getItem('addComp'))
      this.id = this.$route.query.id;
      this.initData(this.$route.query.id).then(() => {
        this.initHotInfo(this.$route.query.flagId)
      })

    },
    methods: {
      //去热门地点
      goPlace(index, item) {
        this.meat = index,
          this.lists = item.goodList
        this.lists = item.goodList
        this.lists = item.goodList
      },
      // 显示搜索框
      showSearchBox() {
        this.$router.push({name: 'SearchPage', query: {id: 0}});
      },
      goThemeOfPlay() {
        this.$router.push({name: 'ThemeOfPlay'})
      },
      //到详情页
      toProductChara(obj) {
        this.$router.push({name: 'ProductChara', params: {id: obj.ta_tg_ID}})
      },
      //首页内容,推荐热门地点
      initHotInfo(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "provice": "四川省",
          "flag": id,//(0加载上半部分 1加载国内游周边游 2加载境外短线和境外长线)
          'typeId': this.$route.query.title
        }
        this.$store.dispatch('initTradeLists', options)
          .then(() => {
            this.$nextTick(() => {
              if (this.title == '国内游') {
                this.lists = this.tradeLists[0].goodList,
                  this.place = this.tradeLists
              } else if (this.title == '周边游') {
                this.lists = this.tradeLists[0].goodList,
                  this.place = this.tradeLists
              } else if (this.title == '境外短线') {
                this.lists = this.tradeLists[0].goodList,
                  this.place = this.tradeLists
              } else if (this.title == '境外长线') {
                this.lists = this.tradeLists[0].goodList,
                  this.place = this.tradeLists
              }
              this.$store.commit('hideLoading')
            })
          }, err => {
          })
      },
      async initData(id, page) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ta_tg_ID": "",//产品编号
          "ta_tg_TradeID": "",//供应商编码
          "ta_tg_Title": "",//产品标题 (模糊查询)
          "ts_tg_Provice": this.$route.query.provice ? this.$route.query.provice : '',//省份(中文)（如果是周边游省份不能为空）
          "isLongOut": id ? id : 0,//跟团类型 0国内跟团  1周边跟团 2出境长线 3出境短线
          "page": page ? page : 1,
          "rows": 6,
        }
        this.$store.commit('showLoading')
        await this.$store.dispatch('initTradeGoodInfo', options)
      },
      search() {
        this.initData()
      },
      // 精选
      initSelected(id, num) {
        let selectChoiceList = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "tm_ts_ProviceID": id ? id : '', //省编号
          "page": 1,//页码
          "rows": num ? num : 5//条数
        }
        return this.$store.dispatch('initTicketSelected', selectChoiceList)
      },
      // 下拉加载
      infinite(done) {
        this.rowsNum += 5;
        this.initSelected(this.thisProviceId, this.rowsNum)
          .then((total) => {
            done(true)
          })
      },
    },
    mounted() {
      this.title = this.$route.query.title
      document.onkeydown = (e) => {
        var e = event || e;
        if (e.keyCode == 13) {
          if (this.searchContent == '') {
            this.showErr = true;
            this.errCon = '请输入跟团区域名称';

          } else {
            // this.$router.push({name: 'SearchTicketList', query: {ticketName: this.searchContent}})
          }
        }
      }
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: relative;
    padding: 24/@r 30/@r 23/@r 26/@r;
    /*position: fixed;*/
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }

  .searchBox {
    position: absolute;
    margin-top: 87/@r;
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
    /*padding-top: 16/@r;*/
    /*background-color: #e6e6e6;*/
    /*padding-bottom: 20/@r;*/
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    overflow: auto;
  }

  .hotPlace {
    background-color: #fff;
    /*margin-top: 20/@r;*/
  }

  .hotPlace > strong {
    display: block;
    border-bottom: 1/@r solid #dadedd;
    font-size: 27/@r;
    line-height: 73/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .hotPlace > strong em {
    float: left;
    width: 4/@r;
    height: 25/@r;
    background-color: #c9255d;
    margin: 24/@r 10/@r 0;
  }

  .hotPlace > strong span {
    float: left;
  }

  .hotPlaceList {
    font-size: 23/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
  }

  .hotPlaceList > a {
    float: left;
    width: 25%;
    height: 50/@r;
    border: 1/@r solid #e5e5e5;
    text-align: center;
    /*box-shadow: 0 0 0 1/@r #e5e5e5;*/
  }

  .hotPlaceList > a.active {
    color: white;
    background-color: #2dbb55;
  }

  .themePlay {
    margin-top: 17/@r;
    background-color: #fff;
  }

  .themePlay > strong {
    display: block;
    border-bottom: 1/@r solid #dadedd;
    font-size: 27/@r;
    line-height: 73/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .themePlay > strong em {
    float: left;
    width: 4/@r;
    height: 25/@r;
    background-color: #117db5;
    margin: 24/@r 10/@r 0;
  }

  .themePlay > strong span {
    float: left;
  }

  .themeList {
    padding: 23/@r 25/@r 0;
  }

  .themeList > a {
    float: left;
    width: 25%;
    font-size: 24/@r;
    line-height: 73/@r;
    font-family: "微软雅黑";
    text-align: center;
  }

  .themeList em {
    display: block;
    width: 86/@r;
    height: 86/@r;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 0 auto;
  }

  .hotRecomment {
    margin-top: 16/@r;
    background-color: #fff;
  }

  .hotRecomment > strong {
    display: block;
    border-bottom: 1/@r solid #dadedd;
    font-size: 27/@r;
    line-height: 73/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .hotRecomment > strong em {
    float: left;
    width: 4/@r;
    height: 25/@r;
    background-color: #2dbb55;
    margin: 24/@r 10/@r 0;
  }

  .hotRecomment > strong span {
    float: left;
  }

  .hotRecommendList {
    padding-top: 18/@r;
    background-color: #fff;
  }

  .hotRecommendList li {
    margin-top: 6/@r;
  }

  .imgBox {
    width: 100%;
    height: 280/@r;
    position: relative;
    overflow: hidden;
    font-size: 18/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
  }

  .imgBox img {
    height: 280/@r;
    width: 100%;
  }

  .aboutBox {
    position: absolute;
    bottom: 0;
    left: 0;
    color: #fff;
    width: 100%;
    height: 50/@r;
    background-color: rgba(0, 0, 0, .5);
    padding-left: 25/@r;
    padding-right: 30/@r;
  }

  .aboutBox > strong {
    float: left;
  }

  .aboutBox > span {
    float: right;
  }

  .aboutBox em {
    margin: 0 5/@r;
  }

  .introduceBox {
    padding: 8/@r 30/@r 16/@r 25/@r;
    background-color: #faf0f2;
  }

  .introduceBox .title {
    float: left;
    font-size: 28/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    color: #373535;
    width: 500/@r;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .introduceBox .price {
    float: right;
    color: #c9255d;
    font-size: 18/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
  }

  .price span {
    float: left;
  }

  .price em {
    float: left;
    font-size: 28/@r;
  }

  .price i {
    float: left;
    color: #808080;
  }

  .introduceBox > p {
    font-size: 19/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #333333;
    width: 600/@r;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
