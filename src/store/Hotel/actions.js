/**
 * Created by leibo on 18/7/4.
 */
import {postPromise, getNewStr, FormattedData} from '@/assets/js/public'

export default {
  //初始化酒店图片
  initHotelPic({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelIndexImage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initHotelPic', data.data);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化搜索条件
  initHotelSearchFilter({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/SearchFilter', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initIntroduce', data.data.Introduce);
            commit('initRoomHard', data.data.RoomHard);
            commit('initThemeType', data.data.ThemeType);
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //初始化酒店列表
  initHotelList({commit}, res) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/Search', JSON.stringify(res), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data.dataArray;
            for (var i = 0; i < arr.length; i++) {
              arr[i].page = res.page
              if (arr[i].ht_ht_ImageUrl.length) {
                if (arr[i].ht_ht_ImageUrl[0].SubArray.length) {
                  arr[i].showImage = arr[i].ht_ht_ImageUrl[0].SubArray[0].ht_hi_ImageURL.split(',')[0]
                } else {
                  arr[i].showImage = '';
                }
              }
            }
            commit('initHotelList', arr);
            relove(arr);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店详情
  initHotelDetails({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/Hotel/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initHotelDetails', data.data[0])
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店房间信息
  initHotelSearchRoomInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/SearchHotelRoom', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let arr = data.data;
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].RoomInfo.ht_bt_ImagePath) {
                arr[i].RoomInfo.ht_bt_OneImg = arr[i].RoomInfo.ht_bt_ImagePath.split(',')[0]
              } else {
                arr[i].RoomInfo.ht_bt_OneImg = []
              }
              for (let j = 0; j < arr[i].RoomProductPriceList.length; j++) {
                arr[i].RoomProductPriceList[j].orderState = false;
              }
            }

            commit('initHotelSearchRoomInfo', data.data)
            relove(Number(data.totalrows));
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店图片
  initHotelShowImg({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelImage/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            if(data.data.length){
              for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].ht_hi_ImageURL) {
                  data.data[i].imgList = data.data[i].ht_hi_ImageURL.split(',');
                  if (data.data[i].imgList.length) {
                    data.data[i].oneImg = data.data[i].imgList[0]
                  } else {
                    data.data[i].oneImg = ''
                  }
                } else {
                  data.data[i].imgList = [];
                }
              }
              commit('initHotelShowImg', data.data[0])
              commit('initHotelShowImgList', data.data)
            }
            relove();
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店房间数量
  initHotelRoomNum({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/RoomProductPrice/GetRoomNumber', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            // let res = FormattedData(data.data)
            // let oneList  = res[0].LayerArry.length?res[0].LayerArry:[];
            // let roomList = res[0].LayerArry[0].HouseArry.length?res[0].LayerArry[0].HouseArry:[]
            for (let i = 0; i < data.data.length; i++) {
              data.data[i].isOff = false;
            }
            let arr = data.data;
            for(var i=0;i<arr.length;i++){
              arr[i].HouseNumber =arr[i].HouseNumber.replace(/-/g,'')
            }
            commit('initHotelRoomNum', arr)
            // commit('initHotelRoomOneList',oneList)
            // commit('initHotelRoomOneRoomList',roomList)
            relove(data.data);
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //生成酒店订单
  makeHotelOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelOrder/MakeOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove(data.data.ht_or_OrderID)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店详情
  initHotelInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/Detail', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.HotelImage.length; i++) {
              data.data.HotelImage[i].imageList = data.data.HotelImage[i].SubArray[0].ht_hi_ImageURL.split(',');
            }
            commit('HardService', data.data.HardService);
            commit('HardServiceHard', data.data.HardServiceHard);
            commit('HotelIco', data.data.HotelIco);
            commit('HotelImage', data.data.HotelImage);
            commit('HotelIntroduce', data.data.HotelIntroduce);
            commit('HotelMinPrice', data.data.HotelMinPrice);
            commit('HotelModel', data.data.HotelModel);
            commit('HotelPolicy', data.data.HotelPolicy);
            commit('HotelTheme', data.data.HotelTheme);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店筛选添加
  initHotelScreenCondition({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/SearchFilter', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            for (let i = 0; i < data.data.Introduce.length; i++) {
              data.data.Introduce[i].SubArray.unshift({
                "ht_it_ID": "",
                "ht_it_Name": "不限"
              })
            }
            data.data.RoomHard.unshift({
              "ht_rh_ID": "",
              "ht_rh_Name": "不限"
            })

            data.data.ThemeType.unshift({
              "ht_tt_ThemeID": "",
              "ht_tt_Name": "不限",
              "ht_tt_IsHot": 1
            })
            commit('seasonPlay', data.data.Introduce[0]);
            commit('featureRecommend', data.data.Introduce[1]);
            commit('chainHotel', data.data.Introduce[2]);
            commit('RoomHard', data.data.RoomHard);
            commit('ThemeType', data.data.ThemeType);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //房间筛选
  initHotelRoomCondition({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelWebPage/SearchHotelRoomFilter', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('BedType', data.data.BedType);
            commit('BreakfastType', data.data.BreakfastType);
            commit('CancelType', data.data.CancelType);
            commit('WafiType', data.data.WafiType);
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店订单详情
  initHotelOrderInfo({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelOrder/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initHotelOrderInfo', data.data[0]);
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //取消酒店订单
  cancelHotelOrder({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelOrder/CancelOrder', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            relove()
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //酒店剩余停车位
  initCarNum({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post(getNewStr + '/HotelApi/OnlineHotelSeats', JSON.stringify(data), {
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
}
