/**
 * Created by leibo on 18/7/4.
 */
import {postPromise, getNewStr, getSortList} from '@/assets/js/public'

export default {
  //线路菜单
  initLineMenu({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/LineMenu/GetLineMenuInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initLineMenu', data.data)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //产品详情
  initTourProducte({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr + '/LinePrepare/GetTradeLineByGood', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            if (resulte) {
              for (var i = 0; i < resulte.length; i++) {
                if (!resulte[i].ts_tg_IntroduceReason) {
                  resulte[i].ts_tg_IntroduceReason = '<span></span>'
                }
              }
              let prepareList = resulte.prepareList;
              for (var i = 0; i < prepareList.length; i++) {
                prepareList[i].getSortList = getSortList(prepareList[i].foodList, prepareList[i].hotelList, prepareList[i].tourList)
                if (prepareList[i].ts_pt_FreeImage) {
                  prepareList[i].ts_pt_FreeImage = JSON.parse(prepareList[i].ts_pt_FreeImage)
                } else {
                  prepareList[i].ts_pt_FreeImage = []
                }
              }
              resulte.prepareList = prepareList.sort(function (a, b) {
                if (a.ts_pt_Day < b.ts_pt_Day) {
                  return -1;
                } else if (a.ts_pt_Day > b.ts_pt_Day) {
                  return 1;
                } else {
                  if (a.ts_pt_Day < b.ts_pt_Day) {
                    return 1;
                  } else if (a.ts_pt_Day > b.ts_pt_Day) {
                    return -1;
                  }
                  return 0;
                }
              })
              resulte.imgData = [];
              if (resulte.ta_tg_ShowImage) {
                resulte.imgData = resulte.ta_tg_ShowImage.split(',')
              }
              commit('initPrepareList', resulte.prepareList)
              commit('initTourProducte', resulte)
              relove(resulte.ts_pt_ID)
            }
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },

  //产品线路
  initProductLine({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/ProductLine/GetProductLine', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            if (data.data.length) {
              relove(data.data[0].ts_pt_ID);
            } else {
              relove();
            }
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //线路出发城市
  initOutCity({commit}, data) {
    return new Promise(function (relove, reject) {
      postPromise(getNewStr + '/LineCity/FirstSelect', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.resultcode) == 200) {
            let arr = [];
            for (let attr in data.data) {
              arr.push(...data.data[attr].GroupCityList)
            }
            commit('initOutCity', arr);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化线路价格
  initProductLinePrice({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/ProductPrice/GetProductPrice', JSON.stringify(data), {
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
  //查询票
  searchTourTicket({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/ProductPrice/GetFreeSeat', JSON.stringify(data), {
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
  //下订单
  meakeTourOrder({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/TravelOrder/MakeOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data.ts_to_OrderID);
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },

  //搜索
  initTourSearchList({commit}, res) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/TourWebPage/SearchInfo', JSON.stringify(res), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.length; i++) {
              if (data.data[i].ta_tg_ShowImage) {
                data.data[i].showImage = data.data[i].ta_tg_ShowImage.split(',')[0];
                data.data[i].page = res.page
              }
            }
            commit('initTourSearchList', data.data);
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },

  //------------------------------------------
  initProductLineData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/ProductPrice/GetProductPrice', JSON.stringify(data), {
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
  //跟团游热门地点
  initTradeLists({commit}, data) {
    let typeId = data.typeId;
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/TradeGood/GetTravelPageL', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //出发城市
            if (typeId == '国内游') {
              let arr1 = data.data.chinaGroupList
              for (var i = 0; i < arr1.length; i++) {
                let goodList = arr1[i].goodList;
                if (goodList.length) {
                  for (var j = 0; j < goodList.length; j++) {
                    if (goodList[j].ta_tg_ShowImage) {
                      goodList[j].ta_tg_ShowImage = goodList[j].ta_tg_ShowImage.split(',')[0]
                    }
                  }
                }
              }
              commit('initTradeLists', arr1)
            } else if (typeId == '周边游') {
              let arr2 = data.data.nearGroupList
              for (var i = 0; i < arr2.length; i++) {
                let goodList = arr2[i].goodList;
                if (goodList.length) {
                  for (var j = 0; j < goodList.length; j++) {
                    if (goodList[j].ta_tg_ShowImage) {
                      goodList[j].ta_tg_ShowImage = goodList[j].ta_tg_ShowImage.split(',')[0]
                    }
                  }
                }

              }
              commit('initTradeLists', arr2)
            } else if (typeId == '境外短线') {
              let arr3 = data.data.outshortGroupList
              for (var i = 0; i < arr3.length; i++) {
                let goodList = arr3[i].goodList;
                if (goodList.length) {
                  for (var j = 0; j < goodList.length; j++) {
                    if (goodList[j].ta_tg_ShowImage) {
                      goodList[j].ta_tg_ShowImage = goodList[j].ta_tg_ShowImage.split(',')[0]

                    }

                  }
                }
              }
              commit('initTradeLists', arr3)
            } else if (typeId == '境外长线') {
              let arr4 = data.data.longshortGroupList
              for (var i = 0; i < arr4.length; i++) {
                let goodList = arr4[i].goodList;
                if (goodList.length) {
                  for (var j = 0; j < goodList.length; j++) {
                    if (goodList[j].ta_tg_ShowImage) {
                      goodList[j].ta_tg_ShowImage = goodList[j].ta_tg_ShowImage.split(',')[0]
                    }

                  }
                }
              }
              commit('initTradeLists', arr4)
            }
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })

  },

  //跟团游详情
  initTradeGoodInfo({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/TradeGood/GetTradeGoodInfoMX', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            for (var i = 0; i < resulte.length; i++) {
              if (resulte[i].ta_tg_ShowImage) {
                resulte[i].ta_tg_ShowImage = resulte[i].ta_tg_ShowImage.split(',')
              } else {
                resulte[i].ta_tg_ShowImage = []
              }
            }
            commit('initTradeGoodInfo', resulte)
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //跟团游搜索列表搜索条件
  initSearchFilter({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/TourWebPage/SearchFilter', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            //出发城市
            commit('initAgenciesSearchCityList', data.data.cityList)
            //推荐景点
            commit('initAgenciesSearchTourSiteList', data.data.tourSiteList)
            //成团地点
            commit('initAgenciesSearchGroupCityList', data.data.groupCityList)
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //列表页数据
  initWebPageSearchInfo({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/TourWebPage/SearchInfo', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let resulte = data.data;
            for (var i = 0; i < resulte.length; i++) {
              if (resulte[i].ta_tg_ShowImage) {
                resulte[i].oneImage = resulte[i].ta_tg_ShowImage.split(',')[0]
              } else {
                resulte[i].ta_tg_ShowImage = []
              }
            }
            //出发城市
            commit('initWebPageSearchInfo', resulte)
            relove(Number(data.totalRows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取城市ID
  GetAreaID({commit}, resulte) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/AdTypeInComeWay/GetAreaID', JSON.stringify(resulte), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('setCityObj', {
              "sm_af_AreaID": data.sm_af_AreaID,
              "sm_af_AreaName": resulte.sm_af_AreaName
            })
            relove(data.resultcontent)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //筛选条件
  initTourQueryCondition({commit}, resulte) {
    return new Promise((relove, reject) => {
      axios.post(getNewStr + '/TourWebPage/SearchFilter', JSON.stringify(resulte), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('tourCityList', data.data.cityList);
            commit('tourGroupCityList', data.data.groupCityList);
            commit('tourSiteList', data.data.tourSiteList);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
}
