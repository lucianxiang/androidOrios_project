/**
 * Created by leibo on 18/7/4.
 */
export default {
  isLoading: state => state.isLoading,
  isOff: state => state.isOff,
  tourProducteObj: state => state.tourProducteObj,
  prepareList: state => state.prepareList,
  outCityList: state => state.outCityList,
  tourSearchList: state => state.tourSearchList,


  //---------------

  tradeGoodInfoList: state => state.tradeGoodInfoList,
  tradeLists: state => state.tradeLists,
  agenciesSearchCityList: state => state.agenciesSearchCityList,
  agenciesSearchTourSiteList: state => state.agenciesSearchTourSiteList,
  agenciesSearchGroupCityList: state => state.agenciesSearchGroupCityList,
  webPageSearchInfo: state => state.webPageSearchInfo,
  productDetailsObj: state => state.productDetailsObj,
  lineMenuList: state => state.lineMenuList,
  LineSchedule: state => state.LineSchedule,
  cityObj: state => state.cityObj,
  tourCityList: state => state.tourCityList,
  tourGroupCityList: state => state.tourGroupCityList,
  tourSiteList: state => state.tourSiteList,
  tourScrollTop: state => state.tourScrollTop,
}
