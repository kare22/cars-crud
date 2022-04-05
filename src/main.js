import Vue from 'vue';
import VueRouter from 'vue-router';
import VueConfirmDialog from 'vue-confirm-dialog';
import VueToastr from 'vue-toastr';
import App from '@/App.vue';
import router from '@/routes.js';
import { makeServer } from '@mocks/index.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from '@/store';
import axios from 'axios';

import './styles/index.css';

if (process.env.NODE_ENV === 'development') { 
    makeServer();
}

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueConfirmDialog);
Vue.use(VueToastr, {
    defaultTimeout: 2500,
    defaultPosition: 'toast-top-right',
    defaultCloseOnHover: false,
    defaultPreventDuplicates: true,
    defaultProgressBar: false,
});

Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

export let vm;
vm = new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
