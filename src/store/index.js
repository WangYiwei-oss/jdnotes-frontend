import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

//全局state对象，用于保存所有组件的公共数据
const state={
  user:{
    currentUser: null,
    isLogin: false,
    token: "",
  },
  current_namespace:"default"
};

//监听state对象的值的最新状态（计算属性）
const getters={
  getUser(state){
    return state.user;
  },
  getCurrentNamespace(status){
    return state.current_namespace;
  }
}

//唯一可以修改state值的方法(同步执行，阻塞的)
const mutations={
  updateUser(state,user){
    state.user = user;
  }
}

//异步执行mutations方法
const actions={
  //登录
  asyncUpdateUser(context){
    axios({
      method: 'post',
      url: '/user',
      data: context,
    }).then(res=>{
      context.commit("updateUser",res.data);
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
