<template>
  <div>
    <!--头部-->
    <header>
      <!--搜索-->
      <div class="searchContainer">
        <div class="backBox">
          <div @click="back" class="back"></div>
        </div>
        <div class="searchBox" @click="searchBoxFocus">
          <!--搜索图-->
          <div class="searchImgBox">
            <i></i>
          </div>
          <!--搜索类型-->
          <div class="searchName">{{titleName}}:</div>
          <!--搜索内容-->
          <div class="searchContent">
            <input class="searchInput" type="text" ref="searchBox" v-model="searchName">
          </div>
        </div>
        <div class="other" @click="showOperation = true"><i></i></div>
      </div>
      <!--菜单分类-->
      <ul class="navList clearfix">
        <li v-for="item,index in menuList">
          <span
            @click="clickNav(index,item)"
            class="clickSpan"
            :class="{active:botClass==index}"
          >{{item}}</span>
        </li>
      </ul>
    </header>
    <!--三个点-->
    <div class="operationWrap" @click="showOperation = false" v-show="showOperation">
      <ul @click.stop="showOperation = true">
        <li class="goHome clearfix" @click="goHomePage"><i></i><span>返回首页</span></li>
        <li class="goUserCenter clearfix" @click="goUserCenter"><i></i><span>个人中心</span></li>
      </ul>
    </div>
    <!--跟团游-->
    <TourSearchDetails v-show="botClass === 0" :keyword="searchName" :keyNum="botClass"
                       @getMescroll="getMescroll"></TourSearchDetails>
    <!--酒店-->
    <HotelSearchDetails v-show="botClass === 1" :keyword="searchName" :keyNum="botClass"
                        @getHotelMescroll="getHotelMescroll"></HotelSearchDetails>
    <!--门票-->
    <TicketSearchList v-show="botClass === 2" :keyword="searchName" :keyNum="botClass"
                      @getTicketMescroll="getTicketMescroll"></TicketSearchList>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'
  import TourSearchDetails from './tour/TourSearchDetails'
  import HotelSearchDetails from './hotel/HotelSearchDetails'
  import TicketSearchList from './ticket/TicketSearchList'

  export default {
    name: 'SearchPage',
    components: {
      Toast,
      TourSearchDetails,
      HotelSearchDetails,
      TicketSearchList
    },
    computed: mapGetters([
      'hotelList'
    ]),
    data() {
      return {
        showErr: false,
        errCon: '',
        titleName: '',
        botClass: 0,
        searchName: '',
        mescroll: null,
        Hotelmescroll: null,
        Ticketmescroll: null,
        showOperation: false,
        menuList: [
          '跟团游',
          '酒店',
          '门票',
        ]
      }
    },
    created() {
      if (this.$route.query.id) {
        this.botClass = Number(this.$route.query.id);
      }
      this.titleName = this.menuList[this.botClass];

    },
    activated(){
    },
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = true
      if (this.mescroll) {
        this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        next()
      }
      if (this.Hotelmescroll) {
        this.Hotelmescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        next()
      }
      if (this.Ticketmescroll) {
        this.Ticketmescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        next()
      }
    },
    methods: {
      searchBoxFocus(){
        this.$refs.searchBox.focus();
      },
      goHomePage() {
        this.$router.push({name: 'Home'})
      },
      goUserCenter() {
        this.$router.push({name: 'UserCenter'})
      },
      //滑屏
      getMescroll(mescroll) {
        this.mescroll = mescroll
      },
      getHotelMescroll(mescroll) {
        this.Hotelmescroll = mescroll
      },
      getTicketMescroll(mescroll) {
        this.Ticketmescroll = mescroll
      },
//      返回
      back() {
        this.$router.push({name: 'Home'});
      },
//      点击导航菜单
      clickNav(index, item) {
        this.searchName = '';
        this.botClass = index;
        this.titleName = item;
        this.$router.push({name: 'SearchPage', query: {id: index}});
      },
    },
  }
</script>

<style scoped type="text/less" lang="less">
  @r: 30rem;

  section {
    position: fixed;
    z-index: 999;
    top: 230/@r;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
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
    height: 68/@r;
    float: left;
  }

  .back {
    display: block;
    float: left;
    border-left: 1/@r solid white;
    border-bottom: 1/@r solid white;
    width: 30/@r;
    height: 30/@r;
    transform: rotate(45deg);
    margin: 20/@r 0 0 25/@r;
  }

  .searchBox {
    height: 68/@r;
    background-color: #eeeeee;
    width: 75%;
    float: left;
    border-radius: 50/@r;
  }

  .other {
    padding: 30/@r 10/@r;
    float: right;
    margin-right: 20/@r;
  }

  .other i {
    display: block;
    height: 15/@r;
    width: 60/@r;
    background: url("../assets/img/hotel/point.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .navList {
    width: 100%;
    float: left;
    background-color: white;
    border-bottom: 1/@r solid #dcdcdc;
  }

  .selectName > .active {

  }

  .searchImgBox {
    height: 68/@r;
    width: 10%;
    float: left;
  }

  .searchImgBox > i {
    width: 40/@r;
    height: 40/@r;
    background: url("../assets/img/hotel/searchFood.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 15/@r 0 0 10/@r;
    display: block;
  }

  .searchName {
    height: 68/@r;
    width: 100/@r;
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
    width: 96%;
    border: none;
    float: left;
    background-color: #eeeeee;
    font-size: 30/@r;
    line-height: 34/@r;
    padding: 14/@r 10/@r;
    font-family: "微软雅黑";
  }

  .navList > li {
    float: left;
    width: 33.333%;
    text-align: center;
    font-size: 30/@r;
    line-height: 80/@r;
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

  .clickSpan.active {
    display: inline-block;
    height: 80/@r;
    color: rgb(51, 189, 97);
    box-sizing: content-box;
    border-bottom: 4/@r solid rgb(51, 189, 97);
  }

  .operationWrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 6000;
  }

  .operationWrap ul {
    float: right;
    margin-top: 88/@r;
    margin-right: 30/@r;
    padding: 10/@r 30/@r;
    background-color: #fff;
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
  }

  .operationWrap li {
    width: 180/@r;
    border-bottom: 1px solid #f1f1f1;
    padding: 10/@r 0;
  }

  .operationWrap li:last-of-type {
    border: none;
  }

  .operationWrap span {
    float: right;
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
  }

  .goHome i {
    float: left;
    height: 40/@r;
    width: 40/@r;
    background: url("../assets/img/userCenter/gohomeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 8/@r;
  }

  .goUserCenter i {
    float: left;
    height: 40/@r;
    width: 40/@r;
    background: url("../assets/img/userCenter/peopleIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 8/@r;
  }


</style>
