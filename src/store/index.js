import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import topics from './modules/topics'
import info from './modules/info'
import login from './modules/login'
import bottomNav from './modules/bottomNav'
import message from './modules/message'
import release from './modules/release'

const store = new Vuex.Store({
    state: {
        isHideMainOverflow: false
    },
    modules: {
        topics,
        info,
        login,
        bottomNav,
        message,
        release
    },
    mutations: {
        SHOW_MAIN_OVERFLOW (state) {
            state.isHideMainOverflow = true
        },
        HIDE_MAIN_OVERFLOW (state) {
            state.isHideMainOverflow = false
        }
    }
})

export default store