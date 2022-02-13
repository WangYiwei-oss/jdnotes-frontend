// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import K8sGlobal from "./global/K8sGlobal";
import Vuex from 'vuex'
//import store from "element-ui/packages/cascader-panel/src/store";
import axios from 'axios'
import '../src/assets/icon/icon'
import '../src/assets/icon/svg-icon.js'
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$ajax = axios;
Vue.prototype.$k8s_global = K8sGlobal;
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
  //store,
  render: h => h(App),
})
