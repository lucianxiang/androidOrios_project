export default {
  initCityData(state, data) {
    state.cityDataList = data;
  },
  cityData(state, data) {
    state.cityData = data;
  },
  initOccupation(state, data) {
    state.occupationList = data;
  },
  occupationObj(state, obj) {
    state.occupationObj = obj;
  },
  initEducation(state, data) {
    state.educationList = data;
  },
  deucationObj(state, obj) {
    state.deucationObj = obj;
  },
  initUserInfo(state, obj) {
    state.userInfoObj = obj;
  },
  initHomeCityList(state, data) {
    state.homeCityList = data;
  },
  initUsedContacts(state, data) {
    state.usedContactsList = data;
  },
  setUserInfo(state,obj){
    state.userInfo = obj
  }
}
