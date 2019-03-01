<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>常用联系人</strong>
      <div class="addIcon" @click="goAddTopContacts"></div>
    </header>
    <section>
      <ul class="contactsList">
        <li class="clearfix" v-for="item,index in usedContactsList">
          <div class="contactsInfo">
            <strong>{{item.ui_uc_Name}}</strong>
            <span>{{item.ui_uc_CertNo}}</span>
          </div>
          <div class="operation">
            <i class="update" @click="updateRouter(item)"></i>
            <i class="delete" @click="deleteSubmit(item)"></i>
          </div>
        </li>
      </ul>
    </section>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
    <toast v-model="showSuc" type="success" :text="sucCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'

  export default {
    components: {
      Toast,
    },
    computed: mapGetters([
      'usedContactsList'
    ]),
    data() {
      return {
        errCon: '',
        showErr: false,
        sucCon: '',
        showSuc: false,
        userInfo: {},
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.initData();
    },
    methods: {
      goTopPage() {
        this.$router.go(-1)
      },
      initData() {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "ui_uc_UserInfoID": this.userInfo.sm_ui_ID,//当前登录账号ID（必传项）
        }
        this.$store.commit('showLoading');
        this.$store.dispatch('initUsedContacts', options)
          .then(() => {
            this.$store.commit('hideLoading');
          }, err => {
            this.$store.commit('hideLoading');
            this.showErr = true;
            this.errCon = err;
          })
      },
      //添加常用联系人
      goAddTopContacts() {
        this.$router.push({name: 'AddTopContacts'})
      },
      //修改
      updateRouter(item) {
        this.$router.push({name: 'AddTopContacts', query: {id: 1}})
        sessionStorage.setItem('updateTopContacts',JSON.stringify(item))
      },
      //删除
      deleteSubmit(item) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": this.userInfo.token,
          "data": {
            "ui_uc_ID": item.ui_uc_ID,//常用联系人ID
          }
        }
        this.$store.dispatch('deleteTopContacts', options)
          .then(suc => {
            this.showSuc = true;
            this.sucCon = suc;
            this.initData();
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
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
    background-color: #ffa948;
    height: 88/@r;
    z-index: 2;
    box-shadow: 0 0 30/@r #999;
  }

  header > .leftIcon {
    width: 21/@r;
    height: 38/@r;
    background: url("../../assets/img/food/shouye_09.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: left;
    margin: 25/@r 0 0 30/@r;
  }

  header > strong {
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 38/@r;
    color: #fff;
    position: absolute;
    top: 25/@r;
    left: 50%;
    transform: translateX(-50%);
  }

  header > .addIcon {
    width: 32/@r;
    height: 32/@r;
    background: url("../../assets/img/userCenter/addIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
    margin: 30/@r 30/@r 0 0;
  }

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f8f7f7;
    overflow: auto;
  }

  .contactsList {
    margin-top: 10/@r;
  }

  .contactsList > li {
    background-color: #fff;
    padding: 30/@r;
    margin-bottom: 10/@r;
  }

  .contactsInfo {
    float: left;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 44/@r;
    color: #2e2e2e;
  }

  .contactsInfo strong {
    float: left;
    width: 98/@r;
    border-right: 2/@r solid #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .contactsInfo span {
    float: left;
    padding-left: 38/@r;
  }

  .operation {
    float: right;
  }

  .update {
    float: left;
    width: 33/@r;
    height: 35/@r;
    background: url("../../assets/img/userCenter/updateIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 54/@r;
    margin-top: 7/@r;
  }

  .delete {
    float: left;
    width: 36/@r;
    height: 36/@r;
    background: url("../../assets/img/userCenter/deleteIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 1/@r;
    margin-top: 4/@r;
  }

</style>
