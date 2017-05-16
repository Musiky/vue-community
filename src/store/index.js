import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import topics from './modules/topics'

const store = new Vuex.Store({
    state: {},
    modules: {
        topics
    }
})

export default store