<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>选择职业</strong>
    </header>
    <section>
      <div class="educationList">
        <a href="javascript:;" v-for="item,index in educationList" @click="changeEducation(item)">{{item.ts_jb_Name}}</a>
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
      'educationList'
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
//      学历
      initData() {
        let selectJob = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ui_jb_ParentID": "39"
        }
        this.$store.dispatch('initEducation', selectJob)
          .then(() => {
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
//      选择学历
      changeEducation(item) {
        this.$store.commit('deucationObj', item);
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
    padding: 20/@r 30/@r;
  }

  .educationList {
    font-size:28/@r;
    font-family:"微软雅黑";
    line-height:3;
  }

  .educationList > a {
    display: block;
    text-indent: 20/@r;
    color: #333;
    border-bottom: 1/@r solid #f0f0f0;
  }

  .educationList > a:last-of-type {
    border: none;
  }


</style>
