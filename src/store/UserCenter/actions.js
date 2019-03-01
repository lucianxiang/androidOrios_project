import {postPromise, getNewStr} from '@/assets/js/public'

export default {
  //密码登录
  loginSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/Login', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //发送短信
  sendMessage({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/SendMessage', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //短信登录
  messageLogin({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/AutoPasswordLogin', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //注册提交
  registerSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/RegByCode', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //省市县
  initCityData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCityData', data.data)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //职业
  initOccupation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Job/SelectGroupJob', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initOccupation', data.data)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //学历
  initEducation({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Job/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initEducation', data.data)
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //用户信息
  initUserInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initUserInfo', data.data[0])
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改用户信息
  updateUserInfoSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //找回密码
  findPasswordSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/ForgetPassword', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改密码
  updatePassword({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserInfo/UpdatePassword', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //用户钱包
  initUserMoney({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserPot/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data[0]);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改钱包信息
  updateWalletInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserPot/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  // 城市列表
  initHomeCityList({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/AdTypeInComeWay/GetAreaFullList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {


            data.data.unshift({
              Name: 'HotCity',
              newName: '热门',
              Children: data.HotCity
            })


            commit('initHomeCityList', data.data);
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //常用联系人
  initUsedContacts({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UsualConnect/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].isActive = false;
            }
            commit('initUsedContacts', data.data);
            relove();
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //添加常用联系人
  addTopContacts({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UsualConnect/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //修改常用联系人
  updateTopContacts({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UsualConnect/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //删除常用联系人
  deleteTopContacts({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UsualConnect/Delete', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          }
          else {
            reject(data.resultcontent);
          }
        })
    })
  },
  //扫码允许登录
  SweepCodeSubmit(store,data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/QRCode/ModifyState', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent);
        }
        else {
          reject(data.resultcontent);
        }
      })
    })
  },
  //扫码
  saoMaOver(store,data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/QRCode/ModifyState', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 302) {
          relove(data.resultcontent);
        }
        else {
          reject(data.resultcontent);
        }
      })
    })
  }
}
