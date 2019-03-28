<template>
  <div class="container">
    <div class="tab_head">
      <div class="tab_head_item" @click="routeToLogin">
        <svg class="icon tab-icon" aria-hidden="true">
          <use xlink:href="#icon-login"></use>
        </svg>
        <h2 class="title">登录</h2>
      </div>
      <div class="tab_head_item tab-selected">
        <svg class="icon tab-icon" aria-hidden="true">
          <use xlink:href="#icon-signup"></use>
        </svg>
        <h2 class="title">注册</h2>
      </div>
    </div>

    <el-form
      ref="sigupForm"
      :model="form"
      :rules="rules"
      label-width="0px"
      class="form_container"
      status-icon
    >
      <el-form-item class="form_item" prop="email">
        <el-input v-model="form.email" placeholder="邮箱" class="form_input" type="email"></el-input>
      </el-form-item>
      <el-form-item class="form_item" prop="code">
        <el-input v-model="form.code" placeholder="验证码" class="code_input"></el-input>
        <code-btn type="primary" class="send_btn" @send-code="sendCode"></code-btn>
      </el-form-item>
      <el-form-item class="form_item" prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          class="form_input"
          type="password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form_item" prop="checkPass">
        <el-input
          v-model="form.checkPass"
          placeholder="确认密码"
          class="form_input"
          type="password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="primary" class="submit_btn" @click="signup">Sign Up</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendCode, signup } from '@/api';
import codeBtn from '@/components/code-btn';
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

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.sigupForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      form: {
        email: '',
        password: '',
        code: '',
        checkPass: ''
      },
      rules: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度为 6 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度为 6-20 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    codeBtn
  },
  methods: {
    routeToLogin() {
      this.$router.push({ name: 'login', query: { redirect: this.$route.query.redirect } });
    },
    async sendCode() {
      const data = await sendCode({ email: this.form.email });
      if (data.code === 0) {
        this.$message.success('验证码已发送，请前往邮箱查看');
      } else {
        this.$message.error('验证码发送失败，请重试');
      }
    },
    async signup() {
      this.$refs.sigupForm.validate(async (valid) => {
        if (valid) {
          const data = await signup({
            email: this.form.email,
            code: this.form.code,
            password: this.form.password
          });
          if (data.code === 0) {
            this.$message.success('注册成功，现在可以去登录啦');
            this.$router.push({ name: 'login', query: { redirect: this.$route.query.redirect } });
          } else {
            this.$message.error(`注册失败, 原因：${data.msg}`);
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

<style lang="scss">
.send_btn {
  width: 200px;
  height: 40px;
  border-radius: 0 5px 5px 0;
}
.code_input {
  width: 200px;
  height: 40px;
  border-radius: 5px 0 0 5px;
  input {
    border-radius: 4px 0 0 4px !important;
  }
}
.submit_btn {
  width: 100%;
}
</style>
