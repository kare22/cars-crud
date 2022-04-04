import Router from 'vue-router';

import Cars from '@/pages/cars/index';
import Error from '@/pages/Error';

let VueRouter = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Cars, },

        { path: '*', component: Error },
    ]
});

export default VueRouter;
