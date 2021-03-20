import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        // Khai báo state
        profile: {
            name: "Phạm Văn Duy",
            avatar: "https://genk.mediacdn.vn/k:thumb_w/640/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188/cau-chuyen-ve-nguoi-tao-ra-chu-ech-xanh-than-thanh.png"
        }
    },
    getters: {

    },
    mutations: {

    },
}