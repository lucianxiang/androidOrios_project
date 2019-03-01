<template>
  <div>
    <header>
      <div></div>
      <strong>选择团期</strong>
      <a href="javascript;;">确定</a>
    </header>
    <section>
      <p>已选择<span>1</span>位游客</p>
      <ul class="touristList">
        <li class="clearfix" v-for="item,index in 10">
          <i></i>
          <div>
            <strong>周星驰</strong>
            <span>身份证：510***************3250</span>
          </div>
          <em class="active"></em>
        </li>
      </ul>
      <a href="javascript:;">
        <span>添加游客</span>
      </a>
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

  header a {
    position: absolute;
    font-size: 28/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    color: #fff;
    right: 30/@r;
    top: 0;
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    overflow: auto;
    padding-bottom: 98/@r;
  }

  section p {
    font-size: 25/@r;
    line-height: 88/@r;
    font-family: "微软雅黑";
    background-color: #fff;
    text-align: center;
    border-bottom: 20/@r solid #ebeded;
    color: #808080;
  }

  section p span {
    margin: 0 5/@r;
    color: #117db5;
  }

  .touristList li {
    padding: 25/@r 30/@r;
    border-bottom: 2/@r solid #ebeded;
  }

  .touristList i {
    float: left;
    width: 42/@r;
    height: 44/@r;
    background: url("../../assets/img/productChara/editIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 12/@r;
  }

  .touristList div {
    float: left;
    margin-left: 18/@r;
  }

  .touristList strong {
    font-size: 28/@r;
    line-height: 38/@r;
    font-family: "微软雅黑";
    display: block;
    color: #080707;
  }

  .touristList span {
    font-size: 20/@r;
    line-height: 31/@r;
    font-family: "微软雅黑";
    display: block;
    color: #808080;
  }

  .touristList em {
    width: 44/@r;
    height: 44/@r;
    float: right;
    margin-top: 12/@r;
    border: 1/@r solid #dedee3;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    position: relative;
  }

  .touristList .active:before {
    content: '';
    position: absolute;
    width: 25/@r;
    height: 10/@r;
    border-bottom: 2/@r solid #117db5;
    border-left: 2/@r solid #117db5;
    transform: rotate(-45deg);
    top: 13/@r;
    left:6/@r;
  }

  section > a {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #dd7015;
    height: 98/@r;
    text-align: center;
    font-size: 28/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
    color: #ffffff;
  }

  section > a span {
    position: relative;
  }

  section > a span:before {
    position: absolute;
    width: 34/@r;
    height: 34/@r;
    content: '';
    background: url("../../assets/img/productChara/addIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    left: -45/@r;
    top: 0/@r;
  }

</style>
