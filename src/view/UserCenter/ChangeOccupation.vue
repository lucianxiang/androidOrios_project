<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>选择职业</strong>
    </header>
    <section>
      <div class="occupationList">
        <dl v-for="item,index in occupationList">
          <dt>{{item.label}}</dt>
          <dd v-for="ite,index in item.children" @click="changeOccupation(ite)">{{ite.label}}</dd>
        </dl>
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
      'occupationList'
    ]),
    components: {
      Toast,
    },
    data() {
      return {
        showErr: false,
        errCon: '',
      }
    },
    created() {
      this.initData();
    },
    methods: {
//      返回上一层
      goTopPage() {
        this.$router.go(-1);
      },
//      职业
      initData() {
        let selectJob = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "parentID": "38",//38返回职业  39返回学历 45结算币种 46公司规模 70经营范围 82评分类型 87维护app
        };
        this.$store.dispatch('initOccupation', selectJob)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
//      选择职业
      changeOccupation(item){
        this.$store.commit('occupationObj',item);
        this.$router.go(-1);
      },
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
    padding: 20/@r 0;
    -webkit-overflow-scrolling: touch;
  }

  .occupationList {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:3;

  }

  dt {
    text-indent: 30/@r;
    background-color: #999;
    color: #fff;
  }

  .occupationList dd {
    padding: 0 60/@r;
    border-bottom: 1/@r solid #ccc;
  }

  .occupationList > dl > dd:last-of-type {
    border: none;
  }



</style>
