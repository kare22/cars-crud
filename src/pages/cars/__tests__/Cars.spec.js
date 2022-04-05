import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Cars from '@/pages/cars/index.vue';

import testData from './__mocks__/test-data';

jest.mock('@/store');

describe('Cars', () => {
    const mocks = {};

    let actions;
    let getters;
    let store;

    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    const router = new VueRouter();

    function getComponent(options = {}) {
        return mount(Cars, {
            ...options,
            mocks,
            store,
            localVue,
            router,
        });
    }

    beforeEach(() => {
        actions = {
            'cars/get': () => [],
            'categories/get': () => [],
            'probabilities/get': () => [],
            'impacts/get': () => [],
        };
        getters = {
            'cars/categorized': () => testData.cars,
            'categories/data': () => testData.categories,
            'impacts/data': () => testData.impacts,
            'probabilities/data': () => testData.probabilities,
        };
        store = new Vuex.Store({
            actions,
            getters,
        });
    });

    it('snapshot test', () => {
        expect(getComponent()).toMatchSnapshot();
    });

    it('should show all categories', async() => {
        const wrapper = await getComponent({});

        testData.categories.forEach(category => {
            expect(wrapper.find(`#category_${category.id}`).exists()).toBeTruthy();
        });
    });

    it('should have the right amount of cars', async() => {
        const wrapper = await getComponent({});

        testData.categories.forEach(category => {
            const cars = testData.cars[category.id] || [];

            cars.forEach(car => {
                expect(wrapper.find(`#category_${category.id}`).find(`#car_${car.id}`).exists()).toBeTruthy();
            });
        });
    });

    it('should open new car modal when "New Car" is pressed', async() => {
        const methods = {
            openAddCarModal: jest.fn(),
        };
        const wrapper = await getComponent({ methods });

        wrapper.find('#add_new_car').trigger('click');

        await wrapper.vm.$nextTick();

        expect(methods.openAddCarModal).toHaveBeenCalled();
    });
});

