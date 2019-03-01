<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>选择城市</strong>
    </header>
    <div class="queryBox">
      <div class="clearfix" @click="btnBoxFocus">
        <i></i>
        <div class="btnBox">
          <input type="text" placeholder="搜索城市名称" ref="btnBox" @focus="isFocus" @blur="isBlur" v-model="queryKeyWord">
        </div>
      </div>
    </div>
    <section ref="section">
      <ul class="cityList" ref="cityList">
        <li v-for="item,index in homeCityList" :id="item.Name">
          <strong>{{item.newName ? item.newName : item.Name}}</strong>
          <div>
            <a href="javascript:;" v-for="ite,index in item.Children" @click="goHome(ite)">{{ite.sm_af_AreaName}}</a>
          </div>
        </li>
        <li class="footer">下面没有了~~</li>
      </ul>
    </section>
    <ul class="titleList" ref="titleList">
      <li v-for="item,index in homeCityList" @click="addressPosition(item,index)"
          :class="{active: index == cityIndex}">{{item.newName ? item.newName : item.Name}}
      </li>
      <li @click="goPageTop"></li>
    </ul>
    <div class="itemName" v-show="showName">{{name}}</div>
    <ul class="queryCityList" v-show="queryKeyWord.trim() || queryCityArr.length">
      <!--goHome-->
      <li v-for="item,index in queryCityArr" @click="changeCity(item)">{{item.sm_af_AreaName}}</li>
      <li v-show="!queryCityArr.length" style="color: #999;text-align: center">暂无对应城市</li>
      <li v-show="historyArr.length && !queryKeyWord.trim()" style="color: #999;text-align: center"
          @click="clearHistory">清空历史纪录
      </li>
    </ul>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    computed: mapGetters([
      'homeCityList'
    ]),
    components: {
      Toast
    },
    data() {
      return {
        showErr: false,
        errCon: '',
        name: '',
        showName: false,
        cityIndex: 0,
        newCityArr: [],
        queryCityArr: [],
        queryKeyWord: '',
        historyArr: [],
      }
    },
    watch: {
      queryKeyWord(val) {
        this.queryCityArr = this.newCityArr.filter(item => {
          if (item.sm_af_AreaName.indexOf(val.trim()) != -1) {
            return true
          }
          return false
        })
      }
    },
    created() {
      this.initData();
      if (localStorage.getItem('historyArr')) {
        this.historyArr = JSON.parse(localStorage.getItem('historyArr'));
      }

    },
    methods: {
      btnBoxFocus() {
        this.$refs.btnBox.focus();
      },
      //失去焦点
      isBlur() {
        if (!this.queryKeyWord.trim()) {
          this.queryCityArr = [];
        }
      },
      //获取焦点
      isFocus() {
        if (!this.queryKeyWord.trim() && this.historyArr.length) {
          this.queryCityArr = this.historyArr;
        }
      },
      clearHistory() {
        this.historyArr = [];
        localStorage.setItem('historyArr', JSON.stringify(this.historyArr));
      },
      initCity() {
        return new Promise((relove, reject) => {
//          mui.plusReady(function () {
          document.addEventListener('plusready', function () {
            console.log(JSON.stringify(window.plus))
            plus.geolocation.getCurrentPosition(function (p) {
              relove(p)
            }, function (e) {
              alert('Geolocation error: ' + e.message);
            }, {geocode: true, provider: 'baidu'})
          })
        })
      },
      //点击城市
      goHome(item) {
        let mapObj = JSON.parse(sessionStorage.getItem('addMap'))
        if(mapObj){
          console.log(JSON.stringify(mapObj))
          var myGeo = new BMap.Geocoder();
          var _this = this;
          myGeo.getPoint(item.sm_af_AreaName, function(point){
            if (point) {
              mapObj.coords.longitude = point.lng
              mapObj.coords.latitude = point.lat
              console.log('mapObj'+JSON.stringify(mapObj))
              sessionStorage.setItem('addMap',JSON.stringify(mapObj))
              _this.$store.commit('setCityObj', item);
              setTimeout(() => {
                _this.$router.push({name: 'Home'});
              }, 100)
            }else{
              alert("您选择地址没有解析到结果!");
            }
          }, item.sm_af_AreaName);
        }else{
          this.initCity().then(data=>{
            sessionStorage.setItem('addMap', JSON.stringify(data))
//          alert(JSON.stringify(data))
            this.city = data.address.city
            let options = {
              "loginUserID": "huileyou",
              "loginUserPass": "123",
              "operateUserID": "",
              "operateUserName": "",
              "pcName": "",
              "sm_af_AreaName": data.address.city,//用户编码
            }
            this.$store.dispatch('GetAreaID', options)
            .then(suc => {
              console.log(suc)
            }, err => {
              console.log(err)
            })
          })
        }


      },
      changeCity(item) {
        this.historyArr = this.historyArr.filter(v => {
          if (item.sm_af_AreaID == v.sm_af_AreaID) {
            return false;
          }
          return true;
        })
        if (this.historyArr.length > 10) {
          this.historyArr.pop();
        }

        this.historyArr.unshift(item);
        localStorage.setItem('historyArr', JSON.stringify(this.historyArr));

        let mapObj = JSON.parse(sessionStorage.getItem('addMap'))
        var myGeo = new BMap.Geocoder();
        var _this = this;
        myGeo.getPoint(item.sm_af_AreaName, function(point){
          if (point) {
            console.log('point'+JSON.stringify(point))
            mapObj.coords.longitude = point.lng
            mapObj.coords.latitude = point.lat
            console.log('mapObj'+JSON.stringify(mapObj))
            sessionStorage.setItem('addMap',JSON.stringify(mapObj))
            _this.$store.commit('setCityObj', item);
            setTimeout(() => {
              _this.$router.push({name: 'Home'});
            }, 100)
          }else{
            alert("您选择地址没有解析到结果!");
          }
        }, item.sm_af_AreaName);
      },
      initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        this.$store.commit('showLoading')
        this.$store.dispatch('initHomeCityList', options)
          .then(() => {
            for (let i = 1; i < this.homeCityList.length; i++) {
              this.newCityArr.push(...this.homeCityList[i].Children)
            }
            this.$store.commit('hideLoading')
          }, err => {
            this.$store.commit('hideLoading')
            this.showErr = true;
            this.errCon = err;
          })
      },
      goTopPage() {
        this.$router.go(-1);
      },
      //对应字母城市
      addressPosition(item, index) {
        this.showName = false;
        this.cityIndex = index;
        if (item.newName) {
          this.name = item.newName;
        } else {
          this.name = item.Name;
        }
        this.showName = true;
        this.$refs.section.scrollTop = document.getElementById(item.Name).offsetTop;
        setTimeout(() => {
          this.showName = false;
        }, 1000)
      },
      goPageTop(){
        this.$refs.section.scrollTop = 0;
      },
    },
    mounted() {
    }
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88/@r;
    z-index: 2;
    box-shadow: 0 0 10/@r #ccc;
  }

  .leftIcon {
    width: 21/@r;
    height: 38/@r;
    background: url("../assets/img/ticket/leftIcon2.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 25/@r 0 0 30/@r;
  }

  header strong {
    font-size: 30/@r;
    font-family: "微软雅黑";
    line-height: 38/@r;
    color: #333;
    position: absolute;
    top: 25/@r;
    left: 50%;
    transform: translateX(-50%);
  }

  .queryBox {
    position: fixed;
    top: 88/@r;
    height: 100/@r;
    left: 0;
    width: 100%;
    padding: 10/@r 50/@r;

  }

  .queryBox > div {
    border: 1px solid #ccc;
    height: 80/@r;
    -webkit-border-radius: 40/@r;
    -moz-border-radius: 40/@r;
    border-radius: 40/@r;
    overflow: hidden;
  }

  .queryBox i {
    float: left;
    width: 40/@r;
    height: 40/@r;
    background: url("../assets/img/hotel/searchFood.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 20/@r 0 0 20/@r;
  }

  .btnBox {
    overflow: hidden;
  }

  .btnBox > input {
    float: left;
    width: 100%;
    border: none;
    padding: 20/@r 10/@r;
    font-size: 27/@r;
    line-height: 40/@r;

  }

  section {
    position: fixed;
    top: 188/@r;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    padding-bottom: 30/@r;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
  }

  .cityList strong {
    font-size: 32/@r;
    line-height: 70/@r;
    font-family: "微软雅黑";
    background-color: #f5f5f5;
    display: block;
    padding: 0 30/@r;
    color: #aaa;
  }

  .cityList a,
  .queryCityList li {
    font-size: 28/@r;
    line-height: 80/@r;
    margin: 0 50/@r 0 30/@r;
    border-bottom: .5px solid #f0f0f0;
    color: #000;
    display: block;
  }

  .cityList div > a:last-of-type {
    border-bottom: none;
  }

  .footer {
    font-size: 28/@r;
    line-height: 3;
    font-family: "微软雅黑";
    color: #999;
    margin-top: 10/@r;
    text-align: center;
    border-top: 1/@r solid #ccc;
  }

  .titleList {
    position: fixed;
    z-index: 100;
    bottom: 100/@r;
    right: 6/@r;
  }

  .titleList li {
    font-size: 20/@r;
    padding: 5/@r;
    font-family: "微软雅黑";
    text-align: center;
    color: #ccc;
  }

  .titleList li.active {
    color: #0bb20c;
  }

  .titleList li:last-of-type {
    width: 50/@r;
    height: 50/@r;
    background: url("../assets/img/home/goTop.png") no-repeat;
    -webkit-background-size:  100% 100%;
    background-size:  100% 100%;
    margin-top: 50/@r;
  }

  .itemName {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100/@r;
    height: 100/@r;
    margin: -50/@r 0 0 -50/@r;
    z-index: 100;
    background-color: #0bb20c;
    -webkit-border-radius: 50/@r;
    -moz-border-radius: 50/@r;
    border-radius: 50/@r;
    font-size: 50/@r;
    color: #fff;
    line-height: 100/@r;
    font-weight: bold;
    text-align: center;
  }

  .queryCityList {
    position: fixed;
    top: 188/@r;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: auto;
    background-color: #fff;
    border-top: 1/@r solid #f5f5f5;
    z-index: 101;
  }

</style>
