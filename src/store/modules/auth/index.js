export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authUser: {},
        token: false
    },
    getters: {
        //
    },
    mutations: {
        updateLoginStatus (state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },
        updateAuthUser (state, authUser) {
            state.authUser = authUser
        },
        updateToken(state, token) {
            state.token = token
        }
    },
}