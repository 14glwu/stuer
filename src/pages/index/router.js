import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home.vue')
    },
    {
      path: '/discuss',
      name: 'discuss',
      component: () => import(/* webpackChunkName: "discuss" */ './views/discuss.vue')
    },
    {
      path: '/tree-hole',
      name: 'tree-hole',
      component: () => import(/* webpackChunkName: "tree-hole" */ './views/tree-hole.vue')
    },
    {
      path: '/oa',
      name: 'oa',
      component: () => import(/* webpackChunkName: "oa" */ './views/oa.vue')
    },
    {
      path: '/job',
      name: 'job',
      component: () => import(/* webpackChunkName: "job" */ './views/job.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import(/* webpackChunkName: "notification" */ './views/notification.vue')
    }
  ]
});
