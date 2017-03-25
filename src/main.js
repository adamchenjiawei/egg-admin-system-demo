"use strict";

import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import VueResource from 'vue-resource';

Vue.use(VueResource);

/**
 * before every router check login status
 *
 * to: Route: the target Route Object being navigated to.
 * from: Route: the current route being navigated away from.
 * next: Function: this function must be called to resolve the hook. The action depends on the arguments provided to next:
 *   next(): move on to the next hook in the pipeline. If no hooks are left, the navigation is confirmed.
 *   next(false): abort the current navigation. If the browser URL was changed (either manually by the user or via back button), it will be reset to that of the from route.
 *   next('/') or next({ path: '/' }): redirect to a different location.
 *   The current navigation will be aborted and a new one will be started.
 */
router.beforeEach((to, from, next) => {

    const accessToken = sessionStorage.getItem('username');
    if(accessToken){

        if(to.path === '/login'){
            next({path: '/index'});
        }
        next();

    } else {
        
        let auth = to.meta.requiresAuth;
        console.log(to);
        console.log(auth)
        if (auth) {
            next({path: '/login'})
        } else {
            next()
        }
    }

});

Vue.use(ElementUI);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
