<template>
  <div>
    <div id="wrap" ref="wrap">
      <header>
        <div class="icon" @click="goTopPage">
          <i></i>
        </div>
        <div class="exhibitionBox" @click="imagePreview">
          <swiper auto v-model="imageIndex" height="100%">
            <swiper-item
              class="swiper-demo-img"
              v-for="item,index in ticketInfoObj.tm_ts_ShowImage"
              :key="index"
            >
              <img
                :src="item"
                style="height: 100%;width: 100%;"
              >
            </swiper-item>
          </swiper>
          <p>{{imageIndex + 1}}/{{imageLength}} 张</p>
          <strong>{{ticketInfoObj.tm_ts_Name}}</strong>
        </div>
      </header>
      <section>
        <div class="ticketAddress clearfix" @click="goMap(ticketInfoObj)">
          <strong><i></i>
            <div class="inputBox"><span>{{ticketInfoObj.tm_ts_Address}}</span></div>
          </strong>
        </div>
        <div class="openTime clearfix">
          <strong>
            <i></i>
            <div class="inputBox"><span v-html="'开放时间: '+ ticketInfoObj.tm_ts_Opentime"></span></div>
          </strong>
          <strong>
            <i></i>
            <div class="inputBox"><span v-html="'建议游玩时长: '+ ticketInfoObj.tm_ts_Time+ '小时'"></span></div>
          </strong>
        </div>
        <div class="aboutTicket" ref="navBox">
          <nav class="clearfix">
            <a href="javascript:;"
               :class="{active: index == navIndex}"
               v-for="item,index in navList"
               @click="changeNav(index)"
            >{{item}}</a>
          </nav>
          <!--购票-->
          <ul class="ticketType" v-show="navIndex == 0">
            <li class="noInfo" v-show="!ticketInfoObj.tm_TourSite_TicketTypeMX">暂无可售票</li>
            <li class="clearfix" v-for="item,index in ticketInfoObj.tm_TourSite_TicketTypeMX">
              <div class="ticketInfo">
                <strong class="clearfix"><span>{{item.tm_tt_Name}}</span><em
                  @click="ticketType(item)">票种说明&gt;</em></strong>
                <span class="sellTime" v-show="item.Notice.tm_tt_GetTime">{{item.Notice.tm_tt_GetTime}}取票</span>
                <span class="sellLabel clearfix">
                <em>网上支付</em>
                <em>不可退</em>
              </span>
                <p>提前{{item.tm_tt_BeforeTime}}预定门票</p>
              </div>
              <div class="price">
              <span class="ticketPrice">
                <span>￥<em>{{item.tm_tt_RealPrice}}</em></span><em>起</em>
              </span>
                <a href="javascript:;" @click="goReserve(item)">立即预定</a>
              </div>
            </li>
          </ul>
          <!--景点介绍-->
          <div class="spotsInfo" v-show="navIndex == 1">
            <div v-show="ticketInfoObj.tm_ts_Introduce">
              <strong>景点简介</strong>
              <p>{{ticketInfoObj.tm_ts_Introduce}}</p>
            </div>
            <div v-show="ticketInfoObj.tm_ts_Detailedintroduction">
              <strong>景点详情</strong>
              <p v-html="ticketInfoObj.tm_ts_Detailedintroduction"></p>
              <!--<img v-for="item,index in ticketInfoObj.tm_ts_ShowImage" v-lazy="item" alt="">-->
            </div>
            <div v-show="smallStopList.length">
              <strong>小景点详情</strong>
              <ul class="smallStop">
                <li v-for="item,index in smallStopList">
                  <strong>{{item.tm_se_Name}}</strong>
                  <p>{{item.tm_se_Intro}}</p>
                  <img v-for="ite,index in item.imgData" v-lazy="ite" alt="">
                </li>
              </ul>
            </div>
          </div>
          <!--预定须知-->
          <div class="reserveNotice" v-show="navIndex == 2">
            <div v-show="tm_BookKnow.tm_bk_OpenTime">
              <strong>景区开放时间：</strong>
              <p v-html="tm_BookKnow.tm_bk_OpenTime"></p>
            </div>
            <div v-show="tm_BookKnow.tm_bk_SpecialPolicy">
              <strong>特殊人群政策：</strong>
              <p v-html="tm_BookKnow.tm_bk_SpecialPolicy"></p>
            </div>
            <div v-show="tm_BookKnow.tm_bk_Remind">
              <strong>预订提醒：</strong>
              <p v-html="tm_BookKnow.tm_bk_Remind"></p>
            </div>
            <div v-show="tm_BookKnow.tm_bk_HappyNotice">
              <strong>温馨提示：</strong>
              <p v-html="tm_BookKnow.tm_bk_HappyNotice"></p>
            </div>
            <div v-show="tm_BookKnow.tm_bk_TicketSay">
              <strong>发票说明：</strong>
              <p v-html="tm_BookKnow.tm_bk_TicketSay"></p>
            </div>
            <div v-show="tm_BookKnow.tm_bk_ReturnRule">
              <strong>退改规则：</strong>
              <p v-html="tm_BookKnow.tm_bk_ReturnRule"></p>
            </div>
            <div v-show="tm_BookKnow.tm_bk_SpecialMessage">
              <strong>特殊信息：</strong>
              <p v-html="tm_BookKnow.tm_bk_SpecialMessage"></p>
            </div>
          </div>
          <!--交通信息-->
          <div class="spotsInfo" v-show="navIndex == 3">
            <div v-show="ticketInfoObj.tm_ts_Introduce">
              <strong>自驾路线</strong>
              <p v-show="tmTmDrive">{{tmTmDrive ? tmTmDrive : ''}}</p>
              <p v-show="!tmTmDrive">暂无路线</p>
            </div>
            <div v-show="ticketInfoObj.tm_ts_Introduce">
              <strong>公交路线</strong>
              <p v-show="tmTmBusString">{{tmTmBusString ? tmTmBusString : ''}}</p>
              <p v-show="!tmTmBusString">暂无路线</p>
            </div>

          </div>
          <!--点评-->
          <div class="recommendBox" v-show="navIndex == 4">
            <div class="statisticsRow clearfix">
              <strong>总体满意度<em>{{allCommentObj.goodrate}}%</em></strong>
              <span>共 {{allCommentObj.totalRows}} 人点评</span>
            </div>
            <ul class="allCommentFraction clearfix">
              <li v-for="item,index in allCommentObj.data">{{item.ts_ct_Name}}: {{item.score}}/5分</li>
            </ul>
            <ul class="recommendList">
              <li v-for="item,index in commentDataList">
                <div class="aboutUser clearfix">
                  <div class="userHeader">
                    <img v-lazy="item.sm_ui_HeadImage" alt="" v-show="item.sm_ui_HeadImage"/>
                  </div>
                  <div class="userInfo">
                    <strong>用户 {{item.ts_ct_userName}}</strong>
                    <span>{{item.ts_ct_CreateTime}}</span>
                  </div>
                  <div class="recommendStar">
                    <rater v-model="item.Totalscore" disabled active-color="#e8751a" :font-size="20"
                           :margin="2"></rater>
                  </div>
                </div>
                <div class="recommendContent">
                  <p>{{item.ts_ct_Content}}</p>
                  <div class="reImgList clearfix" v-show="item.imgData.length">
                    <img v-for="ite,index in item.imgData" v-lazy="ite" alt="">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <nav class="clearfix" :class="{active: navFix}">
      <a href="javascript:;"
         :class="{active: index == navIndex}"
         v-for="item,index in navList"
         @click="changeNav(index)"
      >{{item}}</a>
    </nav>

    <!--票种说明-->
    <div class="ticketExplain" v-show="showTicketExplain">
      <div class="ticketExplainBox">
        <div v-show="ticketDetails.Notice.tm_tt_ExpireDay">
          <strong>允许超过天数:</strong>
          <p>{{ticketDetails.Notice.tm_tt_ExpireDay}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_BeforeTime">
          <strong>提前预定时间:</strong>
          <p>{{ticketDetails.Notice.tm_tt_BeforeTime}}</p>
        </div>
        <div v-show="ticketDetails.tm_tt_TicketPrice">
          <strong>原价:</strong>
          <p>{{ticketDetails.tm_tt_TicketPrice}}</p>
        </div>
        <div v-show="ticketDetails.tm_tt_RealPrice">
          <strong>实际价格:</strong>
          <p>{{ticketDetails.tm_tt_RealPrice}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_typeName">
          <strong>门票类型:</strong>
          <p>{{ticketDetails.Notice.tm_tt_typeName}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_ReturnRule">
          <strong>退改规则:</strong>
          <p>{{ticketDetails.Notice.tm_tt_ReturnRule}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_UseMethod">
          <strong>使用方法:</strong>
          <p>{{ticketDetails.Notice.tm_tt_UseMethod}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_GetTime">
          <strong>取票时间:</strong>
          <p>{{ticketDetails.Notice.tm_tt_GetTime}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_GetAddress">
          <strong>取票地址:</strong>
          <p>{{ticketDetails.Notice.tm_tt_GetAddress}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_AddRemarks">
          <strong>补充说明:</strong>
          <p>{{ticketDetails.Notice.tm_tt_AddRemarks}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_PriceInclude">
          <strong>费用包含:</strong>
          <p>{{ticketDetails.Notice.tm_tt_PriceInclude}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_ImportantCause">
          <strong>重要条款:</strong>
          <p>{{ticketDetails.Notice.tm_tt_ImportantCause}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_EffectiveTime">
          <strong>预订生效时间:</strong>
          <p>{{ticketDetails.Notice.tm_tt_EffectiveTime}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_SuitableCrowd">
          <strong>适用人群:</strong>
          <p>{{ticketDetails.Notice.tm_tt_SuitableCrowd}}</p>
        </div>
        <div v-show="ticketDetails.Notice.tm_tt_SpecialNotice">
          <strong>特别提示:</strong>
          <p>{{ticketDetails.Notice.tm_tt_SpecialNotice}}</p>
        </div>
        <div v-show="ticketDetails.Other.tm_tt_BookLimit">
          <strong>预订限制:</strong>
          <p>{{ticketDetails.Other.tm_tt_BookLimit}}</p>
        </div>
        <div v-show="ticketDetails.Other.tm_tt_HappyNotice">
          <strong>温馨提示:</strong>
          <p>{{ticketDetails.Other.tm_tt_HappyNotice}}</p>
        </div>
        <div v-show="ticketDetails.Other.tm_tt_PreferentialPolicy">
          <strong>优待政策:</strong>
          <p>{{ticketDetails.Other.tm_tt_PreferentialPolicy}}</p>
        </div>
        <div v-show="ticketDetails.Other.tm_tt_ByeNotice">
          <strong>购票须知:</strong>
          <p>{{ticketDetails.Other.tm_tt_ByeNotice}}</p>
        </div>
        <!--<a href="javascript:;" @click="showTickeDetails">确定</a>-->
      </div>
      <i class="closeIcon" @click="showTicketExplain = false">x</i>
    </div>
    <ImagePreview v-model="showImage" :data="ticketInfoObj.tm_ts_ShowImage"></ImagePreview>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast, Swiper, SwiperItem, Rater} from 'vux'
  import ImagePreview from '@/components/ImagePreview'

  export default {
    components: {
      Toast,
      Swiper,
      SwiperItem,
      Rater,
      ImagePreview
    },
    computed: Object.assign({}, mapGetters([
      'ticketInfoObj',
      'smallStopList',
      'allCommentObj',
      'commentDataList',
      'tmTmBusString',
      'tmTmDrive',
      'tmTmAddress',
      'tm_BookKnow'
    ])),
    data() {
      return {
        showTicketExplain: false,
        showImage: false,
        ticketId: '',
        showErr: false,
        errCon: '',
        navList: [
          '购票',
          '景点介绍',
          '预定须知',
          '交通信息',
          '点评'
        ],
        navIndex: 0,
        navFix: false,
        userInfo: {},
        imageIndex: 0,
        imageLength: 0,
        ticketDetails: {
          Notice: {
            tm_tt_AddRemarks: "",
            tm_tt_BeforeTime: "",
            tm_tt_EffectiveTime: "",
            tm_tt_GetAddress: "",
            tm_tt_GetTime: "",
            tm_tt_ImportantCause: "",
            tm_tt_PriceInclude: "",
            tm_tt_ReturnRule: "",
            tm_tt_SpecialNotice: "",
            tm_tt_SuitableCrowd: "",
            tm_tt_UseMethod: "",
            tm_tt_typeName: ""
          },
          Other: {
            tm_tt_BookLimit: "",
            tm_tt_ByeNotice: "",
            tm_tt_HappyNotice: "",
            tm_tt_PreferentialPolicy: ""
          },
          tm_ts_Code: "",
          tm_tt_BeforeTime: "",
          tm_tt_ID: "",
          tm_tt_Name: "",
          tm_tt_RealPrice: "",
          tm_tt_TicketPrice: "",
        },
      }
    },
    created() {
      if (this.$route.query.id) {
        this.ticketId = this.$route.query.id;
      }
      this.initData();
    },
    methods: {
      imagePreview() {
        this.showImage = true;
      },
      ticketType(item) {
        this.ticketDetails = item;
        this.showTicketExplain = true;
      },
      //初始化详情页
      initData() {
        let getTourSiteContent = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",  //操作员编码
          "operateUserName": "",  //操作员名称
          "pcName": "",  //机器码
          "tm_ts_Code": this.ticketId ? this.ticketId : ''  //合作景点编码
        };
        this.$store.commit('showLoading')
        this.$store.dispatch('initTicketInfo', getTourSiteContent)
          .then(() => {
            this.imageLength = this.ticketInfoObj.tm_ts_ShowImage.length;
            this.$nextTick(() => {
              this.scrollPage()
              this.$store.commit('hideLoading')
            })
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //返回上一页
      goTopPage() {
        this.$router.go(-1)
      },
      //去预定
      goReserve(item) {
        if (!sessionStorage.getItem('userInfo')) {
          this.$router.push({name: 'UserLogin'})
          return
        }
        this.ticketDetails = item;
        sessionStorage.setItem('ticketDetails', JSON.stringify(item))
        this.$router.push({name: 'TicketFillOrder', query: {id: item.tm_tt_ID, name: item.tm_tt_Name}});
      },
      //切换导航
      changeNav(index) {
        this.navIndex = index;
        if (index == 1 && !this.smallStopList.length) {
          this.$store.commit('showLoading');
          this.initSmallStop();
        }
        if (this.navIndex == 2) {
          //交通信息
        }
        if (this.navIndex == 3) {
          //点评
          this.$store.commit('showLoading');
          this.allComment();
          this.initCommentData();
        }
      },
      //查询小景点
      initSmallStop() {
        let selectSite = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
//          "tm_se_ID": "",//景区小景点编码
          "tm_se_Code": this.ticketId ? this.ticketId : '',//景点编号
//          "tm_se_Name": "",//小景点名称
        };
        this.$store.dispatch('initSmallStop', selectSite)
          .then(() => {
            this.$store.commit('hideLoading');
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //页面滚动
      scrollPage() {
        let box = this.$refs.navBox.offsetTop;
        let wrap = this.$refs.wrap
        wrap.addEventListener('scroll', () => {
          if (wrap.scrollTop > box) {
            this.navFix = true;
          } else {
            this.navFix = false;
          }
        })
      },
      //总体评论
      allComment() {
        let selectComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "GoodID": this.ticketId,       //产品编码
          "ts_ct_SysID": "2",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
        }
        this.$store.dispatch('allComment', selectComment)
          .then(() => {
            this.$store.commit('hideLoading');
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //评论数据
      initCommentData() {
        let SelectAllComment = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "ID": "",       //产品评论编码
          "UserInfoID": "",  // 用户信息编码
          "GoodID": this.ticketId,       //产品编码
          "IsDelete": "0",     //是否有效
          "ts_ct_SysID": "2",     //系统编码  6旅行社 1车票 2门票 3美食 4酒店 5租车
          "page": 1,
          "rows": 5,
        }
        this.$store.dispatch('initCommentData', SelectAllComment)
          .then(() => {
            this.$store.commit('hideLoading');
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //地图
      goMap(obj) {
        this.$router.push({name: 'TicketMap', query: {address: obj.tm_ts_Address, title: obj.tm_ts_Name}})
      },
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    overflow: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  header {
    position: relative;
  }

  header img {
    width: 100%;
  }

  header .icon {
    position: absolute;
    top: 2/@r;
    left: 6/@r;
    z-index: 70;
    padding: 20/@r;
  }

  header .icon i {
    display: block;
    width: 44/@r;
    height: 44/@r;
    background-color: rgba(0, 0, 0, .3);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    padding-top: 1/@r;

  }

  header .icon i:before {
    content: '';
    display: block;
    width: 16/@r;
    height: 30/@r;
    background: url("../../assets/img/ticket/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 7/@r auto 0;
  }

  .exhibitionBox {
    width: 100%;
    overflow: hidden;
    height: 340/@r;
    position: relative;
  }

  .exhibitionBox > p {
    position: absolute;
    right: 15/@r;
    bottom: 20/@r;
    z-index: 100;
    color: #fff;
    font-family: "微软雅黑";
    font-size: 25/@r;
    line-height: 1.5;
  }

  .exhibitionImage {
    height: 100%;
    transition: .5s;
  }

  .exhibitionImage > img {
    float: left;
    height: 100%;
  }

  header strong {
    position: absolute;
    left: 20/@r;
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    bottom: 10/@r;
    color: #fff;
  }

  .ticketAddress {
    border-bottom: 1/@r solid #e6e6e6;
    font-size: 25/@r;
    line-height: 72/@r;
    font-family: "微软雅黑";
    padding: 0 30/@r 0 26/@r;
  }

  .openTime {
    border-bottom: 1/@r solid #e6e6e6;
    font-size: 25/@r;
    line-height: 1.3;
    font-family: "微软雅黑";
    padding: 0 30/@r 0 26/@r;
  }

  .openTime strong {
    display: block;
    overflow: hidden;
    color: #383838;
    padding-bottom: 10/@r;
  }

  .openTime strong:first-of-type {
    padding-bottom: 0;
  }

  .inputBox {
    overflow: hidden;
  }



  .ticketAddress strong {
    overflow: hidden;
    float: left;
    color: #383838;
  }

  .openTime span {
    margin-top: 20/@r;
  }

  .ticketAddress span,
  .openTime span {
    float: left;
  }

  .ticketAddress i {
    width: 21/@r;
    height: 26/@r;
    float: left;
    background: url("../../assets/img/ticket/locationB.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 21/@r 10/@r 0 0;
  }

  .ticketAddress em,
  .openTime em {
    float: right;
    width: 13/@r;
    height: 25/@r;
    background: url("../../assets/img/userCenter/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 24/@r;
  }

  .openTime {
    border-bottom: 16/@r solid #e6e6e6;
  }

  .openTime i {
    width: 21/@r;
    height: 21/@r;
    float: left;
    background: url("../../assets/img/ticket/timeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 25/@r 10/@r 0 0;
  }

  .aboutTicket {
    padding-top: 10/@r;
  }

  nav {
    width: 100%;
    font-size: 28/@r;
    line-height: 66/@r;
    font-family: "微软雅黑";
    border-bottom: 1/@r solid #e6e6e6;
    background-color: #fff;
  }

  nav a {
    float: left;
    width: 20%;
    text-align: center;
    color: #383838;
    border-bottom: 2/@r solid transparent;
    margin-bottom: -1/@r;
  }

  nav.active {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  nav a.active {
    color: #117db5;
    border-color: #117db5;
  }

  .ticketType li {
    border-bottom: 1/@r solid #e6e6e6;
    padding: 10/@r 30/@r 16/@r 26/@r;
  }

  .ticketType li:last-of-type {
    border: none;
  }

  .ticketInfo {
    float: left;
    width: 500/@r;
  }

  .ticketInfo strong,
  .sellTime {
    font-size: 25/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
    color: #383838;
    display: block;
  }

  .ticketInfo strong {
    color: #f80;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    margin-bottom: 10/@r;
  }

  .ticketInfo strong > span {
    float: left;
    width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .ticketInfo strong > em {
    float: right;
    text-align: right;
    width: 30%;
  }

  .sellLabel {
    display: block;
    margin: 10/@r 0;
  }

  .sellLabel em {
    float: left;
    font-size: 18/@r;
    line-height: 22/@r;
    font-family: "微软雅黑";
    border: 1/@r solid #117db5;
    color: #117db5;
    padding: 0 5/@r;
    margin-right: 8/@r;
  }

  .ticketInfo p {
    font-size: 23/@r;
    line-height: 31/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .price {
    float: right;
    margin-top: 20/@r;
  }

  .ticketPrice {
    display: block;
  }

  .ticketPrice {
    display: block;
    color: #262626;
  }

  .ticketPrice > span {
    color: #dd2b15;
  }

  .ticketPrice > span > em {
    font-size: 30/@r;
  }

  .price a {
    display: block;
    margin-top: 25/@r;
    font-size: 20/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    background-color: #dd7015;
    color: #fff;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
    text-align: center;
  }

  .noInfo {
    text-align: center;
    font-size: 30/@r;
    line-height: 60/@r;
    font-family: "微软雅黑";
    color: #ccc;
  }

  .vux-slider {
    height: 100% !important;
  }

  .spotsInfo,
  .reserveNotice {
    padding: 30/@r;
  }

  .spotsInfo > div,
  .reserveNotice > div {
    margin-bottom: 20/@r;
  }

  .spotsInfo > div > strong,
  .reserveNotice > div > strong {
    font-size: 25/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    font-weight: bold;
    display: block;
    color: #fff;
    padding-left: 30/@r;
    background-color: rgba(33, 116, 158, .9);
  }

  .spotsInfo > div > p,
  .reserveNotice > div > p {
    font-size: 26/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
    margin-bottom: 12/@r;
    margin-top: 10/@r;
    text-indent: 2em;
    color: #404040;
    padding: 0 10/@r;
  }

  .spotsInfo > div > img {
    width: 100%;
    margin-bottom: 12/@r;
  }

  .statisticsRow {
    border-bottom: 1/@r solid #e6e6e6;
    padding: 0 25/@r;
    font-size: 24/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .statisticsRow > strong {
    float: left;
  }

  .statisticsRow > strong > em {
    margin-left: 5/@r;
    color: #c9255d;
  }

  .statisticsRow > span {
    float: right;
  }

  .recommendList {
    padding: 20/@r 25/@r;
  }

  .recommendList > li {
    padding: 10/@r 0;
    border-bottom: 1/@r solid #ccc;
  }

  .userHeader {
    width: 60/@r;
    height: 60/@r;
    background: url("../../assets/img/home/hlyIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: 15/@r;
    margin-top: 9/@r;
  }

  .userHeader > img {
    width: 60/@r;
    height: 60/@r;
  }

  .userInfo {
    float: left;
  }

  .userInfo > strong {
    display: block;
    font-size: 24/@r;
    line-height: 42/@r;
    font-family: "微软雅黑";
    color: #020202;
  }

  .userInfo > span {
    display: block;
    font-size: 20/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    color: #e8751a;
  }

  .recommendStar {
    float: right;
    margin-top: 10/@r;
  }

  .recommendContent {
    margin-top: 11/@r;
    font-size: 24/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #020202;
  }

  .recommendContent > p {
    margin-bottom: 20/@r;
    text-indent: 2em;
  }

  .reImgList > img {
    width: 32%;
    height: 220/@r;
    float: left;
    margin-right: 2%;
    margin-bottom: 10/@r;
  }

  .reImgList > img:nth-of-type(3n) {
    margin-right: 0;
  }

  .smallStop > li {
    padding: 10/@r 0;
  }

  .smallStop strong {
    font-size: 25/@r;
    line-height: 50/@r;
    font-weight: bold;
    font-family: "微软雅黑";
    display: block;
    color: #383838;
  }

  .smallStop p {
    font-size: 26/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
    text-indent: 2em;
    margin-bottom: 20/@r;
    color: #404040;
  }

  .smallStop img {
    width: 100%;
    margin-bottom: 20/@r;
  }

  .allCommentFraction {
    padding: 0/@r 30/@r;
    background-color: #e6e6e6;
    color: #fff;
    font-size: 25/@r;
    line-height: 34/@r;
    font-family: "微软雅黑";
  }

  .allCommentFraction > li {
    float: left;
    width: 50%;
    text-align: center;
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
    z-index: 200;
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
    width: 100%;
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

  .closeIcon {
    position: fixed;
    top: 30/@r;
    right: 30/@r;
    font-size: 50/@r;
    font-family: "微软雅黑";
    color: #ff8800;
  }

</style>
