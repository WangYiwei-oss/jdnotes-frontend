import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import './global.less';
//import 'lib-flexible';
import 'muse-ui/lib/styles/base.less';
import { Button, Select, AppBar,Icon,Menu,List,Avatar,Form,TextField } from 'muse-ui'; //引入需要的组件
import 'muse-ui/lib/styles/theme.less';

Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Form);
Vue.use(TextField);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
