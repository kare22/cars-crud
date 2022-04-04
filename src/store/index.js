import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import cars from './cars';

export default new Vuex.Store({
    actions: {
    },
    modules: {
        cars,
    },
    strict: process.env.NODE_ENV !== 'production',
});
