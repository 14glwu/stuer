import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { setCookie } from '@/utils';
import { getLoginStatus } from '@/api';

import {
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Option,
  OptionGroup,
  Dialog,
  Tag,
  Message
} from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Dialog);
Vue.use(Tag);

Vue.config.productionTip = false;
Vue.prototype.$message = Message;

router.beforeEach(async (to, from, next) => {
  if (to.query.auth_token) {
    // 如果url中包含了auth_token，则设置在cookie中
    setCookie('auth_token', to.query.auth_token, 1);
  }
  if (store.getters.isLogin) {
    // 如果已经登录则继续
    next();
  } else {
    // 如果未登录则去获取登录状态
    const data = await getLoginStatus();
    if (data.code === 0) {
      // 登录成功
      store.commit('loginStatus', true);
      next();
    } else {
      // 登录失败
      const nowHref = window.location.href;
      window.location.href = `/sso?redirect=${nowHref}`;
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
