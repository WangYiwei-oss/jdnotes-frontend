import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Notes from '../views/Notes'
import notfound from '../views/404page'

Vue.use(Router)

export default new Router({
  routes:[{
    //登录页
    path:'/login',
    name:'Login',
    component: Login
  },
    {
      //笔记页
      path:'/notes',
      name:'Notes',
      component: Notes
    },
    {
      path:'*',
      component: notfound
    }
  ]
})
