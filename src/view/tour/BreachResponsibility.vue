<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>违约责任</strong>
    </header>
    <section>
      <div class="AllInfo">
        <strong class="clearfix"><i></i><span>违约责任提示</span></strong>
        <div class="AllInfoDetails">
          <p>旅游者在出发前提出解除合同的，应当按下列标准承担退团损失：</p>
          <div class="infoList">
            <span>• 出发前7日至4日，按费用总额50%； </span>
            <span>• 出发前3日至1日，按</span>
            <span>• 出发前3日至1日，按</span>
          </div>
        </div>
      </div>
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
      goTopPage(){
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

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 5/@r 30/@r 30/@r 36/@r;
    overflow: auto;
  }

  .AllInfo {
    margin-top: 16/@r;
  }

  .AllInfo > strong {
    font-size: 28/@r;
    line-height: 64/@r;
    font-family: "微软雅黑";
    color: #010101;
    display: block;
  }

  .AllInfo > strong > i {
    float: left;
    width: 23/@r;
    height: 23/@r;
    background: url("../../assets/img/productChara/spotIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 21/@r 25/@r 0 0;
  }

  .AllInfo > strong > span {
    float: left;
  }

  .AllInfoDetails {
    font-size: 23/@r;
    line-height: 37/@r;
    font-family: "微软雅黑";
    color: #000;
    padding-left: 30/@r;
  }

  .infoList > span {
    display: block;
  }
</style>
