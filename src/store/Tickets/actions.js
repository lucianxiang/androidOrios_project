/**
 * Created by leibo on 18/7/4.
 */
import {postPromise, getNewStr} from '@/assets/js/public'

export default {
  //初始化省
  initTicketProvice({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/AreaFull/SelectProvice', JSON.stringify(data), {
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
  //初始化门票首页
  initTicketHomeData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TtWebPage/GetTourSitePage', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200){
            //首页轮播
            commit('initTicketHomeImage', data.data.topBigImageList);
            commit('initHotTicketCity', data.data.hotList);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化精选
  initTicketSelected({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TtWebPage/SelectChoiceList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketSelected',data.data)
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化景点信息
  initTicketInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TtWebPage/Detail', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initTicketInfo',data.data)
            commit('initTmTmBus',data.data.tm_TransportMessage.tm_tm_Bus)
            commit('initTmTmDrive',data.data.tm_TransportMessage.tm_tm_Drive);
            commit('initTmTmAddress',data.data.tm_TransportMessage.tm_tm_Address);
            commit('tmBookKnow',data.data.tm_BookKnow)
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //景点列表页
  initTicketListPage({commit}, res) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TtWebPage/ListPage', JSON.stringify(res), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data;
            for(var i=0;i<arr.length;i++){
              arr[i].page = res.page
            }
            commit('initTicketListPage',arr)
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //景点门票信息
  initTicketData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TicketTypePrice/GetTicketTypePriceList', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //小景点信息
  initSmallStop({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Site/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initSmallStop',data.data)
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
//  添加门票订单
  addTicketOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/TmOrder/MakeOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //钱包支付
  payWallet({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/UserPot/MinusMoney', JSON.stringify(data), {
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
  //总体评论
  allComment({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Comment/SelectAllCommentFixed', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('allComment',data)
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //所有评论数据
  initCommentData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Comment/SelectAllComment', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data
            for (let i = 0; i < arr.length; i++) {
              arr[i].imgData = [];
              if (arr[i].ts_ct_Image) {
                arr[i].imgData = arr[i].ts_ct_Image.split(',')
              }
              if (arr[i].Totalscore >= 4) {
                arr[i].satisfaction = '满意'
              }
              if (2 < arr[i].Totalscore && arr[i].Totalscore < 4) {
                arr[i].satisfaction = '一般'
              }
              if (arr[i].Totalscore <= 2) {
                arr[i].satisfaction = '不满意'
              }
            }
            commit('initCommentData',data.data)
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
}
