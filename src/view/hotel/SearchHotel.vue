<template>
  <div>
    <div id="wrap">
      <header class="clearfix">
        <div class="returnIcon" @click="goBack"></div>
        <div class="searchBox">
          <i></i>
          <input type="text" placeholder="关键字/位置/品牌/酒店名">
        </div>
      </header>
      <section>
        <!--酒店类型-->
        <div class="hotelIntroduce">
          <strong>酒店类型</strong>
          <ul class="hotelIntroduceList">
            <li v-for="item,index in hotelIntroduceList" v-show="item.SubArray.length">
              <strong>{{item.ht_it_Name}}</strong>
              <div class="clearfix">
                <a
                  href="javascript:;"
                  v-for="ite,i in item.SubArray"
                  :class="{active: i == hotelIntroduceIndex && item.SubArray == activeArr}"
                  @click="changeHotelIntroduce(item.SubArray,i,ite)"
                >{{ite.ht_it_Name}}</a>
              </div>
            </li>
          </ul>
        </div>
        <!--酒店主题-->
        <div class="hotelThemeType" v-show="hotelThemeTypeList.length">
          <strong>酒店主题</strong>
          <div class="hotelThemeTypeList clearfix">
            <a
              href="javascript:;"
              v-for="item,index in hotelThemeTypeList"
              :class="{active: index == hotelThemeTypeIndex}"
              @click="changeHotelThemeType(item,index)"
            >{{item.ht_tt_Name}}</a>
          </div>
        </div>
        <!--房间设施-->
        <div class="hotelRoomHard">
          <strong>房间设施</strong>
          <div class="hotelRoomHardList clearfix">
            <a
              href="javascript:;"
              v-for="item,index in hotelRoomHardList"
              @click="changeHotelRoomHard(item,index)"
              :class="{active: index == hotelRoomHardIndex}"
            >{{item.ht_rh_Name}}</a>
          </div>
        </div>

        <a href="javascript:;" @click="goHotelHome">确定</a>
      </section>
    </div>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    components: {
      Toast
    },
    computed: mapGetters([
      'hotelIntroduceList',
      'hotelThemeTypeList',
      'hotelRoomHardList'
    ]),
    data() {
      return {
        showErr: false,
        errCon: '',
        indexActive: 0,
        hotelActive: 0,
        showTypeList: [],
        hotelIntroduceIndex: -1,
        activeArr: [],
        hotelIntroduceObj: {},
        hotelThemeTypeIndex: -1,
        hotelThemeTypeObj: {},
        hotelRoomHardIndex: -1,
        hotelRoomHardObj: {},

      }
    },
    created() {
      this.initData();
    },
    methods: {
      //选择酒店类型
      changeHotelIntroduce(item, index, ite) {
        this.activeArr = item;
        this.hotelIntroduceIndex = index;
        this.hotelIntroduceObj = ite;
      },
      //选择酒店主题
      changeHotelThemeType(item, index) {
        this.hotelThemeTypeIndex = index;
        this.hotelThemeTypeObj = item;
      },
      //选择房间设施
      changeHotelRoomHard(item, index) {
        this.hotelRoomHardObj = item;
        this.hotelRoomHardIndex = index;
      },
      goBack() {
        this.$router.go(-1);
      },
      //初始化数据
      initData() {
        let HotelSearchFilterInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initHotelSearchFilter', HotelSearchFilterInfo)
          .then(() => {
            this.$store.commit('hideLoading');
            this.showTypeList = this.hotelIntroduceList.filter(item => {
              if (item.SubArray.length) {
                return true
              }
              return false
            })[0].SubArray;
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },

      //
      goHotelHome(){
        let hotelQueryObj = {
          hotelIntroduceObj: this.hotelIntroduceObj,
          hotelThemeTypeObj: this.hotelThemeTypeObj,
          hotelRoomHardObj: this.hotelRoomHardObj
        };
        this.$store.commit('hotelQueryObj',hotelQueryObj);
        this.$router.push({name: 'HotelHome'});
      },

    },
    mounted() {

    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    height: 88/@r;
    width: 100%;
    background-color: #4ece5a;
    padding: 17/@r 30/@r;
  }

  .returnIcon {
    float: left;
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/food/shouye_09.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 8/@r 34/@r 0 0;
  }

  .searchBox {
    float: left;
    width: 634/@r;
    height: 100%;
    font-size: 25/@r;
    line-height: 54/@r;
    font-family: "微软雅黑";
    position: relative;
  }

  .searchBox i {
    position: absolute;
    width: 30/@r;
    height: 37/@r;
    background: url("../../assets/img/hotel/searchHIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 7/@r 0 0 19/@r;
  }

  .searchBox input {
    display: block;
    border: none;
    width: 100%;
    height: 100%;
    padding-left: 70/@r;
    -webkit-border-radius: 5/@r;
    -moz-border-radius: 5/@r;
    border-radius: 5/@r;
  }

  section {
    position: fixed;
    top: 88/@r;
    right: 0;
    bottom: 100/@r;
    left: 0;
    background-color: #f8f7f7;
    overflow: auto;
    padding: 30/@r;
  }

  section > a {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 30/@r;
    line-height: 100/@r;
    text-align: center;
    background-color: #4ece5a;
    color: #fff;
  }

  section > div > strong {
    display: block;
    padding-left: 30/@r;
    font-size: 32/@r;
    font-weight: bold;
    line-height: 32/@r;
    font-family: "微软雅黑";
    color: #666;
    border-left: 10/@r solid #666;
    margin: 15/@r 0;
  }

  .hotelIntroduceList strong {
    font-size: 28/@r;
    line-height: 56/@r;
    font-weight: bold;
    font-family: "微软雅黑";
    color: #666;
    display: block;
  }

  section > div a {
    float: left;
    width: 25%;
    text-align: center;
    font-size: 28/@r;
    line-height: 3;
    font-family: "微软雅黑";
    box-shadow: 0 0 0 1/@r #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #fff;
  }

  section > div a.active {
    background-color: #4ece5a;
    color: #fff;
  }

  .hotelRoomHard,
  .hotelThemeType {
    margin-top: 30/@r;
  }

</style>
