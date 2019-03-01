/**
 * Created by leibo on 18/7/4.
 */
import {postPromise,getNewStr} from '@/assets/js/public'

export default {
  payConfirm(store,data){
    return new Promise(function (relove, reject) {
      axios.post('http://icbcinterface.1000da.com.cn/Home/TogetherPayment', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data)=>{
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.data)
        }else{
          reject(data.resultcontent)
        }
      })
    })
  },
  //支付
  payWechat({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://wechat.1000da.com.cn/Order/MakeWechatQRCode', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //订单
  initMyOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initMyOrder',data.data)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  initPageMyOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          commit('initPageMyOrder',data.data)
          relove(data.data)
        } else {
          reject(data.resultcontent)
        }
      })
    })
  },
  //初始化订单数据
  initOrderInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改门票订单支付状态
  payTickeOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TmOrder/PayOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改旅行社订单支付状态
  payTourOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TravelOrder/PayOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改美食订单支付状态
  payFoodOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Order/PayFoodOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改酒店订单支付状态
  payHotelOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelOrder/PayOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //修改租车订单支付状态
  payCarOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/CROrder/PayOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取微信支付状态
  getOrderStatus(store, data) {
    return new Promise(function (relove, reject) {
      postPromise('http://wechat.1000da.com.cn/Order/QueryOrderStatus', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            relove(data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //删除用户订单
  delectUserOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserOrder/DeleteStatus', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //美食订单详情
  initFoodOrderDetails({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Order/AllSelect', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initFoodOrderDetails',data.data[0]);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //注销美食订单
  cancelFoodOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Order/CancelFoodOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //租车订单详情
  initCarOrderDetails({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/CROrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCarOrderDetails',data.data[0]);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //门票订单详情
  initTicketOrderInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TmOrder/GetOrderInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketOrderInfo',data.data[0]);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //注销门票订单
  cancelTicketOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TmOrder/CancelOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //客房服务
  callDetermine(store,data){
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/CustCall/Insert', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(data => {
        var data = data.data;
        if (Number(data.resultcode) == 200) {
          relove(data.resultcontent);
        } else {
          reject(data.resultcontent)
        }
      })
    })
  }
}
