<template>
  <div style="background-color: #000000;">
    <div id="bcid">
      <!--<div style="height:40%"></div>-->
      <!--<p class="tip">...载入中...</p>-->
    </div>
    <!--<footer>-->
      <!--<div class="fbt" @click="back">取　 消</div>-->
      <!--&lt;!&ndash;<div class="fbt" onclick="scanPicture()">从相册选择二维码</div>&ndash;&gt;-->
    <!--</footer>-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  /**
   * Created by leibo on 2018/11/28.
   */


  export default{
    name: '',
    data(){
      return {}
    },
    computed: mapGetters([]),
    created(){
    },
    mounted(){
      var scan=null;
      var _this = this;
      mui.plusReady(function () {

        // 获取窗口对象
        // 开始扫描
          scan=new plus.barcode.Barcode('bcid');
          scan.onmarked=onmarked;
          scan.start({conserve:true,filename:'_doc/barcode/'});
        // 显示页面并关闭等待框
//        wo.evalJS('closeWaiting()');
        // 二维码扫描成功
        function onmarked(type, result, file){
          switch(type){
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它'+type;
              break;
          }
          result = result.replace(/\r\n/g, '');

          //扫码成功
          let options = {
            "loginUserID": "huileyou",
            "loginUserPass": "123",
            "operateUserID": "",
            "operateUserName": "",
            "ts_vc_Verification":result,//扫描二维码获得的值
            "sm_ui_UserCode": "",  //账号
            "sm_ui_Password": "",  //密码
          }
          _this.$store.dispatch('saoMaOver',options)
          .then(()=>{
            scan.close();
            _this.$store.commit('initBarcodeID',result)
            _this.$router.push({name:'SweepCode',query:{barcodeID:result}})
          })
        }
        //返回按钮
        plus.key.addEventListener('backbutton',function(){
          console.log('backbutton')
          scan.close();
        },false);
      })

    },
    methods: {
    },
  }
</script>
<style scoped>
  #bcid {
    background-color: #000000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
