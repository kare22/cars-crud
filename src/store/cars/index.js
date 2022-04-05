import axios from 'axios';
import { vm } from '@/main';

function state() {
    return {
        data: [],
    };
}

const mutations = {
    set(state, data) {
        state.data = data;
    },
    add(state, car) {
        state.data.push(car);
    },
    remove(state, id) {
        const index = state.data.findIndex(car => +car.id === +id);
        if(index !== -1) {
            state.data.splice(index, 1);
        }
    },
    update(state, data) {
        const index = state.data.findIndex(car => +car.id === +data.id);
        if(index !== -1) {
            state.data[index] = data;
        }
    },
};

const actions = {
    async get({ commit }) {
        try {
            const { data } = await axios.get('/cars');
            commit('set', data);
            return data;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
    async create({ commit }, { car }) {
        try {
            const { data } = await axios.post('/cars', { ...car });
            commit('add', data);
            vm.$toastr.s(`Car ${car.title} added successfully!`);
            return data;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
    async update({ commit }, { car }) {
        try {
            const { data } = await axios.put(`/car/${car.id}`, { ...car });
            commit('update', data);
            vm.$toastr.s(`Car ${car.title} updated successfully!`);
            return data;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
    async remove({ commit }, { id }) {
        if(!id) {
            console.error('Can\'t delete car with a missing id!');
        }
        try {
            const { data } = await axios.delete(`/cars/${id}`);
            commit('remove', id);
            return data;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
};

const getters = {
    data: (state) => state.data,
    categorized: (state) => {
        const result = {};
        state.data.forEach(car => {
            result[car.category] = [...(result[car.category] ? result[car.category] : []), car];
        });

        return result;
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
};
