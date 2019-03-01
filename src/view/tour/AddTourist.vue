<template>
  <div>
    <header>
      <div></div>
      <strong>添加游客</strong>
      <span></span>
    </header>
    <section>
      <div class="userInfo">
        <strong>姓名</strong>
        <input type="text" placeholder="必填">
      </div>
      <div class="userInfo">
        <strong>证件类型</strong>
        <span>身份证</span>
      </div>
      <div class="userInfo">
        <strong>证件号</strong>
        <input type="text" placeholder="必填">
      </div>
      <div class="userInfo">
        <strong>手机</strong>
        <input type="text" placeholder="必填">
      </div>
      <a href="JavaScript:;" class="preservation">保存</a>
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
    position: relative;
    height: 88/@r;
    background-color: #2dbb55;
    padding: 27/@r 30/@r 26/@r 30/@r;
  }

  header div {
    width: 19/@r;
    height: 35/@r;
    background: url('../../assets/img/ticket/leftIcon.png') no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  header strong {
    position: absolute;
    left: 50%;
    top: 0;
    font-size: 34/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #fff;
    transform: translateX(-50%);
  }

  header span {
    width: 35/@r;
    height: 35/@r;
    position: absolute;
    right: 30/@r;
    top: 27/@r;
    background: url("../../assets/img/productChara/qrCode.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .userInfo {
    height: 93/@r;
    border-bottom: 2/@r solid #ebeded;
    background-color: #fff;
    padding: 0 30/@r;
  }

  .userInfo > strong {
    float: left;
    font-size: 28/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    width: 31%;
  }

  .userInfo > span {
    float: left;
    font-size: 28/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    width: 69%;
  }

  .userInfo > input {
    float: left;
    font-size: 24/@r;
    line-height: 50/@r;
    font-family: "微软雅黑";
    width: 69%;
    border: none;
    padding: 20/@r 0;
  }

  .preservation {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 34/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
    background-color: #dd7015;
    color: #fff;
  }


</style>
