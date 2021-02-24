import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import about from './modules/about'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    modules: {
        home,
        about
    }
})

export default store