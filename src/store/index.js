import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import cars from './cars';
import categories from './categories';
import impacts from './impacts';
import probabilities from './probabilities';

export default new Vuex.Store({
    actions: {
    },
    modules: {
        cars,
        categories,
        impacts,
        probabilities,
    },
    strict: process.env.NODE_ENV !== 'production',
});
