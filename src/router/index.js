import Vue from 'vue';
import Router from 'vue-router';

import {
    Header,
    Sidebar,
    Home,
    Login,
    Register,
    Introduction,
    BaseCharts,
    BaseForm,
    BaseTable,
    Markdown,
    MixCharts,
    Upload,
    VueEditor,
    VueTable,
} from 'components';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/index',
            component: Home,
            children:[
                {
                    meta: {requiresAuth: true},
                    path: '/',
                    component: Introduction,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/basetable',
                    component: BaseTable,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/vuetable',
                    component: VueTable,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/baseform',
                    component: BaseForm,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/vueeditor',
                    component: VueEditor,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/markdown',
                    component: Markdown,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/upload',
                    component: Upload,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/basecharts',
                    component: BaseCharts,
                },
                {
                    meta: {requiresAuth: true},
                    path: '/mixcharts',
                    component: MixCharts,
                }
            ]
        },
        {
            meta: {requiresAuth: false},
            path: '/login',
            component: Login,
            
        },
        {
            meta: {requiresAuth: false },
            path: '/register',
            component: Register,
        }
    ]
})
