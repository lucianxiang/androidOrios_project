<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>古镇</strong>
      <div class="operationIcon"></div>
    </header>
    <section>
      <nav class="clearfix">
        <span class="active">跟团游</span>
        <span>自驾游</span>
      </nav>
      <div class="screenNav clearfix">
        <a href="javascript:;" class="recommendIcon">
          <span>推荐排序<i></i></span>
        </a>
        <a href="javascript:;">
          <span>目的地<i></i></span>
        </a>
        <a href="javascript:;">
          <span>游玩线路<i></i></span>
        </a>
        <a href="javascript:;" class="screenIcon">
          <span>筛选<i></i></span>
        </a>
      </div>
      <ul class="palyLineList">
        <li class="clearfix" v-for="item,index in 10">
          <img src="../../assets/img/productChara/topImage.png" alt="">
          <div class="lineInfo">
            <strong>成都+峨眉山+乐山+都江堰+青城山5日4晚跟 团游·单动 纯玩团无自费 2进峨眉山 爸妈放成都+峨眉山+乐山+都江堰+青城山5日4晚跟 团游·单动 纯玩团无自费 2进峨眉山 爸妈放</strong>
            <div class="aboutInfo clearfix">
              <span>出发：泸州</span>
              <em>￥1245元</em>
            </div>
          </div>
        </li>
      </ul>

    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([]),
    data() {
      return {}
    },
    methods: {
      goTopPage() {
        this.$router.go(-1)
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #3e3f5b;
    height: 88/@r;
  }

  .leftIcon {
    float: left;
    width: 19/@r;
    height: 35/@r;
    background: url("../../assets/img/productChara/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 27/@r 0 0 30/@r;
  }

  header > strong {
    position: absolute;
    top: 22/@r;
    font-size: 34/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
  }

  .operationIcon {
    float: right;
    width: 56/@r;
    height: 11/@r;
    background: url("../../assets/img/productChara/operationIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 40/@r 30/@r 0 0;
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

  nav {
    font-size: 28/@r;
    line-height: 94/@r;
    font-family: "微软雅黑";
    color: #010101;
    border-bottom: 2/@r solid #dadedd;
  }

  nav > span {
    float: left;
    width: 50%;
    text-align: center;
    border-bottom: 3/@r solid transparent;
  }

  nav > span.active {
    border-color: #117db5;
    color: #117db5;
  }

  .screenNav {
    font-size: 28/@r;
    line-height: 94/@r;
    font-family: "微软雅黑";
    color: #000;
  }

  .screenNav > a {
    float: left;
    width: 25%;
    text-align: center;
  }

  .screenNav span {
    position: relative;
  }

  .screenNav i {
    position: absolute;
    width: 17/@r;
    height: 15/@r;
    top: 15/@r;
    right: -30/@r;
    background: url("../../assets/img/productChara/downIcon2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .screenNav .recommendIcon i {
    background: url("../../assets/img/productChara/downIcon1.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .recommendIcon {
    color: #137ab0;
  }

  .screenNav .screenIcon i {
    width: 20/@r;
    height: 22/@r;
    top: 10/@r;
    background: url("../../assets/img/productChara/screenIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .palyLineList > li {
    border-top: 2/@r solid #dadedd;
    padding: 20/@r 30/@r;
  }

  .palyLineList img {
    width: 184/@r;
    height: 128/@r;
    margin-top: 3/@r;
    float: left;
    margin-right: 20/@r;
  }

  .lineInfo {
    float: left;
    width: 480/@r;
  }

  .lineInfo > strong {
    color: #000;
    display: block;
    font-size: 23/@r;
    line-height: 29/@r;
    font-family: "微软雅黑";
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .aboutInfo {
    margin-top: 35/@r;
    font-size: 23/@r;
    line-height: 37/@r;
    font-family: "微软雅黑";
  }

  .aboutInfo span {
    float: left;
    color: #117db5;
  }

  .aboutInfo em {
    float: right;
    color: #dd2b15;
  }
</style>
