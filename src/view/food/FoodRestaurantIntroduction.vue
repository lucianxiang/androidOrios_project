<template>

  <div>
    <div id="wrap">
      <div class="backIocn" @click="backPage"></div>
      <!--顶部logo部分,header     v-lazy="introduceInfo.imageList[0].fd_pi_ImageUrl"-->
      <div class="touMing">
        餐厅图样
      </div>

      <!--轮播图的图片数字-->

      <div class="pageLogo">
        <swiper :aspect-ratio="300/600" v-model="swiperItemIndex">
          <swiper-item class="swiper-demo-img" v-for="item,index in introduceInfo.imageList" :key="index" @click="">
            <img :src="item.fd_pi_ImageUrl" class="pageLogoImg">
            <div class="imgNum">
              <img src="@/assets/img/food/tupian.png" alt="">
              <strong>{{index + 1}}/{{introduceInfo.imageList.length}}</strong>
            </div>
          </swiper-item>
        </swiper>
      </div>

      <!--餐厅信息-->

      <div class="restaraurantIntro">
        <div class="restaraurantIntroCont">【{{introduceInfo.fd_sf_ProductName}}】</div>
        <div class="storefrontAddress clearfix">
          <img src="@/assets/img/food/maps.png" alt="">
          <div>
            <span class="restaraurantIntroAddr" @click="toMap">{{introduceInfo.fd_sf_Address}}</span>
          </div>
        </div>
      </div>
      <!--餐厅介绍-->
      <div class="introduce">
        <div class="introduceInfo">
          <div class="introduceName">
            <img src="@/assets/img/food/store.png" alt="">
            餐厅简介
          </div>
          <div class="introduceContent">
            {{introduceInfo.fd_sf_Introduce}}
          </div>
        </div>
      </div>
      <a href="javascript:;" class="footr" @click="payOrder(introduceInfo)">立即预定</a>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Swiper, SwiperItem} from 'vux'

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    computed: mapGetters([
      'foodDetailStoreFrontList',
    ]),
    data() {
      return {
        userInfo:{},
        swiperItemIndex: 0,
        introduceInfo: {}
      }
    },
    created() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (userInfo) {
      this.userInfo = userInfo
    }
      this.introduceInfo = JSON.parse(sessionStorage.getItem('introduceInfo'))

    },
    methods: {
      toMap(){
        this.$router.push({name: 'TicketMap', query: {address: this.introduceInfo.fd_sf_Address, title: this.introduceInfo.fd_sf_ProductName}})
      },
      jump(index, item) {
        this.meat = index
        if (index == 0) {
          this.$router.push({
            name: 'FoodSellerInfo', query: {
              id: this.objId,
            }
          })
        } else if (index == 1) {
          this.$router.push({
            name: 'FoodSellerInfoTwo', query: {
              id: this.objId,
            }
          })
        }
      },
      initData(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "storeFrontID": id,//店面编号
        };
        this.$store.commit('showLoading')
        this.$store.dispatch('initFoodDetailStoreFront', options)
      },
      backPage() {
        this.$router.push({name: 'FoodDetails'})
      },
      payOrder(obj) {
         if (!this.userInfo.sm_ui_ID) {
        this.$router.push({
          name: 'UserLogin'
        })
        return
      }
        this.$store.commit('foodModel', obj)
        this.$router.push({
          name: 'FoodOrderIfo',
          query: {
            id: obj.fd_sf_ID,
          }
        })
        // //立即预定
        // this.$router.push({
        //   name: 'FoodSellerInfo', query: {
        //     id: obj.fd_sf_ID,
        //   }
        // })
      },
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  #wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }

  .touMing {
    text-align: center;
    line-height: 38/@r;
    font-size: 28/@r;
    width: 120/@r;
    background-color: grey;
    z-index: 1;
    color: #fff;
    position: absolute;
    top: 320/@r;
    left: 50/@r;
    opacity: 0.6;
  }

  .imgNum {
    /*height: 40/@r;*/
    width: 120/@r;
    z-index: 2;
    color: #fff;
    position: absolute;
    top: 320/@r;
    left: 80%;
  }

  .imgNum > img {
    opacity: 0.7;
    height: 30/@r;
    width: 30/@r;
  }

  .imgNum > strong {
    color: #fff;
  }

  .pageLogoImg {
    height: 430/@r;
    width: 100%;
  }

  .backIocn {
    width: 52/@r;
    height: 52/@r;
    position: absolute;
    top: 10/@r;
    left: 15/@r;
    background: url("../../assets/img/food/back.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    z-index: 1;
  }

  .pageLogo > img {
    height: 390/@r;
    width: 100%;
  }

  .restaraurantIntro {
    background-color: #fff;
    padding: 20/@r 25/@r 25/@r 20/@r;

  }

  .storefrontAddress > img {
    float: left;
    height: 60/@r;
    width: 60/@r;
  }

  .storefrontAddress div {
    overflow: hidden;
  }

  .storefrontAddress span {
    float: left;
    width: 100%;
    font-size: 25/@r;
    line-height: 30/@r;
    padding-top: 15/@r;
  }

  .restaraurantIntroCont {
    font-size: 37/@r;
    font-weight: bold;
    padding: 5/@r 0/@r 15/@r 5/@r;
  }

  .restaraurantIntroAddr {
    font-size: 30/@r;
    color: #555555;
  }

  .restaraurantIntroAddr > em {
    font-size: 25/@r;
    color: #bababa;
  }

  .introduce {
    background-color: #f0f0f0;
    padding-top: 20/@r;

  }

  .introduceInfo {
    background-color: #fff;

    padding: 25/@r 20/@r 20/@r 20/@r;
  }

  .introduceName > img {
    vertical-align: middle;
    height: 85/@r;
    width: 85/@r;
  }

  .introduceName {
    margin-top: 10/@r;
    font-size: 35/@r;
  }

  .introduceContent {
    padding: 0 10/@r 10/@r 25/@r;
    color: #555555;
    font-size: 24/@r;
    line-height: 35/@r;
    font-family: "微软雅黑";
    overflow: hidden;
  }

  .footr {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #dd7015;
    height: 98/@r;
    color: #fff;
    text-align: center;
    font-size: 34/@r;
    line-height: 98/@r;
    font-family: "微软雅黑";
  }

</style>
