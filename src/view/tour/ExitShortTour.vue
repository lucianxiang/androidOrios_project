<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon">
        <router-link to="Home" class="homeIcon"></router-link>
        <a href="javascript:;" class="searchIcon"></a>
      </div>
      <strong class="title">境外短线</strong>
      <div class="rightIcon">
        <a href="javascript:;" class="centerIcon"></a>
        <a href="javascript:;" class="menuIcon"></a>
      </div>
    </header>
    <section>
      <!--热门目的地-->
      <div class="hotPlace">
        <strong class="clearfix">
          <em></em>
          <span>热门目的地</span>
        </strong>
        <div class="hotPlaceList clearfix">
          <a href="javascript:;" v-for="item,index in hotPlaceList">{{item}}</a>
        </div>
      </div>

      <!--热门推荐-->
      <div class="hotRecomment">
        <strong class="clearfix">
          <em></em>
          <span>热门推荐</span>
        </strong>
        <ul class="hotRecommendList">
          <li v-for="item,index in 5">
            <div class="imgBox">
              <img src="../../assets/img/nearby/img.png">
              <div class="aboutBox clearfix">
                <strong><span>跟团游</span><em>|</em><span>成都出发</span></strong>
                <span><em>1.9万人出游</em><em>97%满意</em></span>
              </div>
            </div>
            <div class="introduceBox">
              <strong class="clearfix">
                <span class="title">海南三亚分界洲岛双飞5日游</span>
                <span class="price">
                  <span>￥</span><em>8090</em><i>起</i>
                </span>
              </strong>
              <p>乐玩海滨、海滨奇妙之旅 随心启程 3处海湾: 2座海岛: 2种风情2种风情2种风情2种风情</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {
        hotPlaceList: [
          '黄山',
          '千岛湖',
          '杭州',
          '四明山',
          '普陀山',
          '常州',
          '西塘',
          '宁波',
          '安吉',
          '大明山',
          '苏州',
          '南京',
        ]
      }
    },
    methods: {
      initData() {
      },
      search() {
        this.initData()
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
    padding-top: 16/@r;
    background-color: #e6e6e6;
    padding-bottom: 20/@r;
  }

  .hotPlace {
    background-color: #fff;
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
    text-align: center;
    box-shadow: 0 0 0 1/@r #e5e5e5;
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
