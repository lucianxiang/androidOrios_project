// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
require('es6-promise').polyfill()
import FastClick from 'fastclick'

// mui.init({
//   keyEventBind:{
//     backbutton:true
//   }
// })
// import 'lib-flexible'
import router from './router'
import store from './store'
// localStorage.removeItem('userInfo')
import App from './App'
import '@/assets/css/reset.css'

//转场动画
// import vueg from 'vueg'
// import 'vueg/css/transition-min.css'
// Vue.use(vueg, router, {
//   forwardAnim: 'fadeInLeft'
// })
import {
	LoadingPlugin,
	AlertPlugin,
	ToastPlugin
} from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

sessionStorage.setItem('isOff', true)

// 或者umd方式
// 引入构建的js文件
import VueScroller from 'vue-scroller'
//
//
// // import { IndexList, IndexSection, Lazyload, DatetimePicker  } from 'mint-ui';
//
// // Vue.component(IndexList.name, IndexList);
// // Vue.component(IndexSection.name, IndexSection);
// // Vue.component(DatetimePicker.name, DatetimePicker);
// // Vue.use(Lazyload);
Vue.use(VueScroller);

localStorage.removeItem('peopleList')

import {
	DatetimePlugin
} from 'vux'
Vue.use(DatetimePlugin)


import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
	error: 'http://hly.1000da.com.cn/assets/img/error.jpg',
	loading: 'http://hly.1000da.com.cn/assets/img/loading.gif'
});
import * as filters from './filters'

Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key]);
})



if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
FastClick.attach(document.body)


Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.interceptors.request.use(function (config) {  //配置发送请求的信息
//   store.commit('showLoading')
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
// axios.interceptors.response.use(function (response) { //配置请求回来的信息
//   store.commit('hideLoading')
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });
/* eslint-disable no-new */
new Vue({
	store,
	router,
	filters,
	render: h => h(App)
}).$mount('#app-box')
