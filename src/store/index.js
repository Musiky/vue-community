import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import topics from './modules/topics'
import info from './modules/info'

const store = new Vuex.Store({
    state: {
        isHideMainOverflow: false
    },
    modules: {
        topics,
        info
    },
    mutations: {
        TOGGLE_MAIN_OVERFLOW (state) {
            state.isHideMainOverflow = !state.isHideMainOverflow
        }
    }
})

export default store