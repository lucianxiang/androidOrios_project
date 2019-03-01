/**
 * Created by leibo on 18/7/4.
 */

export default {
  initMyOrder(state, data) {
    state.myOrderList = data;
  },
  initPageMyOrder(state,data){
    state.myOrderList = [...state.myOrderList,...data]
  },
  initFoodOrderDetails(state, obj) {
    state.foodOrderDetailsObj = obj;
  },
  initCarOrderDetails(state, obj) {
    state.carOrderDetailsObj = obj;
  },
  initTicketOrderInfo(state, obj) {
    state.ticketOrderInfoObj = obj;
  },
  initBarcodeID(state,id){
    state.barcodeID = id;
  }
}
