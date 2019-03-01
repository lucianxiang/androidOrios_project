<template>
  <div>
    <div class="wrap">
      <div class="recommendInfo" v-show="tourProducteObj.ts_pt_IntroReason">
        <strong>推荐理由</strong>
        <div v-html="tourProducteObj.ts_pt_IntroReason"></div>
      </div>
      <div class="lineInfo" v-show="tourProducteObj.ts_pt_Describe">
        <strong>线路介绍</strong>
        <div class="lineInfo" v-html="tourProducteObj.ts_pt_Describe"></div>
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
      return {
      }
    },
    created() {
    },
    props: [
      'tourId',
    ],
    methods: {},
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .wrap {
    padding: 30/@r;
  }

  .wrap > div {
    margin-bottom: 30/@r;
    position: relative;
  }

  .wrap > div > strong {
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    font-weight: bold;
    color: #333;
  }

  .wrap > div:last-of-type {
    margin-bottom: 0;
  }

  .wrap > div > div {
    font-size: 26/@r !important;
    text-indent: 2em;
    color: #666;
    letter-spacing: 4/@r;
    line-height: 35/@r;
    margin-top: 5/@r;
  }
</style>
