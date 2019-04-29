import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dayjs from 'dayjs';

import { setCookie } from '@/utils';
import { getLoginStatus, getUserInfo } from '@/api';

import {
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Option,
  Dialog,
  Tag,
  Message,
  DatePicker,
  Radio,
  RadioGroup,
  Cascader,
  Upload
} from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cascader);
Vue.use(Upload);

Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$dayjs = dayjs;

router.beforeEach(async (to, from, next) => {
  if (to.query.auth_token) {
    // 经过SSO登录后url会携带auth_token，需要将其设置在cookie中，后端请求验证会用到，设置过期时间为一周，域为ericwu.cn
    setCookie('auth_token', to.query.auth_token, 7, process.env.VUE_APP_DOMAIN);
    const data = await getLoginStatus(); // 获取登录状态，验证auth_token是否正确
    if (data.code === 0) {
      localStorage.setItem('isLogin', true); // 登录成功，设置localStorage，这样用户可以保持着登录的状态直到用户手动退出登录。
      store.commit('loginStatus', true); // 设置Vuex中的登录状态，方便后续条件判断

      // 去除url中的auth_token
      const route = { ...to, replace: true };
      delete route.query.auth_token;
      next(route); // 跳到不含auth_token的url地址，也就是中断当前导航，进行新的导航，达到消除auth_token参数的目的
    } else {
      // 登录失败，说明auth_token值不正确，则重定向到单点登录平台，且不带任何参数或hash值
      window.location.href = '/sso';
    }
  }

  // 从localStorage中获取登录状态
  const isLogin = localStorage.getItem('isLogin');
  if (isLogin) {
    // 如果已经登录则继续，并且获取相关数据设置到Vuex中，防止刷新后Vuex中状态被清除
    if (!store.getters.user) {
      // 如果用户信息为空的话，就去获取用户信息
      const result = await getUserInfo();
      if (result.code === 0) {
        store.commit('setUser', result.data); // 设置Vuex中的登录用户信息，方便后续使用
        store.commit('loginStatus', true); // 设置Vuex中的用户登录状态，方便后续使用
      } else {
        // 登录token已经过期，一般情况下是需要获取新的token
        // 不过我的做法是清除用户的登录状态，回到未登录状态
        localStorage.removeItem('isLogin');
        store.commit('setUser', null);
        store.commit('loginStatus', false);
        window.location.href = '/';
      }
    }
    next();
  } else {
    // 未登录情况下，判断页面是否需要登录，因为有的页面不需要登录也能浏览
    if (to.meta.needLogin) {
      const data = await getLoginStatus(); // 获取登录状态
      if (data.code === 0) {
        // 登录成功，设置localStorage，这样用户可以保持着登录的状态直到用户手动退出登录。
        localStorage.setItem('isLogin', true);
        // 设置Vuex中的登录状态，方便后续条件判断
        store.commit('loginStatus', true);

        if (!store.getters.user) {
          // 如果用户信息为空的话，就去获取用户信息
          const result = await getUserInfo();
          if (result.code === 0) {
            store.commit('setUser', result.data);
          }
        }
        next();
      } else {
        // 登录失败
        const nowHref = window.location.href;
        window.location.href = `/sso?redirect=${nowHref}`;
      }
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
