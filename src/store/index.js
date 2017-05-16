import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import topics from './modules/topics'
import info from './modules/info'

const store = new Vuex.Store({
    state: {},
    modules: {
        topics,
        info
    }
})

export default store