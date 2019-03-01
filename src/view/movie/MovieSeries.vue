<template>
  <div>
    <header class="clearfix">
        <div class="leftIcon">
        <img class="leftIconOne"  @click="backPage" src="@/assets/img/movie/jiao.png">
        <img  class='leftIconTwo' src="@/assets/img/movie/film.png">
      </div>
        <span class="title" :class="{active:index==meat}" v-for="item,index in titles" @click="changeTitle(index)">{{item}}</span>
        <img  class='leftIconThree' src="@/assets/img/movie/ewm.png">
    </header>
    <!--频道内容-->
    <section>
      <ul>
        <li v-for="i,index in  channelContent">
          <div class="filmChannels" v-for="it in i.src">
            <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3727130406,242420679&fm=26&gp=0.jpg">
            <div>{{it}}</div>
          </div>
          <!--<div class="filmChannels">-->
            <!--<img src="@/assets/img/movie/channel1.png">-->
            <!--<div>创意</div>-->
          <!--</div>-->
          <!--<div class="filmChannels">-->
            <!--<img src="@/assets/img/movie/channel1.png">-->
            <!--<div>创意</div>-->
          <!--</div>-->
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Rater} from 'vux'
  export default {
    computed: mapGetters([

    ]),
    components: {

    },
    data() {
      return {
        meat:2,
        channelContent:[
          {src:['创意','励志','爱情']},
          {src:['动作','动画','运动']},
          {src:['动作','动画','运动']}
          ],
        titles:['首页','频道','系列','教育']
      }
    },
    created(){

    },
    methods: {
      backPage(){
        this.$router.go(-1)
      },
     changeTitle(index){
       this.meat=index;
       if(index==2){
         this.$router.push({
           name: 'MovieSeries', query: {
             id: '',
           }
         })
       }else if(index==1){
         this.$router.push({
           name: 'MovieChannel', query: {
             id: '',
           }
         })
       }
     },
      initData(){
        let options = {
          "loginUserID": "huileyou",  //惠乐游用户ID
          "loginUserPass": "123",  //惠乐游用户密码
          "operateUserID": "",//操作员编码
          "operateUserName": "",//操作员名称
          "pcName": "",  //机器码
          "vf_fm_ID": "",//视频编号
          "fromDate": "2017-05-03",//日期从
          "toDate": "2017-05-05",//日期到
          "page": 1,//页码
          "rows": 20//条数
        };
        this.$store.commit('showLoading')
        this.$store.dispatch('mobileMovieDetails',options)
      },
      search() {
        this.initData(

        )
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: relative;
    padding: 24/@r 30/@r 23/@r 26/@r;
  }
  .leftIcon {
    float: left;
  }
 .leftIconOne{
   margin-top: -25/@r;
 }
  .leftIconTwo{
    margin-top: -15/@r;
    height:65/@r;
  }
  .title1{
    color: white;
    font-size: 30/@r;
    margin-left: 45/@r;
  }
  .title{
   color: white;
   font-size: 30/@r;
   margin-left: 25/@r;
 }
  .title.active{
    color: #dd7015;
  }
  .leftIconThree{
    float: right;
    margin-top: -26/@r;
  }
  .homeIcon {
    float: left;
    width: 41/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/homeIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 33/@r;
  }
  .searchIcon {
    width: 34/@r;
    height: 41/@r;
    background: url("../../assets/img/nearby/searchIcon.png") no-repeat;

    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
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

  .rightIcon {
    float: right;
  }

  .centerIcon {
    float: left;
    width: 32/@r;
    height: 37/@r;
    background: url("../../assets/img/home/userIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 2/@r;
    margin-right: 30/@r;
  }
  .menuIcon {
    float: left;
    width: 40/@r;
    height: 34/@r;
    background: url("../../assets/img/home/menuIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-top: 3/@r;
  }
  section {
    background-color: #fff;
    position: relative;
    /*padding-bottom: 100/@r;*/
    padding: 40/@r 10/@r 10/@r 10/@r;
  }
 .filmChannels{
   width: 20%;
   margin-left:70/@r;
   float: left;
 }
 .filmChannels>img{
   height: 150/@r;
   width: 150/@r;
   border-radius: 15/@r;
 }
  .filmChannels>div{
    font-size: 30/@r;
    padding: 10/@r 0/@r 10/@r 0/@r;
    text-align: center;
  }
</style>
