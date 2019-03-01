<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon" @click="goTopPage"></div>
      <strong class="title">选择城市</strong>
    </header>
    <section ref="section">
      <div>
        <dl v-for="item,index in  rentalCarCityList">
          <dt :id="item.cityLetter" v-show="item.cityName.length">{{item.cityLetter}}</dt>
          <dd v-for="ite,index in item.cityName" @click="changeCity(ite)">{{ite.CityName}}</dd>
        </dl>
      </div>
      <div class="changeCityName">
        <a
          href="javascript:;"
          v-for="item,index in rentalCarCityList"
          v-show="item.cityName.length"
          @click="modian(item.cityLetter)"
        >{{item.cityLetter}}</a>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'rentalCarCityList',
    ]),
    data() {
      return {
        id: '',
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.initCarCity();
    },
    methods: {
      //初始化城市
      initCarCity() {
        let GetCarRentCityInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('initRentalCarCity', GetCarRentCityInfo)
          .then(() => {
            this.$store.commit('hideLoading')
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
      goTopPage() {
        this.$router.push({name: 'CarDetails'})
      },
      changeCity(item) {
        if(!this.id){
          this.$store.commit('carChangeCity', item);
        }else {
          this.$store.commit('carReturnCity', item);
        }
        this.$router.push({name: 'CarDetails'})
      },
      modian(val) {
        this.$refs.section.scrollTop = document.getElementById(val).offsetTop;
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 24/@r 30/@r 23/@r 26/@r;
    z-index: 2;
  }

  .leftIcon {
    float: left;
    width: 25/@r;
    height: 25/@r;
    border-bottom: 3/@r solid #fff;
    border-left: 3/@r solid #fff;
    transform: rotate(45deg);
    margin: 15/@r 23/@r 0 0;
  }

  header > strong {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 33/@r;
    line-height: 41/@r;
    font-family: "微软雅黑";
    color: #efeff1;
  }

  section {
    position: fixed;
    top: 88/@r;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    overflow: auto;
    padding: 10/@r;
  }

  dt {
    font-size: 28/@r;
    line-height: 2;
    font-family: "微软雅黑";
    color: #f80;
    background-color: #fcfcfc;
    padding-left: 10/@r;
  }

  dd {
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
    padding-left: 50/@r;
  }

  .changeCityName {
    width: 10%;
    position: fixed;
    right: 0;
    top: 88/@r;
    bottom: 0;
    overflow: auto;
    padding-right: 10/@r;
    background-color: #f9f9f9;
  }

  .changeCityName > a {
    display: block;
    text-align: right;
    font-size: 20/@r;
    line-height: 2;
    font-family: "微软雅黑";
    text-align: center;
  }
</style>
