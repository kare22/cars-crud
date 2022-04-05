import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { extend } from 'vee-validate';
import { min, required } from 'vee-validate/dist/rules';

import testData from './__mocks__/test-data';
import CarForm from '@/pages/cars/components/CarForm';

jest.mock('@/store');

describe('CarForm', () => {
    const mocks = {};

    let actions;
    let getters;
    let store;

    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueRouter);
    const router = new VueRouter();

    const car = testData.cars[1][0];

    function getComponent(options = {}) {
        return mount(CarForm, {
            ...options,
            mocks,
            store,
            localVue,
            router,
        });
    }

    beforeEach(() => {
        extend('required', required);
        extend('min', min);

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

    it('should call remove when x is triggered', async() => {
        const propsData = {
            car,
        };
        const methods = {
            remove: jest.fn(),
        };
        const wrapper = await getComponent({ methods, propsData });

        wrapper.find(`#remove_car_${car.id}`).trigger('click');

        await wrapper.vm.$nextTick();

        expect(methods.remove).toHaveBeenCalled();
    });

    it('should accept valid form fields', async() => {
        const wrapper = await getComponent({
            data() {
                return {
                    carData: {
                        title: 'Some title',
                        description: 'Some description',
                        category: 2,
                    }
                };
            },
        });

        wrapper.find('form').trigger('submit');

        await wrapper.vm.$nextTick();

        expect( await wrapper.vm.$refs.observer.validate()).toBeTruthy();
    });

    it('should not accept invalid form fields', async() => {
        const wrapper = await getComponent({
            data() {
                return {
                    carData: {
                        title: 'Some title',
                        description: '',
                        category: 2,
                    }
                };
            },
        });

        wrapper.find('form').trigger('submit');

        await wrapper.vm.$nextTick();

        expect( await wrapper.vm.$refs.observer.validate()).toBeFalsy();
    });

    it('should show categories select when id is not set', async() => {
        const propsData = {
            car: {
                title: 'Some title',
                description: '',
                category: 2,
            },
        };
        const wrapper = await getComponent({ propsData });

        expect(wrapper.find('.category-select').exists()).toBeTruthy();
    });

    it('should not show categories select when id is set', async() => {
        const propsData = {
            car: {
                id: 239,
                title: 'Some title',
                description: '',
                category: 2,
            },
        };
        const wrapper = await getComponent({ propsData });

        expect(wrapper.find('.category-select').exists()).toBeFalsy();
    });
});

