<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>选择常住地</strong>
    </header>
    <section>
      <div class="cityList">
        <a href="javascript:;" v-for="item,index in cityDataList" @click="changeCity(item)">{{item.sm_af_AreaName}}</a>
      </div>
    </section>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    computed: mapGetters([
      'cityDataList'
    ]),
    components: {
      Toast,
    },
    data() {
      return {
        cityData: [],
        showErr: false,
        errCon: '',
      }
    },
    created() {
      this.initData(3337);
    },
    methods: {
      initData(id) {
        let option = {
          "areaPid": id ? id : ''
        }
        this.$store.dispatch('initCityData', option)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      goTopPage() {
        this.$router.go(-1);
      },
      changeCity(item) {
        this.cityData.push(item);
        if (this.cityData.length >= 3) {
          this.$store.commit('cityData', this.cityData)
          this.$router.go(-1)
          return
        }
        this.initData(item.sm_af_AreaID);
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #031B66;
    height: 88/@r;
  }

  header > .leftIcon {
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/productChara/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 25/@r 0 0 30/@r;
  }

  header > strong {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:38/@r;
    color: #fff;
    position: absolute;
    top: 25/@r;
    left: 50%;
    transform: translateX(-50%);
  }

  section {
    position: fixed;
    top: 88/@r;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    overflow: auto;
    padding: 20/@r 30/@r;
    -webkit-overflow-scrolling: touch;
  }

  .cityList {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:3;
  }

  .cityList > a {
    display: block;
    text-indent: 20/@r;
    color: #333;
    border-bottom: 1/@r solid #f0f0f0;
  }

  .cityList > a:last-of-type {
    border: none;
  }


</style>
