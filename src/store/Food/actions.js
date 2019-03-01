/**
 * Created by leibo on 18/7/4.
 */

import {postPromise, getNewStr} from '@/assets/js/public'

export default {
  //美食下订单
  foodOrderDown(store, data) {
    return new Promise((relove, reject) => {
      postPromise(getNewStr + '/Order/MakeFoodOrder', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店预定显示数据
  initFoodOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/StoreFront/BookPage', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.choseDateList;
            commit('initFoodOrderChoseDateList', arr);
            //提醒出发时间
            commit('initFoodOrderChoseTimeList', data.data.choseTimeList);
            // //位置选择
            // commit('initFoodOrderChoseRoomList',data.data.choseList);
            //停车位
            commit('initFoodOrderStopCarList', data.data.stopFreeCount);
            let foodList = data.data.foodList;

            for (var i = 0; i < foodList.length; i++) {
              foodList[i].num = 0;
            }
            relove(foodList);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //查询可售餐桌数
  GetCanSellTableCount({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/StoreFront/CanSellTableCount', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].choseRoomList.length) {
                if (data.data[i].choseRoomList[0].imageList.length) {
                  data.data[i].choseRoomList[0].oneImg = data.data[i].choseRoomList[0].imageList[0].fd_ri_Image
                } else {
                  data.data[i].oneImg = ''
                }
              }
            }
            commit('initFoodOrderChoseRoomList', data.data);
            // commit('updateFoodOrderChoseRoomList',data.data)
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //立即预订初始化菜
  searchFoodList({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/StoreFront/FoodSearChPage', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //美食列表
            let arr = data.data;
            for (var i = 0; i < arr.length; i++) {
              arr[i]['num'] = 0
            }
            commit('searchFoodList', arr);
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化美食详情
  initFoodDetailStoreFront({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/StoreFront/FoodDetaile', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //店面信息
            commit('initFoodDetailStoreFront', data.data.storeFront);
            commit('initInFoodList', data.data.inFoodList)
            relove(data.data.storeFront);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //所有菜品列表
  // initAllFoodList({commit},data){
  //   return new Promise((relove,reject)=>{
  //     postPromise(getNewStr+'/StoreFront/FoodSearChPage',data)
  //       .then(data=>{
  //         var data = JSON.parse(data);
  //         console.log(data)
  //         if (Number(data.resultcode) == 200) {
  //           commit('initAllFoodList',data.data)
  //           relove(data.resultcontent)
  //         } else {
  //           reject(data.resultcontent)
  //         }
  //       })
  //   })
  // },


  //轮播
  initRecommendMerchants({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/StoreFront/FoodIndexPage', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initRecommendMerchants', data.data.foodList);
            commit('initTopTurnLlist', data.data.topTurnLlist)
            commit('initRecommendMerchantsShopList', data.data.shopList);

            relove(data.resultcontent);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //首页搜索条件
  initFoodSearchFilter({commit}, data) {
    return new Promise((relove, reject) => {
      postPromise(getNewStr + '/StoreFront/WebHotSearch', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            let obj = data.data;
            obj.catagoryList.unshift({fd_py_ID: '', fd_py_Name: '所有'})
            obj.foodTypeList.unshift({fd_py_ID: '', fd_py_Name: '所有'})
            obj.usePersontList.unshift({fd_py_ID: '', fd_py_Name: '所有'})
            //美食列表
            commit('initSearchFilter', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取剩余停车位个数
  getWaitCarCount(store, data) {
    return new Promise((relove, reject) => {
      postPromise(getNewStr + '/StoreFront/GetFreeStop', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //生成订单号
  initSelectChoiceList({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Order/MakeFoodOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //店面信息
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //店面美食筛选
  initScreenFood({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/StoreFront/WebHotSearch', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            data.data.foodTypeList.unshift({
              fd_py_ID: "",
              fd_py_Name: "全部"
            })
            data.data.usePersontList.unshift({
              fd_py_ID: "",
              fd_py_Name: "全部"
            })
            data.data.catagoryList.unshift({
              fd_py_ID: "",
              fd_py_Name: "全部"
            })
            data.data.foodMeatVeList.unshift({
              fd_py_ID: "",
              fd_py_Name: "全部"
            })
            commit('initScreenFood', data.data);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

}
