<template>
  <div>
    <div class="recommendBox">
      <div class="statisticsRow clearfix">
        <strong>总体满意度<em>{{allCommentObj.goodrate}}%</em></strong>
        <span>共 {{allCommentObj.totalRows}} 人点评</span>
      </div>
      <ul class="allCommentFraction clearfix">
        <li v-for="item,index in allCommentObj.data">{{item.ts_ct_Name}}: {{item.score}}/5分</li>
      </ul>
      <ul class="recommendList">
        <li v-for="item,index in commentDataList">
          <div class="aboutUser clearfix">
            <div class="userHeader">
              <img v-lazy="item.sm_ui_HeadImage" alt="" v-show="item.sm_ui_HeadImage"/>
            </div>
            <div class="userInfo">
              <strong>用户 {{item.ts_ct_userName}}</strong>
              <span>{{item.ts_ct_CreateTime}}</span>
            </div>
            <div class="recommendStar">
              <strong>综合评价: {{item.satisfaction}}</strong>
            </div>
          </div>
          <div class="recommendContent">
            <p>{{item.ts_ct_Content}}</p>
            <div class="reImgList clearfix" v-show="item.imgData.length">
              <img v-for="ite,index in item.imgData" v-lazy="ite" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Rater} from 'vux'

  export default {
    components: {
      Rater
    },
    computed: mapGetters([
      'allCommentObj',
      'commentDataList'
    ]),
    data() {
      return {}
    },
    methods: {
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .statisticsRow {
    border-bottom: 1/@r solid #e6e6e6;
    padding: 0 25/@r;
    font-size: 24/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
    color: #383838;
  }

  .statisticsRow > strong {
    float: left;
  }

  .statisticsRow > strong > em {
    margin-left: 5/@r;
    color: #c9255d;
  }

  .statisticsRow > span {
    float: right;
  }

  .recommendList {
    padding: 20/@r 25/@r;
  }

  .recommendList > li {
    padding: 10/@r 0;
    border-bottom: 1/@r solid #ccc;
  }

  .userHeader {
    width: 60/@r;
    height: 60/@r;
    background: url("../../assets/img/home/hlyIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: 15/@r;
    margin-top: 9/@r;
  }

  .userHeader > img {
    width: 60/@r;
    height: 60/@r;
  }

  .userInfo {
    float: left;
  }

  .userInfo > strong {
    display: block;
    font-size: 24/@r;
    line-height: 42/@r;
    font-family: "微软雅黑";
    color: #020202;
  }

  .userInfo > span {
    display: block;
    font-size: 20/@r;
    line-height: 36/@r;
    font-family: "微软雅黑";
    color: #e8751a;
  }

  .recommendStar {
    float: right;
    margin-top: 10/@r;
  }

  .recommendStar strong {
    font-size: 28/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
    color: #f80;
    display: block;
  }

  .recommendContent {
    margin-top: 11/@r;
    font-size: 24/@r;
    line-height: 40/@r;
    font-family: "微软雅黑";
    color: #020202;
  }

  .recommendContent > p {
    margin-bottom: 20/@r;
    text-indent: 2em;
  }

  .reImgList > img {
    width: 32%;
    height: 220/@r;
    float: left;
    margin-right: 2%;
    margin-bottom: 10/@r;
  }

  .reImgList > img:nth-of-type(3n) {
    margin-right: 0;
  }

  .smallStop > li {
    padding: 10/@r 0;
  }

  .smallStop strong {
    font-size: 25/@r;
    line-height: 50/@r;
    font-weight: bold;
    font-family: "微软雅黑";
    display: block;
    color: #383838;
  }

  .smallStop p {
    font-size: 26/@r;
    line-height: 45/@r;
    font-family: "微软雅黑";
    text-indent: 2em;
    margin-bottom: 20/@r;
    color: #404040;
  }

  .smallStop img {
    width: 100%;
    margin-bottom: 20/@r;
  }

  .allCommentFraction {
    padding: 0/@r 30/@r;
    background-color: #e6e6e6;
    color: #fff;
    font-size: 25/@r;
    line-height: 34/@r;
    font-family: "微软雅黑";
  }

  .allCommentFraction > li {
    float: left;
    width: 50%;
    text-align: center;
  }
</style>
