<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <div class="searchInput">
        <i></i>
        <input type="text" placeholder="请输入您想要的内容" v-model="keyword">
      </div>
      <a href="javascript:;" @click="submit">搜索</a>
    </header>
    <section>
      <div class="recommendSearch">
        <strong>菜系名称</strong>
        <div class="clearfix">
          <a href="javascript:;" v-for="item,index in searchHomeFilter.foodTypeList" :class="{active:index==foodTypeID}"
             @click="changeFoodTypeList(index,item)">{{item.fd_py_Name}}</a>
        </div>
      </div>
      <div class="recommendSearch">
        <strong>就餐人数</strong>
        <div class="clearfix">
          <a href="javascript:;" v-for="item,index in searchHomeFilter.usePersontList"
             :class="{active:index==usePersontID}" @click="changeUsePersont(index,item)">{{item.fd_py_Name}}</a>
        </div>
      </div>
      <div class="recommendSearch">
        <strong>分类</strong>
        <div class="clearfix">
          <a href="javascript:;" v-for="item,index in searchHomeFilter.catagoryList" :class="{active:index==catagoryID}"
             @click="changeCatagory(index,item)">{{item.fd_py_Name}}</a>
        </div>
      </div>
      <!--<div class="hotSearch">-->
      <!--<strong>热门搜索</strong>-->
      <!--<div class="clearfix">-->
      <!--<a href="javascript:;" v-for="item,index in 10">重庆刘一手火锅</a>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="historySearch">-->
      <!--<strong>历史搜索</strong>-->
      <!--<div class="clearfix">-->
      <!--<a href="javascript:;" v-for="item,index in 10">小龙坎火锅</a>-->
      <!--</div>-->
      <!--<i></i>-->
      <!--</div>-->
    </section>
    <div class="searchBtn clearfix">
      <a href="javascript:;" @click="clearAll">清空</a>
      <a href="javascript:;" @click="submit">确认</a>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: mapGetters([
      'searchHomeFilter'
    ]),
    data() {
      return {
        foodTypeID: 0,
        usePersontID: 0,
        catagoryID: 0,
        total: 0,
        keyword:'',
        isLoading: false,
        searchObj: {
          foodTypeID: '',
          usePersontID: '',
          catagoryID: ''
        }
      }
    },
    created() {
      this.searchFilter()
    },
    methods: {
      //清空
      clearAll(){
        this.foodTypeID = 0;
        this.usePersontID = 0;
        this.catagoryID = 0;
        for (let attr in this.searchObj) {
          this.searchObj[attr] = ''
        }
      },
      //确认
      submit(){
        this.$router.push({
          name: 'FoodDetails',
          query: {
            keyword:this.keyword,
            foodTypeID: this.searchObj.foodTypeID,
            usePersontID: this.searchObj.usePersontID,
            catagoryID: this.searchObj.catagoryID
          }
        })
      },
      //选中菜系
      changeFoodTypeList(index, item){
        this.foodTypeID = index;
        this.searchObj.foodTypeID = item.fd_py_ID
      },
      //选中就餐人数
      changeUsePersont(index, item){
        this.usePersontID = index;
        this.searchObj.usePersontID = item.fd_py_ID
      },
      //选中分类
      changeCatagory(index, item){
        this.catagoryID = index;
        this.searchObj.catagoryID = item.fd_py_ID
      },
      //初始化搜索数据
      searchFilter() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
        }
        return this.$store.dispatch('initFoodSearchFilter', options)
      },
      goTopPage() {
        this.$router.go(-1)
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .recommendSearch a.active {
    color: #fff;
    background: #2dbb55;
    font-size: 25/@r;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #2dbb55;
    height: 88/@r;
    padding: 17/@r 0 15/@r 30/@r;
  }

  .leftIcon {
    float: left;
    width: 19/@r;
    height: 35/@r;
    background: url("../../assets/img/productChara/leftIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 12/@r;
    margin-right: 23/@r;
  }

  .searchInput {
    width: 77%;
    float: left;
    height: 56/@r;
    background-color: #f0f0f0;
  }

  .searchInput > i {
    float: left;
    width: 34/@r;
    height: 32/@r;
    margin: 12/@r 0 0 10/@r;
    background: url("../../assets/img/food/searchIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .searchInput > input {
    padding: 0 10/@r;
    float: left;
    height: 56/@r;
    border: none;
    background-color: transparent;
    width: 90%;
    font-size: 22/@r;
    line-height: 56/@r;
    font-family: "微软雅黑";
  }

  header > a {
    float: left;
    width: 16%;
    text-align: center;
    font-size: 30/@r;
    line-height: 56/@r;
    font-weight: bold;
    font-family: "微软雅黑";
    color: #fff;
  }

  section {
    position: fixed;
    top: 88/@r;
    bottom: 90/@r;
    right: 0;
    left: 0;
    padding-top: 24/@r;
    overflow: auto;
    background-color: #fff;
  }

  section > div > strong {
    display: block;
    padding-left: 88/@r;
    font-size: 27/@r;
    line-height: 43/@r;
    font-family: "微软雅黑";
    color: #727272;
    background-color: #f6f6f6;
  }

  section > div > div {
    padding: 8/@r 79/@r 24/@r 88/@r;
    font-size: 28/@r;
    line-height: 44/@r;
    font-family: "微软雅黑";
  }

  section > div > div > a {
    padding: 0 10/@r;
    float: left;
    font-size: 25/@r;
    background-color: #f2f2f4;
    color: #404040;
    margin: 16/@r 37/@r 0 0;
  }

  .historySearch {
    position: relative;
  }

  .historySearch > i {
    position: absolute;
    right: 28/@r;
    top: 67/@r;
    width: 27/@r;
    height: 34/@r;
    background: url("../../assets/img/searchPage/deleteIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .searchBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 30/@r;
    line-height: 90/@r;
    font-family: "微软雅黑";
    background-color: #2dbb55;
  }

  .searchBtn > a {
    float: left;
    width: 50%;
    color: #fff;
    text-align: center;
  }

  .searchBtn > a:first-of-type {
    background-color: #f80;
  }
</style>
