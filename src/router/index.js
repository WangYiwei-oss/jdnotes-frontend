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
import DeploymentPage from "../components/k8s/DeploymentPage";
import DashboardPage from "../components/k8s/DashboardPage";
import PodPage from "../components/k8s/PodPage";
import ServicePage from "../components/k8s/ServicePage";
import SecretPage from "../components/k8s/SecretPage";
import ConfigMapPage from "../components/k8s/ConfigMapPage";
import IngressPage from "../components/k8s/IngressPage";
import PodShell from "../components/k8s/PodShell";  //测试用
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
    //k8s相关的路由
    {
      path:'/k8s_management',
      name:'K8sManagement',
      component: K8sManagement,
      redirect: '/k8s_management/dashboard',
      children: [
        {
          path: 'dashboard',
          component: DashboardPage
        },
        {
          path: 'deployments',
          component: DeploymentPage
        },
        {
          path: 'pods',
          component: PodPage
        },
        {
          path: 'services',
          component: ServicePage
        },
        {
          path: 'secret',
          component: SecretPage
        },
        {
          path: 'configmap',
          component: ConfigMapPage
        },
        {
          path: 'ingresses',
          component: IngressPage
        },
        {
          path: 'podshell',
          component: PodShell,
        },
      ]
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
