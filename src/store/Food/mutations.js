/**
 * Created by leibo on 18/7/4.
 */


export default{
  initFoodOrderStopCarList(state,num){
    state.foodOrderStopCarList = num;
  },
  initFoodOrderChoseTimeList(state,data){
    state.foodOrderChoseTimeList = data;
  },
  initFoodOrderChoseDateList(state,data){
    state.foodOrderChoseDateList = data;
  },
  initFoodOrderChoseRoomList(state,data){
    state.foodOrderChoseRoomList = data;
  },
  foodModel(state,data){
    state.foodModel = data;
  },
  updateFoodOrderChoseRoomList(state,data){
    // var  arr = [];
    // arr =  state.foodOrderChoseRoomList.forEach(item=>{
    //   for(var i=0;i<data.length;i++){
    //     if(item.fd_sfr_ID==data[i].fd_sfr_ID){
    //       item.freeCount = data[i].freeCount
    //     }
    //   }
    // })
    for(var i=0;i<state.foodOrderChoseRoomList.length;i++){
      for(var j=0;j<data.length;j++){
        if(state.foodOrderChoseRoomList[i].fd_sfr_ID==data[j].fd_sfr_ID){
          state.foodOrderChoseRoomList[i].freeCount = data[j].freeCount
        }
      }
    }
    // console.log(state.foodOrderChoseRoomList)
  },
  initTopTurnLlist(state,data){
    state.topTurnLlist = data;
  },
  initFoodDetailStoreFront(state,obj){
    state.foodDetailStoreFrontList  = obj;
  },
  initRecommendMerchants(state,data){
    state.RecommendMerchants=data;
  },
  initInFoodList(state,data){
    state.inFoodList = data;
  },
  initRecommendMerchantsShopList(state,data){
    state.RecommendMerchantsShopList = data;
  },
  searchFoodList(state,data){
    state.foodCaiList = data;

  },
  initSearchFilter(state,data){
    state.searchHomeFilter = data;
  },

  // initAllFoodList(state,data){
  //   state.allFoodLists = data;
  //   console.log(1, state.allFoodLists)
  // },

  foodRoomInfo(state, obj){
    state.foodRoomInfoObj = obj;
  },
  initScreenFood(state, obj) {
    state.screenFoodList = obj;
  }

}
