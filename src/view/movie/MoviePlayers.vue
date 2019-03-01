<template>
     <div>
       <div class="backIocn"  @click="backPage"></div>
       <div class="filmTitle">
         <img src="../../assets/img/movie/bg.png" alt="">
         <video src="" width="100%" height="100%" class="filmPlayer"></video>
         <div class="filmTitlePlayIcon"></div>
     </div>
    <!--频道内容-->
    <section>
      <div class="filmIntr">
        <span>视频</span>
        <div class="filmIntrTitle">致我们即将逝去的青春</div>
        <em>简介：赵薇执导处女作</em>
        <div class="filmIntrImg">
          <img  src="../../assets/img/movie/btn.png"><p>120.9万</p>
        </div>
      </div>
      <!--评论-->
      <div class="filmComment">
        <span class="filmCommentSpan">评论</span>
        <div @click="allComment">36条评论></div>
        <ul>
          <li class="filmCommentLi">
            <img  src="../../assets/img/movie/commentImg.png">
            <div class="filmCommentLiDiv">
              <span>匿名用户</span>
              <p>2018.2.13</p>
              <div>
                之前看过，电影拍得非常好看，赵薇导演非常给力。
                之前看过，电影拍得非常好看，赵薇导演非常给力。
                之前看过，电影拍得非常好看，赵薇导演非常给力。
                之前看过，电影拍得非常好看，赵薇导演非常给力。
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
       <div class="filmFooter">
         <input type="text" value="   请输入您要发表的内容"/>
         <img  src="../../assets/img/movie/fabu1.png">
       </div>
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
      }
    },
    created(){

    },
    methods: {
      backPage(){
        this.$router.go(-1)
      },
      allComment(){
        this.$router.push({
          name: 'MovieAllComment', query: {
            id: '',
          }
        })
      },
      changeTitle(index){
        this.meat=index;
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
        // this.$vux.loading.show({
        //   text: '拼命加载中'
        // })
        this.$store.commit('showLoading')
        this.$store.dispatch('mobileMovieDetails',options)
          .then(()=>{
            this.$nextTick(()=>{
              this.$store.commit('hideLoading')
              // this.$vux.loading.hide()
            })
          })
      },
      search(){
        this.initData(

        )
      }
    }
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
  .backIocn{
    width: 52/@r;
    height: 52/@r;
    position: absolute;
    top:15/@r;
    left:15/@r;
    background: url("../../assets/img/movie/back.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    z-index: 1;
  }
  .leftIcon {
    float: left;
  }
  .leftIconOne{
    margin-top: -10/@r;
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
    margin-top: -10/@r;
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
    width: 100%;
    background-color: #fff;
    position: relative;
    padding: 40/@r 10/@r 10/@r 10/@r;
  }
  .filmTitle{
    height:450/@r;
    width: 100%;
    position: relative;
  }

  .filmTitle > img {
    width:  100%;
    height: 100%;
    position: absolute;
    top:  0;
    left: 0;
  }

  .filmTitlePlayIcon {
    width:150/@r;
    height: 150/@r;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: url("../../assets/img/movie/playIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .filmIntr{
    width: 100%;
    background-color: #fff;
    padding:0/@r 20/@r 0/@r 20/@r ;
    border-bottom: 1/@r solid #ebebee;
  }
  .filmIntr>span{
    margin-left:50/@r;
    font-size:30/@r;
  }
  .filmIntrTitle{
    width:100%;
    font-size:40/@r;
    font-weight:bold ;
    color: #605f60;
    padding: 20/@r 0/@r 10/@r 0/@r ;
  }
  .filmIntr>em{
    font-size:25/@r;
    color:#848484;
  }
  .filmIntrImg{
    padding: 20/@r 0/@r 10/@r 0/@r;
  }
  .filmIntrImg>p{
    font-size: 20/@r;
    position: relative;
    left: 50/@r;
    top:-35/@r;
  }
  .filmComment{
    padding:40/@r 20/@r 0/@r 20/@r ;
    background-color: #fff;
  }
  .filmCommentSpan{
    margin-left:40/@r ;
    font-size:30/@r;
  }
  .filmComment>div{
    float: right;
    font-size:25/@r;
  }
  .filmCommentLi{
    padding-top: 20/@r;
  }
  .filmCommentLi>img{
    /*float: left;*/
  }
 .filmCommentLiDiv{
   width:85%;
   /*float:left;*/
   position: relative;
   left:70/@r;
   top:-75/@r;
   margin-left:10/@r;
 }
  .filmCommentLiDiv>span{
    font-size:28/@r;
    margin-left: 10/@r;
  }
  .filmCommentLiDiv>p{
    float: right;
  }
  .filmCommentLiDiv>div{
    padding:5/@r 0/@r 5/@r 10/@r;
    font-size: 22/@r;
    border-bottom: 1/@r solid #d8d9de;
  }
  .filmFooter{
    height:96/@r;
    background-color: #2dbb55;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .filmFooter>input{
    margin-left: 60/@r;
    height: 64/@r;
    width: 520/@r;
    margin-top: 15/@r;
    border-top-right-radius: 45/@r;
    border-bottom-right-radius: 45/@r;
    border-top-left-radius: 45/@r;
    border-bottom-left-radius: 45/@r;
    color: green;
  }
  .filmFooter>img{
    margin-top: 20/@r;
    margin-left: 10/@r;

  }
</style>
