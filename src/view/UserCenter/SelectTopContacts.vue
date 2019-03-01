<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>选择出游人</strong>
      <div class="addIcon" @click="goAddTopContacts"></div>
    </header>
    <section>
      <ul class="contactsList">
        <li class="clearfix" v-for="item,index in newArr" @click="changeOutPeople(item,index)">
          <div class="contactsInfo">
            <i class="selectState" :class="{active: item.isActive}"></i>
            <strong>{{item.ui_uc_Name}}</strong>
            <span>{{item.ui_uc_CertNo}}</span>
          </div>
          <div class="operation">
            <i class="update" @click.stop="goUpdate(item)"></i>
          </div>
        </li>
      </ul>
      <p v-show="!usedContactsList.length">暂无数据...请添加</p>

    </section>
    <a href="javascript:;" class="submit" v-show="usedContactsList.length" @click="changeSubmit">确定</a>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
    <toast v-model="showSuc" type="success" :text="sucCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Toast} from 'vux'
  import {deepClone} from '@/assets/js/public'


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
        newArr: [],
        peopleList: [],
        peopleNum: 0,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initData()
      if (JSON.parse(localStorage.getItem('peopleList')) && JSON.parse(localStorage.getItem('peopleList')).length) {
        this.peopleList = JSON.parse(localStorage.getItem('peopleList'));
      }
      if (this.$route.query.num) {
        this.peopleNum = this.$route.query.num
      }
    },
    methods: {
      goTopPage() {
        this.$router.go(-1)
      },
      //添加常用联系人
      goAddTopContacts() {
        this.$router.push({name: 'AddTopContacts'})
      },
      goUpdate(item) {
        this.$router.push({name: 'AddTopContacts', query: {id: 1}});
        sessionStorage.setItem('updateTopContacts', JSON.stringify(item))
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
            this.newArr = deepClone(this.usedContactsList);
            if (this.peopleList.length) {
              for (let i = 0; i < this.peopleList.length; i++) {
                this.newArr.filter(item => {
                  if (item.ui_uc_ID == this.peopleList[i].ui_uc_ID) {
                    item.isActive = this.peopleList[i].isActive
                  }
                })
              }
            }
            this.$store.commit('hideLoading');
          }, err => {
            this.$store.commit('hideLoading');
            this.showErr = true;
            this.errCon = err;
          })
      },
      changeOutPeople(item, index) {
        item.isActive = !item.isActive;
      },
      changeSubmit() {
        let arr = [];
        arr = this.newArr.filter(item => {
          if (item.isActive) {
            return true;
          }
          return false
        })
        if (arr.length ==0) {
          this.showErr = true;
          this.errCon = '请至少选择一个';
          return
        }
        localStorage.setItem('peopleList', JSON.stringify(arr));
        this.$router.go(-1);
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

  section {
    position: fixed;
    top: 88/@r;
    left: 0;
    right: 0;
    bottom: 88/@r;
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
    width: 120/@r;
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
    margin-top: 7/@r;
  }

  .selectState {
    float: left;
    width: 40/@r;
    height: 40/@r;
    border: 2/@r solid #ccc;
    -webkit-border-radius: 20/@r;
    -moz-border-radius: 20/@r;
    border-radius: 20/@r;
    margin-top: 3/@r;
    margin-right: 17/@r;
  }

  .selectState.active {
    border-color: #f4ac5b;
    background-color: #f4ac5b;
  }

  .selectState.active:before {
    content: '';
    width: 10/@r;
    height: 25/@r;
    border-right: 3/@r solid #fff;
    border-bottom: 3/@r solid #fff;
    display: block;
    transform: rotate(45deg);
    margin: 0 auto;
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

  section > p {
    font-size: 28/@r;
    color: #999;
    text-align: center;
    line-height: 2;
  }

  .submit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 30/@r;
    line-height: 88/@r;
    background-color: #ffa948;
    color: #fff;
  }

</style>
