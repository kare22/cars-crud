import axios from 'axios';

function state() {
    return {
        data: [],
    };
}

const mutations = {
    set(state, data) {
        state.data = data;
    },
};

const actions = {
    async get({ commit }) {
        try {
            const { data } = await axios.get('/cars');
            commit('set', data);
            return data;
        } catch (e) {
            return {};
        }
    }
};

const getters = {
    data: (state) => state.data,
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
};
