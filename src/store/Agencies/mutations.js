/**
 * Created by leibo on 18/7/4.
 */


export default {
  hideLoading(state) {
    state.isLoading = false;
  },
  showLoading(state) {
    state.isLoading = true;
  },
  setIsOff(state, bl) {
    state.isOff = bl
  },
  initTourProducte(state, obj) {
    state.tourProducteObj = obj;
  },
  initPrepareList(state, data) {
    state.prepareList = data;
  },
  initOutCity(state, data) {
    state.outCityList = data;
  },
  initTourSearchList(state, data) {
    if (state.tourScrollTop.id) {
      state.tourSearchList = data.map(item => {
        if (item.ta_tg_ID == state.tourScrollTop.id) {
          item.activeState = true
          return item
        } else {
          item.activeState = false;
          return item
        }
      })
    }
    state.tourSearchList = data;
  },
  setCityObj(state, obj) {
    state.cityObj = obj;
  },


  //-----------------


  initTradeGoodInfo(state, data) {
    state.tradeGoodInfoList = data;
  },
  initTradeLists(state, data) {
    state.tradeLists = data;
  },
  initAgenciesSearchCityList(state, data) {
    state.agenciesSearchCityList = data;
  },
  initAgenciesSearchTourSiteList(state, data) {
    state.agenciesSearchTourSiteList = data;
  },
  initAgenciesSearchGroupCityList(state, data) {
    state.agenciesSearchGroupCityList = data;
  },
  initWebPageSearchInfo(state, data) {
    state.webPageSearchInfo = data;
  },
  initProductDetails(state, data) {
    state.productDetailsObj = data
  },
  initLineMenu(state, data) {
    state.lineMenuList = data;
  },
  initReasonList(state, data) {
    state.reasonList = data;
  },
  initIntroList(state, data) {
    state.introList = data;

  },
  initLineSchedule(state, data) {
    state.LineSchedule = data;
  },

  tourCityList(state, data) {
    state.tourCityList = data;
  },
  tourGroupCityList(state, data) {
    state.tourGroupCityList = data;
  },
  tourSiteList(state, data) {
    state.tourSiteList = data;
  },
  tourScrollTop(state, obj) {
    state.tourScrollTop = obj;
  },
  clearTourScrollTop(state) {
    state.tourScrollTop = {};
  },

}
