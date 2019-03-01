<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <div class="orderScreen" @click.stop="showSearchBox">
        <strong>{{orderTypeName ? orderTypeName : '我的订单'}}</strong>
        <i :class="{active: !showSearchType}"></i>
      </div>
      <div class="orderTypeList clearfix" v-show="showSearchType" @click.stop="clickWhite">
        <a href="javascript:;"
           v-for="item,index in orderTypeList"
           @click.stop="changeType(item)"
           :key="index"
        >{{item.label}}</a>
      </div>
    </header>
    <section>
      <nav class="clearfix">
        <a href="javascript:;"
           :class="{active: index == navIndex}"
           v-for="item,index in orderNav"
           @click="changeNav(index)"
           :key="index"
        >{{item}}</a>
      </nav>
      <p>左滑删除对应订单</p>
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <ul class="orderList">
          <li v-for="item,index in myOrderList" :key="index" @click="lookOrderDetails(item)">
            <swipeout class="vux-1/@r-tb">
              <swipeout-item transition-mode="follow">
                <div slot="right-menu">
                  <swipeout-button type="warn" @click.native.stop="delectOrder(item.oi_OrderID)">删除</swipeout-button>
                </div>
                <div slot="content" class="orderWrap clearfix">
                  <div class="orderDetails">
                    <strong>{{(item.oi_MerchantName ? item.oi_MerchantName + '-' : '') + item.oi_OrderName}}</strong>
                    <span>{{item.oi_Number}} 张</span>
                    <span>时间：{{item.oi_CreateTime}}</span>
                    <span>总价：￥{{item.oi_SellMoney}}.00</span>
                  </div>
                  <div class="orderState">
                    <strong>{{item.oi_OrderStatus | getTicketStatus}} / {{item.oi_OutStatus | getOutStatus}}</strong>
                    <a href="JavaScript:;" v-show="item.oi_OrderStatus === 0" @click.stop="goPayOrder(item)">去支付</a>
                    <a href="javascript:;" v-show="item.oi_useState == 2 && item.oi_OrderStatus == 1">去评论</a>
                  </div>
                </div>
              </swipeout-item>
            </swipeout>
          </li>
        </ul>
      </mescroll-vue>
    </section>

    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
    <toast v-model="showSuc" type="success" :text="sucCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Swipeout, SwipeoutItem, SwipeoutButton, Toast} from 'vux'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import mixin from '@/assets/js/mixins'

  export default {
    computed: mapGetters([]),
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Toast,
      MescrollVue
    },
    mixins: [mixin],
    data() {
      return {
        userInfo: {},
        orderTypeList: [
          {
            label: '全部订单',
            value: ''
          },
          {
            label: '旅行社订单',
            value: '0'
          },
          {
            label: '车票订单',
            value: '1'
          },
          {
            label: '门票订单',
            value: '2'
          },
          {
            label: '美食订单',
            value: '3'
          },
          {
            label: '酒店订单',
            value: '4'
          },
          {
            label: '租车订单',
            value: '5'
          },
        ],
        orderNav: [
          '待付款',
          '待使用',
          '待点评',
          '全部订单'
        ],
        showSearchType: false,
        navIndex: 0,
        orderTypeName: '',
        showErr: false,
        errCon: '',
        showSuc: false,
        sucCon: '',
        orderTypeId: '',
        payState: '',
        useState: '',
        outStatus: '',
        commentState: '',
        rowNum: 10,
        page: 1,
        isOff: true,
        typeId: 0,
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
        myOrderList: [],
      }
    },
    created() {
      document.title = "我的订单";
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.navIndex = this.$route.query.id;
      if (this.$route.query.typeId || Number(this.$route.query.typeId) === 0) {
        this.orderTypeId = Number(this.$route.query.typeId);
        this.orderTypeName = this.orderTypeList.filter(item => {
          if (Number(item.value) === Number(this.$route.query.typeId)) {
            return true;
          }
          return false;
        })[0].label
      }
      this.navIndex = Number(this.$route.query.id);
      this.changeNav(this.navIndex);
    },
    beforeRouteLeave(to, from, next) {
      if (this.mescroll) {
        this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        next()
      }
    },
    methods: {
//      点击空白
      clickWhite() {
      },
//      返回上一页
      goTopPage() {
        this.$router.push({name: 'UserCenter'});
      },
//      显示分类
      showSearchBox() {
        this.showSearchType = !this.showSearchType;
      },
//      选中分类
      changeType(item) {
        this.orderTypeName = item.label;
        this.orderTypeId = item.value;
        this.changeNav(this.navIndex);
        this.showSearchType = false;
      },
//      选择订单类型
      changeNav(index) {
        this.navIndex = index;
        this.$store.commit('showLoading')
        if (index === 0) {
          this.payState = 0;
          this.useState = '';
          this.outStatus = '';
          this.commentState = '';
        }
        if (index === 1) {
          this.payState = 1;
          this.useState = 1;
          this.outStatus = 1;
          this.commentState = '';
        }
        if (index === 2) {
          this.payState = 1;
          this.useState = 2;
          this.outStatus = 1;
          this.commentState = 1;
        }
        if (index == 3) {
          this.payState = '';
          this.useState = '';
          this.outStatus = '';
          this.commentState = '';
        }
        if (this.mescroll) {
          this.mescroll.resetUpScroll();
        }
      },
//      去支付订单
      goPayOrder(item) {
        sessionStorage.setItem('orderInfo', JSON.stringify(item));
        this.$router.push({name: 'PayOrder'})
      },
      initPageData(id, payState, useState, outStatus, commentState, rowsNum, page) {
        let getUserOrderDetail = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": this.userInfo.sm_ui_ID,
          "operateUserName": "",
          "pcName": "",
          "orderType": id ? id : '',
          "token": this.userInfo.token,
          "huiuserid": this.userInfo.sm_ui_ID,
          "orderStatus": payState ? payState : '',
          "isDelete": "0",
          "oi_OutStatus": outStatus ? outStatus : '',//出单状态(0出单中1出单成功2出单失败)
          "oi_useState": useState ? useState : '',//1  未使用  2  已使用
          "oi_commentState": commentState ? commentState : '',//1  未评论  2  已评论
          "page": page ? page : 1,
          "rows": rowsNum ? rowsNum : '10'
        }
        if (payState === 0) {
          getUserOrderDetail.orderStatus = 0;
        }

        return this.$store.dispatch('initPageMyOrder', getUserOrderDetail)
      },

      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.$emit('getHotelMescroll', mescroll)
        this.mescroll = mescroll
      },
      //上拉加载
      upCallback(page, mescroll) {
        this.page = page.num;
        this.rows = page.size;
        this.initPageData(this.orderTypeId, this.payState, this.useState, this.outStatus, this.commentState, this.rowNum, this.page)
          .then(data => {
            if (page.num === 1) this.myOrderList = [];
            this.myOrderList = this.myOrderList.concat(data);
            this.$store.commit('hideLoading');
            this.$nextTick(() => {
              mescroll.endSuccess(data.length);
            })
          }, err => {
            this.showErr = true;
            this.errCon = err;
            this.$store.commit('hideLoading');
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      //删除订单
      delectOrder(id) {
        let deleteOrder = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "orderID": id ? id : ''
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('delectUserOrder', deleteOrder)
          .then(suc => {
            this.showSuc = true;
            this.sucCon = suc;
            this.changeNav(this.navIndex);
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      //查看订单详情
      lookOrderDetails(item) {
        switch (item.oi_OrderTypeID) {
          case 1:
            break;
          case 2:
            sessionStorage.setItem('orderInfo', JSON.stringify(item));
            this.$router.push({name: 'MyTicketOrderDetails', query: {id: item.oi_OrderID, name: item.oi_OrderName}});
            break;
          case 3:
            sessionStorage.setItem('orderInfo', JSON.stringify(item))
            this.$router.push({name: 'MyFoodOrderDetails', query: {id: item.oi_OrderID, name: item.oi_OrderName}});
            break;
          case 4:
            sessionStorage.setItem('orderInfo', JSON.stringify(item))
            this.$router.push({name: 'MyHotelOrderInfo', query: {id: item.oi_OrderID, name: item.oi_OrderName}});
            break;
          case 5:
            sessionStorage.setItem('orderInfo', JSON.stringify(item))
            this.$router.push({name: 'MyCarOrderDetails', query: {id: item.oi_OrderID, name: item.oi_OrderName}});
            break;
          default:
            console.log(1)
        }
      },
    },
    mounted() {
      document.addEventListener('click', () => {
        this.showSearchType = false;
      })
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
    z-index: 99;
  }

  .leftIcon {
    float: left;
    width: 19/@r;
    height: 35/@r;
    background: url('../../assets/img/ticket/leftIcon.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
  }

  .orderScreen {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #fff;
    transform: translate(-50%, -50%);
  }

  .orderScreen > i {
    position: absolute;
    right: -30/@r;
    top: 10/@r;
    width: 17/@r;
    height: 10/@r;
    background-color: #fff;
    clip-path: polygon(50% 0, 100% 100%, 0% 100%);
  }

  .orderScreen > i.active {
    clip-path: polygon(0 0, 100% 0, 50% 100%);
  }

  .orderTypeList {
    position: absolute;
    top: 88/@r;
    left: 0;
    width: 100%;
    background-color: #fff;
    font-size: 28/@r;
    line-height: 58/@r;
    font-family: "微软雅黑";
    padding: 20/@r 30/@r 40/@r;
  }

  .orderTypeList > a {
    float: left;
    width: 30%;
    margin-right: 5%;
    border: 1/@r solid #cdcdcd;
    text-align: center;
    -webkit-border-radius: 29/@r;
    -moz-border-radius: 29/@r;
    border-radius: 29/@r;
    margin-top: 20/@r;
    color: #8a8989;
  }

  .orderTypeList > a.active {
    border-color: #ff9b53;
    color: #ff9b53;
  }

  .orderTypeList > a:nth-of-type(3n) {
    margin-right: 0;
  }

  section {
    position: fixed;
    top: 88/@r;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    overflow: auto;
    overflow-x: hidden;
  }

  nav {
    border-top: 1/@r solid #c7c5c5;
    border-bottom: 1/@r solid #c7c5c5;
    font-size: 28/@r;
    line-height: 80/@r;
    font-family: "微软雅黑";
    position: fixed;
    top: 88/@r;
    left: 0;
    width: 100%;
    z-index: 998;
    background-color: #fff;
  }

  nav > a {
    float: left;
    width: 25%;
    text-align: center;
    color: #302f2f;
    border-bottom: 3/@r solid transparent;
    margin-bottom: -2/@r;
  }

  nav > a.active {
    border-color: #ff9340;
    color: #ff9340;
  }

  section > p {
    position: fixed;
    top: 170/@r;
    left: 0;
    width: 100%;
    z-index: 998;
    padding: 0 30/@r;
    border-bottom: 1px solid #c7c5c5;
    font-size: 25/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #ff9340;
    letter-spacing: 1px;
    background-color: #fff;
  }

  .orderList {
    width: 100%;
  }

  .orderList > li {
    margin-bottom: 20/@r;
    box-shadow: 0 0 5/@r #ccc;
  }

  .orderList > li:last-of-type {
    margin-bottom: 0;
  }

  .orderWrap {
    padding: 20/@r 30/@r 30/@r 17/@r;
  }

  .orderWrap > img {
    width: 100/@r;
    margin-right: 25/@r;
    margin-top: 12/@r;
    float: left;
  }

  .orderDetails {
    float: left;
    width: 70%;
  }

  .orderDetails > strong {
    display: block;
    font-size: 28/@r;
    line-height: 38/@r;
    font-family: "微软雅黑";
    color: #353434;
  }

  .orderDetails > span {
    display: block;
    font-size: 24/@r;
    line-height: 30/@r;
    font-family: "微软雅黑";
    color: #6c6c6c;
  }

  .orderState {
    float: right;
    margin-top: 9/@r;
    text-align: right;
  }

  .orderState > strong {
    display: block;
    font-size: 24/@r;
    line-height: 42/@r;
    font-family: "微软雅黑";
    color: #17a57f;
  }

  .orderState > a {
    margin-top: 45/@r;
    font-size: 24/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    width: 130/@r;
    text-align: center;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    color: #fff;
    background-color: #ff9340;
    display: inline-block;
  }

  .vux-swipeout-button {
    font-size: 30/@r;
  }

  .mescroll {
    position: fixed;
    top: 225/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    height: auto;
  }
</style>
