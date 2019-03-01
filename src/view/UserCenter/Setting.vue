<template>
  <div>
    <x-header :left-options="{backText: ''}">设置</x-header>
    <ul class="settingList">
      <li class="clearfix" v-show="isShow">
        <strong>指纹登录</strong>
        <span :class="{active: fingerprint}" @click="changeFingerprint"><i></i></span>
      </li>
    </ul>
    <!--<group>-->
    <!--<x-switch title="指纹登录" v-model="fingerprint" @on-change="changeFingerprint"></x-switch>-->
    <!--</group>-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {XSwitch, Group, XHeader} from 'vux'

  export default {
    name: '',
    components: {
      XSwitch,
      Group,
      XHeader
    },
    data() {
      return {
        fingerprint: false,
        isShow: false,
      }
    },
    computed: mapGetters([]),
    created() {
      let fingerprint = localStorage.getItem('fingerprint')
      if (Number(fingerprint)) {
        this.fingerprint = true;
      } else {
        this.fingerprint = false;
        localStorage.setItem('fingerprint', 0)
      }
    },
    mounted(){
      let _this = this;
      mui.plusReady(function () {
        _this.isShow = true;
      })
    },
    methods: {
      //选中
      changeFingerprint(v) {
        if (v) {
          var _this = this;
          if (window.plus) {
            this.$vux.alert.show({
              title: '提示',
              content: '为保证您的账户安全,开启指纹登录,请不要在手机中预留他人指纹',
              onShow() {
//              console.log('Plugin: I\'m showing')
              },
              onHide() {
                mui.plusReady(function () {
                  // 检查是否支持指纹识别
                  if (plus.fingerprint) {
                    if (!plus.fingerprint.isSupport()) {
                      _this.fingerprint = false;
                      _this.$vux.toast.show({
                        text: '此设备不支持指纹识别'
                      })
                      return;
                    }
                    if (!plus.fingerprint.isKeyguardSecure()) {
                      _this.fingerprint = false;
                      _this.$vux.toast.show({
                        text: '此设备未设置密码锁屏，无法使用指纹识别'
                      })
                      return;
                    }
                    if (!plus.fingerprint.isEnrolledFingerprints()) {
                      _this.fingerprint = false;
                      _this.$vux.toast.show({
                        text: '此设备未录入指纹，请到设置中开启'
                      })
                      return;
                    }
                    var waiting = null;
                    plus.fingerprint.authenticate(function () {
                      plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
                      _this.$vux.toast.show({
                        text: '指纹识别成功!'
                      })
                      localStorage.setItem('fingerprint', 1)
                    }, function (e) {
                      switch (e.code) {
                        case e.AUTHENTICATE_MISMATCH:
                          _this.fingerprint = false;
                          plus.nativeUI.toast('指纹匹配失败，请重新输入');
                          break;
                        case e.AUTHENTICATE_OVERLIMIT:
                          _this.fingerprint = false;
                          plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
                          plus.nativeUI.alert('指纹识别失败次数超出限制，请使用其它方式进行认证');
                          break;
                        default:
                          _this.fingerprint = false;
                          plus.nativeUI.closeWaiting(); //兼容Android平台关闭等待框
                          plus.nativeUI.alert('指纹识别失败(' + e.code + ')，请重试');
                          break;
                      }
                    });
                    // Android平台弹出等待提示框
                    if ('Android' == plus.os.name) {
                      plus.nativeUI.showWaiting('指纹识别中...');
                    }
                  } else {
                    _this.fingerprint = false;
                    _this.$vux.toast.show({
                      text: '当前环境不支持指纹识别API，请更新到最新版本'
                    })
                  }
                })
              }
            })
          }
          // 显示
        } else {
          localStorage.setItem('fingerprint', 0)
        }
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

  .settingList {
    padding: 20/@r 30/@r;
  }

  .settingList li {
    font-size: 28/@r;
    line-height: 3;
    font-family: "微软雅黑";
    border-bottom: 1px solid #999;

  }

  .settingList strong {
    float: left;
    color: #333;
  }

  .settingList span {
    float: right;
    width: 90/@r;
    height: 50/@r;
    background-color: #fff;
    margin-top: 17/@r;
    -webkit-border-radius: 25/@r;
    -moz-border-radius: 25/@r;
    border-radius: 25/@r;
    border: 1px solid #999;
    position: relative;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
  }

  .settingList span i {
    display: block;
    background-color: #fff;
    width: 48/@r;
    height: 48/@r;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    box-shadow: 0 0 3/@r #999;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
  }

  .settingList span.active {
    background-color: #04BE02;
  }

  .settingList span.active i {
    -webkit-transform: translateX(40/@r);
    -moz-transform: translateX(40/@r);
    -ms-transform: translateX(40/@r);
    -o-transform: translateX(40/@r);
    transform: translateX(40/@r);
  }


</style>
