/**
 * Created by leibo on 18/7/4.
 */


export default {
  initRentalCarCity(state, data) {
    state.rentalCarCityList = data;
  },
  initCarLandmark(state, data) {
    state.carLandmarkList = data;
  },
  carChangeCity(state, obj) {
    state.carChangeCityObj = obj;
  },
  carReturnCity(state, obj) {
    state.carReturnCityObj = obj
  },
  initReturnLandmark(state, data) {
    state.returnLandmarkList = data;
  },
  pickCarCity(state, obj) {
    state.pickCarCityObj = obj;
  },
  returnCarCity(state, obj) {
    state.returnCarCityObj = obj;
  }
}
