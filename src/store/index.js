import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import template from './modules/template'
import getters from './getter'
 
Vue.use(Vuex)
 
const store = new Vuex.Store({
  modules: {
    app,
    user,
    template
  },
  getters
})
 
export default store