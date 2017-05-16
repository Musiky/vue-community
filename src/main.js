// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// axios
import axios from 'axios'
axios.defaults.baseURL = 'https://www.vue-js.com/api/v1/'   // base url

// import css
import './assets/css/material-icons.css'     // material-icons.css
import './assets/css/reset.css'              // reset.css
import 'animate.css'                         // animate.css

// muse
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)

import store from './store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',  
  store,
  router,
  template: '<App/>',
  components: { App }
})
