import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home/index.vue')
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: () => import(/* webpackChunkName: "discuss" */ './views/discuss/index.vue')
    },
    {
      path: '/tree-hole',
      name: 'tree-hole',
      component: () => import(/* webpackChunkName: "tree-hole" */ './views/tree-hole/index.vue')
    },
    {
      path: '/oa',
      name: 'oa',
      component: () => import(/* webpackChunkName: "oa" */ './views/oa/index.vue')
    },
    {
      path: '/job',
      name: 'job',
      component: () => import(/* webpackChunkName: "job" */ './views/job/index.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import(/* webpackChunkName: "editor" */ './views/editor/index.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import(/* webpackChunkName: "notification" */ './views/notification/index.vue')
    }
  ]
});
