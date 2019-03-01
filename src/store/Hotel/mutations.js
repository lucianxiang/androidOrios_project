/**
 * Created by leibo on 18/7/4.
 */


export default {
  initHotelPic(state, data) {
    state.hotelPicList = data;

  },
  initIntroduce(state, data) {
    state.hotelIntroduceList = data;
  },
  initThemeType(state, data) {
    state.hotelThemeTypeList = data;
  },
  initHotelList(state, data) {
    if (state.hotelScrollTop.id) {
      state.hotelList = data.map(item => {
        if (item.ht_ht_hotelID == state.hotelScrollTop.id) {
          item.activeState = true
          return item
        } else {
          item.activeState = false;
          return item
        }
      })
    }
    state.hotelList = data;
  },
  initHotelDetails(state, obj) {
    state.hotelDetails = obj
  },
  initHotelSearchRoomInfo(state, data) {
    state.hotelSearchRoomInfoList = data;
  },
  initRoomHard(state, data) {
    state.hotelRoomHardList = data;
  },
  hotelQueryObj(state, obj) {
    state.hotelQueryObj = obj;
  },
  initHotelShowImg(state, obj) {
    state.hotelShowImg = obj;
  },
  initHotelShowImgList(state, data) {
    state.hotelShowImgList = data;
  },
  hotelOrderInfo(state, obj) {
    state.hotelOrderInfo = obj;
  },
  roomInfo(state, obj) {
    obj.price = obj.RoomProductPriceList[0].ht_rpp_ProductPrice
    state.roomInfo = obj;
  },
  hotelSearchObjD(state, obj) {
    state.hotelSearchObjD = obj;
  },
  UpdateRoomProductPriceList(state, index) {
    state.roomInfo.RoomProductPriceList[index].orderState = true;
  },
  UpdateRoomProductPrice(state, {index, indexC}) {
    state.hotelSearchRoomInfoList[index].RoomProductPriceList[indexC].orderState = true;
  },
  initHotelInfo(state, obj) {
    state.hotelInfoObj = obj;
  },
  HardService(state, obj) {
    state.HardService = obj;
  },
  HardServiceHard(state, obj) {
    state.HardServiceHard = obj;
  },
  HotelIco(state, obj) {
    state.HotelIco = obj;
  },
  HotelImage(state, obj) {
    state.HotelImage = obj;
  },
  HotelIntroduce(state, obj) {
    state.HotelIntroduce = obj;
  },
  HotelMinPrice(state, obj) {
    state.HotelMinPrice = obj;
  },
  HotelModel(state, obj) {
    state.HotelModel = obj;
  },
  HotelPolicy(state, obj) {
    state.HotelPolicy = obj;
  },
  HotelTheme(state, obj) {
    state.HotelTheme = obj;
  },
  seasonPlay(state, obj) {
    state.seasonPlay = obj;
  },
  featureRecommend(state, obj) {
    state.featureRecommend = obj;
  },
  chainHotel(state, obj) {
    state.chainHotel = obj;
  },
  RoomHard(state, obj) {
    state.RoomHard = obj;
  },
  ThemeType(state, obj) {
    state.ThemeType = obj;
  },
  BedType(state, data) {
    state.BedType = data;
  },
  BreakfastType(state, data) {
    state.BreakfastType = data;
  },
  CancelType(state, data) {
    state.CancelType = data;
  },
  WafiType(state, data) {
    state.WafiType = data;
  },
  initHotelRoomNum(state, data) {
    state.hotelRoomNumList = data;
  },
  setHotelRoomOneList(state, obj) {
    state.hotelRoomOneList = state.hotelRoomNumList[obj.i].LayerArry
    state.hotelRoomOneRoomList = []
  },
  setHotelRoomOneRoomList(state, i) {
    state.hotelRoomOneRoomList = state.hotelRoomOneList[i].HouseArry;
  },
  setHotelRoomOneNewRoomList(state, obj) {
    for (var i = 0; i < state.hotelRoomNumList.length; i++) {
      if (obj.s == i) {
        state.hotelRoomNumList[i].isOff = !state.hotelRoomNumList[i].isOff
      }
    }
  },
  clearHotel(state) {
    state.hotelRoomNumList = [];
    state.hotelRoomOneList = [];
    state.hotelRoomOneRoomList = [];
  },

  initHotelOrderInfo(state, obj) {
    state.hotelOrderInfoObj = obj?obj:{};
  },
  hotelSelectRoomList(state, arr) {
    state.hotelSelectRoomList = arr;
  },
  updateRoomState(state) {
    if (state.hotelSelectRoomList.length) {
      for (let i = 0; i < state.hotelRoomNumList.length; i++) {
        for (let j = 0; j < state.hotelSelectRoomList.length; j++) {
          if (state.hotelRoomNumList[i].Id == state.hotelSelectRoomList[j].Id) {
            state.hotelRoomNumList[i].isOff = true;
          }
        }
      }
    }
  },
  hotelScrollTop(state, obj) {
    state.hotelScrollTop = obj;
  },
  clearHotelScrollTop(state) {
    state.hotelScrollTop = {};
  },


}
