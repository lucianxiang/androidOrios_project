<template>
  <div>
    <div class="wrap">
      <div>
        <strong>出行须知</strong>
        <div v-html="tourProducteObj.ts_pt_BookKnow"></div>
      </div>
      <div>
        <strong>付款方式</strong>
        <div v-html="tourProducteObj.ts_pt_PayWay"></div>
      </div>
      <div>
        <strong>违约责任</strong>
        <div v-html="tourProducteObj.ts_pt_LimitDuty"></div>
      </div>
      <div>
        <strong>特殊限制</strong>
        <div v-html="tourProducteObj.ts_pt_SafetyLimit"></div>
      </div>
      <div>
        <strong>安全提示</strong>
        <div v-html="tourProducteObj.ts_pt_SpecialLimit"></div>
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
  .wrap {
    padding: 30/@r;
    background-color: #fff;
  }

  .wrap strong {
    font-size: 34/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #333;
  }

  .wrap div div {
    font-size: 26/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    color: #666;
    text-indent: 2em;
  }

  .wrap div {
    margin-bottom: 20/@r;
  }

  .wrap div:last-of-type {
    margin-bottom: 0;
  }


</style>
