<template>
  <div class="container">
    <div class="tab_head">
      <div class="tab_head_item tab-selected">
        <svg class="icon tab-icon" aria-hidden="true">
          <use xlink:href="#icon-login"></use>
        </svg>
        <h2 class="title">登录</h2>
      </div>
      <div class="tab_head_item" @click="routeToSignUp">
        <svg class="icon tab-icon" aria-hidden="true">
          <use xlink:href="#icon-signup"></use>
        </svg>
        <h2 class="title">注册</h2>
      </div>
    </div>

    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="0"
      class="form_container"
      status-icon
    >
      <el-form-item class="form_item" prop="email">
        <el-input v-model="form.email" placeholder="邮箱" class="form_input" type="email"></el-input>
      </el-form-item>
      <el-form-item class="form_item" prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          class="form_input"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <div class="forgotHref">
          <a :href="forgotHref">忘记密码?</a>
        </div>
        <el-button type="primary" class="login_btn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api';
export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (value === '') {
        return callback(new Error('邮箱不能为空'));
      } else if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的邮箱格式'));
      }
    };
    return {
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    forgotHref() {
      if (this.$route.query.redirect) {
        return `/sso/forgotPwd?redirect=${this.$route.query.redirect}`;
      }
      return '/sso/forgotPwd';
    }
  },
  methods: {
    routeToSignUp() {
      this.$router.push({ name: 'signup', query: { redirect: this.$route.query.redirect } });
    },
    async login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const data = await login({
            email: this.form.email,
            password: this.form.password
          });
          if (data.code === 0) {
            this.$message.success('登录成功');
            if (this.$route.query.redirect) {
              // 如果是从其他平台跳过来的
              window.location.href = `${this.$route.query.redirect}?auth_token=${
                data.data.auth_token
              }`;
            } else {
              // 自己平台的则直接登录
              window.location.href = '/';
            }
          } else {
            this.$message.error(`登录失败, ${data.msg}`);
          }
        } else {
          this.$message.success('请检验全部填写项是否符合要求');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.forgotHref {
  width: 200px;
  a {
    color: $primary-color;
  }
}
.login_btn {
  width: 200px;
}
</style>
