<template>
  <div>
    <!--费用说明-->
    <div class="moneyDetails">
      <strong>费用说明</strong>
      <div class="moneyDetailsCon">
        <div>
          <strong class="clearfix"><em></em><span>费用包含</span></strong>
          <p v-html="tourProducteObj.ts_pt_FeeIn"></p>
        </div>
        <div>
          <strong class="clearfix"><em></em><span>费用不包含</span></strong>
          <p v-html="tourProducteObj.ts_pt_FeeNotIn"></p>
        </div>
        <div>
          <strong class="clearfix"><em></em><span>退改政策</span></strong>
          <p v-html="tourProducteObj.ts_pt_ReturnRule"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'tourProducteObj'
    ]),
    data() {
      return {}
    },
    methods: {},
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .moneyDetails {
    margin-top: 20/@r;
    background-color: #fff;
    padding: 18/@r 30/@r 20/@r;
  }

  .moneyDetails > strong {
    font-size: 30/@r;
    line-height: 72/@r;
    font-weight: bold;
    font-family: "微软雅黑";
    color: #000;
  }

  .moneyDetailsCon strong {
    font-size: 28/@r;
    line-height: 64/@r;
    font-family: "微软雅黑";
  }

  .moneyDetailsCon > div {
    margin-top: 10/@r;
  }

  .moneyDetailsCon strong em {
    float: left;
    width: 23/@r;
    height: 23/@r;
    background: url("../../assets/img/productChara/spotIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 21/@r 24/@r 0 6/@r;
  }

  .moneyDetailsCon strong span {
    float: left;
  }

  .moneyDetailsCon p {
    padding-left: 35/@r;
    font-size: 25/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #000;
  }
</style>
