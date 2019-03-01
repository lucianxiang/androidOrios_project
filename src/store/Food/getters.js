/**
 * Created by leibo on 18/7/4.
 */
export default {
  topTurnLlist: state => state.topTurnLlist,
  RecommendMerchants: state => state.RecommendMerchants,    //推荐商家
  RecommendMerchantsShopList: state => state.RecommendMerchantsShopList,   //商家列表
  foodDetailStoreFrontList: state => state.foodDetailStoreFrontList,   //美食详情
  inFoodList: state => state.inFoodList,   //菜品列表
  foodCaiList: state => state.foodCaiList,   //美食菜品
  searchHomeFilter: state => state.searchHomeFilter,
  // allFoodLists: state => state.allFoodLists,
  foodOrderChoseRoomList: state => state.foodOrderChoseRoomList,
  foodModel: state => state.foodModel,
  foodOrderChoseDateList: state => state.foodOrderChoseDateList,
  foodOrderChoseTimeList: state => state.foodOrderChoseTimeList,
  foodRoomInfoObj: state => state.foodRoomInfoObj,
  screenFoodList: state => state.screenFoodList,
}
