<template>
  <div>

    <div class="header">
      <!--费用说明-->
      <div >
        <!--img-->
        <div class="ImageLeft">{{commentsOnTourists.ts_mu_Name}}</div>
          <span class="commentsOnTourists">
             <div class="commentsOnTouristsCont">
               <div class="comments1"></div>
               <div class="comments2"></div>
               <div class="comments3"></div>
             </div>
          </span>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: mapGetters([

    ]),
    data() {
      return {
        costDescription:'',
      }
    },
    created(){
      if(JSON.parse(sessionStorage.getItem('commentsOnTourists'))){
        this.commentsOnTourists=JSON.parse(sessionStorage.getItem('commentsOnTourists'))
      }
    },
    methods:{
      initData() {
      },
      search() {
        this.initData()
      }
    },
  }
</script>
<style scoped type="text/less" lang="less">
  @r: 30rem;
  .header{
    padding: 20/@r;
  }
  .ImageLeft{
    height: 100/@r;
    width: 100/@r;
    margin: 10/@r;
    padding: 10/@r 20/@r 0/@r 20/@r;
    background: url("../../assets/img/productChara/imgLeft.png") no-repeat;
    background-size:100/@r 100/@r ;
    text-align: center;
    color: white;
    font-size:26/@r;
    font-weight: bold;
  }
  .commentsOnTourists{
    height: 100/@r;
    position: relative;
    top:-105/@r;
    left: 150/@r;
    width: 75%;
    background-color: orange;
  }
  .commentsOnTouristsCont{
    width:80%;
    height: 200/@r;
    border:1/@r solid black;
  }
  .comments1{
    float: left;
    width: 25%;
    height: 50/@r;
    background-color: orange;
  }
  .comments2{
    float: left;
    width: 50%;
    height: 50/@r;
   background-color: green;
  }
  .comments3{
    float: left;
    width: 25%;
    height: 50/@r;
   background-color: gainsboro;
  }




</style>
