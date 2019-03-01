<template>
  <section>
    <div class="footerFunction">
      <flexbox>
        <flexbox-item>
          <div class="tour">
            <div class="tourIcon"></div>
            <strong>去旅游</strong>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="discount">
            <div class="discountIcon"></div>
            <strong>寻优惠</strong>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="strategy">
            <div class="strategyIcon"></div>
            <strong>看攻略</strong>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="service">
            <div class="serviceIcon"></div>
            <strong>查服务</strong>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="app">
            <div class="appIcon"></div>
            <strong>APP</strong>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <footer>
      <div class="footerTop clearfix">
        <a href="javascript:;">网站地图</a>
        <span>|</span>
        <a href="javascript:;" class="language">
          <i></i>
          Language
        </a>
        <span>|</span>
        <a href="javascript:;">电脑版</a>
      </div>
      <div class="footerBottom clearfix">
        <a href="javascript:;">©2018惠乐游</a>
        <span>|</span>
        <a href="javascript:;">川 ICP 备 080232560 号</a>
      </div>
    </footer>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Flexbox, FlexboxItem} from 'vux'

  export default {
    name: '',
    computed: mapGetters([]),
    components: {
      Flexbox,
      FlexboxItem
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {},
  }
</script>
<style scoped>
  .footerFunction {
    padding: 40px 24px 24px;
    border-bottom: 1px solid #b5b5b5;
    font: 28px/53px "微软雅黑";
    background-color: #fff;
  }

  .footerFunction strong {
    display: block;
    text-align: center;
    color: #333333;
  }

  .tourIcon {
    background: url("../../assets/img/footer/goTour.png") no-repeat;
  }

  .discountIcon {
    background: url("../../assets/img/footer/discount.png") no-repeat;
  }

  .strategyIcon {
    background: url("../../assets/img/footer/strategy.png") no-repeat;
  }

  .serviceIcon {
    background: url("../../assets/img/footer/service.png") no-repeat;
  }

  .appIcon {
    background: url("../../assets/img/footer/app.png") no-repeat;
  }

  .tourIcon,
  .discountIcon,
  .serviceIcon,
  .strategyIcon,
  .appIcon {
    width: 53px;
    height: 53px;
    margin: 0 auto;
    -webkit-background-size: cover;
    background-size: cover;
  }

  footer {
    background-color: #f2f2f2;
    padding: 31px 0 48px 0;
  }

  .footerTop {
    width: 460px;
    margin: 0 auto;
    font: 28px/38px "微软雅黑";
  }

  .footerTop > * {
    float: left;
    color: #808080;
  }

  .footerTop > span {
    margin: 0 11px;
  }

  .language {
    padding-left: 40px;
    padding-right: 25px;
    position: relative;
  }

  .language i {
    width: 33px;
    height: 33px;
    position: absolute;
    top: 3px;
    left: 0;
    background: url("../../assets/img/footer/language.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .language:before {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border-left: 1px solid #747474;
    border-bottom: 1px solid #747474;
    right: 0;
    top: 7px;
    transform: rotate(-45deg);
  }

  .footerBottom {
    width: 440px;
    margin: 26px auto 0;
    font: 23px/33px "微软雅黑";
  }

  .footerBottom > * {
    float: left;
    color: #808080;
  }

  .footerBottom > span {
    margin: 0 12px;
  }

</style>
