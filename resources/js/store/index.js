import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user : {}
    },
    getters: {
        getCurrentState(state, getters){
            return {
                user: state.user,
                isUserLoggedIn: state.isUserLoggedIn,
                //localizations: state.localizations,
                issues: state.issues,
            };
        },
    },
    mutations: {
        setUser(state, user){
            state.user = user;
        }
    },
    actions: {
        setUser({ commit }, user){
            commit('setUser', user)
        }
    },
});
