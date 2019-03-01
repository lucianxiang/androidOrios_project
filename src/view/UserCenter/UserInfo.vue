<template>
  <div>
    <header>
      <div class="leftIcon" @click="goTopPage"></div>
      <strong>个人资料</strong>
    </header>
    <section>
      <div class="headerBox">
        <div class="headPortraitRow clearfix" @click="uplodeImg">
          <div class="headImgBox">
            <img v-show="userInfoObj2.sm_ui_HeadImage" :src="userInfoObj2.sm_ui_HeadImage" alt="">
          </div>
          <div class="rightIcon"></div>
          <span>点击更换头像</span>
        </div>
        <div class="nickName clearfix">
          <x-input title="昵称" v-model="userInfoObj2.sm_ui_Name" placeholder="请输入昵称"></x-input>
        </div>
      </div>
      <div class="otherAllInfo">
        <div class="nickName clearfix">
          <x-input title="身份证号" v-model="userInfoObj2.sm_ui_CertNo" placeholder="请输入您的身份证号"></x-input>
        </div>
        <div class="nickName clearfix">
          <x-input title="手机号码" v-model="userInfoObj2.sm_ui_Phone" type="number" placeholder="请输入您的手机号"></x-input>
        </div>
        <div class="nickName clearfix" @click="showDateTime = true">
          <strong>生日</strong>
          <span>{{userInfoObj2.sm_ui_Birthday}}</span>
          <div class="rightIcon"></div>
          <datetime
            v-show="false"
            :show.sync="showDateTime"
            v-model="userInfoObj2.sm_ui_Birthday"
            format="YYYY-MM-DD"
            start-date="1900-01-01"
            :end-date="endTime"
            placeholder="请选择"
          >
          </datetime>
        </div>
        <div class="nickName clearfix">
          <strong>性别</strong>
          <div class="inputBox clearfix">
            <div class="userSex" v-for="item,index in sexList" @click="changeSex(item,index)">
              <div class="radioBox" :class="{active: index == userInfoObj2.sm_ui_Sex}"><i></i></div>
              <span>{{item.label}}</span>
            </div>
          </div>
        </div>
        <div class="nickName clearfix">
          <strong>婚姻状况</strong>
          <div class="inputBox clearfix">
            <div class="userSex" v-for="item,index in marriageList" @click="changeMarriage(item,index)">
              <div class="radioBox" :class="{active: index == userInfoObj2.sm_ui_MarryStatus}"><i></i></div>
              <span>{{item.label}}</span>
            </div>
          </div>
        </div>
        <div class="nickName clearfix">
          <x-input title="邮箱" v-model="userInfoObj2.sm_ui_Email" type="email" placeholder="用于接收信息"></x-input>
        </div>
        <div class="nickName clearfix" @click="goPermanentResidence">
          <strong>常住地</strong>
          <span
            v-if="cityData.length"
          >{{cityData.length ? cityData[0].sm_af_AreaName + ' - ' + cityData[1].sm_af_AreaName + ' - ' + cityData[2].sm_af_AreaName : '请选择'}}</span>
          <span
            v-if="userInfoObj2.sm_ui_ProviceName&&!cityData.length"
          >{{userInfoObj2.sm_ui_ProviceName ? userInfoObj2.sm_ui_ProviceName + ' - ' + userInfoObj2.sm_ui_CityName + ' - ' + userInfoObj2.sm_ui_CountyName : '请选择'}}</span>
          <div class="rightIcon"></div>
        </div>
        <div class="nickName clearfix">
          <!--<group>-->
            <x-textarea title="详细地址" v-model="userInfoObj2.sm_ui_Address"></x-textarea>
          <!--</group>-->
          <!--<strong>详细地址</strong>-->
          <!--<div class="inputBox">-->
            <!--<textarea name="" id="" cols="30" rows="10" v-model="userInfoObj2.sm_ui_Address"></textarea>-->
          <!--</div>-->
        </div>
        <div class="nickName clearfix" @click="goOccupation">
          <strong>职业</strong>
          <span
            v-if="occupationObj.label"
          >{{occupationObj.label ? occupationObj.label : '请选择'}}</span>
          <span
            v-if="userInfoObj2.sm_ui_JobName&&!occupationObj.label"
          >{{userInfoObj2.sm_ui_JobName ? userInfoObj2.sm_ui_JobName : '请选择'}}</span>
          <div class="rightIcon"></div>
        </div>
        <div class="nickName clearfix" @click="goEducation">
          <strong>学历</strong>
          <span
            v-if="deucationObj.ts_jb_Name"
          >{{deucationObj.ts_jb_Name ? deucationObj.ts_jb_Name : '请选择'}}</span>
          <span
            v-if="userInfoObj2.sm_ui_EducationName&&!deucationObj.ts_jb_Name"
          >{{userInfoObj2.sm_ui_EducationName ? userInfoObj2.sm_ui_EducationName : '请选择'}}</span>
          <div class="rightIcon"></div>
        </div>
      </div>
      <div class="updateSubmit">
        <a href="javascript:;" @click="updateSubmit">确认修改</a>
      </div>
    </section>
    <div class="imgHearBox" v-show="showUplodeImg">
      <div class="imgHear">
        <strong>上传头像</strong>
        <div class="imgBox">
          <a href="javascript:;" class="file">
            <input type="file" name="" ref="upload">
          </a>
          <img :src="userInfoObj2.sm_ui_HeadImage" alt="">
        </div>
        <a href="javascript:;" @click="completeUplode">确定</a>
      </div>
    </div>
    <toast v-model="showErr" type="cancel" :text="errCon"></toast>
    <toast v-model="showSuc" type="success" :text="sucCon"></toast>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {Datetime, Toast, XInput, Group,XTextarea } from 'vux'
  import {deepClone, isEmil, isPhoneNum, isCardNo, toZear2, getNewStr} from '@/assets/js/public'


  export default {
    computed: mapGetters([
      'cityData',
      'occupationObj',
      'deucationObj',
      'userInfoObj'
    ]),
    components: {
      Datetime,
      Toast,
      XInput,
      Group,
      XTextarea
    },
    data() {
      return {
        sexList: [
          {
            value: 0,
            label: '男'
          },
          {
            value: 1,
            label: '女'
          }
        ],
        marriageList: [
          {
            value: 0,
            label: '未婚'
          },
          {
            value: 1,
            label: '已婚'
          }
        ],
        radioIndex: 0,
        happlyDay: '',
        marriageIndex: 0,
        userInfo: {},
        showErr: false,
        errCon: '',
        userInfoObj2: {},
        showSuc: false,
        sucCon: '',
        endTiem: '',
        showImage: true,
        showUplodeImg: false,
        showDateTime: false
      }
    },
    created() {
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      }
      if (!this.userInfoObj.sm_ui_HeadImage) {
        this.initData();
      } else {
        this.userInfoObj2 = deepClone(this.userInfoObj);
      }

      this.getDateStr();
    },
    methods: {
      uplodeImg() {
        this.showUplodeImg = true;
        this.uploaNode();
      },
      completeUplode() {
        this.showUplodeImg = false;
      },
      getDateStr() {
        let d = new Date();
        let y = d.getFullYear();
        let m = d.getMonth() + 1;
        let r = d.getDate();
        this.endTime = y + '-' + toZear2(m) + '-' + toZear2(r);
      },
//      返回上一页
      goTopPage() {
        this.$router.go(-1)
      },
      initData() {
        let selectUser = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "sm_ui_ID": this.userInfo.sm_ui_ID ? this.userInfo.sm_ui_ID : '',//标识
        };
        this.$store.dispatch('initUserInfo', selectUser)
          .then(() => {
            this.userInfoObj2 = deepClone(this.userInfoObj);
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
//      选择性别
      changeSex(item, index) {
        this.userInfoObj2.sm_ui_Sex = index;
      },
//      选择婚姻状况
      changeMarriage(item, index) {
        this.userInfoObj2.sm_ui_MarryStatus = index;
      },
//      登录
      loginSubmit() {
        let loginInfo = JSON.parse(localStorage.getItem('userParams'));
        let userLogin = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "userID": loginInfo.number,//用户编码
          "password": loginInfo.passworld//密码
        };
        this.$store.dispatch('loginSubmit', userLogin)
        .then(data => {
          sessionStorage.setItem('userInfo', JSON.stringify(data.data));
          localStorage.setItem('userInfo', JSON.stringify(data.data));
        }, err => {
          this.errCon = err;
          this.showErr = true;
        })
      },
//      修改提交
      updateSubmit() {
        if (!isPhoneNum(this.userInfoObj2.sm_ui_Phone)) {
          this.showErr = true;
          this.errCon = '请输入正确的手机号!!';
          return
        }
        if (!isEmil(this.userInfoObj2.sm_ui_Email)) {
          this.showErr = true;
          this.errCon = '请输入正确的邮箱!!';
          return
        }
        if (!isCardNo(this.userInfoObj2.sm_ui_CertNo)) {
          this.showErr = true;
          this.errCon = '请输入正确的身份证号!!';
          return
        }
        let updateUser = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {
            "sm_ui_ID": this.userInfoObj2.sm_ui_ID,//标识
            "sm_ui_Name": this.userInfoObj2.sm_ui_Name,//用户姓名
            "sm_ui_HeadImage": this.userInfoObj2.sm_ui_HeadImage,//用户头像
            "sm_ui_JobID": this.occupationObj.label ? this.occupationObj.value : this.userInfoObj2.sm_ui_JobID,//职业编码
            "sm_ui_EducationID": this.deucationObj.ts_jb_Name ? this.deucationObj.ts_jb_ID : this.userInfoObj2.sm_ui_EducationID,//学历编码
            "sm_ui_RoleID": this.userInfoObj2.sm_ui_RoleID,//用户角色
            "sm_ui_Phone": this.userInfoObj2.sm_ui_Phone,//手机号
            "sm_ui_Birthday": this.userInfoObj2.sm_ui_Birthday,//生日
            "sm_ui_Sex": this.userInfoObj2.sm_ui_Sex,//性别(0女1男)
            "sm_ui_Email": this.userInfoObj2.sm_ui_Email,//邮箱
            "sm_ui_Provice": this.cityData.length ? this.cityData[0].sm_af_AreaID : this.userInfoObj2.sm_ui_Provice,//省
            "sm_ui_City": this.cityData.length ? this.cityData[1].sm_af_AreaID : this.userInfoObj2.sm_ui_City,// 市
            "sm_ui_County": this.cityData.length ? this.cityData[2].sm_af_AreaID : this.userInfoObj2.sm_ui_County,//县
            "sm_ui_Address": this.userInfoObj2.sm_ui_Address,//详细地址
            "sm_ui_MarryStatus": this.userInfoObj2.sm_ui_MarryStatus,//婚姻状况(0未婚1已婚)
            "sm_ui_CertNo": this.userInfoObj2.sm_ui_CertNo,//身份证号码
          }
        }
        this.$store.dispatch('updateUserInfoSubmit', updateUser)
          .then(suc => {
            this.showSuc = true;
            this.sucCon = suc;
            this.initData();
            this.loginSubmit()
            this.$router.push({name: 'UserCenter'})
//            localStorage.setItem('userInfo', JSON.stringify(this.userInfoObj))
          }, err => {
            this.showErr = true;
            this.errCon = err;
          })
      },
//      常住地
      goPermanentResidence() {
        this.$store.commit('initUserInfo', this.userInfoObj2)
        this.$router.push({name: 'ChangePermanentResidence'})
      },
//      选择职业
      goOccupation() {
        this.$store.commit('initUserInfo', this.userInfoObj2)
        this.$router.push({name: 'ChangeOccupation'})
      },
//      选择学历
      goEducation() {
        this.$store.commit('initUserInfo', this.userInfoObj2)
        this.$router.push({name: 'ChangeEducation'})
      },

      //图片上传OSS
      uploadToOSS(file) {
        return new Promise((relove, reject) => {
          var fd = new FormData();
          fd.append("fileToUpload", file);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", getNewStr + "/OSSFile/PostToOSS");
          xhr.send(fd);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText) {
                var data = xhr.responseText
                relove(JSON.parse(data))
              }
            } else {
            }
          }
        })
      },
      //上传图片
      uploaNode() {
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              this.$store.commit('showLoading');
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadToOSS(this.$refs.upload.files[i])
                  .then(data => {
                    if (Number(data.resultcode) == 200) {
                      this.$store.commit('hideLoading');
                      this.userInfoObj2.sm_ui_HeadImage = data.data;
                      this.showSuc = true;
                      this.sucCon = data.resultcontent;
                    } else {
                      this.$store.commit('hideLoading');
                      this.showErr = true;
                      this.errCon = data.resultcontent;
                    }

                  })
              }
            })
          }
        }, 30)
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
    background-color: #ffa948;
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
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #e6e6e6;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .rightIcon {
    float: right;
    width: 13/@r;
    height: 23/@r;
    background: url("../../assets/img/hotel/rightIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headerBox {
    padding: 22/@r 30/@r 0 50/@r;
    border-bottom: 16/@r solid #e6e6e6;
    background-color: #fff;
  }

  .headPortraitRow {
    height: 103/@r;
    border-bottom: 1/@r solid #dadedd;
  }

  .headPortraitRow > span {
    float: right;
    font-size: 25/@r;
    font-family: "微软雅黑";
    line-height: 2;
    margin: 24/@r 10/@r 0 0;
    color: #999;
  }

  .headImgBox {
    width: 80/@r;
    height: 80/@r;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    float: left;
    overflow: hidden;
    background: url("../../assets/img/home/hlyIcon.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }

  .headImgBox > img {
    width: 80/@r;
    height: 80/@r;
  }

  .headPortraitRow > .rightIcon {
    margin-top: 35/@r;
  }

  .nickName {
    min-height: 84/@r;
    overflow: hidden;
  }

  .nickName > strong {
    float: left;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 84/@r;
    margin-right: 45/@r;
    display: inline-block;
    color: #383838;
  }

  .inputBox {
    overflow: hidden;
  }

  .nickName input {
    float: left;
    width: 100%;
    border: none;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 84/@r;
    color: #383838;
    background-color: transparent;
  }

  .nickName > .rightIcon {
    margin-top: 29/@r;
  }

  .otherAllInfo {
    padding: 0 30/@r 0 50/@r;
    background-color: #fff;
  }

  .otherAllInfo > .nickName {
    border-bottom: 1/@r solid #dadedd;
  }

  .otherAllInfo > .nickName:last-of-type {
    border: none;
  }

  .userSex {
    float: left;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 84/@r;
    margin-right: 50/@r;
  }

  .radioBox {
    float: left;
    width: 44/@r;
    height: 44/@r;
    border: 3/@r solid #e5e5e5;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-top: 19/@r;
  }

  .radioBox > i {
    display: block;
    width: 14/@r;
    height: 14/@r;
    background-color: #ffa948;
    margin: 12/@r auto 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    display: none;
  }

  .radioBox.active > i {
    display: block;
  }

  .userSex > span {
    float: left;
    margin-left: 15/@r;
    color: #383838;
  }

  .nickName > span {
    float: left;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 84/@r;
    color: #999;
  }

  .updateSubmit {
    padding: 55/@r 60/@r 153/@r;
  }

  .updateSubmit > a {
    font-size: 33/@r;
    font-family: "微软雅黑";
    line-height: 98/@r;
    text-align: center;
    background-color: #ffa948;
    color: #fff;
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    box-shadow: 2/@r 2/@r 3/@r #000;
  }

  .nickName textarea {
    border: none;
    outline: none;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 1.5;
    height: 150/@r;
    resize: none;
    padding-top: 20/@r;
    width: 100%;
  }

  .vux-datetime {
    text-align: left !important;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 84/@r;
    color: #999;
  }

  .imgHearBox {
    background-color: rgba(0, 0, 0, .4);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .imgHear {
    width: 70%;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-border-radius: 10/@r;
    -moz-border-radius: 10/@r;
    border-radius: 10/@r;
    padding-top: 20/@r;
  }

  .imgHear > strong {
    font: 28/@r/3 "微软雅黑";
    display: block;
    text-align: center;
    color: #333;
  }

  .imgHear > a {
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 3;
    display: block;
    text-align: center;
    color: #f30;
    border-top: 1/@r solid #ccc;
  }

  .imgBox {
    padding: 20/@r 30/@r;
  }

  .imgBox img {
    height: 200/@r;
    display: block;
    margin: 10/@r auto 0;
  }

  .nickName > span {
    float: left;
    font-size: 28/@r;
    font-family: "微软雅黑";
    line-height: 84/@r;
    margin-right: 45/@r;
    display: inline-block;
    color: #383838;
  }

  .weui-cell {
    padding-left: 0 !important;
  }

</style>
