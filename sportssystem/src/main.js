import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Router from 'vue-router'

//font-awesome的引用
import "font-awesome/css/font-awesome.min.css";
//本地存储
import storage from 'good-storage'

// 引入echarts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

//全局mixin
import {
    globalMixin
} from './assets/js/mixin.js';
Vue.mixin(globalMixin);

// vue 设置国际化
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh': require('./assets/js/authMenu'), // 中文语言包
        'en': require('./assets/js/authMenuEng') // 英文语言包
    }
})
//监听Stroage中值的变化 type=1=>localStroage type=2=>sessionStorage(根据方法改变存储的保存值)
Vue.prototype.$addStorageEvent = function (type, key, data) {
    if (type === 1) {
		// 创建一个StorageEvent事件
		var newStorageEvent = document.createEvent('StorageEvent');
		const storage = {
		    setItem: function (k, val) {
		        localStorage.setItem(k, val);
		        // 初始化创建的事件
		        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
		        // 派发对象
		        window.dispatchEvent(newStorageEvent);
		    }
		}
		return storage.setItem(key, data);
	} else {
		// 创建一个StorageEvent事件
		var newStorageEvent = document.createEvent('StorageEvent');
		const storage = {
		    setItem: function (k, val) {
		        sessionStorage.setItem(k, val);
		        // 初始化创建的事件
		        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
		        // 派发对象
		        window.dispatchEvent(newStorageEvent);
		    }
		}
		return storage.setItem(key, data);
	}
}


//网络请求
import axios from 'axios'
Vue.prototype.$axios = axios;

//公共css
import "@/assets/stylus/import.styl";

//设置路由重复点击
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


//设置请求的接口
if ('development' === process.env.NODE_ENV) {
  axios.defaults.baseURL = "http://127.0.0.1:5000/";

} else {
  if ('test' === externalConfig.env) {
    axios.defaults.baseURL = externalConfig.domain.test;
  } else {
    axios.defaults.baseURL = externalConfig.domain.production;
  }
}

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ` + storage.get('sports_token');
        return config;
    },
    error => {
        return Promise.reject(error);
    });
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
}).$mount('#app')