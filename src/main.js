// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import store from "element-ui/packages/cascader-panel/src/store";
import axios from 'axios'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false

//路由跳转之前
router.beforeEach((to, from, next) => {
  let isLogin=sessionStorage.getItem("isLogin");
  if (to.path==="/logout"){
    sessionStorage.clear()
    next({path:"/login"});
  }else{
    if (to.path==="/login"){
      if(isLogin!==null){
        next({path:"/notes"});
      }else{
        next();
      }
    }
  }

  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
