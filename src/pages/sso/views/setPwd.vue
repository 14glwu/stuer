<template>
  <div class="container">
    <div class="tab_head">
      <svg class="icon tab-icon" aria-hidden="true">
        <use xlink:href="#icon-login"></use>
      </svg>
      <h2 class="title">找回密码</h2>
    </div>
    <el-form
      ref="setPwdForm"
      :model="form"
      :rules="rules"
      label-width="0"
      class="form_container"
      status-icon
    >
      <el-form-item class="form_item" prop="password">
        <el-input
          v-model="form.password"
          placeholder="新密码"
          class="form_input"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form_item" prop="checkPass">
        <el-input
          v-model="form.checkPass"
          placeholder="确认密码"
          class="form_input"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form_item">
        <el-button type="primary" class="submit_btn" @click="setPwd">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePwd } from '@/api';
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.setPwdForm.validateField('checkPass');
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
        password: '',
        checkPass: ''
      },
      rules: {
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
  methods: {
    async setPwd() {
      this.$refs.setPwdForm.validate(async (valid) => {
        if (valid) {
          const data = await updatePwd({
            password: this.form.password,
            ticket: this.$route.query.ticket
          });
          if (data.code === 0) {
            this.$message.success('密码修改成功，现在可以去登录啦');
            this.$router.push({ name: 'login', query: { redirect: this.$route.query.redirect } });
          } else {
            this.$message.error(`密码修改失败, ${data.msg}`);
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
.submit_btn {
  width: 100%;
}
.tab_head {
  border-bottom: none;
}
</style>
