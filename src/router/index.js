import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Notes from '../views/Notes'
import notfound from '../views/404page'
import PersonCenter from "../views/PersonCenter";
import MyNotes from "../views/MyNotes";
import ComponentManagement from "../views/ComponentManagement";
import PersonSettings from "../views/PersonSettings";
import K8sManagement from "../views/K8sManagement";
import PrometheusManageMent from "../views/PrometheusManageMent";

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path:'/personal_center',
      name:'PersonalCenter',
      component: PersonCenter,
    },
    {
      path:'/personal_settings',
      name:'PersonalSetting',
      component: PersonSettings,
    },
    {
      path:'/my_notes',
      name:'MyNotes',
      component: MyNotes,
    },
    {
      path:'/component_management',
      name:'ComponentManagement',
      component: ComponentManagement,
    },
    {
      path:'/k8s_management',
      name:'K8sManagement',
      component: K8sManagement,
    },
    {
      path:'/prometheus_manage',
      name:'PrometheusManageMent',
      component: PrometheusManageMent,
    },
    {
      path:'*',
      component: notfound
    }
  ]
})
