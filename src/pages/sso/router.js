import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/sso',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    },
    {
      path: '/sso/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/signup.vue')
    },
    {
      path: '/sso/forgotPwd',
      name: 'forgotPwd',
      component: () => import(/* webpackChunkName: "forgotPwd" */ './views/forgotPwd.vue')
    },
    {
      path: '/sso/setPwd',
      name: 'setPwd',
      component: () => import(/* webpackChunkName: "setPwd" */ './views/setPwd.vue')
    }
  ]
});
