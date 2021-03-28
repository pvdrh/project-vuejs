import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import home from './modules/home'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // Khai báo global state
    },
    mutations: {
        // Khai báo mutations
    },
    modules: {
        home, auth
    },
    plugins: [createPersistedState()]
})

export default store