<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
        <a href="javascript:;" class="searchIcon"></a>
      </div>
      <strong class="title">微电影</strong>
      <div class="rightIcon">
        <a href="javascript:;" class="centerIcon"></a>
        <a href="javascript:;" class="menuIcon"></a>
      </div>
    </header>
    <section>
      <!--导航-->
      <nav class="clearfix">
        <div class="navBox">
          <a href="javascript:;" @click="channel">频道</a>
          <a href="javascript:;" @click="series">系列</a>
          <a href="javascript:;" @click="education">教育</a>
        </div>
      </nav>
      <!--轮播图-->

      <div class="bannerPic">
        <div class="ImageList clearfix">
          <a href="javascript:;">
            <img src="../../assets/img/home/movie.png" alt="">
            <!--<img v-lazy="item.vf_vo_ImageURL" alt="">-->
          </a>
        </div>
        <div class="bannerIcon">
          <i></i>
        </div>
      </div>

      <!--最新推荐-->

      <div class="newRecommend">
        <div class="titleAndMore clearfix">
          <strong>最新推荐</strong>
          <a href="javascript:;">更多&gt;</a>
        </div>

        <ul class="recommendMovieList clearfix">
          <li v-for="item,index in mobileMovieDetailsList">
            <!--<video id="addVideo" :src="item.vf_vo_FileURL"  width="150" height="150" controls="controls"></video>-->
            <img v-lazy="item.vf_vo_ImageURL" alt="" @click="player()">
            <span class="langTime">{{item.vf_vo_Time | getTiem}}</span>
            <div class="moName clearfix">
              <strong>{{item.vf_vo_Title}}</strong>
              <span class="starFraction">
                <rater
                  v-model="data"
                  :font-size="20"
                  :margin="-3"
                  active-color="#e8751a"
                  star="★"
                  disabled
                ></rater>
              </span>
            </div>
          </li>
        </ul>
      </div>

    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Rater} from 'vux'

  export default {
    computed: mapGetters([
      'mobileMovieDetailsList'
    ]),
    components: {
      Rater
    },
    data() {
      return {
        data: 4,
        total:0,
      }
    },
    created(){
      this.initData();
    },
    methods: {
      player(){
        this.$router.push({
          name: 'MoviePlayers', query: {
            id: '',
          }
        })
      },
      //频道
      channel(){
        this.$router.push({
          name: 'MovieChannel', query: {
            id: '',
          }
        })
      },
      //系列
      series(){
        console.log(1)
        this.$router.push({
          name: 'MovieSeries', query: {
            id: '',
          }
        })
      },
      //教育
      education(){
        this.$router.push({
          name: 'MovieEducation', query: {
            id: '',
          }
        })
      },
      initData(){
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_fm_ID": "",//视频编号
          "fromDate": "2017-05-03",//日期从
          "toDate": "2017-05-05",//日期到
          "page": 1,//页码
          "rows": 20//条数
        };
        // this.$vux.loading.show({
        //   text: '拼命加载中'
        // })
        this.$store.commit('showLoading')
        this.$store.dispatch('mobileMovieDetails',options)
          .then(()=>{
            this.$nextTick(()=>{
              // this.$vux.loading.hide()
              this.$store.commit('hideLoading')
            })
          })

      },
      search() {
        this.initData(

        )
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: relative;
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
    background-color: #fff;
    position: relative;
    padding-bottom: 100/@r;
  }

  nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 68/@r;
    background-color: rgba(0, 0, 0, .3);
    z-index: 10;
  }

  .navBox {
    float: right;
    font-size: 28/@r;
    line-height: 68/@r;
    font-family: "微软雅黑";
  }

  .navBox > a {
    float: left;
    color: #fff;
    margin: 0 30/@r;
  }

  .bannerPic {
    width: 100%;
    height: 380/@r;
    overflow: hidden;
    position: relative;
  }

  .bannerPic img {
    height: 380/@r;
    width: 100%;
  }

  .ImageList {
    /*width: 100000/@r;*/
  }

  .ImageList > a {
    float: left;
    width: 100%;
  }

  .bannerIcon {
    position: absolute;
    bottom: 20/@r;
    right: 60/@r;
    z-index: 200;
  }

  .bannerIcon > i {
    float: left;
    width: 30/@r;
    height: 3/@r;
    background-color: #fff;
    margin-left: 6/@r;
  }

  .bannerIcon > i.active {
    background-color: #dd7015;
  }

  .newRecommend {
    margin-top: 35/@r;
    padding: 0 21/@r;
  }

  .titleAndMore > strong {
    font-size: 28/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #2dbb55;
    border-bottom: 3/@r solid #2dbb55;
    float: left;
    margin-left: 17/@r;
  }

  .titleAndMore > a {
    float: right;
    font-size: 23/@r;
    line-height: 43/@r;
    font-family: "微软雅黑";
    color: #929191;
    margin-right: 17/@r;
  }

  .recommendMovieList {
    margin-top: 16/@r;
  }

  .recommendMovieList > li {
    float: left;
    width: 50%;
    padding: 0 17/@r;
    position: relative;
    margin-top: 14/@r;
  }

  .recommendMovieList img {
    width: 100%;
    height: 220/@r;

  }

  .langTime {
    position: absolute;
    top: 188/@r;
    right: 23/@r;
    font-size: 18/@r;
    line-height: 22/@r;
    font-family: "微软雅黑";
    color: #fff;
    padding: 0 5/@r;
    background-color: rgba(0,0,0,.3);
  }

  .moName > strong {
    font-size: 25/@r;
    line-height: 43/@r;
    font-family: "微软雅黑";
    color: #1a1a1a;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }

  .moName > span {
    float: right;
  }
</style>
