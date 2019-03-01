<template>
  <div>
    <header class="clearfix">
      <div class="leftIcon" @click="backPage"></div>
      <strong class="filmTitleName">全部评论</strong>
    </header>
    <section>

      <!--评论-->
      <div class="filmComment">
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
      <div class="filmFooterCancel">取消</div>
      <img  class="filmFooterImg" src="../../assets/img/movie/fabu.png">
      <div class="filmFooterInput">
        <input type="text" value=""/>
      </div>


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
  .filmBack{
    position: absolute;
    top:15/@r;
    left:15/@r;
  }
  header {
    background-color: #2dbb55;
    height: 88/@r;
    position: relative;
    padding: 14/@r 30/@r 13/@r 26/@r;
  }
  .leftIcon {
    background: url("../../assets/img/movie/jiao.png") no-repeat;
    height:55/@r;
    width: 55/@r;
    position: relative;
    top:-10/@r;
  }
  .filmTitleName{
    position: absolute;
    font-size: 35/@r;
    left:40%;
    top:15/@r;
    color: #fff;
  }
  section {
    width: 100%;
    background-color: #fff;
    position: relative;
    padding: 10/@r 10/@r 10/@r 10/@r;
  }

  .filmComment{
    padding:40/@r 20/@r 0/@r 20/@r ;
  background-color: #fff;
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
    padding:0/@r 0/@r 5/@r 10/@r;
    font-size: 22/@r;
    border-bottom: 1/@r solid #d8d9de;
  }
  .filmFooter{
    height:120/@r;
    background-color: #f5f5f5;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    /*padding: 20/@r 0/@r 0/@r 20/@r;*/
  }
  /*.filmFooter>input{*/
    /*margin-left: 30/@r;*/
    /*height: 64/@r;*/
    /*width: 520/@r;*/
 /*position: relative;*/
    /*left: -30/@r;*/
    /*top:40/@r;*/
    /*border-top-right-radius: 45/@r;*/
    /*border-bottom-right-radius: 45/@r;*/
    /*border-top-left-radius: 45/@r;*/
    /*border-bottom-left-radius: 45/@r;*/

  /*}*/
  .filmFooter>img{
    margin-top: 10/@r;
    margin-left: 10/@r;

  }
  .filmFooterCancel{
    float: left;
    margin-top: 10/@r;
    margin-left: 20/@r;
    font-size: 25/@r;
    color: #c5c3c3;
  }
  .filmFooterImg{
    float: right;
    margin-right: 20/@r;
    height: 40/@r;
    width: 100/@r;
  }

  .filmFooterInput{
    clear: both;
  }
  .filmFooterInput>input{
    width:80% ;
    height:50/@r;
    margin-left: 80/@r;
    border-top-right-radius: 15/@r;
    border-bottom-right-radius: 15/@r;
    border-top-left-radius: 15/@r;
    border-bottom-left-radius: 15/@r;
    background-color: #c5c3c3;
  }

</style>
