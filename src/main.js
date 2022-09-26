
 
import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { getToken } from '@/utils/auth'
import { messages } from './components/common/i18n';
import Cookies from 'js-cookie'
// // 权限指令
import checkPer from '@/utils/permission';
import permission from './components/Permission';
import less from'less'
import util from './assets/js/util.js';
import common from './assets/js/common.js'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
Vue.prototype.$util = util;
Vue.prototype.$common = common;

import elementUIVerify from 'element-ui-verify'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icons/icon.css';
import './components/common/directives';
import './components/common/filter';
import store from './store'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(less)
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(checkPer);
// Vue.use(dict);
Vue.use(permission);
// 这里注意必须得先use elementUI
Vue.use(elementUIVerify)
import  verifyrules from './assets/js/verifyRule'
 
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
verifyrules.forEach(item => {//
    elementUIVerify.addRule(item.rule, item.ruleMethod);
})
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

const whiteList = ['/login','/resetPass','/reg'] // no redirect whitelist
//使用钩子函数对路由进行权限跳转
// beforeRouteEnter(to, from, next) { next(vm => { sessionStorage.setItem("lasterRouter", from.path) }) }, this.$router.push(sessionStorage.getItem("lasterRouter"))
router.beforeEach((to, from, next) => {
    // console.log(to.path)
    document.title = `${to.meta.title} | 5G随e签`;
    if(to.query.gateway&&to.path === '/login'){
      sessionStorage.setItem("gateway",'gateway')
    }
    let token = getToken()
    // sessionStorage.setItem("lasterRouter", from.path)
//    next();
if (token) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login'&& to.path === '/reg'&& to.path === '/resetPass') {
      next({ path: '/' })
    } else {
     
     
      if (!store.getters.roles) {
        // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo',true)
          .then(() => {
            // 拉取user_info
            // 动态路由，拉取菜单
            // loadMenus(next, to)
            next();
          })
                   
        // 登录时未拉取 菜单，在此处拉取
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    console.log(whiteList.indexOf(to.path),to.path,"whiteList.indexOf(to.path)")
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      
      next()
      
    } else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
   
});
Vue.config.silent = true
new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
